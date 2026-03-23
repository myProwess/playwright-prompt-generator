"use client";

import { Terminal, Code, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 py-12 px-4 md:px-8 border-t border-border bg-slate-50 dark:bg-[#0a0b0d] flex-shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="max-w-sm text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 group justify-center md:justify-start">
            <Terminal className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-bold">Playwright <span className="text-primary-600">Copilot</span></h2>
          </Link>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
            Helping QA engineers and developers ship faster with standardized Playwright prompts and GitHub Copilot best practices.
          </p>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
             <a href="#" className="p-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-primary-600">
               <Terminal className="w-5 h-5" />
             </a>
             <a href="#" className="p-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-primary-600">
               <Code className="w-5 h-5" />
             </a>
             <a href="#" className="p-2.5 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-500 hover:text-primary-600">
               <PlayCircle className="w-5 h-5" />
             </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-600/80 mb-4">Library</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/library?cat=Login" className="hover:text-primary-600">Login flows</Link></li>
              <li><Link href="/library?cat=API" className="hover:text-primary-600">API testing</Link></li>
              <li><Link href="/library?cat=POM" className="hover:text-primary-600">POM structure</Link></li>
              <li><Link href="/library?cat=Regression" className="hover:text-primary-600">Visual regression</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-600/80 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="/guides" className="hover:text-primary-600">GitHub Usage Guide</Link></li>
              <li><Link href="/best-practices" className="hover:text-primary-600">Best Practices</Link></li>
              <li><Link href="/templates" className="hover:text-primary-600">Starter Templates</Link></li>
            </ul>
          </div>
          <div className="hidden md:block">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-600/80 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link href="#" className="hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary-600">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        © 2026 Playwright Copilot Hub • Built for modern QA Teams
      </div>
    </footer>
  );
}
