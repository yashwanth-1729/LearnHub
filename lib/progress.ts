"use client";

export interface LessonProgress {
  completed: boolean;
  xpEarned: number;
  quizScore?: number;
  completedAt?: string;
}

export interface UserProgress {
  xp: number;
  lessons: Record<string, LessonProgress>;
  streak: number;
  lastStudiedDate: string;
  totalDaysStudied: number;
  onboardingDone: boolean;
  learningGoal: string;
}

const KEY = "lh_progress_v2";

export const LEVELS = [
  { level: 1, title: "Python Rookie",    minXP: 0,    color: "#7C6AF7", icon: "seed"     },
  { level: 2, title: "Logic Builder",    minXP: 200,  color: "#06B6D4", icon: "bolt"     },
  { level: 3, title: "Data Thinker",     minXP: 500,  color: "#10B981", icon: "brain"    },
  { level: 4, title: "Function Crafter", minXP: 1000, color: "#F59E0B", icon: "wrench"   },
  { level: 5, title: "Python Dev",       minXP: 2000, color: "#EF4444", icon: "rocket"   },
  { level: 6, title: "Code Architect",   minXP: 3500, color: "#8B5CF6", icon: "diamond"  },
] as const;

export type Level = typeof LEVELS[number];

const DEFAULT: UserProgress = {
  xp: 0, lessons: {}, streak: 0,
  lastStudiedDate: "", totalDaysStudied: 0,
  onboardingDone: false, learningGoal: "general",
};

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch { return { ...DEFAULT }; }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

export function getCurrentLevel(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getNextLevel(xp: number): Level | null {
  const cur = getCurrentLevel(xp);
  const idx = LEVELS.findIndex(l => l.level === cur.level);
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

export function getLevelPct(xp: number): number {
  const cur = getCurrentLevel(xp);
  const nxt = getNextLevel(xp);
  if (!nxt) return 100;
  return Math.min(100, ((xp - cur.minXP) / (nxt.minXP - cur.minXP)) * 100);
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export function touchStreak(): UserProgress {
  const p = getProgress();
  const today = todayStr();
  if (p.lastStudiedDate === today) return p;
  p.streak = p.lastStudiedDate === yesterdayStr() ? p.streak + 1 : 1;
  p.lastStudiedDate = today;
  p.totalDaysStudied += 1;
  saveProgress(p);
  return p;
}

export function completeLesson(
  lessonId: string, xp: number, quizScore?: number
): { progress: UserProgress; gained: number } {
  const p = touchStreak();
  if (p.lessons[lessonId]?.completed) return { progress: p, gained: 0 };
  p.xp += xp;
  p.lessons[lessonId] = {
    completed: true, xpEarned: xp, quizScore,
    completedAt: new Date().toISOString(),
  };
  saveProgress(p);
  return { progress: p, gained: xp };
}

export function getCompletedCount(p: UserProgress): number {
  return Object.values(p.lessons).filter(l => l.completed).length;
}