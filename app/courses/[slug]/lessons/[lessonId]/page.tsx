"use client";
import { getCourse } from "@/lib/courses";
import { getLessonContent } from "@/lib/lesson-content";
import { getLessonContent2 } from "@/lib/lesson-content-2";
import type { LessonContent2, QuizQuestion } from "@/lib/lesson-content-2";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// \u2500\u2500 Quiz components \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function McqQuestion({ q, idx, submitted, answer, onAnswer, color }: {
  q: Extract<QuizQuestion, {type:"mcq"}>; idx: number; submitted: boolean;
  answer: number | undefined; onAnswer: (i: number) => void; color: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-white">{idx+1}. {q.q}</p>
      {q.options.map((opt, oi) => {
        const selected = answer === oi;
        const correct  = oi === q.answer;
        let bg = "transparent"; let border = "rgba(42,42,50,1)"; let col = "#5A5A70";
        if (submitted) {
          if (correct)           { bg="rgba(74,222,128,.1)";  border="rgba(74,222,128,.4)"; col="#4ADE80"; }
          else if (selected)     { bg="rgba(239,68,68,.08)";  border="rgba(239,68,68,.3)";  col="#F87171"; }
        } else if (selected)     { bg=`${color}15`;           border=color;                 col="#fff"; }
        return (
          <button key={oi} onClick={() => !submitted && onAnswer(oi)}
            className="w-full text-left px-4 py-3 rounded-xl border text-sm transition-all"
            style={{ cursor:"none", background:bg, borderColor:border, color:col }}>
            <span className="mr-2 font-mono text-xs opacity-60">{String.fromCharCode(65+oi)}.</span>
            {opt}
            {submitted && correct  && " \u2713"}
            {submitted && selected && !correct && " \u2717"}
          </button>
        );
      })}
      {submitted && <p className="text-xs text-muted pl-2 pt-1 italic">{q.explanation}</p>}
    </div>
  );
}

function TrueFalseQuestion({ q, idx, submitted, answer, onAnswer, color }: {
  q: Extract<QuizQuestion, {type:"truefalse"}>; idx: number; submitted: boolean;
  answer: boolean | undefined; onAnswer: (v: boolean) => void; color: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-white">{idx+1}. {q.q}</p>
      <div className="flex gap-3">
        {([true, false] as boolean[]).map(v => {
          const selected = answer === v;
          const correct  = v === q.answer;
          let bg = "transparent"; let border = "rgba(42,42,50,1)"; let col = "#5A5A70";
          if (submitted) {
            if (correct)       { bg="rgba(74,222,128,.1)"; border="rgba(74,222,128,.4)"; col="#4ADE80"; }
            else if (selected) { bg="rgba(239,68,68,.08)"; border="rgba(239,68,68,.3)";  col="#F87171"; }
          } else if (selected) { bg=`${color}15`;          border=color;                 col="#fff"; }
          return (
            <button key={String(v)} onClick={() => !submitted && onAnswer(v)}
              className="flex-1 py-3 rounded-xl border text-sm font-semibold transition-all"
              style={{ cursor:"none", background:bg, borderColor:border, color:col }}>
              {v ? "True" : "False"}
              {submitted && correct  && " \u2713"}
              {submitted && selected && !correct && " \u2717"}
            </button>
          );
        })}
      </div>
      {submitted && <p className="text-xs text-muted pl-2 pt-1 italic">{q.explanation}</p>}
    </div>
  );
}

