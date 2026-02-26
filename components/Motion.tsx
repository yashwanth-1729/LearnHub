"use client";
import { useEffect } from "react";
export default function Motion() {
  useEffect(() => {
    // \u2500\u2500 Cursor \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const cur  = document.createElement("div"); cur.id  = "lh-cursor";
    const ring = document.createElement("div"); ring.id = "lh-ring";
    document.body.append(cur, ring);

    let mx=0, my=0, rx=0, ry=0, raf=0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      // Move dot instantly \u2014 no lerp needed for the dot itself
      cur.style.transform = `translate(${mx}px,${my}px)`;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    // Ring lerps separately \u2014 smooth follow effect
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    // \u2500\u2500 Canvas starfield (optimised) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const canvas = document.createElement("canvas");
    canvas.id = "lh-canvas";
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let W = 0, H = 0, craf = 0;
    const resize = () => {
      W = canvas.width  = innerWidth;
      H = canvas.height = innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Fewer stars, larger connect distance reduced \u2014 better FPS
    const STAR_COUNT = 110;
    const CONNECT_DIST = 90;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.006,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Update positions
      for (const s of stars) {
        s.x = (s.x + s.vx + W) % W;
        s.y = (s.y + s.vy + H) % H;
        s.a += s.va;
        if (s.a < 0 || s.a > 1) s.va *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,153,255,${s.a * 0.6})`;
        ctx.fill();
      }

      // Connect lines \u2014 only every 2nd frame for performance
      if (frame % 2 === 0) {
        const DIST2 = CONNECT_DIST * CONNECT_DIST;
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < DIST2) {
              const alpha = (1 - d2 / DIST2) * 0.06;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(124,106,247,${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.stroke();
            }
          }
        }
      }

      craf = requestAnimationFrame(draw);
    };
    draw();

    // \u2500\u2500 Aurora blobs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const COLORS = ["#7C6AF7", "#4F46E5", "#6366F1", "#8B5CF6", "#A399FF"];
    const aEls = COLORS.map(c => {
      const el = document.createElement("div");
      el.className = "lh-aurora";
      const sz  = 200 + Math.random() * 260;
      const dur = 22 + Math.random() * 20;
      el.style.cssText = [
        `width:${sz}px`, `height:${sz}px`, `background:${c}`,
        `left:${Math.random() * 88}vw`, `top:${Math.random() * 88}vh`,
        `--tx:${(Math.random() - 0.5) * 480}px`,
        `--ty:${(Math.random() - 0.5) * 480}px`,
        `--tx2:${(Math.random() - 0.5) * 360}px`,
        `--ty2:${(Math.random() - 0.5) * 360}px`,
        `--s:${0.5 + Math.random() * 0.8}`,
        `animation-duration:${dur}s`,
        `animation-delay:-${Math.random() * dur}s`,
      ].join(";");
      document.body.appendChild(el);
      return el;
    });

    // \u2500\u2500 Floating particles \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const pEls: HTMLElement[] = [];
    const spawnP = () => {
      const el  = document.createElement("div");
      el.className = "lh-particle";
      const sz  = 2 + Math.random() * 3;
      const dur = 8 + Math.random() * 9;
      const c   = Math.random() > 0.5 ? "#7C6AF7" : "#A399FF";
      el.style.cssText = [
        `width:${sz}px`, `height:${sz}px`, `background:${c}`,
        `left:${Math.random() * 100}vw`, `top:${Math.random() * 100}vh`,
        `box-shadow:0 0 ${sz * 3}px ${c}`,
        `--dx:${(Math.random() - 0.5) * 160}px`,
        `--dy:${-60 - Math.random() * 120}px`,
        `--op:${0.2 + Math.random() * 0.35}`,
        `animation-duration:${dur}s`,
        `animation-delay:-${Math.random() * dur}s`,
      ].join(";");
      document.body.appendChild(el);
      pEls.push(el);
    };
    for (let i = 0; i < 25; i++) spawnP();
    const pInt = setInterval(spawnP, 900);

    // \u2500\u2500 Typed text \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const typedEl = document.getElementById("typed-text");
    let typedTimer: ReturnType<typeof setTimeout>;
    if (typedEl) {
      const words = ["Actually.", "Really.", "For real.", "Seriously."];
      let wi = 0, ci = 0, del = false;
      const type = () => {
        const w = words[wi];
        if (!del) {
          ci++;
          typedEl.textContent = w.slice(0, ci);
          if (ci === w.length) { typedTimer = setTimeout(() => { del = true; typedTimer = setTimeout(type, 55); }, 2200); return; }
        } else {
          ci--;
          typedEl.textContent = w.slice(0, ci);
          if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
        }
        typedTimer = setTimeout(type, del ? 52 : 100);
      };
      typedTimer = setTimeout(type, 900);
    }

    // \u2500\u2500 Counters \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    document.querySelectorAll<HTMLElement>("[data-count]").forEach(el => {
      const to  = parseFloat(el.dataset.count!);
      const sfx = el.dataset.sfx || "";
      const dec = "dec" in el.dataset;
      let v = 0;
      const inc = to / (1800 / 16);
      const id = setInterval(() => {
        v = Math.min(v + inc, to);
        el.textContent = (dec ? v.toFixed(1) : Math.round(v)) + sfx;
        if (v >= to) clearInterval(id);
      }, 16);
    });

    // \u2500\u2500 Card glow \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const cfns: Array<{ el: HTMLElement; fn: (e: MouseEvent) => void }> = [];
    document.querySelectorAll<HTMLElement>(".course-card").forEach(card => {
      const fn = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top)  + "px");
      };
      card.addEventListener("mousemove", fn, { passive: true });
      cfns.push({ el: card, fn });
    });

    // \u2500\u2500 Scroll reveal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.querySelectorAll(".reveal-child").forEach((c, i) =>
            setTimeout(() => c.classList.add("in"), i * 110));
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(craf);
      clearInterval(pInt);
      clearTimeout(typedTimer);
      window.removeEventListener("resize", resize);
      cur.remove(); ring.remove(); canvas.remove();
      aEls.forEach(el => el.remove());
      pEls.forEach(el => el.remove());
      cfns.forEach(({ el, fn }) => el.removeEventListener("mousemove", fn));
      obs.disconnect();
    };
  }, []);
  return null;
}