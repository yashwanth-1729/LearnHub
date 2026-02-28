"use client";
import { getCourse } from "@/lib/courses";
import { getLessonContent  } from "@/lib/lesson-content";
import { getLessonContent2 } from "@/lib/lesson-content-2";
import { getLessonContent3 } from "@/lib/lesson-content-3";
import { getLessonContent4 } from "@/lib/lesson-content-4";
import { getLessonContent5 } from "@/lib/lesson-content-5";
import { getLessonContent6 } from "@/lib/lesson-content-6";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const btn = "transition-all duration-150 active:scale-95";

function CodeBlock({ block, color }: { block: any; color: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border" style={{ background: "#111115" }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </div>
          {block.label && <span className="text-xs text-muted font-mono">{block.label}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded" style={{ background: `${color}15`, color }}>{block.lang}</span>
          <button onClick={() => { navigator.clipboard.writeText(block.code); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
            className={`text-xs px-2.5 py-1 rounded border border-border ${btn} hover:border-accent hover:text-white`}
            style={{ cursor: "none", color: copied ? "#4ADE80" : "#5A5A70", borderColor: copied ? "rgba(74,222,128,.4)" : undefined }}>
            {copied ? "\u2713 Copied" : "Copy"}
          </button>
        </div>
      </div>
      <pre className="p-5 text-sm font-mono overflow-x-auto leading-relaxed" style={{ background: "#0A0A0D", color: "#E8E8F0", margin: 0 }}>
        <code>{block.code}</code>
      </pre>
      {block.output && (
        <div className="border-t border-border px-5 py-4" style={{ background: "#0D1A0F" }}>
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4ADE80", opacity: 0.7 }}>Output</div>
          <pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap" style={{ color: "#86EFAC", margin: 0 }}>{block.output}</pre>
        </div>
      )}
    </div>
  );
}

/* \u2500\u2500 Quiz question components \u2500\u2500 */
function McqQ({ q, idx, submitted, answer, onAnswer, onClear, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-white">{idx + 1}. {q.q}</p>
        {answer !== undefined && !submitted && (
          <button onClick={onClear} className={`text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-white hover:border-red-500 flex-shrink-0 ${btn}`} style={{ cursor: "none" }}>
            Clear
          </button>
        )}
      </div>
      {q.options.map((opt: string, oi: number) => {
        const sel = answer === oi, corr = oi === q.answer;
        const base = "w-full text-left px-4 py-3 rounded-xl border text-sm " + btn;
        const hov  = !submitted ? "hover:border-accent hover:text-white" : "";
        return (
          <button key={oi} onClick={() => !submitted && onAnswer(oi)}
            className={`${base} ${hov}`}
            style={{ cursor: "none",
              background: submitted ? (corr ? "rgba(74,222,128,.08)" : sel ? "rgba(239,68,68,.07)" : "transparent") : sel ? `${color}12` : "transparent",
              borderColor: submitted ? (corr ? "rgba(74,222,128,.4)"  : sel ? "rgba(239,68,68,.3)" : "#2A2A32") : sel ? color : "#2A2A32",
              color:       submitted ? (corr ? "#4ADE80" : sel ? "#F87171" : "#5A5A70") : sel ? "#fff" : "#5A5A70" }}>
            <span className="mr-2 font-mono text-xs opacity-50">{String.fromCharCode(65+oi)}.</span>
            {opt}{submitted && corr && " \u2713"}{submitted && sel && !corr && " \u2717"}
          </button>
        );
      })}
      {submitted && <p className="text-xs text-muted pl-2 pt-1 italic">{q.explanation}</p>}
    </div>
  );
}

function TfQ({ q, idx, submitted, answer, onAnswer, onClear, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-white">{idx + 1}. {q.q}</p>
        {answer !== undefined && !submitted && (
          <button onClick={onClear} className={`text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-white hover:border-red-500 flex-shrink-0 ${btn}`} style={{ cursor: "none" }}>Clear</button>
        )}
      </div>
      <div className="flex gap-3">
        {([true, false] as boolean[]).map(v => {
          const sel = answer === v, corr = v === q.answer;
          return (
            <button key={String(v)} onClick={() => !submitted && onAnswer(v)}
              className={`flex-1 py-3 rounded-xl border text-sm font-semibold ${btn} ${!submitted ? "hover:border-accent hover:text-white" : ""}`}
              style={{ cursor: "none",
                background: submitted ? (corr ? "rgba(74,222,128,.08)" : sel ? "rgba(239,68,68,.07)" : "transparent") : sel ? `${color}12` : "transparent",
                borderColor: submitted ? (corr ? "rgba(74,222,128,.4)" : sel ? "rgba(239,68,68,.3)" : "#2A2A32") : sel ? color : "#2A2A32",
                color:       submitted ? (corr ? "#4ADE80" : sel ? "#F87171" : "#5A5A70") : sel ? "#fff" : "#5A5A70" }}>
              {v ? "True" : "False"}{submitted && corr && " \u2713"}{submitted && sel && !corr && " \u2717"}
            </button>
          );
        })}
      </div>
      {submitted && <p className="text-xs text-muted pl-2 pt-1 italic">{q.explanation}</p>}
    </div>
  );
}

function FillQ({ q, idx, submitted, answer, onAnswer, onClear, color }: any) {
  const corr = submitted && answer.trim().toLowerCase() === q.answer.toLowerCase();
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-white">{idx + 1}. {q.q}</p>
        {answer && !submitted && (
          <button onClick={onClear} className={`text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-white hover:border-red-500 flex-shrink-0 ${btn}`} style={{ cursor: "none" }}>Clear</button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input value={answer} onChange={e => !submitted && onAnswer(e.target.value)} placeholder={q.hint}
          className="flex-1 px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all hover:border-accent focus:border-accent"
          style={{ cursor: submitted ? "default" : "text", background: "#111115",
            borderColor: submitted ? (corr ? "rgba(74,222,128,.4)" : "rgba(239,68,68,.3)") : answer ? color : "#2A2A32",
            color: submitted ? (corr ? "#4ADE80" : "#F87171") : "#fff" }} />
        {submitted && <span style={{ color: corr ? "#4ADE80" : "#F87171", fontSize: "18px" }}>{corr ? "\u2713" : "\u2717"}</span>}
      </div>
      {submitted && !corr && <p className="text-xs pl-2" style={{ color }}>&#8594; Correct: <strong>{q.answer}</strong></p>}
      {submitted && <p className="text-xs text-muted pl-2 italic">{q.hint}</p>}
    </div>
  );
}

function PredictQ({ q, idx, submitted, answer, onAnswer, onClear, color }: any) {
  const corr = submitted && answer.trim() === q.answer.trim();
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-white">{idx + 1}. {q.q}</p>
        {answer && !submitted && (
          <button onClick={onClear} className={`text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-white hover:border-red-500 flex-shrink-0 ${btn}`} style={{ cursor: "none" }}>Clear</button>
        )}
      </div>
      <pre className="p-3 rounded-xl border border-border text-xs font-mono overflow-x-auto" style={{ background: "#0A0A0D", color: "#E8E8F0" }}>{q.code}</pre>
      <div className="flex items-center gap-2">
        <input value={answer} onChange={e => !submitted && onAnswer(e.target.value)} placeholder="Type the exact output..."
          className="flex-1 px-4 py-3 rounded-xl border text-sm font-mono outline-none transition-all hover:border-accent focus:border-accent"
          style={{ cursor: submitted ? "default" : "text", background: "#111115",
            borderColor: submitted ? (corr ? "rgba(74,222,128,.4)" : "rgba(239,68,68,.3)") : answer ? color : "#2A2A32",
            color: submitted ? (corr ? "#4ADE80" : "#F87171") : "#fff" }} />
        {submitted && <span style={{ color: corr ? "#4ADE80" : "#F87171", fontSize: "18px" }}>{corr ? "\u2713" : "\u2717"}</span>}
      </div>
      {submitted && !corr && (
        <div className="rounded-xl border p-3" style={{ background: "#0D1A0F", borderColor: "rgba(74,222,128,.15)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "#4ADE80" }}>Expected:</p>
          <pre className="text-xs font-mono" style={{ color: "#86EFAC" }}>{q.answer}</pre>
        </div>
      )}
      {submitted && <p className="text-xs text-muted pl-2 italic">{q.explanation}</p>}
    </div>
  );
}

function QuizBlock({ questions, color, title = "Quick Quiz \uD83D\uDCDD", isChapter = false }: any) {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const setA  = (i: number, v: any) => setAnswers(a => ({ ...a, [i]: v }));
  const clearA = (i: number) => setAnswers(a => { const n = { ...a }; delete n[i]; return n; });

  const allAnswered = questions.every((q: any, i: number) => {
    if (q.type === "fillblank" || q.type === "predict") return (answers[i] ?? "").trim().length > 0;
    return answers[i] !== undefined;
  });

  const score = submitted ? questions.filter((q: any, i: number) => {
    const t = q.type ?? "mcq";
    if (t === "mcq")       return answers[i] === q.answer;
    if (t === "truefalse") return answers[i] === q.answer;
    if (t === "fillblank") return (answers[i] ?? "").trim().toLowerCase() === q.answer.toLowerCase();
    if (t === "predict")   return (answers[i] ?? "").trim() === q.answer.trim();
    return false;
  }).length : 0;

  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;
  const tc = (t: string) => questions.filter((q: any) => (q.type ?? "mcq") === t).length;

  return (
    <div className={`rounded-2xl border p-6 md:p-8 ${isChapter ? "border-2" : "border-border bg-card"}`}
      style={isChapter ? { borderColor: `${color}40`, background: `${color}06` } : {}}>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white">{title}</h2>
          {isChapter && <p className="text-xs text-muted mt-1">End-of-module comprehensive test</p>}
        </div>
        <div className="flex-shrink-0 flex flex-wrap gap-1.5 justify-end">
          {tc("mcq")       > 0 && <span className="text-xs px-2 py-1 rounded-full border border-border text-muted">{tc("mcq")} MCQ</span>}
          {tc("truefalse") > 0 && <span className="text-xs px-2 py-1 rounded-full border border-border text-muted">{tc("truefalse")} T/F</span>}
          {(tc("fillblank")+tc("predict")) > 0 && <span className="text-xs px-2 py-1 rounded-full border border-border text-muted">{tc("fillblank")+tc("predict")} Typed</span>}
        </div>
      </div>

      <div className="space-y-8">
        {questions.map((q: any, i: number) => {
          const t = q.type ?? "mcq";
          const p = { idx: i, submitted, color, onClear: () => clearA(i) };
          if (t === "mcq")       return <McqQ     key={i} q={q} answer={answers[i]}       onAnswer={(v:any) => setA(i,v)} {...p} />;
          if (t === "truefalse") return <TfQ      key={i} q={q} answer={answers[i]}       onAnswer={(v:any) => setA(i,v)} {...p} />;
          if (t === "fillblank") return <FillQ    key={i} q={q} answer={answers[i] ?? ""} onAnswer={(v:any) => setA(i,v)} {...p} />;
          if (t === "predict")   return <PredictQ key={i} q={q} answer={answers[i] ?? ""} onAnswer={(v:any) => setA(i,v)} {...p} />;
          return null;
        })}
      </div>

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
          className={`mt-8 px-6 py-3 rounded-xl font-semibold text-sm ${btn} ${allAnswered ? "hover:brightness-110" : "opacity-50 cursor-not-allowed"}`}
          style={{ cursor: "none", background: allAnswered ? `linear-gradient(135deg,${color},${color}cc)` : "#1C1C21", color: allAnswered ? "#0D0D0F" : "#5A5A70" }}>
          Submit answers
        </button>
      ) : (
        <div className="mt-8 p-4 rounded-xl border flex items-center justify-between gap-4"
          style={{ background: pct===100?"rgba(74,222,128,.06)":pct>=60?`${color}08`:"rgba(239,68,68,.06)",
            borderColor: pct===100?"rgba(74,222,128,.25)":pct>=60?`${color}30`:"rgba(239,68,68,.2)" }}>
          <div>
            <p className="font-semibold text-white text-sm">{score}/{questions.length} correct ({pct}%)</p>
            <p className="text-xs text-muted mt-0.5">{pct===100?"Perfect! \uD83C\uDF89":pct>=80?"Great job!":pct>=60?"Good effort. Review explanations.":"Review the lesson and try again."}</p>
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }}
            className={`text-xs px-3 py-2 rounded-lg border border-border text-muted hover:text-white hover:border-accent flex-shrink-0 ${btn}`}
            style={{ cursor: "none" }}>Retry</button>
        </div>
      )}
    </div>
  );
}

export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const lesson =
    getLessonContent6(params.lessonId) ??
    getLessonContent5(params.lessonId) ??
    getLessonContent4(params.lessonId) ??
    getLessonContent3(params.lessonId) ??
    getLessonContent(params.lessonId)  ??
    getLessonContent2(params.lessonId);
  if (!lesson) notFound();

  const allLessons = course.modules.flatMap(m => m.lessons);
  const idx        = allLessons.findIndex(l => l.id === params.lessonId);
  const prevL      = idx > 0 ? allLessons[idx - 1] : null;
  const nextL      = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
  const currentMod = course.modules.find(m => m.lessons.some(l => l.id === params.lessonId));
  const sections   = (lesson as any).sections ?? [];
  const quiz       = (lesson as any).quiz ?? [];
  const chapterQ   = (lesson as any).chapterQuiz;

  const hasContent = (id: string) =>
    !!(getLessonContent6(id) ?? getLessonContent5(id) ?? getLessonContent4(id) ??
       getLessonContent3(id) ?? getLessonContent(id)  ?? getLessonContent2(id));

  return (
    <div className="min-h-screen pt-16" style={{ background: "#0D0D0F" }}>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* \u2500\u2500 Sidebar \u2500\u2500 */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <Link href={`/courses/${params.slug}`}
                className={`text-xs text-muted hover:text-white flex items-center gap-1 mb-3 ${btn}`}>
                &#8592; {course.title}
              </Link>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: course.color }}>{currentMod?.title}</div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {course.modules.map(mod => (
                <div key={mod.id}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider bg-surface border-b border-border">{mod.title}</div>
                  {mod.lessons.map((l, j) => {
                    const active = l.id === params.lessonId;
                    const avail  = hasContent(l.id);
                    return avail ? (
                      <Link key={l.id} href={`/courses/${params.slug}/lessons/${l.id}`}
                        className={`flex items-center gap-2 px-4 py-2.5 text-xs border-b border-border/30 ${btn} ${active ? "" : "text-muted hover:text-white hover:bg-surface"}`}
                        style={active ? { color: course.color, background: `${course.color}10`, borderLeft: `2px solid ${course.color}` } : {}}>
                        <span className="flex-shrink-0 w-4 text-center" style={{ color: active ? course.color : "#5A5A70" }}>{active ? "\u25B6" : j+1}</span>
                        <span className="leading-snug flex-1">{l.title}</span>
                        <span className="font-mono flex-shrink-0 text-xs" style={{ color: "#5A5A70" }}>{l.duration}</span>
                      </Link>
                    ) : (
                      <div key={l.id} className="flex items-center gap-2 px-4 py-2.5 text-xs border-b border-border/30 opacity-35 cursor-not-allowed">
                        <span className="w-4 text-center text-muted">{j+1}</span>
                        <span className="leading-snug flex-1 text-muted">{l.title}</span>
                        <span className="font-mono text-muted">{l.duration}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* \u2500\u2500 Main \u2500\u2500 */}
        <main className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-border overflow-hidden" style={{ background: `linear-gradient(135deg,#141417,${course.color}10)` }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <Link href={`/courses/${params.slug}`} className={`hover:text-white ${btn}`}>{course.title}</Link>
                <span>&#8250;</span><span>{currentMod?.title}</span>
              </div>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h1 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3 leading-tight">{(lesson as any).title}</h1>
                  <p className="text-muted text-sm leading-relaxed max-w-2xl">{(lesson as any).intro}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs font-mono text-muted bg-surface border border-border px-2.5 py-1 rounded-lg">{(lesson as any).duration}</span>
                  {(lesson as any).free && <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${course.color}20`, color: course.color }}>Free preview</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section: any, si: number) => (
            <div key={si} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 rounded-full flex-shrink-0" style={{ background: course.color }} />
                  <h2 className="font-display font-bold text-xl text-white">{section.heading}</h2>
                </div>
                {Array.isArray(section.body)
                  ? <div className="space-y-3">{section.body.map((p: string, pi: number) => <p key={pi} className="text-muted text-sm leading-relaxed">{p}</p>)}</div>
                  : <p className="text-muted text-sm leading-relaxed">{section.body}</p>}
                {section.code && <CodeBlock block={section.code} color={course.color} />}
                {section.examples?.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted">More examples</p>
                    {section.examples.map((ex: any, ei: number) => <CodeBlock key={ei} block={ex} color={course.color} />)}
                  </div>
                )}
                {section.tip && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: "rgba(124,106,247,.05)", borderColor: "rgba(124,106,247,.2)" }}>
                    <span className="text-base flex-shrink-0 mt-0.5">&#128161;</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#C4BBFF" }}>{section.tip}</p>
                  </div>
                )}
                {section.warning && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: "rgba(251,191,36,.05)", borderColor: "rgba(251,191,36,.2)" }}>
                    <span className="text-base flex-shrink-0 mt-0.5">&#9888;</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#FCD34D" }}>{section.warning}</p>
                  </div>
                )}
                {section.note && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border" style={{ background: "rgba(56,189,248,.05)", borderColor: "rgba(56,189,248,.2)" }}>
                    <span className="text-base flex-shrink-0 mt-0.5">&#128204;</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#7DD3FC" }}>{section.note}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {quiz.length > 0 && <QuizBlock questions={quiz} color={course.color} />}
          {chapterQ?.length > 0 && <QuizBlock questions={chapterQ} color={course.color} title="\uD83C\uDFC6 Chapter Quiz" isChapter={true} />}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 pb-10 gap-4">
            {prevL ? (
              <Link href={`/courses/${params.slug}/lessons/${prevL.id}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white hover:border-accent min-w-0 flex-1 max-w-xs ${btn}`}>
                <span className="flex-shrink-0">&#8592;</span><span className="truncate">{prevL.title}</span>
              </Link>
            ) : (
              <Link href={`/courses/${params.slug}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white hover:border-accent ${btn}`}>
                &#8592; Overview
              </Link>
            )}
            {nextL && (
              <Link href={`/courses/${params.slug}/lessons/${nextL.id}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm hover:brightness-110 min-w-0 flex-1 max-w-xs justify-end ${btn}`}
                style={{ background: `linear-gradient(135deg,${course.color},${course.color}cc)`, color: "#0D0D0F" }}>
                <span className="truncate">{nextL.title}</span><span className="flex-shrink-0">&#8594;</span>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}