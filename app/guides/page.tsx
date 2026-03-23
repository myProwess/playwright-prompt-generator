"use client";

import { motion } from 'framer-motion';
import { 
  Terminal, Zap, CheckCircle2, AlertTriangle, 
  Code, Play, Copy, BookOpen, Send
} from 'lucide-react';
import Link from 'next/link';

export default function Guides() {
  return (
    <div className="flex flex-col gap-16 max-w-4xl mx-auto pb-20">
      <div className="border-b border-border pb-12">
        <h1 className="text-4xl font-black tracking-tight mb-4">GitHub Copilot <span className="text-primary-600">Usage Guide</span></h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
          Learn how to turn these prompts into production-ready Playwright tests using GitHub Copilot in VS Code.
        </p>
      </div>

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-8">
           <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-primary-500/20">1</div>
              <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold">Pick the right prompt</h2>
                 <p className="text-slate-600 dark:text-slate-400 font-medium italic">"Find a prompt that matches your specific scenario (e.g., handling iframes or API auth)."</p>
                 <div className="mt-2 glass-card p-4 rounded-xl border-dashed">
                    <p className="text-sm font-medium">Browse our <Link href="/library" className="text-primary-600 font-bold hover:underline">Library</Link> and find a card that fits your current task.</p>
                 </div>
              </div>
           </div>

           <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-primary-500/20">2</div>
              <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold">Configure and Copy</h2>
                 <p className="text-slate-600 dark:text-slate-400 font-medium">Use the interactive fields to fill in your specific URLs and selectors.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="p-4 rounded-xl border border-border bg-slate-50 dark:bg-slate-900/50">
                       <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Internal Prompt</h4>
                       <p className="text-xs font-semibold">Copies a clean version for reference.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary-500/20 bg-primary-600/5">
                       <h4 className="text-[10px] font-black uppercase text-primary-600 mb-2">Copilot Version</h4>
                       <p className="text-xs font-semibold">Copies with comment markers (e.g., // Playwright: ...).</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-primary-500/20">3</div>
              <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold">Activate Copilot in VS Code</h2>
                 <p className="text-slate-600 dark:text-slate-400 font-medium">Paste the "Copilot Version" into your test file. Press <code>Enter</code>.</p>
                 <div className="mt-4 p-8 rounded-3xl bg-slate-950 border border-slate-800 relative">
                    <div className="font-mono text-[13px] text-slate-300">
                      <p className="text-slate-500">// Playwright: Generate a POM for Login...</p>
                      <p className="mt-2 text-slate-600 italic">| ← Press Enter here</p>
                      <div className="mt-4 px-2 py-1 bg-primary-600/20 text-primary-400 border border-primary-500/30 rounded inline-block">
                         Suggestion: export class LoginPage {' { ... } '}
                      </div>
                      <p className="mt-4 text-[10px] text-slate-500 font-bold tracking-widest uppercase">Press TAB to accept</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg shadow-primary-500/20">4</div>
              <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold">Review and Refine</h2>
                 <p className="text-slate-600 dark:text-slate-400 font-medium">Always verify the generated code. Ensure it uses your team's specific helpers or utilities.</p>
                 <div className="mt-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <p className="text-sm font-medium">Verify that Copilot used <code>Role</code> selectors (like <code>getByRole</code>) for maximum accessibility.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="mt-12 p-8 rounded-3xl bg-primary-600 text-white shadow-2xl shadow-primary-600/20">
         <h2 className="text-2xl font-black mb-4">Ready to automate?</h2>
         <p className="text-primary-100 font-medium mb-8">Start by exploring the library and picking your first automation task.</p>
         <Link href="/library" className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-[1.03] transition-all inline-block">
            Start Browsing
         </Link>
      </section>
    </div>
  );
}
