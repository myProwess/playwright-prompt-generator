"use client";

import { motion } from 'framer-motion';
import { Copy, Terminal, ExternalLink, Tag, Zap, MousePointer2 } from 'lucide-react';
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
      case 'beginner': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'advanced': return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl group overflow-hidden flex flex-col h-full border-border shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getDifficultyColor(prompt.difficulty)}`}>
            {prompt.difficulty}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {prompt.category}
          </span>
        </div>

        <Link href={`/prompt/${prompt.id}`} className="group-hover:text-primary-600 transition-colors">
          <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-2">{prompt.title}</h3>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {prompt.use_case}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {prompt.tags.slice(0, 3).map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-500">
               <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-border mt-auto flex items-center justify-between gap-2">
        <button 
          onClick={() => copyToClipboard(prompt.prompt, 'prompt')}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-border transition-all transition-all active:scale-95"
        >
          {copyStatus === 'prompt' ? <Zap className="w-3.5 h-3.5 text-primary-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copyStatus === 'prompt' ? 'Copied!' : 'Copy Prompt'}
        </button>
        <button 
          onClick={() => copyToClipboard(prompt.copilot_prompt, 'copilot')}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/10 active:scale-95"
        >
          {copyStatus === 'copilot' ? <Zap className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5 text-primary-100" />}
          {copyStatus === 'copilot' ? 'Copied!' : 'For Copilot'}
        </button>
      </div>
    </motion.div>
  );
}
