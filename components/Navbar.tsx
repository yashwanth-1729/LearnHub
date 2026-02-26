"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm font-display">L</div>
          <span className="font-display font-bold text-lg text-white tracking-tight">LearnHub</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/"      className="text-muted hover:text-white text-sm font-medium transition-colors">Courses</Link>
          <Link href="#"      className="text-muted hover:text-white text-sm font-medium transition-colors">Paths</Link>
          <Link href="#"      className="text-muted hover:text-white text-sm font-medium transition-colors">Community</Link>
          <Link href="/about" className="text-muted hover:text-white text-sm font-medium transition-colors">About</Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-muted hover:text-white transition-colors font-medium px-4 py-2">Sign in</button>
          <button className="text-sm bg-accent hover:bg-accent-bright transition-colors text-white font-semibold px-4 py-2 rounded-lg">Get started</button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-muted hover:text-white p-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open
              ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            }
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-6 py-4 flex flex-col gap-4">
          <Link href="/"      className="text-sm text-white font-medium" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="#"      className="text-sm text-muted"             onClick={() => setOpen(false)}>Paths</Link>
          <Link href="#"      className="text-sm text-muted"             onClick={() => setOpen(false)}>Community</Link>
          <Link href="/about" className="text-sm text-muted"             onClick={() => setOpen(false)}>About</Link>
          <hr className="border-border"/>
          <button className="text-sm text-white font-semibold bg-accent rounded-lg py-2 px-4">Get started</button>
        </div>
      )}
    </nav>
  );
}
