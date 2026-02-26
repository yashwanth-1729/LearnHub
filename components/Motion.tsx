"use client";
import { useEffect } from "react";
export default function Motion() {
  useEffect(() => {
    const cur = document.createElement("div"); cur.id = "lh-cursor";
    const ring = document.createElement("div"); ring.id = "lh-ring";
    document.body.append(cur, ring);
    let mx=0,my=0,rx=0,ry=0,raf=0;
    const onMove=(e:MouseEvent)=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+"px";cur.style.top=my+"px";};
    document.addEventListener("mousemove",onMove);
    const tick=()=>{rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+"px";ring.style.top=ry+"px";raf=requestAnimationFrame(tick);};
    tick();
    const canvas=document.createElement("canvas"); canvas.id="lh-canvas";
    document.body.prepend(canvas);
    const ctx=canvas.getContext("2d")!;
    let W=0,H=0,craf=0;
    const resize=()=>{W=canvas.width=innerWidth;H=canvas.height=innerHeight;};
    resize(); addEventListener("resize",resize);
    const stars=Array.from({length:160},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*.8+.15,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,a:Math.random(),va:(Math.random()-.5)*.007}));
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){const dx=stars[i].x-stars[j].x,dy=stars[i].y-stars[j].y,d=Math.hypot(dx,dy);if(d<110){ctx.beginPath();ctx.strokeStyle=`rgba(124,106,247,${.07*(1-d/110)})`;ctx.lineWidth=.5;ctx.moveTo(stars[i].x,stars[i].y);ctx.lineTo(stars[j].x,stars[j].y);ctx.stroke();}}
      stars.forEach(s=>{s.x=(s.x+s.vx+W)%W;s.y=(s.y+s.vy+H)%H;s.a+=s.va;if(s.a<0||s.a>1)s.va*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(163,153,255,${s.a*.65})`;ctx.fill();});
      craf=requestAnimationFrame(draw);
    };
    draw();
    const aC=["#7C6AF7","#4F46E5","#6366F1","#8B5CF6","#A399FF"];
    const aEls=aC.map(c=>{const el=document.createElement("div");el.className="lh-aurora";const sz=220+Math.random()*280,dur=20+Math.random()*22;el.style.cssText=`width:${sz}px;height:${sz}px;background:${c};left:${Math.random()*90}vw;top:${Math.random()*90}vh;--tx:${(Math.random()-.5)*500}px;--ty:${(Math.random()-.5)*500}px;--tx2:${(Math.random()-.5)*400}px;--ty2:${(Math.random()-.5)*400}px;--s:${.5+Math.random()*.9};animation-duration:${dur}s;animation-delay:-${Math.random()*dur}s`;document.body.appendChild(el);return el;});
    const pEls:HTMLElement[]=[];
    const spawnP=()=>{const el=document.createElement("div");el.className="lh-particle";const sz=2+Math.random()*3.5,dur=7+Math.random()*10,c=Math.random()>.5?"#7C6AF7":"#A399FF";el.style.cssText=`width:${sz}px;height:${sz}px;background:${c};left:${Math.random()*100}vw;top:${Math.random()*100}vh;box-shadow:0 0 ${sz*3}px ${c};--dx:${(Math.random()-.5)*180}px;--dy:${-60-Math.random()*140}px;--op:${.25+Math.random()*.4};animation-duration:${dur}s;animation-delay:-${Math.random()*dur}s`;document.body.appendChild(el);pEls.push(el);};
    for(let i=0;i<30;i++)spawnP();
    const pInt=setInterval(spawnP,700);
    const typedEl=document.getElementById("typed-text");
    if(typedEl){const words=["Actually.","Really.","For real.","Seriously."];let wi=0,ci=0,del=false;const type=()=>{const w=words[wi];if(!del){ci++;typedEl.textContent=w.slice(0,ci);if(ci===w.length){setTimeout(()=>{del=true;setTimeout(type,55)},2200);return;}}else{ci--;typedEl.textContent=w.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%words.length;}}setTimeout(type,del?52:100);};setTimeout(type,900);}
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el=>{const to=parseFloat(el.dataset.count!),sfx=el.dataset.sfx||"",dec="dec" in el.dataset;let v=0;const inc=to/(1800/16);const id=setInterval(()=>{v=Math.min(v+inc,to);el.textContent=(dec?v.toFixed(1):Math.round(v))+sfx;if(v>=to)clearInterval(id);},16);});
    const cfns:Array<{el:HTMLElement,fn:(e:MouseEvent)=>void}>=[];
    document.querySelectorAll<HTMLElement>(".course-card").forEach(card=>{const fn=(e:MouseEvent)=>{const r=card.getBoundingClientRect();card.style.setProperty("--mx",(e.clientX-r.left)+"px");card.style.setProperty("--my",(e.clientY-r.top)+"px");};card.addEventListener("mousemove",fn);cfns.push({el:card,fn});});
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll(".reveal-child").forEach((c,i)=>setTimeout(()=>c.classList.add("in"),i*120));}});},{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return ()=>{document.removeEventListener("mousemove",onMove);cancelAnimationFrame(raf);cancelAnimationFrame(craf);clearInterval(pInt);removeEventListener("resize",resize);cur.remove();ring.remove();canvas.remove();aEls.forEach(el=>el.remove());pEls.forEach(el=>el.remove());cfns.forEach(({el,fn})=>el.removeEventListener("mousemove",fn));obs.disconnect();};
  },[]);
  return null;
}