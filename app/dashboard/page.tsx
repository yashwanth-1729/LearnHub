"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getProgress, getCurrentLevel, getNextLevel, getLevelPct,
  getCompletedCount, touchStreak, LEVELS, UserProgress,
} from "@/lib/progress";
import { getCourse } from "@/lib/courses";

const PHASES = [
  { title: "Start Here",         lessons: ["l1","l2"],                              icon: "\uD83C\uDF31", color: "#7C6AF7" },
  { title: "Talking to Python",  lessons: ["l3","l4","l5","l6","l7","l8"],          icon: "\uD83D\uDCAC", color: "#06B6D4" },
  { title: "Making Decisions",   lessons: ["l9","l10","l11","l12"],                 icon: "\uD83E\uDDE0", color: "#10B981" },
  { title: "Functions",          lessons: ["l13","l14","l15","l16","l17"],          icon: "\u26A1",       color: "#F59E0B" },
  { title: "Data Structures",    lessons: ["l18","l19","l20","l21","l22","l23","l24","l25"], icon: "\uD83D\uDCE6", color: "#EF4444" },
  { title: "OOP & Files",        lessons: ["l26","l27","l28","l29","l30","l31"],    icon: "\uD83C\uDFD7\uFE0F", color: "#8B5CF6" },
  { title: "Advanced Python",    lessons: ["l32","l33","l34","l35"],               icon: "\uD83D\uDE80", color: "#EC4899" },
  { title: "Projects",           lessons: ["l36","l37","l38","l39","l40","l41","l42","l43","l44"], icon: "\uD83C\uDFC6", color: "#F97316" },
];

const LEVEL_ICONS: Record<string,string> = {
  seed:"\u1F331", bolt:"\u26A1", brain:"\u1F9E0", wrench:"\u1F527", rocket:"\u1F680", diamond:"\u1F48E"
};

export default function Dashboard() {
  const [p, setP] = useState<UserProgress | null>(null);
  const [nextLesson, setNextLesson] = useState<{id:string;title:string;duration:string} | null>(null);

  useEffect(() => {
    const progress = touchStreak();
    setP(progress);

    // find next incomplete lesson
    const course = getCourse("python-fundamentals");
    if (course) {
      const all = course.modules.flatMap(m => m.lessons);
      const next = all.find(l => !progress.lessons[l.id]?.completed);
      if (next) setNextLesson(next);
    }
  }, []);

  if (!p) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:"#0D0D0F" }}>
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );

  const level   = getCurrentLevel(p.xp);
  const nextLvl = getNextLevel(p.xp);
  const lvlPct  = getLevelPct(p.xp);
  const completed = getCompletedCount(p);

  return (
    <div className="min-h-screen pt-16 px-4 pb-16" style={{ background:"#0D0D0F" }}>
      <div className="max-w-4xl mx-auto py-10 space-y-8">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: level.color }}>
            {LEVEL_ICONS[level.icon]} {level.title}
          </p>
          <h1 className="font-display font-extrabold text-3xl text-white">
            Welcome back!
          </h1>
          <p className="text-sm mt-1" style={{ color:"#8B8FA8" }}>Keep going. Every lesson makes you better.</p>
        </div>

        {/* Level + XP card */}
        <div className="rounded-2xl border p-6"
          style={{ background:"linear-gradient(135deg,#141417,"+level.color+"18)", borderColor: level.color+"40" }}>
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black" style={{ color: level.color }}>
                  Level {level.level}
                </span>
                <span className="text-lg font-bold text-white">{level.title}</span>
              </div>
              <p className="text-sm mt-0.5" style={{ color:"#8B8FA8" }}>
                {p.xp} XP total
                {nextLvl ? ` \u00B7 ${nextLvl.minXP - p.xp} XP to ${nextLvl.title}` : " \u00B7 Max level!"}
              </p>
            </div>
            <div className="text-4xl">{LEVEL_ICONS[level.icon]}</div>
          </div>

          {/* XP bar */}
          <div className="h-3 rounded-full overflow-hidden" style={{ background:"#1C1C24" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: lvlPct+"%", background:"linear-gradient(90deg,"+level.color+","+level.color+"aa)" }} />
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color:"#8B8FA8" }}>
            <span>Level {level.level}</span>
            {nextLvl && <span>Level {nextLvl.level}</span>}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Day Streak", value: p.streak, icon: "\uD83D\uDD25", color: "#F97316" },
            { label: "Completed",  value: completed, icon: "\u2705",       color: "#10B981" },
            { label: "Total XP",   value: p.xp,      icon: "\u2B50",       color: "#F59E0B" },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs" style={{ color:"#8B8FA8" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        {nextLesson && (
          <div>
            <h2 className="font-display font-bold text-lg text-white mb-3">Continue Learning</h2>
            <Link href={"/courses/python-fundamentals/lessons/"+nextLesson.id}
              className="flex items-center justify-between p-5 rounded-2xl border group transition-all hover:border-accent"
              style={{ background:"#111115", borderColor:"#2A2A32", cursor:"none" }}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background:"#7C6AF740" }}>
                  &#9654;
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-accent transition-colors">
                    {nextLesson.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color:"#8B8FA8" }}>
                    {nextLesson.duration} &middot; +50 XP
                  </p>
                </div>
              </div>
              <span className="text-accent text-xl">&#8594;</span>
            </Link>
          </div>
        )}

        {/* Phase progress */}
        <div>
          <h2 className="font-display font-bold text-lg text-white mb-3">Your Roadmap</h2>
          <div className="space-y-3">
            {PHASES.map((phase, i) => {
              const done = phase.lessons.filter(id => p.lessons[id]?.completed).length;
              const total = phase.lessons.length;
              const pct   = total ? (done / total) * 100 : 0;
              const started = done > 0;
              const complete = done === total;
              return (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border"
                  style={{ background:"#111115" }}>
                  <div className="text-2xl w-8 text-center flex-shrink-0">{phase.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-white truncate">{phase.title}</p>
                      <span className="text-xs ml-2 flex-shrink-0" style={{ color:"#8B8FA8" }}>
                        {done}/{total}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"#1C1C24" }}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: pct+"%", background: phase.color }} />
                    </div>
                  </div>
                  {complete && <span style={{ color:"#4ADE80", fontSize:"18px" }}>&#10003;</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Level road */}
        <div>
          <h2 className="font-display font-bold text-lg text-white mb-3">Level Path</h2>
          <div className="flex flex-wrap gap-3">
            {LEVELS.map(lvl => {
              const reached = p.xp >= lvl.minXP;
              const current = lvl.level === level.level;
              return (
                <div key={lvl.level}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all"
                  style={{
                    borderColor: reached ? lvl.color+"60" : "#2A2A32",
                    background:  current ? lvl.color+"15" : reached ? lvl.color+"08" : "#111115",
                    color:       reached ? lvl.color : "#3A3A4A",
                  }}>
                  <span>{LEVEL_ICONS[lvl.icon]}</span>
                  <span>Lv.{lvl.level} {lvl.title}</span>
                  {current && <span className="text-xs opacity-70">(you)</span>}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}