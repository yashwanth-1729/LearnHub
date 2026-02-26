import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About \u2014 LearnHub",
};

const infoCards = [
  { icon: "\uD83D\uDC68\u200D\uD83D\uDCBB", label: "Developer",    value: "Yashwanth Raj Cherukuru" },
  { icon: "\uD83C\uDF93",                    label: "Institution",  value: "KL University"           },
  { icon: "\uD83E\uDD16",                    label: "Powered by",   value: "Claude by Anthropic"     },
  { icon: "\uD83D\uDE80",                    label: "Version",      value: "v1.0.0 \u2014 2025"      },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6" style={{position:"relative",zIndex:10}}>
      <div className="max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright tracking-wider uppercase mb-8"
          style={{boxShadow:"0 0 20px rgba(124,106,247,.08)"}}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent badge-dot" />
          About this project
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Built with curiosity.<br />
          <span className="grad-text">Shipped with Claude.</span>
        </h1>

        {/* Description */}
        <p className="text-muted text-base leading-relaxed max-w-2xl mx-auto mb-12">
          LearnHub was designed and developed by{" "}
          <strong className="text-white font-semibold">Yashwanth Raj Cherukuru</strong>,
          a student at{" "}
          <strong className="text-white font-semibold">KL University</strong>, as an
          exploration of what modern, production-grade interfaces can look like when a
          developer orchestrates{" "}
          <strong className="text-white font-semibold">Claude (by Anthropic)</strong> as a
          creative and engineering partner. Every component, animation, and interaction on
          this platform was conceived and refined through a collaborative conversation with
          AI &#8212; demonstrating that the boundary between idea and finished product is
          thinner than ever.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {infoCards.map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-2xl p-5 text-left">
              <div className="text-xl mb-3">{card.icon}</div>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">{card.label}</div>
              <div className="text-sm font-semibold text-white font-display">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4 hover:border-accent transition-colors"
          style={{cursor:"none"}}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{background:"rgba(124,106,247,.12)"}}>
            &#9993;
          </div>
          <div className="text-left">
            <div className="text-xs text-muted mb-1 tracking-wide">Get in touch</div>
            <a href="mailto:yashwanth.dev.builds@gmail.com"
              className="text-sm font-semibold hover:underline font-mono"
              style={{color:"#A399FF",cursor:"none"}}>
              yashwanth.dev.builds@gmail.com
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-xs tracking-wide" style={{color:"#2A2A42"}}>
          LearnHub v1.0.0 &nbsp;&#183;&nbsp; Built with Next.js &nbsp;&#183;&nbsp; Orchestrated with Claude &nbsp;&#183;&nbsp; &#169; 2025 Yashwanth Raj Cherukuru
        </p>

      </div>
    </div>
  );
}