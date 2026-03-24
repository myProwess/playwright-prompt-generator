"use client";

import { motion } from 'framer-motion';
import { Copy, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Prompt {
  id: string;
  title: string;
  category: string;
  prompt: string;
  example: string;
}

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'UI': return 'text-sky-500 bg-sky-500/5 border-sky-500/20';
    case 'API': return 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20';
    case 'Advanced': return 'text-amber-500 bg-amber-500/5 border-amber-500/20';
    case 'Edge': return 'text-rose-500 bg-rose-500/5 border-rose-500/20';
    default: return 'text-muted bg-muted/5 border-muted/20';
  }
};

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border-2 ${getCategoryColor(prompt.category)}`}>
            {prompt.category}
          </span>
        </div>

        <Link href={`/prompt/${prompt.id}`} className="group-hover:opacity-80 transition-opacity">
          <h3 className="text-xl font-black leading-tight tracking-tight mb-3 text-foreground line-clamp-2">{prompt.title}</h3>
        </Link>
        <p className="text-sm text-muted font-bold line-clamp-3 mb-6 leading-relaxed">
          {prompt.prompt}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-auto translate-y-2 group-hover:translate-y-0 transition-transform duration-500 opacity-90 group-hover:opacity-100">
          <button 
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[11px] font-black bg-insta text-white shadow-xl shadow-orange-500/20 active:scale-95 uppercase tracking-widest"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </button>
          <Link 
            href={`/prompt/${prompt.id}`}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-[11px] font-black border border-border bg-input-bg hover:bg-white dark:hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-foreground"
          >
            <ArrowRight className="w-3.5 h-3.5 text-muted" />
            Details
          </Link>
        </div>
      </div>
    </motion.div>

  );
}
