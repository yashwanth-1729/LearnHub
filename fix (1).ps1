# ── Motion + Cursor Fix ──
Write-Host "Adding all animations..." -ForegroundColor Cyan

# ── globals.css ──
[System.IO.File]::WriteAllText("app\globals.css", @'
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: #0D0D0F;
  color: #E8E8F0;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  cursor: none;
  overflow-x: hidden;
}

/* Cursor */
#lh-cursor {
  position:fixed; width:10px; height:10px; background:#7C6AF7;
  border-radius:50%; pointer-events:none; z-index:99999;
  transform:translate(-50%,-50%);
  transition:width .2s,height .2s,background .2s; mix-blend-mode:screen;
}
#lh-ring {
  position:fixed; width:34px; height:34px;
  border:1.5px solid rgba(124,106,247,.5); border-radius:50%;
  pointer-events:none; z-index:99998; transform:translate(-50%,-50%);
}

/* Canvas */
#lh-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; }

/* Aurora */
.lh-aurora {
  position:fixed; border-radius:50%; filter:blur(100px);
  pointer-events:none; z-index:1; animation:auroraMove linear infinite;
}
@keyframes auroraMove {
  0%   { opacity:0;   transform:translate(0,0) scale(1); }
  8%   { opacity:.15; }
  50%  { transform:translate(var(--tx),var(--ty)) scale(var(--s)); opacity:.18; }
  92%  { opacity:.12; }
  100% { opacity:0;   transform:translate(var(--tx2),var(--ty2)) scale(1); }
}

/* Particles */
.lh-particle { position:fixed; border-radius:50%; pointer-events:none; z-index:1; animation:ptFloat linear infinite; }
@keyframes ptFloat {
  0%   { opacity:0; transform:translate(0,0) scale(0); }
  15%  { opacity:var(--op); }
  85%  { opacity:var(--op); }
  100% { opacity:0; transform:translate(var(--dx),var(--dy)) scale(2); }
}

/* Orbit */
@keyframes spinCW  { to { transform:translate(-50%,-50%) rotate(360deg);  } }
@keyframes spinCCW { to { transform:translate(-50%,-50%) rotate(-360deg); } }
.orbit-ring { position:absolute; border-radius:50%; border:1px solid rgba(124,106,247,.07); transform:translate(-50%,-50%); }
.orbit-dot  { position:absolute; border-radius:50%; top:0; left:50%; transform:translate(-50%,-50%); }

/* Gradient text */
@keyframes gradFlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
.grad-text {
  background:linear-gradient(135deg,#7C6AF7,#A399FF 40%,#C4BBFF 70%,#7C6AF7 100%);
  background-size:200% 200%; -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  animation:gradFlow 4s ease infinite;
}

/* Caret */
@keyframes caretBlink { 0%,100%{opacity:1} 50%{opacity:0} }
.caret { animation:caretBlink .8s step-end infinite; color:#7C6AF7; }

/* Badge dot */
@keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.65)} }
.badge-dot { animation:blink 1.5s ease infinite; }

/* Fade up */
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.fu1 { animation:fadeUp .5s ease .1s  both; }
.fu2 { animation:fadeUp .5s ease .2s  both; }
.fu3 { animation:fadeUp .5s ease .35s both; }
.fu4 { animation:fadeUp .5s ease .45s both; }
.fu5 { animation:fadeUp .5s ease .55s both; }

