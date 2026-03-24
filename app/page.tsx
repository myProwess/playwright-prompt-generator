"use client";

import { motion } from 'framer-motion';
import { Terminal, Zap, Search, ArrowRight, Sparkles, Layout } from 'lucide-react';
import Link from 'next/link';
import promptsData from '@/data/prompts.json';
import PromptCard from '@/components/PromptCard';

export default function Home() {
  const featuredPrompts = promptsData.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden flex flex-col items-center text-center max-w-5xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10 p-1 rounded-2xl bg-input-bg border border-border inline-flex items-center gap-3 pr-5 shadow-sm overflow-hidden relative"
        >
          <div className="bg-insta px-4 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/20">
            NEW
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-muted flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-insta" /> {promptsData.length} Playwright prompts ready
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-foreground"
        >
           Generate <span className="text-insta italic">Playwright</span> <br className="hidden md:block" /> Tests in <span className="underline decoration-insta/20 decoration-8 underline-offset-[12px]">Seconds</span>
        </motion.h1>
         
        <motion.p 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-muted max-w-3xl mb-14 font-black leading-relaxed"
        >
          Stop writing repetitive boilerplate. Use our curated prompt library to generate quality, standardized automation with <span className="text-foreground font-black">GitHub Copilot</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link 
            href="/library" 
            className="px-10 py-5 rounded-3xl bg-insta text-white font-black text-lg shadow-[0_20px_50px_-15px_rgba(234,88,12,0.4)] hover:scale-[1.05] active:scale-[0.98] transition-all flex items-center gap-4 uppercase tracking-widest"
          >
            Explore Library
            <Search className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Dynamic Background elements */}
        <div className="absolute top-0 -left-64 w-[600px] h-[600px] bg-insta/10 rounded-full blur-[140px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 -right-64 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[140px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Featured Section */}
      <section className="flex flex-col gap-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-xl">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 px-0 bg-insta rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-insta">Popular Choice</span>
             </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Featured Prompts</h2>
            <p className="text-lg text-muted font-medium">Top prompts from our collection for daily automation tasks.</p>
          </div>
          <Link href="/library" className="group px-6 py-3 rounded-2xl bg-input-bg border border-border text-sm font-black text-foreground flex items-center gap-3 hover:border-insta transition-all hover:shadow-lg">
            View All {promptsData.length} Prompts <ArrowRight className="w-4 h-4 text-insta group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrompts.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-20 px-4">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Zap, title: 'Instant Quality', desc: 'Standardize your test patterns across the entire engineering team in seconds.' },
              { icon: Terminal, title: 'Copilot Native', desc: 'Every prompt is crafted to provide the perfect context for GitHub Copilot.' },
              { icon: Layout, title: 'Clean Architecture', desc: 'Avoid flakiness and technical debt with battle-tested patterns.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="glass-card p-10 rounded-[2.5rem] border-border/40 flex flex-col gap-6"
              >
                <div className="w-16 h-16 rounded-3xl bg-insta flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-foreground">{feature.title}</h3>
                <p className="text-base text-muted font-bold leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-24 flex flex-col items-center px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-foreground">Optimized Workflow</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto font-black italic">Deliver premium automation in four simple steps.</p>
          </div>
          
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Find', desc: 'Browse the library for your exact test scenario.' },
              { step: '02', title: 'Copy', desc: 'Click Copy Prompt to grab the optimized prompt.' },
              { step: '03', title: 'Paste', desc: 'Paste into your Playwright spec file as a comment.' },
              { step: '04', title: 'Generate', desc: 'Let Copilot generate the implementation.' }
            ].map((item) => (
              <motion.div 
                key={item.step} 
                whileHover={{ scale: 1.02 }}
                className="glass-card p-10 rounded-[2.5rem] border-border/40 flex flex-col items-start gap-6 group hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="text-5xl font-black tracking-tighter text-insta opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-2xl font-black mb-3 tracking-tight text-foreground">{item.title}</h4>
                  <p className="text-base text-muted font-bold leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
       </section>

    </div>
  );
}
