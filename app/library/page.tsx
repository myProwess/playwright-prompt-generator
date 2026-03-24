"use client";

import { useState, useMemo, Suspense } from 'react';
import promptsData from '@/data/prompts.json';
import enterpriseData from '@/data/enterprise_prompts.json';
import PromptCard from '@/components/PromptCard';
import { Search, Filter, X, AlertCircle, LayoutGrid } from 'lucide-react';

const allPrompts = [...promptsData, ...enterpriseData];

function LibraryContent() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => ['All', ...Array.from(new Set(allPrompts.map(p => p.category)))], []);

  const filteredPrompts = useMemo(() => {
    return allPrompts.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                           p.prompt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-border pb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
             <LayoutGrid className="w-5 h-5 text-insta" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-insta">Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-foreground">Prompt <span className="text-insta">Library</span></h1>
          <p className="text-xl text-muted font-medium leading-relaxed">
            Browse our full collection of <span className="text-foreground font-bold">{allPrompts.length} optimized</span> Playwright prompts. Filter by category to find the right one.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Quick Search</span>
            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted group-focus-within:text-insta transition-colors" />
              <input 
                type="text" 
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-[1.5rem] bg-input-bg border border-border focus:ring-2 focus:ring-insta/20 focus:border-insta transition-all text-sm font-bold placeholder:text-muted/50"
              />
              {search && (
                 <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-xl transition-colors">
                    <X className="w-4 h-4 text-muted" />
                 </button>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 flex flex-col gap-10">
           <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted mb-6 flex items-center gap-3">
                <Filter className="w-4 h-4 text-insta" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm px-5 py-3 rounded-2xl text-left transition-all font-black uppercase tracking-wider ${selectedCategory === cat ? 'bg-insta text-white shadow-xl shadow-orange-500/20' : 'hover:bg-input-bg text-muted hover:text-foreground border border-transparent hover:border-border'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>
        </aside>

        {/* Prompts Grid */}
        <div className="lg:col-span-3 flex flex-col gap-10">
           <div className="flex items-center justify-between text-[10px] font-black text-muted uppercase tracking-[0.2em] bg-input-bg px-8 py-4 rounded-[1.5rem] border border-border">
             <span>Showing {filteredPrompts.length} Prompts</span>
             { (search || selectedCategory !== 'All') && (
               <button 
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                className="text-insta hover:underline underline-offset-4 font-black"
               >
                 Clear all filters
               </button>
             )}
           </div>

           {filteredPrompts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {filteredPrompts.map(prompt => (
                 <PromptCard key={prompt.id} prompt={prompt} />
               ))}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center p-20 glass-card rounded-[3rem] border-dashed border-2 border-border text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-input-bg flex items-center justify-center border border-border">
                  <AlertCircle className="w-10 h-10 text-muted" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-tight text-foreground">No prompts found</h3>
                  <p className="text-base text-muted font-bold leading-relaxed">Try adjusting your filters or search query to find what you are looking for.</p>
                </div>
                <button 
                   onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                   className="mt-2 px-8 py-3.5 rounded-2xl bg-insta text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
                >
                  Reset all filters
                </button>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}

export default function Library() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-insta border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
