"use client";
import { getCourse } from "@/lib/courses";
import { getLessonContent } from "@/lib/lesson-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course  = getCourse(params.slug);
  const lesson  = getLessonContent(params.lessonId);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course || !lesson) notFound();

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === params.lessonId);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;
  const currentModule = course.modules.find(m => m.lessons.some(l => l.id === params.lessonId));

  const quizScore = lesson.quiz
    ? lesson.quiz.filter((q, i) => quizAnswers[i] === q.answer).length
    : 0;

  return (
    <div className="min-h-screen pt-16" style={{ background: "#0D0D0F" }}>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar: lesson list */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <Link href={`/courses/${params.slug}`}
                className="text-xs text-muted hover:text-white transition-colors flex items-center gap-1 mb-3">
                <span>&#8592;</span> {course.title}
              </Link>
              <div className="text-xs font-semibold text-accent-bright uppercase tracking-wider">
                {currentModule?.title}
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {course.modules.map(mod => (
                <div key={mod.id}>
                  <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider bg-surface border-b border-border">
                    {mod.title}
                  </div>
                  {mod.lessons.map((l, j) => {
                    const isActive  = l.id === params.lessonId;
                    const hasContent = true;
                    return (
                      <Link key={l.id}
                        href={`/courses/${params.slug}/lessons/${l.id}`}
                        className={`flex items-center gap-2 px-4 py-2.5 text-xs transition-colors border-b border-border/30 ${isActive ? "bg-accent/10 text-accent-bright border-l-2 border-l-accent" : "text-muted hover:text-white hover:bg-surface"}`}>
                        <span className="flex-shrink-0 w-4 text-center" style={{ color: isActive ? course.color : "#5A5A70" }}>
                          {isActive ? "\u25B6" : j + 1}
                        </span>
                        <span className="leading-snug">{l.title}</span>
                        <span className="ml-auto flex-shrink-0 font-mono" style={{ color: "#5A5A70" }}>{l.duration}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-3 space-y-8">

          {/* Header */}
          <div className="rounded-2xl border border-border overflow-hidden"
            style={{ background: `linear-gradient(135deg,#141417,${course.color}10)` }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <Link href={`/courses/${params.slug}`} className="hover:text-white transition-colors">{course.title}</Link>
                <span>&#8250;</span>
                <span>{currentModule?.title}</span>
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
          {lesson.sections.map((section, i) => (
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
                      <button
                        onClick={() => navigator.clipboard.writeText(section.code!.code)}
                        className="text-xs text-muted hover:text-white transition-colors px-2 py-1 rounded border border-border hover:border-accent"
                        style={{ cursor: "none" }}>
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 text-sm font-mono overflow-x-auto leading-relaxed"
                      style={{ background: "#0D0D0F", color: "#E8E8F0" }}>
                      <code>{section.code.code}</code>
                    </pre>
                  </div>
                )}

                {section.tip && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border"
                    style={{ background: "rgba(124,106,247,.06)", borderColor: "rgba(124,106,247,.2)" }}>
                    <span className="text-lg flex-shrink-0">&#128161;</span>
                    <p className="text-sm text-muted leading-relaxed">{section.tip}</p>
                  </div>
                )}

                {section.warning && (
                  <div className="flex items-start gap-3 rounded-xl p-4 border"
                    style={{ background: "rgba(251,191,36,.06)", borderColor: "rgba(251,191,36,.25)" }}>
                    <span className="text-lg flex-shrink-0">&#9888;</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#FCD34D" }}>{section.warning}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Quiz */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                Quick Quiz &#128221;
              </h2>
              <div className="space-y-6">
                {lesson.quiz.map((q, qi) => (
                  <div key={qi}>
                    <p className="text-sm font-semibold text-white mb-3">{qi + 1}. {q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected  = quizAnswers[qi] === oi;
                        const isCorrect = oi === q.answer;
                        let bg = "bg-surface hover:bg-card";
                        let border = "border-border";
                        let textCol = "text-muted";
                        if (quizSubmitted) {
                          if (isCorrect)       { bg = ""; border = ""; textCol = "text-white"; }
                          else if (selected)   { bg = ""; border = ""; textCol = ""; }
                        } else if (selected) {
                          bg = ""; border = ""; textCol = "text-white";
                        }
                        return (
                          <button key={oi}
                            onClick={() => !quizSubmitted && setQuizAnswers(a => ({ ...a, [qi]: oi }))}
                            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${bg} ${border} ${textCol}`}
                            style={{
                              cursor: "none",
                              background: quizSubmitted
                                ? isCorrect ? "rgba(74,222,128,.1)" : selected ? "rgba(239,68,68,.1)" : ""
                                : selected ? `${course.color}15` : "",
                              borderColor: quizSubmitted
                                ? isCorrect ? "rgba(74,222,128,.4)" : selected ? "rgba(239,68,68,.3)" : "rgba(42,42,50,1)"
                                : selected ? course.color : "rgba(42,42,50,1)",
                              color: quizSubmitted
                                ? isCorrect ? "#4ADE80" : selected ? "#F87171" : "#5A5A70"
                                : selected ? "#fff" : "#5A5A70",
                            }}>
                            <span className="mr-2 font-mono text-xs opacity-60">
                              {String.fromCharCode(65 + oi)}.
                            </span>
                            {opt}
                            {quizSubmitted && isCorrect && " \u2713"}
                            {quizSubmitted && selected && !isCorrect && " \u2717"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < lesson.quiz!.length}
                  className="mt-6 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    cursor: "none",
                    background: Object.keys(quizAnswers).length < lesson.quiz!.length
                      ? "#2A2A32" : `linear-gradient(135deg,${course.color},${course.color}cc)`,
                    color: Object.keys(quizAnswers).length < lesson.quiz!.length ? "#5A5A70" : "#0D0D0F",
                  }}>
                  Submit answers
                </button>
              ) : (
                <div className="mt-6 p-4 rounded-xl border"
                  style={{ background: "rgba(74,222,128,.06)", borderColor: "rgba(74,222,128,.2)" }}>
                  <p className="text-sm font-semibold text-white">
                    You scored {quizScore}/{lesson.quiz!.length}
                    {quizScore === lesson.quiz!.length ? " \u2014 Perfect! \uD83C\uDF89" : quizScore >= lesson.quiz!.length / 2 ? " \u2014 Good job!" : " \u2014 Review the lesson and try again."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2 pb-8">
            {prevLesson ? (
              <Link href={`/courses/${params.slug}/lessons/${prevLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white hover:border-accent transition-colors">
                <span>&#8592;</span>
                <span>{prevLesson.title}</span>
              </Link>
            ) : (
              <Link href={`/courses/${params.slug}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-sm text-muted hover:text-white transition-colors">
                <span>&#8592;</span> Course overview
              </Link>
            )}
            {nextLesson && (
              <Link href={`/courses/${params.slug}/lessons/${nextLesson.id}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
                style={{ background: `linear-gradient(135deg,${course.color},${course.color}cc)`, color: "#0D0D0F" }}>
                <span>{nextLesson.title}</span>
                <span>&#8594;</span>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}