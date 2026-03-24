"use client";

import { useState } from 'react';
import promptsData from '@/data/prompts.json';
import enterpriseData from '@/data/enterprise_prompts.json';
import { motion } from 'framer-motion';
import { 
  Copy, ChevronLeft, ArrowRight, 
  AlertTriangle, CheckCircle2, 
  Search, BookOpen, FileCode,
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

export default function PromptDetailClient({ id }: { id: string }) {
  const allPrompts = [...promptsData, ...enterpriseData];
  const prompt = allPrompts.find(p => p.id === id);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center gap-8">
        <div className="w-24 h-24 rounded-full bg-input-bg flex items-center justify-center border border-border">
           <AlertTriangle className="w-12 h-12 text-insta" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase text-foreground">Prompt not found</h1>
          <p className="text-muted font-bold">The prompt you are looking for does not exist or has been moved.</p>
        </div>
        <Link href="/library" className="bg-insta px-8 py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
          Return to Library
        </Link>
      </div>
    );
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'UI': return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
      case 'API': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Advanced': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Edge': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-muted bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-24">
      <Link href="/library" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-muted hover:text-insta transition-all w-fit group text-foreground">
        <div className="p-2 bg-input-bg border border-border rounded-xl group-hover:bg-insta group-hover:text-white transition-all shadow-sm">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Back to Library
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-border pb-12">
        <div className="max-w-3xl">
           <div className="flex items-center gap-3 mb-6">
             <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border-2 ${getCategoryColor(prompt.category)}`}>
               {prompt.category}
             </span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-foreground leading-[0.9]">{prompt.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Prompt Section */}
          <section className="flex flex-col gap-6">
             <div className="glass-card rounded-[2.5rem] p-10 border-border/50 relative group bg-background">
                <div className="absolute top-6 right-6 flex gap-2">
                   <button 
                     onClick={() => copyToClipboard(prompt.prompt, 'prompt-copy')}
                     className="px-5 py-2.5 rounded-2xl border border-border bg-input-bg shadow-sm hover:border-insta group/btn transition-all active:scale-95 flex items-center gap-2"
                   >
                      {copyStatus === 'prompt-copy' ? <CheckCircle2 className="w-4 h-4 text-insta" /> : <Copy className="w-4 h-4 text-muted group-hover/btn:text-insta transition-colors" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{copyStatus === 'prompt-copy' ? 'Copied!' : 'Copy Prompt'}</span>
                   </button>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-insta/60 mb-6">Prompt</h4>
                <p className="text-xl font-black leading-relaxed whitespace-pre-wrap text-foreground pr-32">{prompt.prompt}</p>
             </div>
          </section>

          {/* Example Section */}
          <section className="flex flex-col gap-6">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted px-4 flex items-center gap-3">
                <FileCode className="w-4 h-4 text-insta" /> Example Code
             </h4>
             <div className="relative">
                <div className="absolute top-6 right-6 z-10">
                   <button 
                      onClick={() => copyToClipboard(prompt.example, 'example-copy')}
                      className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 text-white"
                   >
                      {copyStatus === 'example-copy' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copyStatus === 'example-copy' ? 'Copied!' : 'Copy'}
                   </button>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-slate-950 border border-border shadow-2xl overflow-hidden relative">
                   <div className="absolute top-0 left-0 p-6 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                   </div>
                   <pre className="font-mono text-sm text-emerald-400/90 leading-relaxed overflow-x-auto whitespace-pre-wrap mt-4">
                     {prompt.example}
                   </pre>
                </div>
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-10">
           <div className="glass-card p-10 rounded-[3rem] border-border sticky top-32 bg-input-bg/30">
             <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-3 text-insta">
                <LayoutGrid className="w-5 h-5" /> Quick Actions
             </h4>
             <div className="flex flex-col gap-6">
                <button 
                  onClick={() => copyToClipboard(prompt.prompt, 'sidebar-prompt')}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] bg-insta text-white font-black shadow-xl shadow-orange-500/20 active:scale-95 transition-all group"
                >
                  <span className="text-xs uppercase tracking-widest">Copy Prompt</span>
                  {copyStatus === 'sidebar-prompt' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => copyToClipboard(prompt.example, 'sidebar-example')}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] border border-border bg-background hover:border-insta hover:shadow-xl transition-all font-black group"
                >
                  <span className="text-xs uppercase tracking-widest">Copy Example</span>
                  {copyStatus === 'sidebar-example' ? <CheckCircle2 className="w-5 h-5 text-insta" /> : <ArrowRight className="w-5 h-5 text-muted group-hover:text-insta transition-all" />}
                </button>
                <div className="p-8 rounded-[2rem] bg-insta/5 border border-insta/10">
                   <p className="text-[10px] font-black text-insta uppercase tracking-[0.3em] mb-4 flex items-center gap-2 underline underline-offset-4 decoration-2">PRO TIP</p>
                   <p className="text-sm text-muted font-bold leading-relaxed">
                     Paste this prompt as a comment in your <code>.spec.ts</code> file and let Copilot generate the test.
                   </p>
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-border flex flex-col gap-8">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted">Next Steps</h5>
                <Link href="/library" className="group flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-input-bg border border-border group-hover:bg-insta group-hover:text-white transition-all shadow-sm">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-insta transition-all">Browse Prompts</span>
                </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
