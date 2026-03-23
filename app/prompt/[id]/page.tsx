"use client";

import { useState, useEffect, useMemo } from 'react';
import promptsData from '@/data/prompts.json';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, Terminal, Tag, Zap, ChevronLeft, ArrowRight, 
  Lightbulb, AlertTriangle, FileCode, CheckCircle2, 
  Settings, Play, Send, Search, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export function generateStaticParams() {
  return promptsData.map((prompt) => ({
    id: prompt.id,
  }));
}

export default function PromptDetail() {
  const params = useParams();
  const id = params.id as string;
  const prompt = promptsData.find(p => p.id === id);

  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'explanation' | 'usage' | 'example'>('explanation');

  useEffect(() => {
    if (prompt?.template_variables) {
      const initialVars: Record<string, string> = {};
      prompt.template_variables.forEach(v => initialVars[v] = '');
      setVariables(initialVars);
    }
  }, [prompt]);

  const finalPrompt = useMemo(() => {
    if (!prompt) return '';
    let text = prompt.prompt;
    Object.entries(variables).forEach(([key, val]) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), val || `{{${key}}}`);
    });
    return text;
  }, [prompt, variables]);

  const finalCopilotPrompt = useMemo(() => {
    if (!prompt) return '';
    let text = prompt.copilot_prompt;
    Object.entries(variables).forEach(([key, val]) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), val || `{{${key}}}`);
    });
    return text;
  }, [prompt, variables]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  if (!prompt) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center gap-6">
        <AlertTriangle className="w-16 h-16 text-amber-500" />
        <h1 className="text-3xl font-black">Prompt not found</h1>
        <Link href="/library" className="bg-primary-600 px-6 py-3 rounded-xl text-white font-bold tracking-tight">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-20">
      <Link href="/library" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors w-fit group">
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Library
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-10">
        <div>
           <div className="flex items-center gap-3 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 border border-primary-200 dark:border-primary-800">
               {prompt.category}
             </span>
             <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
               {prompt.difficulty}
             </span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{prompt.title}</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">{prompt.use_case}</p>
        </div>
        <div className="flex flex-wrap gap-2">
           {prompt.tags.map(tag => (
             <span key={tag} className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg bg-slate-50 dark:bg-slate-900/50">
               <Tag className="w-3 h-3" /> {tag}
             </span>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Dynamic Editor */}
          {prompt.template_variables && prompt.template_variables.length > 0 && (
            <section className="glass-card rounded-3xl overflow-hidden border-primary-500/20 shadow-xl shadow-primary-500/5">
              <div className="px-8 py-5 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary-600 flex items-center gap-2">
                   <Settings className="w-4 h-4" /> 1. Configure Template
                </h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-900/20">
                {prompt.template_variables.map(variable => (
                  <div key={variable} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{variable.replace(/_/g, ' ')}</label>
                    <input 
                      type="text" 
                      placeholder={`Enter ${variable}...`}
                      value={variables[variable] || ''}
                      onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all font-medium text-sm"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prompt Output */}
          <section className="flex flex-col gap-4">
             <div className="flex items-center justify-between px-2">
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> 2. Generate Result
               </h3>
               <button 
                  onClick={() => setVariables({})} 
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors"
                >
                  Reset values
               </button>
             </div>
             
             <div className="flex flex-col gap-6">
                <div className="glass-card rounded-3xl p-8 border-border relative group">
                   <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(finalPrompt, 'main-copy')}
                        className="p-2.5 rounded-xl border border-border bg-white dark:bg-slate-800 shadow-sm hover:border-primary-400 group/btn transition-all"
                      >
                         {copyStatus === 'main-copy' ? <CheckCircle2 className="w-4 h-4 text-primary-600" /> : <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                      </button>
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600/60 mb-4">Final Optimized Prompt</h4>
                   <p className="text-lg font-medium leading-relaxed whitespace-pre-wrap">{finalPrompt}</p>
                </div>

                <div className="glass-card rounded-3xl p-8 border-primary-500/20 bg-primary-600 text-white relative shadow-xl shadow-primary-600/20 overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-4 -translate-y-4">
                      <Zap className="w-48 h-48" />
                   </div>
                   <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => copyToClipboard(finalCopilotPrompt, 'copilot-copy')}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center gap-2 text-xs font-bold transition-all active:scale-95"
                      >
                         {copyStatus === 'copilot-copy' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
                         {copyStatus === 'copilot-copy' ? 'Copied!' : 'Copy for Copilot'}
                      </button>
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-4">Copilot-Ready (Comment Style)</h4>
                   <p className="text-lg font-mono font-medium leading-relaxed whitespace-pre-wrap truncate line-clamp-2 md:line-clamp-none">
                     {finalCopilotPrompt}
                   </p>
                </div>
             </div>
          </section>

          {/* Workflow Tabs */}
          <section className="mt-8">
             <div className="flex gap-1 border-b border-border mb-8 overflow-x-auto pb-2 md:pb-0">
                <button 
                   onClick={() => setActiveTab('explanation')}
                   className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === 'explanation' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Explanation
                  </div>
                </button>
                <button 
                   onClick={() => setActiveTab('usage')}
                   className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === 'usage' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Usage Guide
                  </div>
                </button>
                <button 
                   onClick={() => setActiveTab('example')}
                   className={`px-6 py-3 text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${activeTab === 'example' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4" /> Results Example
                  </div>
                </button>
             </div>

             <div className="min-h-[300px]">
               {activeTab === 'explanation' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 py-4">
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                       <h5 className="text-sm font-bold mb-3 flex items-center gap-2">
                         <Zap className="w-4 h-4 text-primary-600" /> Why this prompt works
                        </h5>
                       <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{prompt.explanation}</p>
                    </div>
                    <div>
                        <h5 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Core Benefits</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl border border-border flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                              <div className="text-sm font-semibold">Standardized Playwright practices across teams.</div>
                           </div>
                           <div className="p-4 rounded-xl border border-border flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                              <div className="text-sm font-semibold">Reduces syntax errors and boilerplate writing.</div>
                           </div>
                        </div>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'usage' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col gap-8">
                       <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0">1</div>
                          <div>
                             <h6 className="font-bold mb-1">Open VS Code</h6>
                             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Navigate to your test folder (e.g., <code>tests/e2e/</code>) and create a new <code>.spec.ts</code> file.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4 text-primary-600">
                          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0">2</div>
                          <div>
                             <h6 className="font-bold mb-1 underline underline-offset-4 decoration-2">Paste the Copilot Prompt</h6>
                             <p className="text-sm font-medium">Paste the "For Copilot" text as a comment at the top of your file or above a <code>test()</code> block.</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-black flex-shrink-0">3</div>
                          <div>
                             <h6 className="font-bold mb-1">Trigger Copilot</h6>
                             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Press <code>Enter</code> after the comment and wait for Copilot to suggest the code block. Press <code>Tab</code> to accept.</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-4 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-4">
                       <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
                       <div className="text-sm font-medium text-amber-700 dark:text-amber-400/80 leading-relaxed">
                         <strong>Placement is key:</strong> {prompt.guidance}
                       </div>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'example' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="flex flex-col gap-3">
                          <h6 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Problem (Non-standard)</h6>
                          <div className="p-6 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto whitespace-pre border border-slate-800">
                             {prompt.before || '// No standardize pattern used...'}
                          </div>
                       </div>
                       <div className="flex flex-col gap-3">
                          <h6 className="text-[10px] font-black uppercase tracking-widest text-primary-600 px-4">Solution (Optimized)</h6>
                          <div className="p-6 rounded-2xl bg-[#0d1117] text-primary-100 font-mono text-xs overflow-x-auto whitespace-pre border border-primary-500/20 shadow-lg shadow-primary-500/5">
                             {prompt.after || '// Resulting Playwright test...'}
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h6 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 px-4 flex items-center gap-2">
                           <Play className="w-3 h-3" /> Realistic Output Preview
                        </h6>
                        <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative">
                           <div className="absolute top-0 right-0 p-4 flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                           </div>
                           <pre className="font-mono text-[13px] text-emerald-400/90 leading-relaxed overflow-x-auto">
                             {prompt.example_output || '// Loading output snippet...'}
                           </pre>
                        </div>
                    </div>
                 </motion.div>
               )}
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
           <div className="glass-card p-6 rounded-3xl border-border sticky top-32">
             <h4 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Copy className="w-4 h-4 text-primary-600" /> Copy Workflow
             </h4>
             <div className="flex flex-col gap-4">
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(prompt, null, 2), 'workflow-copy')}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-border hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-bold group"
                >
                  <span className="text-sm">Full Data Object</span>
                  {copyStatus === 'workflow-copy' ? <CheckCircle2 className="w-4 h-4 text-primary-600" /> : <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transition-colors" />}
                </button>
                <div className="p-5 rounded-2xl bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/50">
                   <p className="text-xs font-bold text-primary-700 dark:text-primary-400 mb-2">PRO TIP</p>
                   <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     You can add several of these prompts to your project's <code>.github/copilot-instructions</code> file to permanently train Copilot on your team's specific Playwright style.
                   </p>
                </div>
             </div>

             <div className="mt-10 pt-10 border-t border-border flex flex-col gap-6">
                <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Next Steps</h5>
                <Link href="/library" className="group flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold group-hover:text-primary-600 transition-colors">Browse other prompts</span>
                </Link>
                <Link href="/guides" className="group flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold group-hover:text-primary-600 transition-colors">Study the usage guide</span>
                </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
