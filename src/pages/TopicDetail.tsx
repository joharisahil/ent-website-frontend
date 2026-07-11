/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { PDFViewer } from "../components/PDFViewer";
import { MockAd } from "../components/MockAd";
import { 
  ChevronRight, 
  Bookmark, 
  DownloadCloud, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  Star, 
  BookOpen, 
  Clock, 
  HelpCircle, 
  Award, 
  CheckSquare, 
  Terminal 
} from "lucide-react";

export const TopicDetail: React.FC = () => {
  const { 
    routeParams, 
    topics, 
    navigateTo, 
    isBookmarked, 
    addBookmark, 
    removeBookmark, 
    triggerDownload, 
    updateReadingProgress,
    currentUser 
  } = useApp();

  const slug = routeParams.slug;
  const topic = topics.find(t => t.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reference for content tracking
  const articleRef = useRef<HTMLDivElement>(null);

  // Track scroll position for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const element = articleRef.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
        setScrollProgress(progress);
        
        // Log history periodically at milestones
        if (progress > 10 && progress % 10 === 0) {
          updateReadingProgress(topic?.id || "", Math.round(progress));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topic]);

  if (!topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center font-sans">
        <h2 className="text-xl font-bold text-slate-900">Study Notes Not Found</h2>
        <p className="text-slate-500 text-xs mt-1.5">The requested clinical module path does not exist in our active syllabus.</p>
        <button 
          onClick={() => navigateTo("notes")}
          className="mt-4 bg-blue-600 text-white font-bold text-xs py-2 px-4 rounded-full"
        >
          Return to Syllabus
        </button>
      </div>
    );
  }

  // Find previous and next topics
  const sortedPublished = topics.filter(t => t.status === "PUBLISHED").sort((a,b) => a.order - b.order);
  const currentIdx = sortedPublished.findIndex(t => t.id === topic.id);
  const prevTopic = currentIdx > 0 ? sortedPublished[currentIdx - 1] : null;
  const nextTopic = currentIdx < sortedPublished.length - 1 ? sortedPublished[currentIdx + 1] : null;

  const handleBookmarkToggle = () => {
    if (isBookmarked(topic.id)) {
      removeBookmark(topic.id);
    } else {
      addBookmark(topic.id);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Shareable link copied to clipboard! Share it with fellow resident doctors.");
  };

  return (
    <div className="font-sans text-slate-700 bg-slate-50/60 min-h-screen relative pb-16">
      
      {/* Scroll Progress Ribbon */}
      <div 
        className="fixed top-[64px] left-0 h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Main Container - Structured into Bento Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-6" ref={articleRef}>
        
        {/* Bento Card 1: Header, Breadcrumbs & Action Toolbar */}
        <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/40 rounded-full blur-3xl -z-10"></div>
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-5">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigateTo("home")}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigateTo("notes")}>Syllabus</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-850 truncate">{topic.title}</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100">
                {topic.tags?.[0] || "ENT Module"}
              </span>

              {/* Quick reading toolbar */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleBookmarkToggle}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${isBookmarked(topic.id) ? "bg-amber-50 border-amber-300 text-amber-500" : "bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-500 hover:text-blue-600"}`}
                  title={isBookmarked(topic.id) ? "Bookmarked" : "Add to Bookmarks"}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button 
                  onClick={handleShare}
                  className="bg-slate-50 border border-slate-200 hover:border-blue-400 p-2 rounded-xl text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  title="Copy Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => triggerDownload(topic.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF Download</span>
                </button>
              </div>
            </div>

            <h1 className="font-display font-extrabold text-slate-900 leading-tight text-2xl sm:text-4xl tracking-tight">
              {topic.title}
            </h1>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-4xl">
              {topic.summary}
            </p>

            <div className="flex gap-4 text-[10px] sm:text-[11px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Reading Time: <strong className="text-slate-700">{topic.readingTime} minutes</strong>
              </span>
              <span>•</span>
              <span>Revised: {new Date(topic.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Layout Grid: Left Content Columns, Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Body Content (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Bento Card 2: Article & Study Content */}
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Embedded custom Rich Content */}
              <article 
                className="prose-medical max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />

              {/* Natural placement Ad block */}
              <MockAd placement="inline" />

              {/* Spaced repetition micro API console */}
              <div className="bg-slate-950 rounded-2xl p-4 text-white font-mono text-[10px] sm:text-[11px] space-y-1.5 border border-slate-900">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-2 text-slate-500">
                  <Terminal className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-sans font-bold text-[10px] uppercase tracking-wider">Future Module Mock: Flashcard Engine API</span>
                </div>
                <p className="text-emerald-400">GET /api/flashcards?topicId={topic.id}</p>
                <p className="text-slate-400">// Output: Loaded active deck for flashcards repetition learning</p>
              </div>
            </div>

            {/* Bento Card 3: Printable handouts / Handouts PDF View */}
            <div className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">
                Printable Handout & Surgical Syllabus PDF
              </h3>
              <p className="text-xs text-slate-500">
                Review the actual classroom handouts of this lecture below. Members can download the file directly, while guests can review a secure, blurred document sample.
              </p>

              <PDFViewer 
                topicId={topic.id} 
                pdfUrl={topic.pdfUrl} 
                pdfSize={topic.pdfSize} 
                isPremium={topic.isPremium} 
              />
            </div>

            {/* Bento Card 4: Clinical references box */}
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-5 sm:p-6 shadow-sm space-y-3.5">
              <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-blue-500" />
                Standard Clinical References
              </h4>
              <ul className="list-decimal pl-5 text-[11px] text-slate-500 space-y-2 leading-relaxed">
                <li><em>Scott-Brown's Otorhinolaryngology, Head and Neck Surgery</em>, 8th Edition - Pediatric Ear Infections section.</li>
                <li><em>Cummings Otolaryngology</em>, 7th Edition - Chapter 139: Inflammatory Diseases of the Middle Ear Cleft.</li>
                <li>Clinical Consensus Statements: Acute Otitis Media Pediatric Management guidelines, American Academy of Otolaryngology (AAO-HNS).</li>
              </ul>
            </div>

            {/* Prev/Next Navigation */}
            <div className="flex justify-between items-center gap-4 pt-4 flex-wrap">
              {prevTopic ? (
                <button 
                  onClick={() => navigateTo(`topic/${prevTopic.slug}`)}
                  className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-[20px] p-4 text-left w-full sm:w-auto hover:border-blue-400 hover:shadow-sm transition-all flex items-center gap-3.5 cursor-pointer group"
                >
                  <ArrowLeft className="w-4.5 h-4.5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Previous Topic</span>
                    <span className="font-bold text-slate-900 text-xs">{prevTopic.title}</span>
                  </div>
                </button>
              ) : <div className="hidden sm:block"></div>}

              {nextTopic ? (
                <button 
                  onClick={() => navigateTo(`topic/${nextTopic.slug}`)}
                  className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-[20px] p-4 text-right w-full sm:w-auto hover:border-blue-400 hover:shadow-sm transition-all flex items-center justify-end gap-3.5 cursor-pointer group ml-auto"
                >
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Next Topic</span>
                    <span className="font-bold text-slate-900 text-xs">{nextTopic.title}</span>
                  </div>
                  <ArrowRight className="w-4.5 h-4.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : <div className="hidden sm:block"></div>}
            </div>

          </div>

          {/* Sticky Table of Contents & Ads (Right 4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-24 space-y-6">
              
              {/* Bento Table of Contents */}
              <div className="bg-white border border-slate-200/80 rounded-[28px] p-5 shadow-sm space-y-4">
                <h4 className="font-display font-extrabold text-slate-900 text-xs tracking-wider uppercase">Table of Contents</h4>
                
                <ul className="space-y-3 text-xs text-slate-500 font-semibold border-l border-slate-100 pl-3.5">
                  <li className="hover:text-blue-600 transition-colors cursor-pointer border-l-2 border-blue-500 pl-2.5 -ml-[16px] text-blue-600 font-bold">
                    Pathological Etiology
                  </li>
                  <li className="hover:text-blue-600 transition-colors cursor-pointer pl-2.5">
                    Anatomical Classification
                  </li>
                  <li className="hover:text-blue-600 transition-colors cursor-pointer pl-2.5">
                    Comparative Diagnostic Matrix
                  </li>
                  <li className="hover:text-blue-600 transition-colors cursor-pointer pl-2.5">
                    Clinical Management Protocols
                  </li>
                </ul>
              </div>

              {/* Sidebar Ad Placement */}
              <MockAd placement="sidebar" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
