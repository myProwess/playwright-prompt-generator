"use client";

import { motion } from 'framer-motion';
import { Terminal, Zap, BookOpen, Search, Code, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import promptsData from '@/data/prompts.json';
import PromptCard from '@/components/PromptCard';

export default function Home() {
  const featuredPrompts = promptsData.slice(0, 3);
  const beginnerPrompts = promptsData.filter(p => p.difficulty === 'Beginner').slice(0, 3);

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-1.5 rounded-2xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-500/10 inline-flex items-center gap-2 pr-4 shadow-sm"
        >
          <div className="bg-primary-600 px-3 py-1 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary-500/20">
            NEW
          </div>
          <span className="text-xs font-bold text-primary-700 dark:text-primary-400">Playwright 1.50+ optimized prompts</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8"
        >
          The <span className="text-primary-600">Fastest</span> Way to Generate <span className="underline decoration-primary-300 dark:decoration-primary-700 underline-offset-8">Playwright</span> Tests
        </motion.h1>
         
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-12 font-medium"
        >
          Stop writing repetitive boilerplate. Use our expert-curated prompt library to generate high-quality, standardized Playwright scripts with GitHub Copilot in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link 
            href="/library" 
            className="px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-2xl shadow-primary-600/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3"
          >
            Explore Library
            <Search className="w-5 h-5 opacity-80" />
          </Link>
          <Link 
            href="/guides" 
            className="px-8 py-4 rounded-2xl glass-card border-border hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-lg transition-all flex items-center gap-3"
          >
            How it works
            <BookOpen className="w-5 h-5 text-primary-600" />
          </Link>
        </motion.div>

        {/* Floating background blobs */}
        <div className="absolute top-0 -left-64 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 -right-64 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Featured Section */}
      <section className="flex flex-col gap-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Featured Prompts</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Top-rated prompts for daily QA workflows</p>
          </div>
          <Link href="/library" className="group text-sm font-bold text-primary-600 flex items-center gap-2 hover:gap-3 transition-all">
            View all 30 prompts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary-600">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Standardized Automation</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Ensure every developer in your team writes Playwright tests using the same patterns, from POM to network interception.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary-600">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Copilot Ready</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Every prompt is optimized for GitHub Copilot. Just paste as a comment and watch the magic happen.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-primary-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Battle-Tested Patterns</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Curated by senior automation experts to follow industry best practices and avoid common flakiness.</p>
        </div>
      </section>

      {/* Beginner Friendly */}
      <section className="flex flex-col gap-10">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">New to Playwright?</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Start with these beginner-friendly prompts</p>
          </div>
          <Link href="/library?diff=Beginner" className="group text-sm font-bold text-primary-600 flex items-center gap-2 hover:gap-3 transition-all">
            Browse Beginner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerPrompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </section>

       {/* Quick Workflow Guide */}
       <section className="py-20 flex flex-col items-center">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4">Integrated Workflow</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">From library to production in 4 simple steps.</p>
          </div>
          
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { step: '01', title: 'Find Prompt', desc: 'Browse the library for your specific use case.' },
              { step: '02', title: 'Copy to VS Code', desc: 'Paste the prompt as a comment in your spec file.' },
              { step: '03', title: 'Copilot Magic', desc: 'Let GitHub Copilot generate the test code.' },
              { step: '04', title: 'Run & Commit', desc: 'Verify the test and push your changes.' }
            ].map((item, idx) => (
              <div key={item.step} className="glass-card p-6 rounded-3xl border-border flex flex-col items-center text-center group hover:border-primary-400 transition-colors">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary-600 font-black text-xs mb-4">{item.step}</div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
       </section>
    </div>
  );
}
