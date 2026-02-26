import Link from "next/link";
import type { Course } from "@/lib/courses";

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="skeleton" style={{height:"48px",width:"48px",borderRadius:"12px"}}/>
      <div className="flex flex-col gap-2">
        <div className="skeleton" style={{height:"18px",width:"68%"}}/>
        <div className="skeleton" style={{height:"13px",width:"100%"}}/>
        <div className="skeleton" style={{height:"13px",width:"55%"}}/>
      </div>
      <div className="flex gap-2">
        <div className="skeleton" style={{height:"22px",width:"64px",borderRadius:"999px"}}/>
        <div className="skeleton" style={{height:"22px",width:"52px",borderRadius:"999px"}}/>
      </div>
      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
        <div className="skeleton" style={{height:"13px",width:"120px"}}/>
        <div className="skeleton" style={{height:"32px",width:"110px",borderRadius:"9px"}}/>
      </div>
    </div>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={course.comingSoon ? "#" : `/courses/${course.slug}`} className="block h-full">
      <div className="course-card rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 h-full" style={{cursor:"none"}}>
        <div className="flex items-start justify-between">
          <div className="card-icon-anim w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{background:`${course.color}18`}}>
            {course.icon}
          </div>
          {course.comingSoon
            ? <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface border border-border text-muted">Coming soon</span>
            : <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{background:`${course.color}20`,color:course.color}}>{course.level}</span>
          }
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white leading-tight mb-1">{course.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{course.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {course.tags.map(tag => (
            <span key={tag} className="tag text-xs font-medium px-2 py-0.5 rounded bg-surface border border-border text-muted transition-colors">{tag}</span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            {!course.comingSoon && (<>
              <span style={{color:"#FACC15"}}>&#9733;</span>
              <strong className="text-white">{course.rating}</strong>
              <span>&#183; {course.lessons} lessons &#183; {course.duration}</span>
            </>)}
          </div>
          <button className="text-xs font-semibold px-3 py-2 rounded-lg transition-all"
            style={{background:course.comingSoon?"transparent":`${course.color}20`,color:course.comingSoon?"#5A5A70":course.color,border:`1px solid ${course.comingSoon?"#2A2A32":`${course.color}40`}`,cursor:"none"}}>
            {course.comingSoon ? "Notify me" : "Start learning \u2192"}
          </button>
        </div>
      </div>
    </Link>
  );
}