function FillBlankQuestion({ q, idx, submitted, answer, onAnswer, color }: {
  q: Extract<QuizQuestion, {type:"fillblank"}>; idx: number; submitted: boolean;
  answer: string; onAnswer: (v: string) => void; color: string;
}) {
  const correct = submitted && answer.trim().toLowerCase() === q.answer.toLowerCase();
  const wrong   = submitted && !correct;
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-white">{idx+1}. {q.q}</p>
      <div className="flex items-center gap-2">
        <input value={answer} onChange={e => !submitted && onAnswer(e.target.value)}
          placeholder={submitted ? "" : q.hint}
          className="flex-1 px-4 py-3 rounded-xl border text-sm bg-surface outline-none transition-all"
          style={{
            cursor: submitted ? "default" : "text",
            borderColor: submitted ? (correct ? "rgba(74,222,128,.4)" : "rgba(239,68,68,.3)") : answer ? color : "rgba(42,42,50,1)",
            color: submitted ? (correct ? "#4ADE80" : "#F87171") : "#fff",
          }} />
        {submitted && <span style={{ color: correct ? "#4ADE80" : "#F87171", fontSize:"18px" }}>{correct ? "\u2713" : "\u2717"}</span>}
      </div>
      {submitted && wrong && <p className="text-xs" style={{color:color}}>Correct answer: <strong>{q.answer}</strong></p>}
      {submitted && <p className="text-xs text-muted pl-2 italic">{q.hint}</p>}
    </div>
  );
}

function PredictQuestion({ q, idx, submitted, answer, onAnswer, color }: {
  q: Extract<QuizQuestion, {type:"predict"}>; idx: number; submitted: boolean;
  answer: string; onAnswer: (v: string) => void; color: string;
}) {
  const correct = submitted && answer.trim() === q.answer.trim();
  const wrong   = submitted && !correct;
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-white">{idx+1}. {q.q}</p>
      <pre className="p-3 rounded-xl border border-border text-xs font-mono overflow-x-auto"
        style={{ background:"#0D0D0F", color:"#E8E8F0" }}>{q.code}</pre>
      <div className="flex items-center gap-2">
        <input value={answer} onChange={e => !submitted && onAnswer(e.target.value)}
          placeholder="Type the exact output..."
          className="flex-1 px-4 py-3 rounded-xl border text-sm bg-surface font-mono outline-none transition-all"
          style={{
            cursor: submitted ? "default" : "text",
            borderColor: submitted ? (correct ? "rgba(74,222,128,.4)" : "rgba(239,68,68,.3)") : answer ? color : "rgba(42,42,50,1)",
            color: submitted ? (correct ? "#4ADE80" : "#F87171") : "#fff",
          }} />
        {submitted && <span style={{ color: correct ? "#4ADE80" : "#F87171", fontSize:"18px" }}>{correct ? "\u2713" : "\u2717"}</span>}
      </div>
      {submitted && wrong && <p className="text-xs" style={{color:color}}>Expected: <code className="font-mono">{q.answer}</code></p>}
      {submitted && <p className="text-xs text-muted pl-2 italic">{q.explanation}</p>}
    </div>
  );
}

