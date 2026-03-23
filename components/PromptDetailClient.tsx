"use client";

import { useState, useEffect, useMemo } from 'react';
import promptsData from '@/data/prompts.json';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, Terminal, Tag, Zap, ChevronLeft, ArrowRight, 
  Lightbulb, AlertTriangle, FileCode, CheckCircle2, 
  Settings, Play, Send, Search, BookOpen, Sparkles,
  X, LayoutGrid
} from 'lucide-react';
import Link from 'next/link';

export default function PromptDetailClient({ id }: { id: string }) {
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
             <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-insta text-white shadow-lg shadow-orange-500/10">
               {prompt.category}
             </span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-input-bg text-muted border border-border">
               {prompt.difficulty}
             </span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-foreground leading-[0.9]">{prompt.title}</h1>
           <p className="text-xl text-muted font-bold leading-relaxed">{prompt.use_case}</p>
        </div>
        <div className="flex flex-wrap gap-3">
           {prompt.tags.map(tag => (
             <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-muted flex items-center gap-2 px-4 py-2 border border-border rounded-[1.2rem] bg-input-bg text-foreground">
               <span className="w-1.5 h-1.5 rounded-full bg-insta" /> {tag}
             </span>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Dynamic Editor */}
          {prompt.template_variables && prompt.template_variables.length > 0 && (
            <section className="glass-card rounded-[2.5rem] overflow-hidden border-insta/10 shadow-2xl shadow-orange-500/5">
              <div className="px-10 py-6 border-b border-border flex items-center justify-between bg-input-bg/50">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-insta flex items-center gap-3">
                   <Settings className="w-4 h-4" /> 1. Configure Template
                </h3>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {prompt.template_variables.map(variable => (
                  <div key={variable} className="flex flex-col gap-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted">{variable.replace(/_/g, ' ')}</label>
                    <input 
                      type="text" 
                      placeholder={`Enter ${variable}...`}
                      value={variables[variable] || ''}
                      onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                      className="px-5 py-3.5 rounded-2xl border border-border bg-input-bg focus:ring-2 focus:ring-insta/20 focus:border-insta transition-all font-black text-sm placeholder:text-muted/40 text-foreground"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prompt Output */}
          <section className="flex flex-col gap-6">
             <div className="flex items-center justify-between px-3">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-insta" /> 2. Generate Result
               </h3>
               <button 
                  onClick={() => setVariables({})} 
                  className="text-[9px] font-black uppercase tracking-[0.2em] text-muted hover:text-insta transition-colors flex items-center gap-2"
                >
                  <X className="w-3 h-3" /> Reset values
               </button>
             </div>
             
             <div className="flex flex-col gap-8">
                <div className="glass-card rounded-[2.5rem] p-10 border-border/50 relative group bg-background">
                   <div className="absolute top-6 right-6 flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(finalPrompt, 'main-copy')}
                        className="p-3 rounded-2xl border border-border bg-input-bg shadow-sm hover:border-insta group/btn transition-all active:scale-95"
                      >
                         {copyStatus === 'main-copy' ? <CheckCircle2 className="w-5 h-5 text-insta" /> : <Copy className="w-5 h-5 text-muted group-hover/btn:text-insta transition-colors" />}
                      </button>
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-insta/60 mb-6">Final Optimized Prompt</h4>
                   <p className="text-xl font-black leading-relaxed whitespace-pre-wrap text-foreground">{finalPrompt}</p>
                </div>

                <div className="glass-card rounded-[2.5rem] p-10 border-insta/20 bg-insta text-white relative shadow-[0_20px_50px_-20px_rgba(234,88,12,0.5)] overflow-hidden group">
                   <div className="absolute top-0 right-0 p-12 opacity-10 -rotate-12 translate-x-12 -translate-y-12 group-hover:rotate-0 transition-transform duration-1000">
                      <Zap className="w-64 h-64" />
                   </div>
                   <div className="absolute top-6 right-6">
                      <button 
                        onClick={() => copyToClipboard(finalCopilotPrompt, 'copilot-copy')}
                        className="px-6 py-3 rounded-[1.2rem] bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all active:scale-95"
                      >
                         {copyStatus === 'copilot-copy' ? <CheckCircle2 className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                         {copyStatus === 'copilot-copy' ? 'Copied' : 'For Copilot'}
                      </button>
                   </div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-6">Copilot-Ready (Comment Style)</h4>
                   <p className="text-xl font-mono font-black leading-relaxed whitespace-pre-wrap truncate line-clamp-2 md:line-clamp-none">
                     {finalCopilotPrompt}
                   </p>
                </div>
             </div>
          </section>

          {/* Workflow Tabs */}
          <section className="mt-12">
             <div className="flex gap-2 p-1.5 bg-input-bg border border-border rounded-[1.8rem] mb-12 overflow-x-auto">
                {[
                  { id: 'explanation', icon: Lightbulb, label: 'Explanation' },
                  { id: 'usage', icon: Send, label: 'Usage Guide' },
                  { id: 'example', icon: FileCode, label: 'Results Example' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-3.5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all rounded-[1.4rem] ${activeTab === tab.id ? 'bg-insta text-white shadow-xl shadow-orange-500/20' : 'text-muted hover:text-foreground font-black'}`}
                  >
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
             </div>


             <div className="min-h-[400px]">
               <AnimatePresence mode="wait">
                 {activeTab === 'explanation' && (
                   <motion.div key="exp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-10">
                      <div className="p-10 rounded-[2.5rem] bg-input-bg border border-border relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Lightbulb className="w-32 h-32 text-insta" />
                         </div>
                         <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-insta mb-6 flex items-center gap-3">
                           <Zap className="w-4 h-4" /> Why it works
                          </h5>
                         <p className="text-xl text-muted leading-relaxed font-bold">{prompt.explanation}</p>
                      </div>
                      <div>
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted mb-6">Core Benefits</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="p-6 rounded-[1.8rem] border border-border flex items-start gap-4 hover:border-insta transition-colors">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                                <div className="text-sm font-black uppercase tracking-wider leading-relaxed">Standardized Playwright practices across teams.</div>
                             </div>
                             <div className="p-6 rounded-[1.8rem] border border-border flex items-start gap-4 hover:border-insta transition-colors">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                                <div className="text-sm font-black uppercase tracking-wider leading-relaxed">Reduces syntax errors and boilerplate writing.</div>
                             </div>
                          </div>
                      </div>
                   </motion.div>
                 )}

                 {activeTab === 'usage' && (
                   <motion.div key="usage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-10">
                      <div className="grid grid-cols-1 gap-6">
                         {[
                           { step: '01', title: 'Open VS Code', desc: 'Navigate to your test folder (e.g., tests/e2e/) and create a new .spec.ts file.' },
                           { step: '02', title: 'Paste the Copilot Prompt', desc: 'Paste the &quot;For Copilot&quot; text as a comment at the top of your file or above a test() block.', highlight: true },
                           { step: '03', title: 'Trigger Copilot', desc: 'Press Enter after the comment and wait for Copilot to suggest the code block. Press Tab to accept.' }
                         ].map((item) => (
                           <div key={item.step} className={`p-8 rounded-[2rem] border ${item.highlight ? 'border-insta bg-insta/5' : 'border-border bg-input-bg'} flex items-start gap-8`}>
                              <div className={`w-12 h-12 rounded-2xl ${item.highlight ? 'bg-insta text-white shadow-lg shadow-pink-500/20' : 'bg-background text-muted'} flex items-center justify-center text-lg font-black shrink-0`}>
                                {item.step}
                              </div>
                              <div>
                                 <h6 className="text-xl font-black mb-2 tracking-tight">{item.title}</h6>
                                 <p className="text-muted font-medium leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                      <div className="p-8 rounded-[2rem] border border-insta-orange/20 bg-insta-orange/5 flex items-start gap-5">
                         <AlertTriangle className="w-8 h-8 text-insta-orange mt-1 shrink-0" />
                         <div className="text-base font-bold text-muted leading-relaxed">
                           <strong className="text-insta-orange uppercase tracking-widest text-xs block mb-1">Placement is key</strong> {prompt.guidance}
                         </div>
                      </div>
                   </motion.div>
                 )}

                 {activeTab === 'example' && (
                   <motion.div key="example" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="flex flex-col gap-4">
                            <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted px-4">Problem (Non-standard)</h6>
                            <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-border text-slate-300 font-mono text-sm overflow-x-auto whitespace-pre">
                               {prompt.before || '// No standardize pattern used...'}
                            </div>
                         </div>
                         <div className="flex flex-col gap-4">
                            <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-insta px-4">Solution (Optimized)</h6>
                            <div className="p-8 rounded-[2.5rem] bg-[#0d1117] border border-insta/20 text-white font-mono text-sm overflow-x-auto whitespace-pre shadow-2xl shadow-pink-500/10">
                               {prompt.after || '// Resulting Playwright test...'}
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col gap-6">
                          <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 px-4 flex items-center gap-3">
                             <Play className="w-4 h-4" /> Realistic Output Preview
                          </h6>
                          <div className="p-12 rounded-[3.5rem] bg-slate-950 border border-border shadow-2xl overflow-hidden relative">
                             <div className="absolute top-0 right-0 p-8 flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-800" />
                                <div className="w-3 h-3 rounded-full bg-slate-800" />
                                <div className="w-3 h-3 rounded-full bg-slate-800" />
                             </div>
                             <pre className="font-mono text-base text-emerald-400/90 leading-relaxed overflow-x-auto">
                               {prompt.example_output || '// Loading output snippet...'}
                             </pre>
                          </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-10">
           <div className="glass-card p-10 rounded-[3rem] border-border sticky top-32 bg-input-bg/30">
             <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-3 text-insta">
                <LayoutGrid className="w-5 h-5" /> Copy Workflow
             </h4>
             <div className="flex flex-col gap-6">
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(prompt, null, 2), 'workflow-copy')}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-[1.8rem] border border-border bg-background hover:border-insta hover:shadow-xl transition-all font-black group"
                >
                  <span className="text-xs uppercase tracking-widest">Full Data Object</span>
                  {copyStatus === 'workflow-copy' ? <CheckCircle2 className="w-5 h-5 text-insta" /> : <ArrowRight className="w-5 h-5 text-muted group-hover:text-insta transition-all" />}
                </button>
                <div className="p-8 rounded-[2rem] bg-insta/5 border border-insta/10">
                   <p className="text-[10px] font-black text-insta uppercase tracking-[0.3em] mb-4 flex items-center gap-2 underline underline-offset-4 decoration-2">PRO TIP</p>
                   <p className="text-sm text-muted font-bold leading-relaxed">
                     Inject these prompts into your <code>.github/copilot-instructions</code> to train Copilot on your team&apos;s style.
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
                <Link href="/guides" className="group flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-input-bg border border-border group-hover:bg-insta group-hover:text-white transition-all shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-insta transition-all">Setup Guides</span>
                </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
