"use client";

import { Terminal, Code, PlayCircle, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 py-20 px-4 md:px-8 border-t border-border bg-input-bg/10 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24">
        <div className="max-w-md text-left">
          <Link href="/" className="flex items-center gap-3 group text-foreground">
            <div className="bg-insta p-2.5 rounded-2xl group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-orange-500/20 ring-1 ring-white/20">
               <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
               <h2 className="text-xl font-black tracking-tight text-foreground leading-[0.9]">Playwright <span className="text-insta">Copilot</span></h2>
               <p className="text-[9px] uppercase tracking-[0.2em] text-muted font-black mt-0.5">Prompt Library</p>
            </div>
          </Link>
          <p className="mt-6 text-base text-muted font-black leading-relaxed">
            Revolutionizing Playwright automation. We provide the most advanced, human-centered prompt library to help QA teams generate world-class test suites with <span className="text-foreground font-black">GitHub Copilot</span>.
          </p>
          <div className="mt-8 flex items-center gap-4">
             {[Terminal, Code, PlayCircle].map((Icon, i) => (
               <a key={i} href="#" className="p-3.5 rounded-2xl border border-border bg-input-bg hover:bg-insta hover:text-white transition-all hover:scale-110 active:scale-95 shadow-sm group">
                 <Icon className="w-5 h-5 group-hover:rotate-3 transition-transform" />
               </a>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-20 text-left w-full md:w-auto">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-insta mb-8">Library</h3>
            <ul className="space-y-4 text-sm text-foreground font-black uppercase tracking-widest">
              <li><Link href="/library?cat=Login" className="hover:text-insta transition-colors">Login flows</Link></li>
              <li><Link href="/library?cat=API" className="hover:text-insta transition-colors">API testing</Link></li>
              <li><Link href="/library?cat=POM" className="hover:text-insta transition-colors">POM structure</Link></li>
              <li><Link href="/library?cat=Regression" className="hover:text-insta transition-colors">Visual regression</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-8">Resources</h3>
            <ul className="space-y-4 text-sm text-foreground font-black uppercase tracking-widest transition-all">
              <li><Link href="/guides" className="hover:text-insta transition-colors">Usage Guide</Link></li>
              <li><Link href="/best-practices" className="hover:text-insta transition-colors">Best Practices</Link></li>
              <li><Link href="/templates" className="hover:text-insta transition-colors">Starter Packs</Link></li>
            </ul>
          </div>
          <div className="hidden md:block text-foreground">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-8">Legal</h3>
            <ul className="space-y-4 text-sm text-foreground font-black uppercase tracking-widest">
              <li><Link href="#" className="hover:text-insta transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-insta transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-insta transition-colors">System Status</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] text-muted uppercase tracking-[0.3em] font-black">
          © 2026 Playwright Copilot • Built for modern QA engineers
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted uppercase tracking-[0.3em] font-black">
           Created with <Heart className="w-3.5 h-3.5 text-insta animate-pulse" fill="currentColor" /> in the heart of the automation world
        </div>
      </div>

    </footer>
  );
}
