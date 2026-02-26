import type { Metadata } from "next";
export const metadata: Metadata = { title: "About â€” LearnHub" };

const cards = [
  { icon:"ðŸ‘¨â€ðŸ’»", label:"Developer",   value:"Yashwanth Raj Cherukuru" },
  { icon:"ðŸŽ“",   label:"Institution", value:"KL University" },
  { icon:"ðŸ¤–",   label:"Powered by",  value:"Claude by Anthropic" },
  { icon:"ðŸš€",   label:"Version",     value:"v1.0.0 â€” 2025" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-accent-bright tracking-wider uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          About this project
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Built with curiosity.<br/>
          <span style={{ background:"linear-gradient(135deg,#7C6AF7,#A399FF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Shipped with Claude.
          </span>
        </h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl mx-auto mb-12">
          LearnHub was designed and developed by{" "}
          <strong className="text-white font-semibold">Yashwanth Raj Cherukuru</strong>,
          a student at <strong className="text-white font-semibold">KL University</strong>,
          as an exploration of what modern, production-grade interfaces can look like when a developer
          orchestrates <strong className="text-white font-semibold">Claude (by Anthropic)</strong> as a
          creative and engineering partner. Every component, animation, and interaction was conceived
          and refined through a collaborative conversation with AI â€” demonstrating that the boundary
          between idea and finished product is thinner than ever.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cards.map(c => (
            <div key={c.label} className="bg-card border border-border rounded-2xl p-5 text-left">
              <div className="text-xl mb-3">{c.icon}</div>
              <div className="text-xs text-muted uppercase tracking-wider mb-1">{c.label}</div>
              <div className="text-sm font-semibold text-white font-display">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-4 bg-card border border-border rounded-2xl px-6 py-4 hover:border-accent transition-colors">
          <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-lg">âœ‰ï¸</div>
          <div className="text-left">
            <div className="text-xs text-muted mb-1">Get in touch</div>
            <a href="mailto:yashwanth.dev.builds@gmail.com" className="text-sm font-semibold text-accent-bright hover:underline font-mono">
              yashwanth.dev.builds@gmail.com
            </a>
          </div>
        </div>
        <p className="mt-16 text-xs text-muted/40 tracking-wide">
          LearnHub v1.0.0 Â· Built with Next.js Â· Orchestrated with Claude Â· Â© 2025 Yashwanth Raj Cherukuru
        </p>
      </div>
    </div>
  );
}
