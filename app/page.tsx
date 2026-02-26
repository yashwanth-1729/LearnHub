import { courses } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";

export default function Home() {
  const available = courses.filter(c => !c.comingSoon);
  const soon      = courses.filter(c =>  c.comingSoon);
  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden" style={{zIndex:2,position:"relative"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",pointerEvents:"none",zIndex:0}}>
          <div className="orbit-ring" style={{width:"440px",height:"440px",animation:"spinCW 22s linear infinite"}}>
            <div className="orbit-dot" style={{width:"5px",height:"5px",background:"#7C6AF7",boxShadow:"0 0 10px #7C6AF7"}}/>
          </div>
          <div className="orbit-ring" style={{width:"640px",height:"640px",border:"1px solid rgba(124,106,247,.04)",animation:"spinCCW 36s linear infinite"}}>
            <div className="orbit-dot" style={{width:"4px",height:"4px",background:"#A399FF",boxShadow:"0 0 10px #A399FF"}}/>
          </div>
          <div className="orbit-ring" style={{width:"860px",height:"860px",border:"1px solid rgba(124,106,247,.02)",animation:"spinCW 55s linear infinite"}}>
            <div className="orbit-dot" style={{width:"3px",height:"3px",background:"#C4BBFF"}}/>
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center" style={{zIndex:2}}>
          <div className="fu1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright mb-6" style={{boxShadow:"0 0 20px rgba(124,106,247,.1)"}}>
            <span className="badge-dot w-1.5 h-1.5 rounded-full bg-accent inline-block"/>
            New: Python Fundamentals is live
          </div>
          <h1 className="fu2 font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6">
            Learn to code.<br/>
            <span className="grad-text" id="typed-text"></span>
            <span className="caret">|</span>
          </h1>
          <p className="fu3 text-lg text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Project-based courses built for developers who want to go from{" "}
            <em className="text-white not-italic font-medium">concept</em>{" "}to{" "}
            <em className="text-white not-italic font-medium">shipped</em>
            {" "}&#8212;{" "}fast.
          </p>
          <div className="fu4 flex items-center justify-center gap-4 mb-16">
            <button className="btn-primary-hero">Explore courses</button>
            <button style={{cursor:"none",background:"none",border:"none",color:"#5A5A70",fontSize:"13px",fontFamily:"DM Sans,sans-serif"}}
              className="hover:text-white transition-colors">
              See learning paths &#8594;
            </button>
          </div>
          <div className="fu5 flex items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="50" data-sfx="K+">50K+</div>
              <div className="text-xs text-muted mt-1">Students enrolled</div>
              <span className="stat-line"/>
            </div>
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="4.9" data-sfx="" data-dec>4.9</div>
              <div className="text-xs text-muted mt-1">Average rating</div>
              <span className="stat-line" style={{animationDelay:"1.35s"}}/>
            </div>
            <div className="text-center">
              <div className="font-display font-extrabold text-2xl text-white" data-count="200" data-sfx="+">200+</div>
              <div className="text-xs text-muted mt-1">Hours of content</div>
              <span className="stat-line" style={{animationDelay:"1.5s"}}/>
            </div>
          </div>
        </div>
      </section>
      <section className="reveal max-w-7xl mx-auto px-6 pb-24" style={{zIndex:2,position:"relative"}}>
        <div className="reveal-child mb-10">
          <h2 className="font-display font-bold text-3xl text-white mb-2">Available now</h2>
          <p className="text-muted">Jump in and start learning today.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {available.map(c => (<div key={c.slug} className="reveal-child"><CourseCard course={c}/></div>))}
        </div>
        {soon.length > 0 && (<>
          <div className="reveal-child mb-8">
            <h2 className="font-display font-bold text-2xl text-white mb-2">Coming soon</h2>
            <p className="text-muted text-sm">More courses are on the way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {soon.map(c => (<div key={c.slug} className="reveal-child"><CourseCard course={c}/></div>))}
          </div>
        </>)}
      </section>
    </div>
  );
}