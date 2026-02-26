# ── Create folders ──
New-Item -ItemType Directory -Force -Path "app\about" | Out-Null
New-Item -ItemType Directory -Force -Path "app\courses\[slug]" | Out-Null
New-Item -ItemType Directory -Force -Path "components" | Out-Null
New-Item -ItemType Directory -Force -Path "lib" | Out-Null
Write-Host "Folders created..." -ForegroundColor Cyan

# ── tailwind.config.ts ──
Set-Content -Path "tailwind.config.ts" -Encoding UTF8 -Value @'
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'","sans-serif"],
        body:    ["'DM Sans'","sans-serif"],
        mono:    ["'JetBrains Mono'","monospace"],
      },
      colors: {
        ink:            "#0D0D0F",
        surface:        "#141417",
        card:           "#1C1C21",
        border:         "#2A2A32",
        muted:          "#5A5A70",
        accent:         "#7C6AF7",
        "accent-bright":"#A399FF",
        "accent-glow":  "rgba(124,106,247,0.15)",
        success:        "#4ADE80",
      },
    },
  },
  plugins: [],
};
export default config;
'@
Write-Host "OK tailwind.config.ts" -ForegroundColor Green

# ── app/globals.css ──
Set-Content -Path "app\globals.css" -Encoding UTF8 -Value @'
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
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg,#1C1C21 25%,#252530 50%,#1C1C21 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s infinite;
  border-radius: 6px;
}
@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
.fade-up { animation: fadeUp 0.5s ease forwards; }
.fade-up-delay-1 { animation-delay:0.1s; opacity:0; }
.fade-up-delay-2 { animation-delay:0.2s; opacity:0; }
.fade-up-delay-3 { animation-delay:0.3s; opacity:0; }
.fade-up-delay-4 { animation-delay:0.4s; opacity:0; }

