# ── Fix encoding + add animations ──
Write-Host "Fixing everything..." -ForegroundColor Cyan

# ── components/AnimatedHero.tsx (all the motion) ──
$heroContent = @'
"use client";
import { useEffect, useRef } from "react";

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Custom cursor ──
    const cursor = document.createElement("div");
    const ring   = document.createElement("div");
    cursor.id = "cur";
    ring.id   = "cur-ring";
    cursor.style.cssText = "position:fixed;width:10px;height:10px;background:#7C6AF7;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);mix-blend-mode:screen;transition:width .25s,height .25s;";
    ring.style.cssText   = "position:fixed;width:34px;height:34px;border:1.5px solid rgba(124,106,247,.45);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);";
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + "px"; cursor.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);
    let rafId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      rafId = requestAnimationFrame(animRing);
    };
    animRing();

    // ── Card mouse glow ──
    const cards = document.querySelectorAll<HTMLElement>(".course-card");
    const cardListeners: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
    cards.forEach(card => {
      const fn = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top)  + "px");
      };
      card.addEventListener("mousemove", fn);
      cardListeners.push({ el: card, fn });
    });

    // ── Star field canvas ──
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 0.8 + 0.15,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.007,
    }));

    let animFrame: number;
    const drawBg = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(124,106,247,${0.07 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }
      stars.forEach(s => {
        s.x = (s.x + s.vx + W) % W;
        s.y = (s.y + s.vy + H) % H;
        s.a += s.va;
        if (s.a < 0 || s.a > 1) s.va *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,153,255,${s.a * 0.65})`;
        ctx.fill();
      });
      animFrame = requestAnimationFrame(drawBg);
    };
    drawBg();

    // ── Aurora blobs ──
    const auroraColors = ["#7C6AF7","#4F46E5","#6366F1","#8B5CF6","#A399FF"];
    const auroraEls: HTMLElement[] = [];
    auroraColors.forEach((c, i) => {
      const el = document.createElement("div");
      const sz  = 220 + Math.random() * 280;
      const dur = 20  + Math.random() * 22;
      el.style.cssText = `
        position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:1;
        width:${sz}px;height:${sz}px;background:${c};
        left:${Math.random()*90}vw;top:${Math.random()*90}vh;
        animation:auroraMove ${dur}s linear ${-Math.random()*dur}s infinite;
        --tx:${(Math.random()-.5)*500}px;--ty:${(Math.random()-.5)*500}px;
        --tx2:${(Math.random()-.5)*400}px;--ty2:${(Math.random()-.5)*400}px;
        --s:${0.5+Math.random()*0.9};
      `;
      document.body.appendChild(el);
      auroraEls.push(el);
    });

    // ── Floating particles ──
    const particleEls: HTMLElement[] = [];
    const spawnParticle = () => {
      const el  = document.createElement("div");
      const sz  = 2 + Math.random() * 3.5;
      const dur = 7 + Math.random() * 10;
      const col = Math.random() > 0.5 ? "#7C6AF7" : "#A399FF";
      el.style.cssText = `
        position:fixed;border-radius:50%;pointer-events:none;z-index:1;
        width:${sz}px;height:${sz}px;background:${col};
        left:${Math.random()*100}vw;top:${Math.random()*100}vh;
        box-shadow:0 0 ${sz*3}px ${col};
        --dx:${(Math.random()-.5)*180}px;--dy:${-60-Math.random()*140}px;
        --op:${0.25+Math.random()*0.4};
        animation:ptFloat ${dur}s linear ${-Math.random()*dur}s infinite;
      `;
      document.body.appendChild(el);
      particleEls.push(el);
    };
    for (let i = 0; i < 28; i++) spawnParticle();
    const particleInterval = setInterval(spawnParticle, 700);

    // ── Typed text ──
    const typedEl = document.getElementById("typed-text");
    if (typedEl) {
      const words = ["Actually.", "Really.", "For real.", "Seriously."];
      let wi = 0, ci = 0, deleting = false;
      const type = () => {
        const word = words[wi];
        if (!deleting) {
          ci++;
          typedEl.textContent = word.slice(0, ci);
          if (ci === word.length) { setTimeout(() => { deleting = true; setTimeout(type, 55); }, 2200); return; }
        } else {
          ci--;
          typedEl.textContent = word.slice(0, ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(type, deleting ? 52 : 100);
      };
      setTimeout(type, 900);
    }

    // ── Animated counters ──
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const to  = parseFloat(el.dataset.count!);
      const sfx = el.dataset.sfx  || "";
      const dec = "dec" in el.dataset;
      let v = 0;
      const inc = to / (1800 / 16);
      const id = setInterval(() => {
        v = Math.min(v + inc, to);
        el.textContent = (dec ? v.toFixed(1) : Math.round(v)) + sfx;
        if (v >= to) clearInterval(id);
      }, 16);
    });

    // ── Scroll reveal ──
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          e.target.querySelectorAll(".reveal-child").forEach((c, i) => {
            setTimeout(() => c.classList.add("revealed"), i * 130);
          });
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal-section").forEach(el => revealObs.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animFrame);
      clearInterval(particleInterval);
      window.removeEventListener("resize", resize);
      cursor.remove(); ring.remove();
      auroraEls.forEach(el => el.remove());
      cardListeners.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}
    />
  );
}
'@
[System.IO.File]::WriteAllText("components\AnimatedHero.tsx", $heroContent, [System.Text.Encoding]::UTF8)
Write-Host "OK components/AnimatedHero.tsx" -ForegroundColor Green

# ── app/globals.css (with animation keyframes) ──
$globalsCss = @'
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: #0D0D0F;
  color: #E8E8F0;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  cursor: none;
}

/* Aurora */
@keyframes auroraMove {
  0%   { opacity:0; transform:translate(0,0) scale(1); }
  8%   { opacity:.15; }
  50%  { transform:translate(var(--tx),var(--ty)) scale(var(--s)); opacity:.18; }
  92%  { opacity:.12; }
  100% { transform:translate(var(--tx2),var(--ty2)) scale(1); opacity:0; }
}

/* Particles */
@keyframes ptFloat {
  0%   { opacity:0; transform:translate(0,0) scale(0); }
  15%  { opacity:var(--op); }
  85%  { opacity:var(--op); }
  100% { opacity:0; transform:translate(var(--dx),var(--dy)) scale(2); }
}

/* Orbit rings */
@keyframes spinCW  { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(360deg)}  }
@keyframes spinCCW { from{transform:translate(-50%,-50%) rotate(0deg)}   to{transform:translate(-50%,-50%) rotate(-360deg)} }

/* Caret blink */
@keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Fade up */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-up          { animation: fadeUp 0.5s ease forwards; }
.fade-up-delay-1  { animation: fadeUp 0.5s ease 0.1s both; }
.fade-up-delay-2  { animation: fadeUp 0.5s ease 0.2s both; }
.fade-up-delay-3  { animation: fadeUp 0.5s ease 0.3s both; }
.fade-up-delay-4  { animation: fadeUp 0.5s ease 0.4s both; }

/* Stat line */
@keyframes statExpand { to { width:50px; } }
.stat-line {
  display:block; height:1px;
  background:linear-gradient(90deg,transparent,#7C6AF7,transparent);
  width:0; margin:6px auto 0;
  animation:statExpand 1s ease 1.2s forwards;
}

/* Gradient text animation */
@keyframes gradFlow {
  0%  { background-position:0%   50%; }
  50% { background-position:100% 50%; }
  100%{ background-position:0%   50%; }
}
.grad-text {
  background: linear-gradient(135deg,#7C6AF7,#A399FF 40%,#C4BBFF 70%,#7C6AF7 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradFlow 4s ease infinite;
}

/* Badge dot */
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.65)} }

/* Logo pulse */
@keyframes logoPulse {
  0%,100% { box-shadow:0 0 12px rgba(124,106,247,.4); }
  50%     { box-shadow:0 0 28px rgba(163,153,255,.7); }
}

/* Button glow */
@keyframes btnGlow {
  0%,100% { box-shadow:0 4px 18px rgba(124,106,247,.35); }
  50%     { box-shadow:0 4px 32px rgba(124,106,247,.65); }
}
@keyframes shine {
  0%      { left:-100%; }
  40%,100%{ left:150%;  }
}

/* Shimmer skeleton */
@keyframes shimmer {
  0%   { background-position:-200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,#1C1C21 25%,#252530 50%,#1C1C21 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
  border-radius: 6px;
}

/* Card glow sweep */
@keyframes cardSweep { from{left:-100%} to{left:150%} }
@keyframes glowLine  { from{left:-100%;opacity:0} to{left:100%;opacity:1} }
@keyframes iconFloat { 0%,100%{transform:translateY(0)} 45%{transform:translateY(-4px)} 75%{transform:translateY(2px)} }

/* Card */
.course-card {
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s;
  position: relative; overflow: hidden;
}
.course-card::before {
  content:''; position:absolute; inset:0; border-radius:18px;
  background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(124,106,247,.07),transparent 45%);
  pointer-events:none; opacity:0; transition:opacity .4s;
}
.course-card:hover::before { opacity:1; }
.course-card::after {
  content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
  pointer-events:none;
}
.course-card:hover::after { animation:cardSweep .6s ease forwards; }
.course-card:hover {
  transform: translateY(-6px) scale(1.015);
  box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(124,106,247,.28);
  border-color: rgba(124,106,247,.22) !important;
}
.card-icon-wrap { animation: iconFloat 5s ease-in-out infinite; }

/* Reveal on scroll */
.reveal-section {
  opacity:0; transform:translateY(28px);
  transition:opacity .65s ease, transform .65s ease;
}
.reveal-section.revealed { opacity:1; transform:none; }
.reveal-child {
  opacity:0; transform:translateY(18px);
  transition:opacity .5s ease, transform .5s ease;
}
.reveal-child.revealed { opacity:1; transform:none; }

/* Scrollbar */
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:#0D0D0F; }
::-webkit-scrollbar-thumb { background:#2A2A32; border-radius:3px; }
::-webkit-scrollbar-thumb:hover { background:#7C6AF7; }
'@
[System.IO.File]::WriteAllText("app\globals.css", $globalsCss, [System.Text.Encoding]::UTF8)
Write-Host "OK app/globals.css" -ForegroundColor Green

# ── app/page.tsx (with animations, fixed encoding) ──
$pageContent = @'
import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";
import AnimatedHero from "@/components/AnimatedHero";

export default function Home() {
  const available = courses.filter(c => !c.comingSoon);
  const soon      = courses.filter(c =>  c.comingSoon);

  return (
    <div className="min-h-screen">
      <AnimatedHero />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{ zIndex:2 }}>
        {/* Orbit rings */}
        <div style={{ position:"absolute", top:"50%", left:"50%", pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", width:"440px", height:"440px", borderRadius:"50%", border:"1px solid rgba(124,106,247,.07)", animation:"spinCW 22s linear infinite", transform:"translate(-50%,-50%)" }}>
            <div style={{ position:"absolute", width:"5px", height:"5px", borderRadius:"50%", background:"#7C6AF7", top:0, left:"50%", transform:"translate(-50%,-50%)", boxShadow:"0 0 10px #7C6AF7" }}/>
          </div>
          <div style={{ position:"absolute", width:"640px", height:"640px", borderRadius:"50%", border:"1px solid rgba(124,106,247,.045)", animation:"spinCCW 36s linear infinite", transform:"translate(-50%,-50%)" }}>
            <div style={{ position:"absolute", width:"4px", height:"4px", borderRadius:"50%", background:"#A399FF", top:0, left:"50%", transform:"translate(-50%,-50%)", boxShadow:"0 0 10px #A399FF" }}/>
          </div>
          <div style={{ position:"absolute", width:"860px", height:"860px", borderRadius:"50%", border:"1px solid rgba(124,106,247,.025)", animation:"spinCW 55s linear infinite", transform:"translate(-50%,-50%)" }}>
            <div style={{ position:"absolute", width:"3px", height:"3px", borderRadius:"50%", background:"#C4BBFF", top:0, left:"50%", transform:"translate(-50%,-50%)" }}/>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center" style={{ zIndex:2 }}>
          {/* Badge */}
          <div className="fade-up-delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright mb-6"
            style={{ boxShadow:"0 0 20px rgba(124,106,247,.1)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation:"blink 1.5s ease infinite" }} />
            New: Python Fundamentals is live
          </div>

          {/* Headline */}
          <h1 className="fade-up-delay-2 font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6">
            Learn to code.<br/>
            <span className="grad-text" id="typed-text"></span>
            <span style={{ color:"#7C6AF7", animation:"caretBlink .8s step-end infinite" }}>|</span>
          </h1>

          {/* Subtext */}
          <p className="fade-up-delay-3 text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Project-based courses built for developers who want to go from{" "}
            <em className="text-white not-italic font-medium">concept</em>{" "}
            to{" "}
            <em className="text-white not-italic font-medium">shipped</em>{" "}
            fast.
          </p>

          {/* CTAs */}
          <div className="fade-up-delay-4 flex items-center justify-center gap-4 mb-16">
            <button
              className="text-white font-bold px-8 py-3.5 rounded-xl font-display relative overflow-hidden"
              style={{
                background:"linear-gradient(135deg,#7C6AF7,#A399FF)",
                animation:"btnGlow 3s ease infinite",
              }}>
              <span style={{ position:"absolute", top:0, left:"-100%", width:"100%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)", animation:"shine 2.5s ease infinite" }}/>
              Explore courses
            </button>
            <button className="text-muted hover:text-white transition-colors text-sm font-medium">
              See learning paths &#x2192;
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up-delay-4 flex items-center justify-center gap-10 md:gap-16">
            {[
              { v:"50", sfx:"K+", label:"Students enrolled" },
              { v:"4.9", dec:true, label:"Average rating" },
              { v:"200", sfx:"+", label:"Hours of content" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div
                  className="font-display font-extrabold text-2xl text-white"
                  data-count={s.v}
                  data-sfx={s.sfx || ""}
                  {...(s.dec ? { "data-dec": "" } : {})}
                >
                  0{s.sfx || ""}
                </div>
                <div className="text-xs text-muted mt-0.5">{s.label}</div>
                <span className="stat-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-6 pb-24 reveal-section" style={{ zIndex:2, position:"relative" }}>
        <div className="mb-10 reveal-child">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Available now</h2>
          <p className="text-muted">Jump in and start learning today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {available.map((c, i) => (
            <div key={c.slug} className="reveal-child" style={{ transitionDelay:`${i*0.1}s` }}>
              <CourseCard course={c} />
            </div>
          ))}
        </div>

        {soon.length > 0 && (
          <>
            <div className="mb-8 reveal-child">
              <h2 className="font-display font-bold text-2xl text-white mb-2">Coming soon</h2>
              <p className="text-muted text-sm">More courses are on the way.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {soon.map((c, i) => (
                <div key={c.slug} className="reveal-child" style={{ transitionDelay:`${i*0.1}s` }}>
                  <CourseCard course={c} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("app\page.tsx", $pageContent, [System.Text.Encoding]::UTF8)
Write-Host "OK app/page.tsx" -ForegroundColor Green

# ── components/CourseCard.tsx (fixed encoding) ──
$courseCardContent = @'
import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="skeleton h-10 w-10 rounded-xl" />
      <div className="flex flex-col gap-2">
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={course.comingSoon ? "#" : `/courses/${course.slug}`} className="block h-full">
      <div className="course-card rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-full cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="card-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background:`${course.color}18` }}>
            {course.icon}
          </div>
          {course.comingSoon
            ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface border border-border text-muted">Coming soon</span>
            : <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background:`${course.color}20`, color:course.color }}>{course.level}</span>
          }
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white leading-tight mb-1">{course.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{course.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {course.tags.map(tag => (
            <span key={tag} className="tag text-xs font-medium px-2 py-0.5 rounded bg-surface border border-border text-muted transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            {!course.comingSoon && (
              <>
                <span style={{ color:"#FACC15" }}>&#9733;</span>
                <strong className="text-white">{course.rating}</strong>
                <span>&#183; {course.lessons} lessons &#183; {course.duration}</span>
              </>
            )}
          </div>
          <button className="text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{
              background: course.comingSoon ? "transparent" : `${course.color}20`,
              color:      course.comingSoon ? "#5A5A70" : course.color,
              border:     `1px solid ${course.comingSoon ? "#2A2A32" : `${course.color}40`}`,
            }}>
            {course.comingSoon ? "Notify me" : "Start learning \u2192"}
          </button>
        </div>
      </div>
    </Link>
  );
}
'@
[System.IO.File]::WriteAllText("components\CourseCard.tsx", $courseCardContent, [System.Text.Encoding]::UTF8)
Write-Host "OK components/CourseCard.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "Done! Restart the dev server:" -ForegroundColor Yellow
Write-Host "  1. Press Ctrl+C to stop it" -ForegroundColor White
Write-Host "  2. Run: npm run dev" -ForegroundColor White
