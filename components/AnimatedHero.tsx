"use client";
import { useEffect, useRef } from "react";

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // â”€â”€ Custom cursor â”€â”€
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

    // â”€â”€ Card mouse glow â”€â”€
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

    // â”€â”€ Star field canvas â”€â”€
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

    // â”€â”€ Aurora blobs â”€â”€
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

    // â”€â”€ Floating particles â”€â”€
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

    // â”€â”€ Typed text â”€â”€
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

    // â”€â”€ Animated counters â”€â”€
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

    // â”€â”€ Scroll reveal â”€â”€
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