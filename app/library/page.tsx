"use client";

import { useState, useMemo, useEffect } from 'react';
import promptsData from '@/data/prompts.json';
import PromptCard from '@/components/PromptCard';
import { Search, Filter, Tag, Zap, X, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function Library() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');
  const diffParam = searchParams.get('diff');

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(catParam || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState(diffParam || 'All');
  
  const categories = useMemo(() => ['All', ...Array.from(new Set(promptsData.map(p => p.category)))], []);
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    if (catParam) setSelectedCategory(catParam);
    if (diffParam) setSelectedDifficulty(diffParam);
  }, [catParam, diffParam]);

  const filteredPrompts = useMemo(() => {
    return promptsData.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                           p.use_case.toLowerCase().includes(search.toLowerCase()) ||
                           p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-black tracking-tight mb-4">Prompt <span className="text-primary-600">Library</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
            Browse our full collection of {promptsData.length} optimized Playwright prompts. Filter by complexity or automation use case.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-end gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-1">Quick Search</span>
            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search prompts, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all text-sm font-medium"
              />
              {search && (
                 <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <X className="w-3.5 h-3.5" />
                 </button>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 flex flex-col gap-8">
           <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" /> Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm px-4 py-2.5 rounded-xl text-left transition-all font-semibold ${selectedCategory === cat ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/10' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>

           <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5" /> Difficulty
              </h3>
              <div className="flex flex-col gap-1.5">
                {difficulties.map(diff => (
                  <button 
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`text-sm px-4 py-2.5 rounded-xl text-left transition-all font-semibold ${selectedDifficulty === diff ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/10' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
           </div>
        </aside>

        {/* Prompts Grid */}
        <div className="lg:col-span-3 flex flex-col gap-8">
           <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800">
             <span>Showing {filteredPrompts.length} Prompts</span>
             { (search || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
               <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
                className="text-primary-600 hover:text-primary-700 underline underline-offset-4"
               >
                 Clear all filters
               </button>
             )}
           </div>

           {filteredPrompts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {filteredPrompts.map(prompt => (
                 <PromptCard key={prompt.id} prompt={prompt} />
               ))}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center p-20 glass-card rounded-3xl border-dashed border-2 border-slate-200 dark:border-slate-800 text-center gap-4">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold">No prompts found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">Try adjusting your filters or search query to find what you are looking for.</p>
                <button 
                   onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
                   className="mt-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm"
                >
                  Reset all
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