/* Stat line */
@keyframes statExpand { to { width:50px; } }
.stat-line {
  display:block; height:1px; width:0; margin:6px auto 0;
  background:linear-gradient(90deg,transparent,#7C6AF7,transparent);
  animation:statExpand 1s ease 1.2s forwards;
}

/* Button */
@keyframes btnGlow { 0%,100%{box-shadow:0 6px 24px rgba(124,106,247,.4)} 50%{box-shadow:0 6px 40px rgba(124,106,247,.7)} }
@keyframes shine   { 0%{left:-100%} 40%,100%{left:150%} }
.btn-primary-hero {
  position:relative; overflow:hidden; cursor:none;
  background:linear-gradient(135deg,#7C6AF7,#A399FF);
  color:#fff; border:none; font-family:"Syne",sans-serif;
  font-weight:700; font-size:14px; padding:14px 32px; border-radius:12px;
  animation:btnGlow 3s ease infinite; transition:transform .2s;
}
.btn-primary-hero:hover { transform:translateY(-2px); }
.btn-primary-hero::before {
  content:""; position:absolute; top:0; left:-100%; width:100%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
  animation:shine 2.5s ease infinite;
}

/* Logo */
@keyframes logoPulse { 0%,100%{box-shadow:0 0 12px rgba(124,106,247,.4)} 50%{box-shadow:0 0 28px rgba(163,153,255,.7)} }
.logo-icon { animation:logoPulse 3s ease infinite; }

/* Skeleton */
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
.skeleton {
  background:linear-gradient(90deg,#1C1C21 25%,#252530 50%,#1C1C21 75%);
  background-size:200% 100%; animation:shimmer 1.8s infinite; border-radius:6px;
}

/* Card */
@keyframes iconFloat { 0%,100%{transform:translateY(0)} 45%{transform:translateY(-4px)} 75%{transform:translateY(2px)} }
@keyframes cardSweep { from{left:-100%} to{left:150%} }
.card-icon-anim { animation:iconFloat 5s ease-in-out infinite; }
.course-card {
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,border-color .3s;
  position:relative; overflow:hidden;
}
.course-card::before {
  content:""; position:absolute; inset:0; border-radius:18px;
  background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(124,106,247,.07),transparent 45%);
  pointer-events:none; opacity:0; transition:opacity .4s;
}
.course-card:hover::before { opacity:1; }
.course-card::after {
  content:""; position:absolute; top:0; left:-100%; width:60%; height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent); pointer-events:none;
}
.course-card:hover::after { animation:cardSweep .6s ease forwards; }
.course-card:hover {
  transform:translateY(-6px) scale(1.015);
  box-shadow:0 20px 50px rgba(0,0,0,.5),0 0 0 1px rgba(124,106,247,.28);
}
.course-card:hover .tag { border-color:rgba(124,106,247,.2)!important; color:rgba(163,153,255,.75)!important; }

/* Reveal */
.reveal       { opacity:0; transform:translateY(28px); transition:opacity .65s ease,transform .65s ease; }
.reveal.in    { opacity:1; transform:none; }
.reveal-child { opacity:0; transform:translateY(18px); transition:opacity .5s ease,transform .5s ease; }
.reveal-child.in { opacity:1; transform:none; }

/* Scrollbar */
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:#0D0D0F; }
::-webkit-scrollbar-thumb { background:#2A2A32; border-radius:3px; }
::-webkit-scrollbar-thumb:hover { background:#7C6AF7; }
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK globals.css" -ForegroundColor Green

# ── components/Motion.tsx ──
[System.IO.File]::WriteAllText("components\Motion.tsx", @'
"use client";
import { useEffect } from "react";

export default function Motion() {
  useEffect(() => {
    // Cursor
    const cur  = document.createElement("div"); cur.id  = "lh-cursor";
    const ring = document.createElement("div"); ring.id = "lh-ring";
    document.body.append(cur, ring);
    let mx=0,my=0,rx=0,ry=0,raf=0;
    const onMove=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+"px";cur.style.top=my+"px";};
    document.addEventListener("mousemove",onMove);
    const tick=()=>{rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+"px";ring.style.top=ry+"px";raf=requestAnimationFrame(tick);};
    tick();

    // Canvas
    const canvas=document.createElement("canvas"); canvas.id="lh-canvas";
    document.body.prepend(canvas);
    const ctx=canvas.getContext("2d")!;
    let W=0,H=0,craf=0;
    const resize=()=>{W=canvas.width=innerWidth;H=canvas.height=innerHeight;};
    resize(); addEventListener("resize",resize);
    const stars=Array.from({length:160},()=>({
      x:Math.random()*innerWidth,y:Math.random()*innerHeight,
      r:Math.random()*.8+.15,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,
      a:Math.random(),va:(Math.random()-.5)*.007
    }));
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){
        const dx=stars[i].x-stars[j].x,dy=stars[i].y-stars[j].y,d=Math.hypot(dx,dy);
        if(d<110){ctx.beginPath();ctx.strokeStyle=`rgba(124,106,247,${.07*(1-d/110)})`;ctx.lineWidth=.5;ctx.moveTo(stars[i].x,stars[i].y);ctx.lineTo(stars[j].x,stars[j].y);ctx.stroke();}
      }
      stars.forEach(s=>{
        s.x=(s.x+s.vx+W)%W;s.y=(s.y+s.vy+H)%H;s.a+=s.va;if(s.a<0||s.a>1)s.va*=-1;
        ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(163,153,255,${s.a*.65})`;ctx.fill();
      });
      craf=requestAnimationFrame(draw);
    };
    draw();

    // Aurora
    const aC=["#7C6AF7","#4F46E5","#6366F1","#8B5CF6","#A399FF"];
    const aEls=aC.map(c=>{
      const el=document.createElement("div");el.className="lh-aurora";
      const sz=220+Math.random()*280,dur=20+Math.random()*22;
      el.style.cssText=`width:${sz}px;height:${sz}px;background:${c};left:${Math.random()*90}vw;top:${Math.random()*90}vh;--tx:${(Math.random()-.5)*500}px;--ty:${(Math.random()-.5)*500}px;--tx2:${(Math.random()-.5)*400}px;--ty2:${(Math.random()-.5)*400}px;--s:${.5+Math.random()*.9};animation-duration:${dur}s;animation-delay:-${Math.random()*dur}s`;
      document.body.appendChild(el);return el;
    });

    // Particles
    const pEls:HTMLElement[]=[];
    const spawnP=()=>{
      const el=document.createElement("div");el.className="lh-particle";
      const sz=2+Math.random()*3.5,dur=7+Math.random()*10,c=Math.random()>.5?"#7C6AF7":"#A399FF";
      el.style.cssText=`width:${sz}px;height:${sz}px;background:${c};left:${Math.random()*100}vw;top:${Math.random()*100}vh;box-shadow:0 0 ${sz*3}px ${c};--dx:${(Math.random()-.5)*180}px;--dy:${-60-Math.random()*140}px;--op:${.25+Math.random()*.4};animation-duration:${dur}s;animation-delay:-${Math.random()*dur}s`;
      document.body.appendChild(el);pEls.push(el);
    };
    for(let i=0;i<30;i++)spawnP();
    const pInt=setInterval(spawnP,700);

    // Typed text
    const typedEl=document.getElementById("typed-text");
    if(typedEl){
      const words=["Actually.","Really.","For real.","Seriously."];
      let wi=0,ci=0,del=false;
      const type=()=>{
        const w=words[wi];
        if(!del){ci++;typedEl.textContent=w.slice(0,ci);if(ci===w.length){setTimeout(()=>{del=true;setTimeout(type,55)},2200);return;}}
        else{ci--;typedEl.textContent=w.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%words.length;}}
        setTimeout(type,del?52:100);
      };
      setTimeout(type,900);
    }

    // Counters
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el=>{
      const to=parseFloat(el.dataset.count!),sfx=el.dataset.sfx||"",dec="dec" in el.dataset;
      let v=0;const inc=to/(1800/16);
      const id=setInterval(()=>{v=Math.min(v+inc,to);el.textContent=(dec?v.toFixed(1):Math.round(v))+sfx;if(v>=to)clearInterval(id);},16);
    });

    // Card glow
    const cfns:Array<{el:HTMLElement,fn:(e:MouseEvent)=>void}>=[];
    document.querySelectorAll<HTMLElement>(".course-card").forEach(card=>{
      const fn=(e:MouseEvent)=>{const r=card.getBoundingClientRect();card.style.setProperty("--mx",(e.clientX-r.left)+"px");card.style.setProperty("--my",(e.clientY-r.top)+"px");};
      card.addEventListener("mousemove",fn);cfns.push({el:card,fn});
    });

    // Scroll reveal
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll(".reveal-child").forEach((c,i)=>setTimeout(()=>c.classList.add("in"),i*120));}});
    },{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

    return ()=>{
      document.removeEventListener("mousemove",onMove);
      cancelAnimationFrame(raf);cancelAnimationFrame(craf);
      clearInterval(pInt);removeEventListener("resize",resize);
      cur.remove();ring.remove();canvas.remove();
      aEls.forEach(el=>el.remove());pEls.forEach(el=>el.remove());
      cfns.forEach(({el,fn})=>el.removeEventListener("mousemove",fn));
      obs.disconnect();
    };
  },[]);

  return null;
}
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK components/Motion.tsx" -ForegroundColor Green

# ── app/page.tsx ──
[System.IO.File]::WriteAllText("app\page.tsx", @'
import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";
import Motion from "@/components/Motion";

export default function Home() {
  const available = courses.filter(c => !c.comingSoon);
  const soon      = courses.filter(c =>  c.comingSoon);
  return (
    <div className="min-h-screen">
      <Motion />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{zIndex:2,position:"relative"}}>
        {/* Orbit rings */}
        <div style={{position:"absolute",top:"50%",left:"50%",pointerEvents:"none",zIndex:0}}>
          <div className="orbit-ring" style={{width:"440px",height:"440px",animation:"spinCW 22s linear infinite"}}>
            <div className="orbit-dot" style={{width:"5px",height:"5px",background:"#7C6AF7",boxShadow:"0 0 10px #7C6AF7"}}/>
          </div>
          <div className="orbit-ring" style={{width:"640px",height:"640px",border:"1px solid rgba(124,106,247,.04)",animation:"spinCCW 36s linear infinite"}}>
            <div className="orbit-dot" style={{width:"4px",height:"4px",background:"#A399FF",boxShadow:"0 0 10px #A399FF"}}/>
          </div>
          <div className="orbit-ring" style={{width:"860px",height:"860px",border:"1px solid rgba(124,106,247,.02)",animation:"spinCW 55s linear infinite"}}>
            <div className="orbit-dot" style={{width:"3px",height:"3px",background:"#C4BBFF"}}/>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center" style={{zIndex:2}}>
          <div className="fu1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright mb-6"
            style={{boxShadow:"0 0 20px rgba(124,106,247,.1)"}}>
            <span className="badge-dot w-1.5 h-1.5 rounded-full bg-accent inline-block"/>
            New: Python Fundamentals is live
          </div>

          <h1 className="fu2 font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6">
            Learn to code.<br/>
            <span className="grad-text" id="typed-text"></span>
            <span className="caret">|</span>
          </h1>

          <p className="fu3 text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Project-based courses built for developers who want to go from{" "}
            <em className="text-white not-italic font-medium">concept</em>{" "}to{" "}
            <em className="text-white not-italic font-medium">shipped</em>{" "}&#8212; fast.
          </p>

          <div className="fu4 flex items-center justify-center gap-4 mb-16">
            <button className="btn-primary-hero">Explore courses</button>
            <button className="text-muted hover:text-white transition-colors text-sm font-medium" style={{cursor:"none",background:"none",border:"none"}}>
              See learning paths &#x2192;
            </button>
          </div>

          <div className="fu5 flex items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="50" data-sfx="K+">50K+</div>
              <div className="text-xs text-muted mt-0.5">Students enrolled</div>
              <span className="stat-line"/>
            </div>
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="4.9" data-sfx="" data-dec>4.9</div>
              <div className="text-xs text-muted mt-0.5">Average rating</div>
              <span className="stat-line" style={{animationDelay:"1.35s"}}/>
            </div>
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="200" data-sfx="+">200+</div>
              <div className="text-xs text-muted mt-0.5">Hours of content</div>
              <span className="stat-line" style={{animationDelay:"1.5s"}}/>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="reveal max-w-7xl mx-auto px-6 pb-24" style={{zIndex:2,position:"relative"}}>
        <div className="reveal-child mb-10">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Available now</h2>
          <p className="text-muted">Jump in and start learning today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {available.map(c=>(
            <div key={c.slug} className="reveal-child"><CourseCard course={c}/></div>
          ))}
        </div>
        {soon.length>0&&(<>
          <div className="reveal-child mb-8">
            <h2 className="font-display font-bold text-2xl text-white mb-2">Coming soon</h2>
            <p className="text-muted text-sm">More courses are on the way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {soon.map(c=>(
              <div key={c.slug} className="reveal-child"><CourseCard course={c}/></div>
            ))}
          </div>
        </>)}
      </section>
    </div>
  );
}
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK app/page.tsx" -ForegroundColor Green

# ── components/CourseCard.tsx ──
[System.IO.File]::WriteAllText("components\CourseCard.tsx", @'
import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="skeleton" style={{height:"48px",width:"48px",borderRadius:"12px"}}/>
      <div className="flex flex-col gap-2">
        <div className="skeleton" style={{height:"18px",width:"68%"}}/>
        <div className="skeleton" style={{height:"13px",width:"100%"}}/>
        <div className="skeleton" style={{height:"13px",width:"55%"}}/>
      </div>
      <div className="flex gap-2">
        <div className="skeleton" style={{height:"22px",width:"64px",borderRadius:"999px"}}/>
        <div className="skeleton" style={{height:"22px",width:"52px",borderRadius:"999px"}}/>
      </div>
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="skeleton" style={{height:"13px",width:"120px"}}/>
        <div className="skeleton" style={{height:"32px",width:"110px",borderRadius:"9px"}}/>
      </div>
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={course.comingSoon ? "#" : `/courses/${course.slug}`} className="block h-full">
      <div className="course-card rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-full" style={{cursor:"none"}}>
        <div className="flex items-start justify-between">
          <div className="card-icon-anim w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:`${course.color}18`}}>
            {course.icon}
          </div>
          {course.comingSoon
            ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface border border-border text-muted">Coming soon</span>
            : <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{background:`${course.color}20`,color:course.color}}>{course.level}</span>
          }
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white leading-tight mb-1">{course.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{course.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {course.tags.map(tag=>(
            <span key={tag} className="tag text-xs font-medium px-2 py-0.5 rounded bg-surface border border-border text-muted transition-colors">{tag}</span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            {!course.comingSoon&&(<>
              <span style={{color:"#FACC15"}}>&#9733;</span>
              <strong className="text-white">{course.rating}</strong>
              <span>&#183; {course.lessons} lessons &#183; {course.duration}</span>
            </>)}
          </div>
          <button className="text-xs font-semibold px-3 py-2 rounded-lg transition-all" style={{
            background:course.comingSoon?"transparent":`${course.color}20`,
            color:course.comingSoon?"#5A5A70":course.color,
            border:`1px solid ${course.comingSoon?"#2A2A32":`${course.color}40`}`,
            cursor:"none"
          }}>
            {course.comingSoon ? "Notify me" : "Start learning \u2192"}
          </button>
        </div>
      </div>
    </Link>
  );
}
'@, [System.Text.Encoding]::UTF8)
Write-Host "OK components/CourseCard.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "Done! Now run:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Cyan
