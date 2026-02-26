"use client";
import { getCourse } from "@/lib/courses";
import { getLessonContent } from "@/lib/lesson-content";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const freeLessons  = course.modules.flatMap(m => m.lessons).filter(l => l.free).length;
  const totalModules = course.modules.length;
  const firstLesson  = course.modules[0]?.lessons[0];

  return (
    <div className="min-h-screen pt-16">

      {/* Hero */}
      <div className="relative border-b border-border overflow-hidden"
        style={{ background: `linear-gradient(135deg, #141417 0%, ${course.color}12 100%)` }}>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: course.color }} />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: `${course.color}20` }}>{course.icon}</div>
              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider block mb-1.5"
                  style={{ background: `${course.color}20`, color: course.color }}>{course.level}</span>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span style={{ color: "#FACC15" }}>&#9733; {course.rating}</span>
                  <span>&nbsp;&#183;&nbsp;{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">{course.title}</h1>
            <p className="text-muted text-base leading-relaxed mb-6">{course.description}</p>
            <div className="flex flex-wrap gap-3 mb-6 text-xs text-muted">
              {[`${course.duration} total`, `${totalModules} modules`, `${totalLessons} lessons`, "Lifetime access"].map(t => (
                <span key={t} className="bg-surface border border-border px-3 py-1.5 rounded-lg">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
                style={{ background: `${course.color}50` }}>{course.instructor[0]}</div>
              <div>
                <div className="text-sm font-semibold text-white">{course.instructor}</div>
                <div className="text-xs text-muted">{course.instructorRole}</div>
              </div>
            </div>
          </div>

          {/* Enroll card */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <div className="text-4xl font-display font-extrabold text-white mb-1">Free</div>
              <p className="text-xs text-muted mb-5">{freeLessons} free preview lessons</p>
              {firstLesson && (
                <Link href={`/courses/${params.slug}/lessons/${firstLesson.id}`}>
                  <button className="w-full py-3.5 rounded-xl font-display font-bold text-sm mb-3 transition-all hover:brightness-110"
                    style={{ background: `linear-gradient(135deg,${course.color},${course.color}cc)`, color: "#0D0D0F", cursor: "none" }}>
                    Start learning &#8212; it&#39;s free
                  </button>
                </Link>
              )}
              <button
                onClick={() => document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full py-3 rounded-xl border border-border text-sm text-muted hover:text-white hover:border-accent transition-colors font-medium"
                style={{ cursor: "none", background: "transparent" }}>
                Browse curriculum &#8595;
              </button>
              <ul className="mt-5 space-y-2.5 text-xs text-muted border-t border-border pt-5">
                {[`${totalLessons} video lessons`, `${course.duration} on-demand`, "Downloadable exercises", "Certificate of completion", "Lifetime access"].map(t => (
                  <li key={t} className="flex items-center gap-2">
                    <span style={{ color: "#4ADE80" }}>&#10003;</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">

          {/* What you learn */}
          {course.whatYouLearn.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-white mb-6">What you&#39;ll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.whatYouLearn.map(item => (
                  <div key={item} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                    <span style={{ color: "#4ADE80", flexShrink: 0, marginTop: "2px" }}>&#10003;</span>
                    <span className="text-sm text-muted leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum */}
          <div id="curriculum">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-white">Course curriculum</h2>
              <span className="text-xs text-muted">{totalModules} sections &#183; {totalLessons} lessons &#183; {course.duration}</span>
            </div>
            <div className="space-y-3">
              {course.modules.map((mod, i) => {
                const modMins = mod.lessons.reduce((s, l) => s + parseInt(l.duration), 0);
                return (
                  <details key={mod.id} className="group rounded-xl border border-border bg-card overflow-hidden" open={i === 0}>
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-surface transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: `${course.color}20`, color: course.color }}>{i + 1}</span>
                        <div>
                          <div className="font-semibold text-white font-display text-sm">{mod.title}</div>
                          <div className="text-xs text-muted mt-0.5">{mod.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted flex-shrink-0 ml-4">
                        <span>{mod.lessons.length} lessons</span>
                        <span>{modMins}m</span>
                        <span className="transition-transform group-open:rotate-180">&#9660;</span>
                      </div>
                    </summary>
                    <div className="border-t border-border">
                      {mod.lessons.map((lesson, j) => {
                        const hasContent = !!getLessonContent(lesson.id);
                        return (
                          <div key={lesson.id}
                            className="flex items-start justify-between px-5 py-3.5 border-b last:border-0 transition-colors hover:bg-surface"
                            style={{ borderColor: "rgba(42,42,50,.5)" }}>
                            <div className="flex items-start gap-3 flex-1">
                              <span className="text-xs text-muted w-5 text-center mt-0.5 flex-shrink-0">{j + 1}</span>
                              <span className="flex-shrink-0 mt-0.5 text-xs" style={{ color: lesson.free ? "#A399FF" : "#5A5A70" }}>
                                {lesson.free ? "\u25B6" : "\uD83D\uDD12"}
                              </span>
                              <div className="flex-1">
                                {hasContent ? (
                                  <Link href={`/courses/${params.slug}/lessons/${lesson.id}`}
                                    className="text-sm text-white hover:text-accent-bright transition-colors leading-snug flex items-center gap-2">
                                    {lesson.title}
                                    {lesson.free && (
                                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                                        style={{ background: `${course.color}20`, color: course.color }}>
                                        Free
                                      </span>
                                    )}
                                    <span className="text-xs" style={{ color: course.color }}>&#8594;</span>
                                  </Link>
                                ) : (
                                  <div className="text-sm text-muted leading-snug flex items-center gap-2">
                                    {lesson.title}
                                    {lesson.free && (
                                      <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
                                        style={{ background: `${course.color}20`, color: course.color }}>
                                        Free
                                      </span>
                                    )}
                                    <span className="text-xs text-muted">(coming soon)</span>
                                  </div>
                                )}
                                {lesson.description && (
                                  <div className="text-xs text-muted mt-1 leading-relaxed">{lesson.description}</div>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-muted font-mono flex-shrink-0 ml-4 mt-0.5">{lesson.duration}</span>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {course.requirements.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-white mb-4">Requirements</h3>
              <ul className="space-y-2 text-sm text-muted">
                {course.requirements.map(r => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-1" style={{ color: "#5A5A70" }}>&#8226;</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-bold text-white mb-4">Instructor</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ background: `${course.color}50` }}>{course.instructor[0]}</div>
              <div>
                <div className="text-sm font-semibold text-white">{course.instructor}</div>
                <div className="text-xs text-muted">{course.instructorRole}</div>
              </div>
            </div>
            {course.instructorBio && <p className="text-xs text-muted leading-relaxed">{course.instructorBio}</p>}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-bold text-white mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-border bg-surface text-muted">{t}</span>
              ))}
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-muted hover:text-white transition-colors pt-2">
            <span>&#8592;</span> All courses
          </Link>
        </div>
      </div>
    </div>
  );
}