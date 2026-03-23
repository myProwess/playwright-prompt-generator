"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Terminal, Moon, Sun, Search, LayoutDashboard, Bookmark, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <nav className="glass-header px-4 md:px-8 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="bg-primary-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-primary-500/20">
          <Terminal className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Playwright <span className="text-primary-600">Copilot</span></h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold leading-none">Prompt Library</p>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-sm font-medium hover:text-primary-600 transition-colors flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <Link href="/library" className="text-sm font-medium hover:text-primary-600 transition-colors flex items-center gap-2">
          <Search className="w-4 h-4" />
          Explore Library
        </Link>
        <Link href="/guides" className="text-sm font-medium hover:text-primary-600 transition-colors flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Guides
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />}
        </button>
        <Link 
          href="/library"
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-xl shadow-primary-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
