"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Terminal, Moon, Sun, Search, LayoutDashboard, Compass, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // Check initial preference from document class if available
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const isDark = !dark;
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <nav className="glass-header px-4 md:px-8 py-3.5 flex items-center justify-between transition-all duration-300">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-insta p-2.5 rounded-2xl group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-orange-500/20 ring-1 ring-white/20">
          <Terminal className="w-5.5 h- 5.5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tight text-foreground leading-tight">Playwright <span className="text-insta">Copilot</span></h1>
          <p className="text-[9px] uppercase tracking-[0.2em] text-muted font-black leading-none mt-0.5">Prompt Library</p>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-1.5 p-1 bg-input-bg rounded-2xl border border-border">
        <Link href="/" className="px-4 py-2 text-sm font-black rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-insta" />
          Dashboard
        </Link>
        <Link href="/library" className="px-4 py-2 text-sm font-black rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all flex items-center gap-2">
          <Compass className="w-4 h-4 text-insta" />
          Explore Library
        </Link>
        <Link href="/guides" className="px-4 py-2 text-sm font-black rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-insta" />
          Guides
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-2xl border border-border bg-input-bg hover:scale-110 active:scale-95 transition-all group overflow-hidden relative"
          aria-label="Toggle theme"
        >
          <div className="relative z-10">
            {dark ? <Sun className="w-5 h-5 group-hover:text-insta transition-colors" /> : <Moon className="w-5 h-5 group-hover:text-insta transition-colors" />}
          </div>
        </button>
        <Link 
          href="/library"
          className="bg-insta px-6 py-2.5 rounded-2xl text-sm font-black text-white shadow-2xl shadow-orange-500/40 hover:scale-[1.05] active:scale-[0.98] transition-all"
        >
          Get Started
        </Link>
      </div>

    </nav>
  );
}
