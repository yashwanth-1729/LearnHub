import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl mb-6">404</div>
      <h1 className="font-display font-bold text-3xl text-white mb-3">Page not found</h1>
      <p className="text-muted mb-8">This page does not exist yet.</p>
      <Link href="/" className="bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-accent-bright transition-colors">
        Back to courses
      </Link>
    </div>
  );
}