.course-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,.4), 0 0 0 1px rgba(124,106,247,.3);
}
::-webkit-scrollbar { width:6px; }
::-webkit-scrollbar-track { background:#0D0D0F; }
::-webkit-scrollbar-thumb { background:#2A2A32; border-radius:3px; }
::-webkit-scrollbar-thumb:hover { background:#7C6AF7; }
'@
Write-Host "OK app/globals.css" -ForegroundColor Green

# ── app/layout.tsx ──
Set-Content -Path "app\layout.tsx" -Encoding UTF8 -Value @'
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LearnHub — Master New Skills",
  description: "A modern learning platform for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
'@
Write-Host "OK app/layout.tsx" -ForegroundColor Green

# ── app/not-found.tsx ──
Set-Content -Path "app\not-found.tsx" -Encoding UTF8 -Value @'
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-6">404</div>
      <h1 className="font-display font-bold text-3xl text-white mb-3">Page not found</h1>
      <p className="text-muted mb-8">This page does not exist yet.</p>
      <Link href="/" className="bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-accent-bright transition-colors">
        Back to courses
      </Link>
    </div>
  );
}
'@
Write-Host "OK app/not-found.tsx" -ForegroundColor Green

# ── lib/courses.ts ──
Set-Content -Path "lib\courses.ts" -Encoding UTF8 -Value @'
export type Lesson = { id:string; title:string; duration:string; free?:boolean };
export type Module = { id:string; title:string; lessons:Lesson[] };
export type Course = {
  slug:string; title:string; tagline:string; description:string;
  instructor:string; instructorRole:string;
  level:"Beginner"|"Intermediate"|"Advanced";
  duration:string; lessons:number; rating:number; students:number;
  tags:string[]; color:string; icon:string; comingSoon?:boolean;
  modules:Module[];
};

export const courses: Course[] = [
  {
    slug:"python-fundamentals", title:"Python Fundamentals", tagline:"From zero to Pythonista",
    description:"Learn Python from the ground up. Variables, control flow, functions, data structures, OOP, file I/O, and a final real-world project.",
    instructor:"Arjun Mehta", instructorRole:"Senior Engineer @ Google",
    level:"Beginner", duration:"12h 30m", lessons:48, rating:4.9, students:18400,
    tags:["Python","Programming","Backend"], color:"#FFD43B", icon:"🐍",
    modules:[
      { id:"m1", title:"Getting Started", lessons:[
        {id:"l1",title:"Welcome & Setup",duration:"5m",free:true},
        {id:"l2",title:"Your First Python Script",duration:"8m",free:true},
        {id:"l3",title:"How Python Works",duration:"7m",free:true},
      ]},
      { id:"m2", title:"Core Concepts", lessons:[
        {id:"l4",title:"Variables & Data Types",duration:"12m"},
        {id:"l5",title:"Strings & String Methods",duration:"14m"},
        {id:"l6",title:"Numbers & Math Operations",duration:"10m"},
        {id:"l7",title:"Booleans & Comparisons",duration:"9m"},
      ]},
      { id:"m3", title:"Control Flow", lessons:[
        {id:"l8",title:"If / Elif / Else",duration:"11m"},
        {id:"l9",title:"For Loops",duration:"13m"},
        {id:"l10",title:"While Loops",duration:"10m"},
        {id:"l11",title:"Break, Continue & Pass",duration:"8m"},
      ]},
      { id:"m4", title:"Functions & Scope", lessons:[
        {id:"l12",title:"Defining Functions",duration:"12m"},
        {id:"l13",title:"Arguments & Return Values",duration:"14m"},
        {id:"l14",title:"Lambda Functions",duration:"9m"},
        {id:"l15",title:"Scope & Closures",duration:"13m"},
      ]},
      { id:"m5", title:"Data Structures", lessons:[
        {id:"l16",title:"Lists & List Comprehensions",duration:"16m"},
        {id:"l17",title:"Tuples",duration:"9m"},
        {id:"l18",title:"Dictionaries",duration:"15m"},
        {id:"l19",title:"Sets",duration:"10m"},
      ]},
      { id:"m6", title:"Object-Oriented Python", lessons:[
        {id:"l20",title:"Classes & Objects",duration:"18m"},
        {id:"l21",title:"Inheritance",duration:"14m"},
        {id:"l22",title:"Magic Methods",duration:"12m"},
        {id:"l23",title:"Dataclasses",duration:"10m"},
      ]},
      { id:"m7", title:"File I/O & Error Handling", lessons:[
        {id:"l24",title:"Reading & Writing Files",duration:"13m"},
        {id:"l25",title:"Working with JSON",duration:"11m"},
        {id:"l26",title:"Try / Except / Finally",duration:"12m"},
        {id:"l27",title:"Custom Exceptions",duration:"9m"},
      ]},
      { id:"m8", title:"Final Project", lessons:[
        {id:"l28",title:"Building a CLI Todo App",duration:"30m"},
        {id:"l29",title:"Adding File Persistence",duration:"20m"},
        {id:"l30",title:"Code Review & Wrap-up",duration:"15m"},
      ]},
    ],
  },
  { slug:"javascript-modern", title:"Modern JavaScript", tagline:"ES6+ and beyond",
    description:"Deep dive into modern JS — async/await, modules, closures, and the event loop.",
    instructor:"Sofia Reyes", instructorRole:"Frontend Lead @ Vercel",
    level:"Intermediate", duration:"10h 00m", lessons:36, rating:4.8, students:0,
    tags:["JavaScript","Frontend","Web"], color:"#F7DF1E", icon:"⚡", comingSoon:true, modules:[] },
  { slug:"react-in-depth", title:"React In Depth", tagline:"Hooks, patterns & performance",
    description:"Master React from hooks to advanced patterns with real-world projects.",
    instructor:"Kai Nakamura", instructorRole:"Staff Engineer @ Stripe",
    level:"Intermediate", duration:"14h 00m", lessons:52, rating:4.9, students:0,
    tags:["React","Frontend","TypeScript"], color:"#61DAFB", icon:"⚛️", comingSoon:true, modules:[] },
  { slug:"sql-mastery", title:"SQL Mastery", tagline:"Query anything, anywhere",
    description:"From SELECT to window functions — become fluent in SQL for any database.",
    instructor:"Priya Sharma", instructorRole:"Data Engineer @ Netflix",
    level:"Beginner", duration:"8h 00m", lessons:30, rating:4.7, students:0,
    tags:["SQL","Database","Backend"], color:"#4ADE80", icon:"🗄️", comingSoon:true, modules:[] },
];

export function getCourse(slug:string): Course|undefined {
  return courses.find(c => c.slug === slug);
}
'@
Write-Host "OK lib/courses.ts" -ForegroundColor Green

# ── components/Navbar.tsx ──
Set-Content -Path "components\Navbar.tsx" -Encoding UTF8 -Value @'
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm font-display">L</div>
          <span className="font-display font-bold text-lg text-white tracking-tight">LearnHub</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"      className="text-muted hover:text-white text-sm font-medium transition-colors">Courses</Link>
          <Link href="#"      className="text-muted hover:text-white text-sm font-medium transition-colors">Paths</Link>
          <Link href="#"      className="text-muted hover:text-white text-sm font-medium transition-colors">Community</Link>
          <Link href="/about" className="text-muted hover:text-white text-sm font-medium transition-colors">About</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-muted hover:text-white transition-colors font-medium px-4 py-2">Sign in</button>
          <button className="text-sm bg-accent hover:bg-accent-bright transition-colors text-white font-semibold px-4 py-2 rounded-lg">Get started</button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted hover:text-white p-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-4">
          <Link href="/"      className="text-sm text-white font-medium" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="#"      className="text-sm text-muted"             onClick={() => setOpen(false)}>Paths</Link>
          <Link href="#"      className="text-sm text-muted"             onClick={() => setOpen(false)}>Community</Link>
          <Link href="/about" className="text-sm text-muted"             onClick={() => setOpen(false)}>About</Link>
          <hr className="border-border"/>
          <button className="text-sm text-white font-semibold bg-accent rounded-lg py-2 px-4">Get started</button>
        </div>
      )}
    </nav>
  );
}
'@
Write-Host "OK components/Navbar.tsx" -ForegroundColor Green

