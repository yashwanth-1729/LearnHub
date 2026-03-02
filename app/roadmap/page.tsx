"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getProgress, UserProgress } from "@/lib/progress";

const PHASES = [
  {
    phase: 0, title: "Understanding the Machine", icon: "\uD83E\uDDE0",
    color: "#7C6AF7", goal: "Remove fear. Build a mental model of what a computer is.",
    lessons: [
      { id:"l1", title:"What Is a Computer?",     duration:"5m"  },
      { id:"l2", title:"How Python Runs",          duration:"6m"  },
    ],
    milestone: "Run your first Python program",
  },
  {
    phase: 1, title: "Talking to Python", icon: "\uD83D\uDCAC",
    color: "#06B6D4", goal: "Learn to communicate with the computer using Python.",
    lessons: [
      { id:"l3",  title:"Your First Python Program", duration:"8m"  },
      { id:"l4",  title:"Variables",                 duration:"12m" },
      { id:"l5",  title:"Data Types",                duration:"11m" },
      { id:"l6",  title:"String Basics",             duration:"10m" },
      { id:"l7",  title:"Numbers and Math",          duration:"9m"  },
      { id:"l8",  title:"Getting User Input",        duration:"8m"  },
    ],
    milestone: "Build an interactive personal info program",
  },
  {
    phase: 2, title: "Making Decisions", icon: "\uD83D\uDD00",
    color: "#10B981", goal: "Teach the computer to choose different paths.",
    lessons: [
      { id:"l9",  title:"Comparison Operators", duration:"8m"  },
      { id:"l10", title:"if / elif / else",     duration:"11m" },
      { id:"l11", title:"Logical Operators",    duration:"9m"  },
      { id:"l12", title:"Nested Conditions",    duration:"10m" },
    ],
    milestone: "Build a grading system",
  },
  {
    phase: 3, title: "Repeating Work", icon: "\uD83D\uDD01",
    color: "#F59E0B", goal: "Make the computer do the same thing many times automatically.",
    lessons: [
      { id:"l13", title:"while Loops",      duration:"10m" },
      { id:"l14", title:"for Loops",        duration:"11m" },
      { id:"l15", title:"range()",          duration:"8m"  },
      { id:"l16", title:"break and continue", duration:"9m" },
    ],
    milestone: "Build the number guessing game",
  },
  {
    phase: 4, title: "Functions", icon: "\u26A1",
    color: "#EF4444", goal: "Package reusable logic so you stop repeating yourself.",
    lessons: [
      { id:"l17", title:"Writing Functions",       duration:"12m" },
      { id:"l18", title:"Parameters & Arguments",  duration:"11m" },
      { id:"l19", title:"Return Values",           duration:"10m" },
      { id:"l20", title:"Scope",                   duration:"9m"  },
    ],
    milestone: "Build a modular calculator",
  },
  {
    phase: 5, title: "Managing Data", icon: "\uD83D\uDCE6",
    color: "#8B5CF6", goal: "Store and organise collections of information.",
    lessons: [
      { id:"l21", title:"Lists",              duration:"11m" },
      { id:"l22", title:"List Methods",       duration:"10m" },
      { id:"l23", title:"Tuples & Sets",      duration:"10m" },
      { id:"l24", title:"Dictionaries",       duration:"12m" },
      { id:"l25", title:"When to Use Which",  duration:"9m"  },
    ],
    milestone: "Build a contact manager",
  },
  {
    phase: 6, title: "OOP, Files & Errors", icon: "\uD83C\uDFD7\uFE0F",
    color: "#EC4899", goal: "Write professional-grade Python with classes and error handling.",
    lessons: [
      { id:"l26", title:"Classes and Objects",  duration:"15m" },
      { id:"l27", title:"Inheritance",          duration:"13m" },
      { id:"l28", title:"Special Methods",      duration:"11m" },
      { id:"l29", title:"Reading Files",        duration:"12m" },
      { id:"l30", title:"Error Handling",       duration:"12m" },
      { id:"l31", title:"Modules & pip",        duration:"11m" },
    ],
    milestone: "Build the CLI Todo App",
  },
  {
    phase: 7, title: "Advanced Python", icon: "\uD83D\uDE80",
    color: "#F97316", goal: "Master generators, decorators, and the standard library.",
    lessons: [
      { id:"l32", title:"Iterators & Generators", duration:"13m" },
      { id:"l33", title:"Decorators",             duration:"12m" },
      { id:"l34", title:"The Standard Library",   duration:"11m" },
      { id:"l35", title:"Regular Expressions",    duration:"10m" },
    ],
    milestone: "Write a decorator from scratch",
  },
  {
    phase: 8, title: "Real Projects", icon: "\uD83C\uDFC6",
    color: "#4ADE80", goal: "Build things you can actually show people.",
    lessons: [
      { id:"l42", title:"Calculator",         duration:"12m" },
      { id:"l43", title:"Mad Libs",           duration:"10m" },
      { id:"l44", title:"Quiz Game",          duration:"13m" },
      { id:"l38", title:"Number Guessing",    duration:"20m" },
      { id:"l39", title:"Expense Tracker",    duration:"22m" },
      { id:"l40", title:"Grade Manager",      duration:"25m" },
      { id:"l41", title:"Web Scraper",        duration:"30m" },
    ],
    milestone: "Graduate: Python Fundamentals complete",
  },
];

