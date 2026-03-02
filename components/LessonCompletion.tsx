"use client";
import { useState, useEffect } from "react";
import { completeLesson, getProgress, getCurrentLevel, getLevelPct } from "@/lib/progress";

const btn = "transition-all duration-150 active:scale-95";

export function LessonCompletion({ lessonId }: { lessonId: string }) {
  const [done,   setDone]   = useState(false);
  const [gained, setGained] = useState(0);
  const [pop,    setPop]    = useState(false);
  const [lvlUp,  setLvlUp]  = useState(false);

  useEffect(() => {
    const p = getProgress();
    setDone(!!p.lessons[lessonId]?.completed);
  }, [lessonId]);

  const handleComplete = () => {
    const prevXP  = getProgress().xp;
    const prevLvl = getCurrentLevel(prevXP).level;
    const { gained } = completeLesson(lessonId, 50);
    if (gained === 0) return;
    const newXP  = getProgress().xp;
    const newLvl = getCurrentLevel(newXP).level;
    setGained(gained);
    setDone(true);
    setPop(true);
    if (newLvl > prevLvl) setLvlUp(true);
    setTimeout(() => { setPop(false); setLvlUp(false); }, 4000);
  };

  return (
    <div className="relative">
      {/* Floating XP pop */}
      {pop && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none"
          style={{ animation: "xpFloat 3s ease forwards" }}>
          <span className="text-2xl font-black" style={{ color: "#7C6AF7" }}>
            +{gained} XP
          </span>
          {lvlUp && (
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "#7C6AF7", color: "#fff" }}>
              LEVEL UP!
            </span>
          )}
        </div>
      )}

      {done ? (
        <div className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: "#4ADE80" }}>
          <span style={{ fontSize: "18px" }}>&#10003;</span>
          Lesson completed! +50 XP earned
        </div>
      ) : (
        <button
          onClick={handleComplete}
          className={`px-6 py-3 rounded-xl font-bold text-sm ${btn} hover:brightness-110`}
          style={{ background: "linear-gradient(135deg,#7C6AF7,#9B8BFF)", color: "#fff", cursor: "none" }}>
          Mark as Complete &nbsp;&#43;50 XP
        </button>
      )}

      <style>{`
        @keyframes xpFloat {
          0%   { opacity:0; transform: translateX(-50%) translateY(0px); }
          20%  { opacity:1; transform: translateX(-50%) translateY(-8px); }
          80%  { opacity:1; transform: translateX(-50%) translateY(-20px); }
          100% { opacity:0; transform: translateX(-50%) translateY(-30px); }
        }
      `}</style>
    </div>
  );
}