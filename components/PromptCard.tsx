"use client";

import { motion } from 'framer-motion';
import { Copy, Terminal, Tag, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  tags: string[];
  prompt: string;
  copilot_prompt: string;
  use_case: string;
}

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff.toLowerCase()) {
      case 'beginner': return 'text-emerald-500 bg-emerald-500/5 border-emerald-500/10';
      case 'intermediate': return 'text-amber-500 bg-amber-500/5 border-amber-500/10';
      case 'advanced': return 'text-rose-500 bg-rose-500/5 border-rose-500/10';
      default: return 'text-muted bg-muted/5 border-muted/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-[2rem] group overflow-hidden flex flex-col h-full border-border/50 relative p-1.5"
    >
      <div className="bg-background rounded-[1.8rem] p-6 flex flex-col flex-1 h-full">
        <div className="flex justify-between items-center mb-5">
           <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border-2 ${getDifficultyColor(prompt.difficulty)}`}>
                {prompt.difficulty}
              </span>
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest bg-input-bg text-muted px-3 py-1.5 rounded-xl border border-border">
             {prompt.category}
           </span>
        </div>

        <Link href={`/prompt/${prompt.id}`} className="group-hover:opacity-80 transition-opacity">
          <h3 className="text-xl font-black leading-tight tracking-tight mb-3 text-foreground line-clamp-2">{prompt.title}</h3>
        </Link>
        <p className="text-sm text-muted font-bold line-clamp-2 mb-6 leading-relaxed">
          {prompt.use_case}
        </p>

        <div className="flex flex-wrap gap-3 mt-auto mb-6">
          {prompt.tags.slice(0, 3).map(tag => (
            <span key={tag} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-muted">
               <span className="w-1.5 h-1.5 rounded-full bg-insta shrink-0" /> {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-90 group-hover:opacity-100">
          <button 
            onClick={() => copyToClipboard(prompt.prompt, 'prompt')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[11px] font-black border border-border bg-input-bg hover:bg-white dark:hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-foreground"
          >
            {copyStatus === 'prompt' ? <CheckCircle2 className="w-3.5 h-3.5 text-insta" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
            {copyStatus === 'prompt' ? 'Copied' : 'Prompt'}
          </button>
          <button 
            onClick={() => copyToClipboard(prompt.copilot_prompt, 'copilot')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[11px] font-black bg-insta text-white shadow-xl shadow-orange-500/20 active:scale-95 uppercase tracking-widest"
          >
            {copyStatus === 'copilot' ? <Zap className="w-3.5 h-3.5 animate-pulse" /> : <Terminal className="w-3.5 h-3.5" />}
            {copyStatus === 'copilot' ? 'Copied' : 'Copilot'}
          </button>
        </div>
      </div>
    </motion.div>

  );
}