# ── components/CourseCard.tsx ──
Set-Content -Path "components\CourseCard.tsx" -Encoding UTF8 -Value @'
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
    <Link href={course.comingSoon ? "#" : `/courses/${course.slug}`}>
      <div className="course-card rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-full cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background:`${course.color}18` }}>
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
            <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded bg-surface border border-border text-muted">{tag}</span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted">
            {!course.comingSoon && (
              <><span className="text-yellow-400">★</span><strong className="text-white">{course.rating}</strong><span>· {course.lessons} lessons · {course.duration}</span></>
            )}
          </div>
          <button className="text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ background:course.comingSoon?"transparent":`${course.color}20`, color:course.comingSoon?"#5A5A70":course.color, border:`1px solid ${course.comingSoon?"#2A2A32":`${course.color}40`}` }}>
            {course.comingSoon ? "Notify me" : "Start learning →"}
          </button>
        </div>
      </div>
    </Link>
  );
}
'@
Write-Host "OK components/CourseCard.tsx" -ForegroundColor Green

# ── app/page.tsx ──
Set-Content -Path "app\page.tsx" -Encoding UTF8 -Value @'
import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default function Home() {
  const available = courses.filter(c => !c.comingSoon);
  const soon      = courses.filter(c =>  c.comingSoon);
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background:"radial-gradient(ellipse,#7C6AF7 0%,transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="fade-up fade-up-delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            New: Python Fundamentals is live
          </div>
          <h1 className="fade-up fade-up-delay-2 font-display font-extrabold text-5xl md:text-7xl text-white leading-[1.05] tracking-tight mb-6">
            Learn to code.{" "}
            <span style={{ background:"linear-gradient(135deg,#7C6AF7,#A399FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Actually.
            </span>
          </h1>
          <p className="fade-up fade-up-delay-3 text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Project-based courses built for developers who want to go from{" "}
            <em className="text-white not-italic font-medium">concept</em> to{" "}
            <em className="text-white not-italic font-medium">shipped</em> — fast.
          </p>
          <div className="fade-up fade-up-delay-4 flex items-center justify-center gap-4 mb-16">
            <button className="bg-accent hover:bg-accent-bright transition-colors text-white font-bold px-8 py-3.5 rounded-xl font-display">Explore courses</button>
            <button className="text-muted hover:text-white transition-colors text-sm font-medium">See learning paths →</button>
          </div>
          <div className="flex items-center justify-center gap-10 md:gap-16">
            {[["50K+","Students enrolled"],["4.9","Average rating"],["200+","Hours of content"]].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="font-display font-extrabold text-2xl text-white">{v}</div>
                <div className="text-xs text-muted mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Available now</h2>
          <p className="text-muted">Jump in and start learning today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {available.map(c => <CourseCard key={c.slug} course={c} />)}
        </div>
        {soon.length > 0 && (<>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl text-white mb-2">Coming soon</h2>
            <p className="text-muted text-sm">More courses are on the way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {soon.map(c => <CourseCard key={c.slug} course={c} />)}
          </div>
        </>)}
      </section>
    </div>
  );
}
'@
Write-Host "OK app/page.tsx" -ForegroundColor Green

# ── app/about/page.tsx ──
Set-Content -Path "app\about\page.tsx" -Encoding UTF8 -Value @'
import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — LearnHub" };

const cards = [
  { icon:"👨‍💻", label:"Developer",   value:"Yashwanth Raj Cherukuru" },
  { icon:"🎓",   label:"Institution", value:"KL University" },
  { icon:"🤖",   label:"Powered by",  value:"Claude by Anthropic" },
  { icon:"🚀",   label:"Version",     value:"v1.0.0 — 2025" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright tracking-wider uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          About this project
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Built with curiosity.<br/>
          <span style={{ background:"linear-gradient(135deg,#7C6AF7,#A399FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Shipped with Claude.
          </span>
        </h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl mx-auto mb-12">
          LearnHub was designed and developed by{" "}
          <strong className="text-white font-semibold">Yashwanth Raj Cherukuru</strong>,
          a student at <strong className="text-white font-semibold">KL University</strong>,
          as an exploration of what modern, production-grade interfaces can look like when a developer
          orchestrates <strong className="text-white font-semibold">Claude (by Anthropic)</strong> as a
          creative and engineering partner. Every component, animation, and interaction was conceived
          and refined through a collaborative conversation with AI — demonstrating that the boundary
          between idea and finished product is thinner than ever.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cards.map(c => (
            <div key={c.label} className="bg-card border border-border rounded-2xl p-5 text-left">
              <div className="text-xl mb-3">{c.icon}</div>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">{c.label}</div>
              <div className="text-sm font-semibold text-white font-display">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4 hover:border-accent transition-colors">
          <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-lg">✉️</div>
          <div className="text-left">
            <div className="text-xs text-muted mb-1">Get in touch</div>
            <a href="mailto:yashwanth.dev.builds@gmail.com" className="text-sm font-semibold text-accent-bright hover:underline font-mono">
              yashwanth.dev.builds@gmail.com
            </a>
          </div>
        </div>
        <p className="mt-16 text-xs text-muted/40 tracking-wide">
          LearnHub v1.0.0 · Built with Next.js · Orchestrated with Claude · © 2025 Yashwanth Raj Cherukuru
        </p>
      </div>
    </div>
  );
}
'@
Write-Host "OK app/about/page.tsx" -ForegroundColor Green

# ── app/courses/[slug]/page.tsx ──
Set-Content -Path "app\courses\[slug]\page.tsx" -Encoding UTF8 -Value @'
import { getCourse, courses } from "@/lib/courses";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return courses.map(c => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: { params:{ slug:string } }): Promise<Metadata> {
  const course = getCourse(params.slug);
  return course ? { title:`${course.title} — LearnHub` } : { title:"Not found" };
}

export default function CoursePage({ params }: { params:{ slug:string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();
  const totalLessons = course.modules.reduce((s,m) => s + m.lessons.length, 0);
  const freeLessons  = course.modules.flatMap(m => m.lessons).filter(l => l.free).length;

  return (
    <div className="min-h-screen pt-16">
      <div className="relative border-b border-border overflow-hidden"
        style={{ background:`linear-gradient(135deg,#141417 0%,${course.color}12 100%)` }}>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background:course.color }} />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background:`${course.color}20` }}>{course.icon}</div>
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" style={{ background:`${course.color}20`, color:course.color }}>{course.level}</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">{course.title}</h1>
            <p className="text-muted text-lg leading-relaxed mb-6">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8">
              <span className="flex items-center gap-1.5"><span className="text-yellow-400">★</span><strong className="text-white">{course.rating}</strong><span>rating</span></span>
              <span>·</span><span><strong className="text-white">{course.students.toLocaleString()}</strong> students</span>
              <span>·</span><span>{course.duration}</span>
              <span>·</span><span>{totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background:`${course.color}50` }}>
                {course.instructor[0]}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{course.instructor}</div>
                <div className="text-xs text-muted">{course.instructorRole}</div>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="text-3xl font-display font-extrabold text-white mb-1">Free</div>
              <p className="text-xs text-muted mb-6">{freeLessons} free lessons · Upgrade for full access</p>
              <button className="w-full py-3.5 rounded-xl font-display font-bold text-sm mb-3 transition-all hover:brightness-110"
                style={{ background:`linear-gradient(135deg,${course.color},${course.color}cc)`, color:"#0D0D0F" }}>
                Start learning — it&apos;s free
              </button>
              <button className="w-full py-3 rounded-xl border border-border text-sm text-muted hover:text-white hover:border-accent transition-colors font-medium">
                Preview course
              </button>
              <ul className="mt-6 space-y-2 text-xs text-muted">
                {[`${totalLessons} video lessons`, `${course.duration} total content`, "Downloadable exercises", "Certificate of completion", "Lifetime access"].map(t => (
                  <li key={t} className="flex items-center gap-2"><span className="text-green-400">✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-display font-bold text-2xl text-white mb-8">Course curriculum</h2>
          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <details key={mod.id} className="group rounded-xl border border-border bg-card overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-surface transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ background:`${course.color}20`, color:course.color }}>{i+1}</span>
                    <span className="font-semibold text-white font-display text-sm">{mod.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{mod.lessons.length} lessons</span>
                    <span className="transition-transform group-open:rotate-180">▾</span>
                  </div>
                </summary>
                <div className="border-t border-border">
                  {mod.lessons.map((lesson, j) => (
                    <div key={lesson.id} className="flex items-center justify-between px-5 py-3 hover:bg-surface transition-colors border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted w-4 text-center">{j+1}</span>
                        {lesson.free ? <span className="text-accent-bright">▶</span> : <span className="text-muted text-sm">🔒</span>}
                        <span className="text-sm text-white">{lesson.title}</span>
                        {lesson.free && <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background:`${course.color}20`, color:course.color }}>Free</span>}
                      </div>
                      <span className="text-xs text-muted font-mono">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-bold text-white mb-4">What you&apos;ll learn</h3>
            <ul className="space-y-2 text-sm text-muted">
              {["Core Python syntax and data types","Control flow and functions","Object-oriented programming","File I/O and error handling","Build a real CLI project"].map(t => (
                <li key={t} className="flex items-start gap-2"><span className="text-green-400 mt-0.5">✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-bold text-white mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border bg-surface text-muted">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'@
Write-Host "OK app/courses/[slug]/page.tsx" -ForegroundColor Green

Write-Host ""
Write-Host "All files created! Now run: npm run dev" -ForegroundColor Yellow