export default function Roadmap() {
  const [p, setP] = useState<UserProgress | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => { setP(getProgress()); }, []);

  const phaseStatus = (phase: typeof PHASES[number]) => {
    if (!p) return { done: 0, total: phase.lessons.length, pct: 0 };
    const done = phase.lessons.filter(l => p.lessons[l.id]?.completed).length;
    return { done, total: phase.lessons.length, pct: done / phase.lessons.length * 100 };
  };

  return (
    <div className="min-h-screen pt-16 pb-16 px-4" style={{ background:"#0D0D0F" }}>
      <div className="max-w-2xl mx-auto py-10">

        <div className="mb-8">
          <h1 className="font-display font-extrabold text-3xl text-white mb-2">
            Python Roadmap
          </h1>
          <p className="text-sm" style={{ color:"#8B8FA8" }}>
            9 phases &middot; Zero to Python Dev &middot; Learn at your own pace
          </p>
        </div>

        <div className="space-y-3">
          {PHASES.map((phase, i) => {
            const { done, total, pct } = phaseStatus(phase);
            const complete  = done === total && total > 0;
            const inProgress = done > 0 && !complete;
            const locked    = i > 0 && phaseStatus(PHASES[i-1]).pct < 50;
            const isOpen    = open === i;

            return (
              <div key={i} className="rounded-2xl border overflow-hidden transition-all"
                style={{ borderColor: isOpen ? phase.color+"50" : "#2A2A32", background:"#111115" }}>

                {/* Phase header */}
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  style={{ cursor:"none" }}
                  onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: phase.color+"20" }}>
                    {locked ? "\uD83D\uDD12" : phase.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: phase.color }}>Phase {phase.phase}</span>
                      {complete  && <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background:"#4ADE8020", color:"#4ADE80" }}>Complete</span>}
                      {inProgress && <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: phase.color+"20", color: phase.color }}>In progress</span>}
                      {locked && <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background:"#2A2A32", color:"#8B8FA8" }}>Locked</span>}
                    </div>
                    <p className="font-bold text-white">{phase.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:"#1C1C24", maxWidth:"200px" }}>
                        <div className="h-full rounded-full"
                          style={{ width:pct+"%", background: phase.color, transition:"width 0.7s ease" }} />
                      </div>
                      <span className="text-xs" style={{ color:"#8B8FA8" }}>{done}/{total}</span>
                    </div>
                  </div>
                  <span className="text-xl transition-transform flex-shrink-0"
                    style={{ color:"#8B8FA8", transform: isOpen ? "rotate(90deg)" : "none" }}>&#8250;</span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t px-5 pb-5" style={{ borderColor:"#2A2A32" }}>
                    <p className="text-sm mt-4 mb-4" style={{ color:"#8B8FA8" }}>{phase.goal}</p>
                    <div className="space-y-2">
                      {phase.lessons.map(lesson => {
                        const done = p?.lessons[lesson.id]?.completed;
                        return (
                          <Link key={lesson.id}
                            href={"/courses/python-fundamentals/lessons/"+lesson.id}
                            className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-accent group"
                            style={{ borderColor: done ? "#4ADE8030" : "#2A2A32",
                                     background: done ? "#0D1A0F" : "#0A0A0D", cursor:"none" }}>
                            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0"
                              style={{ borderColor: done ? "#4ADE80" : "#2A2A32",
                                       background: done ? "#4ADE8020" : "transparent",
                                       color: done ? "#4ADE80" : "#3A3A4A" }}>
                              {done ? "\u2713" : ""}
                            </span>
                            <span className="flex-1 text-sm group-hover:text-white transition-colors"
                              style={{ color: done ? "#4ADE80" : "#C2C5D0" }}>
                              {lesson.title}
                            </span>
                            <span className="text-xs font-mono flex-shrink-0" style={{ color:"#5A5A70" }}>
                              {lesson.duration}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 p-3 rounded-xl border" style={{ borderColor:"#2A2A32", background:"#0D0D0F" }}>
                      <p className="text-xs font-bold mb-0.5" style={{ color: phase.color }}>
                        \uD83C\uDFC6 Phase Milestone
                      </p>
                      <p className="text-sm" style={{ color:"#C2C5D0" }}>{phase.milestone}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}