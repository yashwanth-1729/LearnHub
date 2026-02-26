export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{position:"relative",zIndex:10}}>
      <div className="max-w-3xl mx-auto px-6">

        <div className="mb-12">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border mb-4"
            style={{color:"#A399FF",borderColor:"rgba(124,106,247,.3)",background:"rgba(124,106,247,.08)"}}>
            About LearnHub
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-4">
            Built to actually teach,<br/>
            <span className="grad-text">not just to look good.</span>
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            LearnHub is a project-based learning platform designed for developers who learn by doing.
            Every course ships you toward real, working code &#8212; not just theory.
          </p>
        </div>

        <div className="space-y-8">

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-3">Our philosophy</h2>
            <p className="text-muted text-sm leading-relaxed mb-3">
              Most online courses teach you syntax. We teach you to think like a programmer.
              That means understanding <em className="text-white">why</em> something works, not just
              <em className="text-white"> how</em> to write it. Every lesson explains the concept,
              shows the pattern, covers the edge cases, and then makes you apply it.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              The best feedback on any lesson is: &#8220;I actually understand this now.&#8221;
              That is the standard every piece of content is held to.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-3">Credits &#38; attribution</h2>
            <p className="text-muted text-sm leading-relaxed mb-4">
              This platform was designed and built as a portfolio project.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-extrabold text-lg text-white flex-shrink-0"
                style={{background:"linear-gradient(135deg,#7C6AF7,#A399FF)"}}>
                Y
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Yashwanth Raj Cherukuru</div>
                <div className="text-xs text-muted">KL University &#183; Frontend Developer</div>
                <div className="text-xs mt-1" style={{color:"#7C6AF7"}}>Built with Next.js 14, TypeScript, Tailwind CSS</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-3">Technology stack</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Next.js 14", "App router, SSR, static generation"],
                ["TypeScript", "Type-safe throughout"],
                ["Tailwind CSS", "Utility-first styling"],
                ["Vercel", "Hosting and deployment"],
              ].map(([name, desc]) => (
                <div key={name} className="p-3 rounded-xl border border-border bg-surface">
                  <div className="text-sm font-semibold text-white">{name}</div>
                  <div className="text-xs text-muted mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}