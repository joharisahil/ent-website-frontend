/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  BookOpen, 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronRight, 
  FileText, 
  Clock, 
  Unlock, 
  Lock, 
  Tag 
} from "lucide-react";

export const NotesExplorer: React.FC = () => {
  const { subjects, sections, chapters, topics, navigateTo, searchQuery, setSearchQuery } = useApp();
  const [activeSectionId, setActiveSectionId] = useState<string>("all");
  const [sortCriteria, setSortCriteria] = useState<"order" | "title" | "time">("order");

  // Filtering Logic
  const filteredSections = activeSectionId === "all" 
    ? sections 
    : sections.filter(s => s.id === activeSectionId);

  // Filter topics based on search query
  const getFilteredTopics = (chapterId: string) => {
    let tList = topics.filter(t => t.chapterId === chapterId && t.status === "PUBLISHED");

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tList = tList.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.summary.toLowerCase().includes(q) ||
        t.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sorting Logic
    if (sortCriteria === "title") {
      tList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === "time") {
      tList.sort((a, b) => a.readingTime - b.readingTime);
    } else {
      tList.sort((a, b) => a.order - b.order);
    }

    return tList;
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen pb-16">
      
      {/* 1. Header Banner */}
      <section className="py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          {/* Breadcrumbs */}
          <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigateTo("home")}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800">ENT Syllabus</span>
          </div>

          <h1 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">
            Curriculum Courseware & Guides
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Access MS-level surgical notes structured perfectly by organ division, surgical anatomy, and exam relevance.
          </p>
        </div>
      </section>

      {/* 2. Main Grid Layout (Filters + Courseware) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Column (Left - Spans 4 of 12) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bento Filter & Search Box */}
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-6 hover:shadow-md transition-all">
              
              {/* Search Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Search Curriculum</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="e.g. Otitis, Septum..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 text-xs rounded-xl py-2.5 pl-3.5 pr-9 border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                  <Search className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Division Filter */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Division Filter</label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setActiveSectionId("all")}
                    className={`text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${activeSectionId === "all" ? "bg-blue-600 text-white" : "bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-150"}`}
                  >
                    <span>All Divisions</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSectionId(s.id)}
                      className={`text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${activeSectionId === s.id ? "bg-blue-600 text-white" : "bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-150"}`}
                    >
                      <span className="truncate">{s.name.replace("Section I: ", "").replace("Section II: ", "").replace("Section III: ", "")}</span>
                      <Filter className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-sans">Sort Criteria</label>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSortCriteria("order")}
                    className={`text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${sortCriteria === "order" ? "bg-blue-50 border border-blue-200 text-blue-700 font-bold" : "bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-150"}`}
                  >
                    <span>Standard Chapter Order</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setSortCriteria("title")}
                    className={`text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${sortCriteria === "title" ? "bg-blue-50 border border-blue-200 text-blue-700 font-bold" : "bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-150"}`}
                  >
                    <span>Topic Title (A-Z)</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setSortCriteria("time")}
                    className={`text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${sortCriteria === "time" ? "bg-blue-50 border border-blue-200 text-blue-700 font-bold" : "bg-slate-50/50 hover:bg-slate-100 text-slate-700 border border-slate-150"}`}
                  >
                    <span>Reading Duration</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Syllabus Chapters & Topics Content (Right - Spans 8 of 12) */}
          <div className="lg:col-span-8 space-y-10">
            {filteredSections.map((sec) => (
              <div key={sec.id} className="space-y-6">
                {/* Section title as a clean subtitle bar */}
                <div className="flex items-center gap-3">
                  <h2 className="font-display font-extrabold text-slate-900 text-sm sm:text-base uppercase tracking-wider">
                    {sec.name}
                  </h2>
                  <div className="flex-grow h-px bg-slate-200"></div>
                </div>

                {/* Chapters in this Section */}
                <div className="space-y-6">
                  {chapters
                    .filter(chap => chap.sectionId === sec.id)
                    .map((chap) => {
                      const chapTopics = getFilteredTopics(chap.id);

                      return (
                        <div key={chap.id} className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-8 space-y-5 hover:shadow-md transition-all">
                          {/* Chapter Info */}
                          <div className="border-b border-slate-100 pb-4">
                            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-full border border-blue-100">
                              Chapter {chap.order}
                            </span>
                            <h3 className="font-display font-extrabold text-slate-950 text-sm sm:text-base mt-2">
                              {chap.name}
                            </h3>
                            <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                              {chap.description}
                            </p>
                          </div>

                          {/* Topics List */}
                          <div className="space-y-3.5">
                            {chapTopics.length === 0 ? (
                              <div className="text-center py-6 text-slate-400 text-xs">
                                {searchQuery ? "No matching study notes found in this chapter." : "Syllabus details pending publication."}
                              </div>
                            ) : (
                              chapTopics.map((t) => (
                                <div 
                                  key={t.id}
                                  onClick={() => navigateTo(`topic/${t.slug}`)}
                                  className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 hover:border-blue-400 rounded-2xl p-4.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all cursor-pointer group"
                                >
                                  {/* Title & metadata */}
                                  <div className="space-y-1.5 flex-grow">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <h4 className="font-display font-bold text-slate-950 text-xs sm:text-sm group-hover:text-blue-600 transition-colors">
                                        {t.title}
                                      </h4>
                                      {t.isPremium ? (
                                        <span className="bg-amber-50 text-amber-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-100 flex items-center gap-0.5 shadow-sm">
                                          <Lock className="w-2.5 h-2.5" />
                                          Premium
                                        </span>
                                      ) : (
                                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5 shadow-sm">
                                          <Unlock className="w-2.5 h-2.5" />
                                          Free Online
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-slate-400 text-[11px] line-clamp-1 leading-relaxed">
                                      {t.summary}
                                    </p>
                                    <div className="flex gap-2 text-[10px] text-slate-400 font-medium">
                                      <span className="flex items-center gap-0.5">
                                        <Clock className="w-3 h-3" />
                                        {t.readingTime} min read
                                      </span>
                                      <span>•</span>
                                      <span className="flex items-center gap-0.5">
                                        <Tag className="w-3 h-3" />
                                        {t.tags?.[0]}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Action button */}
                                  <button 
                                    className="bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-500 text-slate-800 text-[10px] font-bold py-1.5 px-3.5 rounded-full transition-colors shrink-0 w-full sm:w-auto text-center"
                                  >
                                    Open Notes
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