function QuizBlock({ questions, color, title = "Quick Quiz \uD83D\uDCDD", isChapter = false }: {
  questions: QuizQuestion[]; color: string; title?: string; isChapter?: boolean;
}) {
  const [answers, setAnswers]     = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q, i) => {
    if (q.type === "fillblank" || q.type === "predict") return (answers[i] ?? "").trim().length > 0;
    return answers[i] !== undefined;
  });

  const score = submitted ? questions.filter((q, i) => {
    if (q.type === "mcq")       return answers[i] === q.answer;
    if (q.type === "truefalse") return answers[i] === q.answer;
    if (q.type === "fillblank") return (answers[i]??"").trim().toLowerCase() === q.answer.toLowerCase();
    if (q.type === "predict")   return (answers[i]??"").trim() === q.answer.trim();
    return false;
  }).length : 0;

  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${isChapter ? "border-2" : "border-border bg-card"}`}
      style={isChapter ? { borderColor: `${color}40`, background: `${color}06` } : {}}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-white">{title}</h2>
          {isChapter && <p className="text-xs text-muted mt-1">Test your understanding of the entire module</p>}
        </div>
        <span className="text-xs text-muted bg-surface border border-border px-3 py-1.5 rounded-lg">
          {questions.length} questions &#183; {questions.filter(q=>q.type==="mcq").length} MCQ &#183; {questions.filter(q=>q.type==="truefalse").length} T/F &#183; {questions.filter(q=>q.type==="fillblank"||q.type==="predict").length} typed
        </span>
      </div>

      <div className="space-y-8">
        {questions.map((q, i) => {
          const props = { idx: i, submitted, color };
          if (q.type === "mcq")
            return <McqQuestion key={i} q={q} answer={answers[i]} onAnswer={v => setAnswers(a=>({...a,[i]:v}))} {...props} />;
          if (q.type === "truefalse")
            return <TrueFalseQuestion key={i} q={q} answer={answers[i]} onAnswer={v => setAnswers(a=>({...a,[i]:v}))} {...props} />;
          if (q.type === "fillblank")
            return <FillBlankQuestion key={i} q={q} answer={answers[i]??""} onAnswer={v => setAnswers(a=>({...a,[i]:v}))} {...props} />;
          if (q.type === "predict")
            return <PredictQuestion key={i} q={q} answer={answers[i]??""} onAnswer={v => setAnswers(a=>({...a,[i]:v}))} {...props} />;
          return null;
        })}
      </div>

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
          className="mt-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          style={{ cursor:"none",
            background: allAnswered ? `linear-gradient(135deg,${color},${color}cc)` : "#2A2A32",
            color: allAnswered ? "#0D0D0F" : "#5A5A70" }}>
          Submit {isChapter ? "chapter quiz" : "answers"}
        </button>
      ) : (
        <div className="mt-8 p-4 rounded-xl border flex items-center justify-between"
          style={{ background: pct===100 ? "rgba(74,222,128,.06)" : pct>=60 ? `${color}08` : "rgba(239,68,68,.06)",
            borderColor: pct===100 ? "rgba(74,222,128,.25)" : pct>=60 ? `${color}30` : "rgba(239,68,68,.2)" }}>
          <div>
            <p className="font-semibold text-white">{score}/{questions.length} correct ({pct}%)</p>
            <p className="text-xs text-muted mt-0.5">
              {pct===100 ? "Perfect score! \uD83C\uDF89" : pct>=80 ? "Great job!" : pct>=60 ? "Good effort, review the explanations above." : "Review the lesson and try again."}
            </p>
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }}
            className="text-xs px-3 py-2 rounded-lg border border-border text-muted hover:text-white transition-colors"
            style={{ cursor:"none" }}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

// \u2500\u2500 Main page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course  = getCourse(params.slug);
  if (!course) notFound();

  const lesson1 = getLessonContent(params.lessonId);
  const lesson2 = getLessonContent2(params.lessonId);
  const lesson  = lesson2 ?? lesson1;
  if (!lesson) notFound();

  const allLessons   = course.modules.flatMap(m => m.lessons);
  const currentIdx   = allLessons.findIndex(l => l.id === params.lessonId);
  const prevLesson   = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson   = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;
  const currentMod   = course.modules.find(m => m.lessons.some(l => l.id === params.lessonId));

  const sections  = lesson.sections ?? [];
  const quiz      = lesson2?.quiz ?? (lesson1 as any)?.quiz ?? [];
  const chapterQ  = lesson2?.chapterQuiz;

  return (
    <div className="min-h-screen pt-16" style={{ background: "#0D0D0F" }}>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <Link href={`/courses/${params.slug}`}
                className="text-xs text-muted hover:text-white transition-colors flex items-center gap-1 mb-3">
                &#8592; {course.title}
              </Link>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: course.color }}>
                {currentMod?.title}
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {course.modules.map(mod => (
                <div key={mod.id}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider bg-surface border-b border-border">
                    {mod.title}
                  </div>
                  {mod.lessons.map((l, j) => {
                    const isActive = l.id === params.lessonId;
                    const hasContent = !!(getLessonContent(l.id) || getLessonContent2(l.id));
                    return (
                      hasContent ? (
                        <Link key={l.id} href={`/courses/${params.slug}/lessons/${l.id}`}
                          className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors border-b border-border/30 ${isActive ? "bg-accent/10" : "text-muted hover:text-white hover:bg-surface"}`}
                          style={isActive ? { color: course.color, borderLeft: `2px solid ${course.color}` } : {}}>
                          <span className="flex-shrink-0 w-4 text-center" style={{ color: isActive ? course.color : "#5A5A70" }}>
                            {isActive ? "\u25B6" : j+1}
                          </span>
                          <span className="leading-snug flex-1">{l.title}</span>
                          <span className="font-mono flex-shrink-0" style={{ color: "#5A5A70" }}>{l.duration}</span>
                        </Link>
                      ) : (
                        <div key={l.id}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs border-b border-border/30 opacity-40 cursor-not-allowed">
                          <span className="w-4 text-center text-muted">{j+1}</span>
                          <span className="leading-snug flex-1 text-muted">{l.title}</span>
                          <span className="font-mono text-muted">{l.duration}</span>
                        </div>
                      )
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-3 space-y-8">

          {/* Header */}
          <div className="rounded-2xl border border-border overflow-hidden"
            style={{ background: `linear-gradient(135deg,#141417,${course.color}10)` }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <Link href={`/courses/${params.slug}`} className="hover:text-white transition-colors">{course.title}</Link>
                <span>&#8250;</span>
                <span>{currentMod?.title}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-2">{lesson.title}</h1>
                  <p className="text-muted text-sm leading-relaxed max-w-2xl">{lesson.intro}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-2">
                  <span className="text-xs font-mono text-muted bg-surface border border-border px-2.5 py-1 rounded-lg">
                    {lesson.duration}
                  </span>
                  {lesson.free && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${course.color}20`, color: course.color }}>
                      Free preview
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section: any, i: number) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-6 md:p-8 space-y-4">
                <h2 className="font-display font-bold text-xl text-white">{section.heading}</h2>
                <p className="text-muted text-sm leading-relaxed">{section.body}</p>
                {section.code && (
                  <div className="rounded-xl overflow-hidden border border-border">
                    <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold" style={{ color: course.color }}>
                          {section.code.lang}
                        </span>
                        {section.code.label && (
                          <span className="text-xs text-muted">&#8212; {section.code.label}</span>
                        )}
                      </div>
                      <button onClick={() => navigator.clipboard.writeText(section.code.code)}
                        className="text-xs text-muted hover:text-white transition-colors px-2 py-1 rounded border border-border hover:border-accent"
                        style={{ cursor:"none" }}>
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono overflow-x-auto leading-relaxed"
                      style={{ background:"#0D0D0F", color:"#E8E8F0" }}>
                      <code>{section.code.code}</code>
                    </pre>
                  </div>
                )}
                {section.tip && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border"
                    style={{ background:"rgba(124,106,247,.06)", borderColor:"rgba(124,106,247,.2)" }}>
                    <span className="text-lg flex-shrink-0">&#128161;</span>
                    <p className="text-sm text-muted leading-relaxed">{section.tip}</p>
                  </div>
                )}
                {section.warning && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border"
                    style={{ background:"rgba(251,191,36,.06)", borderColor:"rgba(251,191,36,.25)" }}>
                    <span className="text-lg flex-shrink-0">&#9888;</span>
                    <p className="text-sm leading-relaxed" style={{ color:"#FCD34D" }}>{section.warning}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Lesson quiz */}
          {quiz.length > 0 && (
            <QuizBlock questions={quiz} color={course.color} />
          )}

          {/* Chapter quiz (appears at end of last lesson in module) */}
          {chapterQ && chapterQ.length > 0 && (
            <QuizBlock
              questions={chapterQ}
              color={course.color}
              title="\uD83C\uDFC6 Functions Module &#8212; Chapter Quiz"
              isChapter={true}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 pb-8">
            {prevLesson ? (
              <Link href={`/courses/${params.slug}/lessons/${prevLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white hover:border-accent transition-colors">
                &#8592; {prevLesson.title}
              </Link>
            ) : (
              <Link href={`/courses/${params.slug}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white transition-colors">
                &#8592; Course overview
              </Link>
            )}
            {nextLesson && (
              <Link href={`/courses/${params.slug}/lessons/${nextLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
                style={{ background:`linear-gradient(135deg,${course.color},${course.color}cc)`, color:"#0D0D0F" }}>
                {nextLesson.title} &#8594;
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}