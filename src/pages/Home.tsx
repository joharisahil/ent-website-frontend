/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  Stethoscope, 
  Award, 
  BookOpen, 
  Users, 
  ArrowRight, 
  FileText, 
  CheckCircle, 
  ChevronRight, 
  HelpCircle, 
  Plus, 
  Minus, 
  ChevronDown,
  Sparkles,
  Download,
  Star,
  ShieldCheck,
  Clock,
  Compass,
  GraduationCap,
  Activity,
  Search,
  Bookmark,
  TrendingUp,
  MapPin
} from "lucide-react";
import { MOCK_FAQS, MOCK_TESTIMONIALS } from "../data/mockData";
import { motion } from "motion/react";
import { WelcomeModal } from "../components/WelcomeModal";
import docProfile from "../assets/dr_pulkit_agarwal.jpg"

export const Home: React.FC = () => {
  const { navigateTo, topics, currentUser } = useApp();
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(!currentUser);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["topic-dns"]);

  const toggleBookmark = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleStartLearning = () => {
    navigateTo("notes");
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen pb-16">
      
      {/* Premium Welcome Onboarding Modal */}
      <WelcomeModal isOpen={isWelcomeModalOpen} onClose={() => setIsWelcomeModalOpen(false)} />
      
      {/* 1. Hero Section - Premium Academic Workspace Redesign */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
        {/* Soft academic mesh background & grids */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"></div>
          
          {/* Ambient Glowing Orbs */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column (45%) */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8 text-center lg:text-left"
            >
              {/* Premium Scholar Tag */}
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100/70 shadow-sm uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                  <span>Interactive Scholar Studio</span>
                </span>
              </div>

              {/* Headings */}
              <div className="space-y-4">
                <h1 className="font-display font-extrabold text-slate-900 leading-[1.15] text-4xl sm:text-5xl lg:text-[54px] tracking-tight">
                  Master ENT with{" "}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                    Confidence
                  </span>
                </h1>
                
                <h2 className="font-display font-extrabold text-slate-800 text-lg sm:text-xl md:text-2xl leading-snug">
                  Learn through Visual Anatomy, Clinical Cases and High-Yield Notes.
                </h2>
              </div>

              {/* Paragraph */}
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Dr. Pulkit's high-yield visual-first workspace translates dry clinical textbook theory into pristine interactive diagrams, step-by-step surgical cases, and printable vector PDFs tailored for NEET PG, INI CET, and USMLE candidates.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo("notes")}
                  className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 rounded-2xl shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, bg: "#f8fafc" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo("notes")}
                  className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl shadow-sm transition-all cursor-pointer flex justify-center items-center gap-2"
                >
                  <span>Explore Notes</span>
                </motion.button>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/50">Interactive Learning</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/50">Bookmarks</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/50">Progress Tracking</span>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-lg border border-slate-200/50">Download PDFs</span>
              </div>

              {/* Trust Badges Panel */}
              <div className="pt-6 border-t border-slate-150 space-y-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4">
                  {/* Stars Group */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold mt-1">15,000+ Medical Students</span>
                  </div>

                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-display font-extrabold text-slate-900 text-base leading-none">120+</span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1">High Yield Notes</span>
                  </div>

                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                  <div className="flex flex-col items-center lg:items-start">
                    <span className="font-display font-extrabold text-slate-900 text-base leading-none">250+</span>
                    <span className="text-[11px] text-slate-500 font-medium mt-1">Clinical Illustrations</span>
                  </div>
                </div>

                {/* Exam Subtags */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest mr-1">Exam Targets:</span>
                  <span className="bg-blue-50/50 text-blue-700 text-[9px] font-extrabold px-2.5 py-1 rounded border border-blue-100/50">NEET PG</span>
                  <span className="bg-sky-50/50 text-sky-700 text-[9px] font-extrabold px-2.5 py-1 rounded border border-sky-100/50">INI CET</span>
                  <span className="bg-indigo-50/50 text-indigo-700 text-[9px] font-extrabold px-2.5 py-1 rounded border border-indigo-100/50">USMLE</span>
                </div>
              </div>
            </motion.div>

            {/* Right Illustration Column (55%) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              
              {/* Main Premium Illustration Area */}
              <div className="relative w-full min-h-[460px] lg:h-[580px] flex items-center justify-center bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-indigo-500/5 rounded-[48px] border border-blue-100/30 shadow-[inset_0_4px_30px_rgba(224,242,254,0.4)] p-8 overflow-hidden group">
                
                {/* Visual grid behind anatomy centerpiece */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                
                {/* Centerpiece Vector - Transparent Human Head */}
                <div className="relative z-10 select-none">
                  <svg viewBox="0 0 400 400" className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] h-auto drop-shadow-[0_20px_50px_rgba(59,130,246,0.1)]">
                    <defs>
                      <radialGradient id="innerHeadGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="headOutlineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
                        <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.85" />
                      </linearGradient>
                    </defs>

                    {/* Ambient Glow */}
                    <circle cx="200" cy="200" r="150" fill="url(#innerHeadGlow)" />

                    {/* Technical Anatomy Circles */}
                    <circle cx="200" cy="200" r="140" stroke="#e2e8f0" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
                    <circle cx="200" cy="200" r="110" stroke="#cbd5e1" strokeWidth="0.5" fill="none" opacity="0.5" />

                    {/* Vector outline of a beautiful medical head profile */}
                    <path
                      d="M 110,340 C 120,340 135,315 140,285 C 144,270 138,255 132,245 C 118,220 120,195 125,190 C 130,185 140,185 145,190 C 155,200 160,205 165,205 C 180,205 190,190 195,185 C 200,180 215,180 220,185 C 230,195 235,210 250,210 C 260,210 263,200 267,193 C 270,187 273,180 280,178 C 290,175 300,185 305,175 C 310,165 305,150 310,140 C 315,130 320,125 320,117 C 320,109 310,105 305,100 C 300,95 290,97 285,90 C 280,83 275,70 270,60 C 260,40 235,25 195,25 C 145,25 105,60 95,115 C 90,140 88,160 88,180 C 88,225 95,260 100,290 C 103,307 105,325 110,340 Z"
                      fill="none"
                      stroke="url(#headOutlineGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Connected Nodes representing clinical focus */}
                    
                    {/* Ear Node (Otology) */}
                    <g transform="translate(140, 160)">
                      <circle cx="0" cy="0" r="16" fill="#3b82f6" fillOpacity="0.12" />
                      <circle cx="0" cy="0" r="7" fill="#3b82f6" />
                      <circle cx="0" cy="0" r="11" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,2" className="animate-spin" style={{ animationDuration: "12s" }} />
                      <line x1="0" y1="0" x2="-35" y2="-35" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="2,2" />
                      <circle cx="-35" cy="-35" r="2.5" fill="#3b82f6" />
                      <text x="-40" y="-45" className="font-sans font-extrabold text-[9px] tracking-widest" fill="#2563eb" textAnchor="end">OTOLOGY</text>
                    </g>

                    {/* Nose Node (Rhinology) */}
                    <g transform="translate(255, 150)">
                      <circle cx="0" cy="0" r="16" fill="#0ea5e9" fillOpacity="0.12" />
                      <circle cx="0" cy="0" r="7" fill="#0ea5e9" />
                      <circle cx="0" cy="0" r="11" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,2" className="animate-spin" style={{ animationDuration: "16s" }} />
                      <line x1="0" y1="0" x2="35" y2="-25" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="2,2" />
                      <circle cx="35" cy="-25" r="2.5" fill="#0ea5e9" />
                      <text x="40" y="-32" className="font-sans font-extrabold text-[9px] tracking-widest" fill="#0284c7" textAnchor="start">RHINOLOGY</text>
                    </g>

                    {/* Throat Node (Laryngology) */}
                    <g transform="translate(205, 235)">
                      <circle cx="0" cy="0" r="16" fill="#6366f1" fillOpacity="0.12" />
                      <circle cx="0" cy="0" r="7" fill="#6366f1" />
                      <circle cx="0" cy="0" r="11" stroke="#6366f1" strokeWidth="1" strokeDasharray="3,2" className="animate-spin" style={{ animationDuration: "10s" }} />
                      <line x1="0" y1="0" x2="40" y2="30" stroke="#6366f1" strokeWidth="0.8" strokeDasharray="2,2" />
                      <circle cx="40" cy="30" r="2.5" fill="#6366f1" />
                      <text x="45" y="38" className="font-sans font-extrabold text-[9px] tracking-widest" fill="#4f46e5" textAnchor="start">LARYNGOLOGY</text>
                    </g>
                  </svg>
                </div>

                {/* Desktop Floating Cards (Hidden on mobile grid, shown absolute on lg) */}
                
                {/* 1. Ear Anatomy */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute top-8 left-6"
                >
                  <span className="text-sm">👂</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Ear Anatomy</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">120 Clinical Notes</p>
                  </div>
                </motion.div>

                {/* 2. Rhinology */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute top-12 right-6"
                >
                  <span className="text-sm">👃</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Rhinology</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">60 Procedures</p>
                  </div>
                </motion.div>

                {/* 3. Laryngology */}
                <motion.div 
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute bottom-20 right-6"
                >
                  <span className="text-sm">🫁</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Laryngology</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">80 Diagrams</p>
                  </div>
                </motion.div>

                {/* 4. Downloadable PDFs */}
                <motion.div 
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute bottom-16 left-6"
                >
                  <span className="text-sm">📄</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Downloadable PDFs</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">Vector Preserved</p>
                  </div>
                </motion.div>

                {/* 5. Clinical Cases */}
                <motion.div 
                  animate={{ y: [0, -11, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute top-1/2 left-4 -translate-y-1/2"
                >
                  <span className="text-sm">🧠</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Clinical Cases</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">Surgical Walkthroughs</p>
                  </div>
                </motion.div>

                {/* 6. Future Videos */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute top-[44%] right-4"
                >
                  <span className="text-sm">🎥</span>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-900 leading-tight">Future Videos</p>
                    <p className="text-[9px] text-slate-500 font-semibold leading-none mt-0.5">Visual Lectures</p>
                  </div>
                </motion.div>

                {/* 7. Bookmarks */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <span className="text-xs">⭐</span>
                  <div className="text-left">
                    <p className="text-[10px] font-extrabold text-slate-900 leading-tight">Bookmarks</p>
                  </div>
                </motion.div>

              </div>

              {/* Mobile/Tablet Responsive Learning Grid (Shown only on small screens) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 w-full lg:hidden">
                {[
                  { emoji: "👂", title: "Ear Anatomy", desc: "120 Clinical Notes" },
                  { emoji: "👃", title: "Rhinology", desc: "60 Procedures" },
                  { emoji: "🫁", title: "Laryngology", desc: "80 Diagrams" },
                  { emoji: "📄", title: "Downloadable PDFs", desc: "Vector Preserved" },
                  { emoji: "🧠", title: "Clinical Cases", desc: "Surgical Walkthroughs" },
                  { emoji: "🎥", title: "Future Videos", desc: "Visual Lectures" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-150 rounded-2xl shadow-sm">
                    <span className="text-base">{item.emoji}</span>
                    <div className="text-left">
                      <p className="text-[11px] font-bold text-slate-900 leading-tight">{item.title}</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Meet Dr. Pulkit Agarwal (University Faculty Profile Layout) */}
      <section className="py-16 bg-slate-50/40 border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Subtle Institutional Section Header */}
          <div className="border-b border-slate-200/80 pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] font-bold text-slate-400 tracking-widest uppercase">SECTION 02 / FACULTY PROFILE</p>
              <h2 className="font-display font-extrabold text-slate-900 text-xl tracking-tight mt-1">
                Academic Leadership & Curriculum Lead
              </h2>
            </div>
            <p className="text-slate-400 text-xs font-medium">ENT Clinical Education Division</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Profile Card (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
              <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-150">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT18KY37jB0KBv-lqlQzXYr2IyDxkBR4LpYDybVdng_EQkbP2XLSgy23g&s=10" 
                  alt="Dr. Pulkit Agarwal" 
                  className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              <div className="mt-5 space-y-3.5">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-lg leading-snug">
                    Dr. Pulkit Agarwal
                  </h3>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">MS Otorhinolaryngology</p>
                  <p className="text-[11px] text-slate-400 font-medium">Consultant ENT Surgeon & Academic Author</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>10,000+ Students Mentored</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Gold Medal honors in Clinical ENT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Academic Details (8 Columns) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Biography & Teaching Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">Academic Biography</h4>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                    Dr. Pulkit Agarwal is an active Consultant Otorhinolaryngologist and clinical coach. Dedicated to bridging the gap between dense medical literature and rapid ward comprehension, his teaching streamlines complex pathophysiology into structured, high-yield diagnostic materials.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">Teaching Philosophy</h4>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed italic">
                    "Clinical memorization must be spatial and structured. By removing redundant textbook filler and pairing pristine medical illustrations with core diagnostic criteria, we empower candidates to build instant, long-term diagnostic intuition."
                  </p>
                </div>
              </div>

              {/* Achievements & Medical Credentials Board */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono mb-4">Academic Credentials & Impact</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">Master of Surgery (MS)</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Otorhinolaryngology specialisation with clinical distinction.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">Consultant Practitioner</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Active surgical consultant integrating current case studies.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">10,000+ Candidates Mentored</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Coached candidates across premier medical institutes for NEET-PG/NEXT.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-slate-800">Visual Authoring</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">Created 250+ vector-perfect ENT schematics and clinical pearls.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Academic CTA */}
              <div className="pt-4 flex items-center justify-start">
                <button 
                  onClick={() => navigateTo("about")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-blue-500 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span>Meet Your Instructor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Notes and Chapters Grid - Browse by Subject Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Soft elegant mesh background detailing */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100/60 shadow-sm mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse High-Yield Chapters</span>
            </span>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight leading-none mt-2">
              High-Yield Clinical Notes
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed">
              Accelerate your preparation with exam-aligned chapters embedded with deep clinical schematics, structured tables, and diagnostic test procedures.
            </p>
          </div>
          <div className="shrink-0">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo("notes")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-200 hover:border-blue-400 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white shadow-sm transition-all cursor-pointer"
            >
              <span>Explore All Chapters</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {topics.map((t, idx) => {
            const isBookmarked = bookmarkedIds.includes(t.id);
            
            let meta = {
              category: "Otology",
              difficulty: "Intermediate",
              pearlsCount: 4,
              illustrationsCount: 3,
              downloadBadge: "2.4 MB PDF",
              progress: 75,
              progressLabel: "75% Mastered",
              themeColor: "blue",
              gradientFrom: "from-blue-500/5",
              gradientTo: "to-indigo-500/10",
              badgeBg: "bg-blue-50/70 text-blue-700 border-blue-100/60",
              progressColor: "bg-blue-600",
              illustration: null as any,
              preview: null as any
            };

            if (t.id === "topic-dns") {
              meta = {
                category: "Rhinology",
                difficulty: "Advanced",
                pearlsCount: 6,
                illustrationsCount: 5,
                downloadBadge: "3.1 MB PDF",
                progress: 40,
                progressLabel: "40% Completed",
                themeColor: "amber",
                gradientFrom: "from-amber-500/5",
                gradientTo: "to-orange-500/10",
                badgeBg: "bg-amber-50/70 text-amber-800 border-amber-100/60",
                progressColor: "bg-amber-500",
                illustration: null as any,
                preview: null as any
              };
            } else if (t.id === "topic-tracheostomy") {
              meta = {
                category: "Laryngology",
                difficulty: "Expert",
                pearlsCount: 8,
                illustrationsCount: 6,
                downloadBadge: "4.2 MB PDF",
                progress: 15,
                progressLabel: "15% Started",
                themeColor: "rose",
                gradientFrom: "from-rose-500/5",
                gradientTo: "to-red-500/10",
                badgeBg: "bg-rose-50/70 text-rose-800 border-rose-100/60",
                progressColor: "bg-rose-500",
                illustration: null as any,
                preview: null as any
              };
            }

            if (t.id === "topic-aom") {
              meta.illustration = (
                <svg viewBox="0 0 240 140" className="w-full h-full max-w-[190px] drop-shadow-sm">
                  <defs>
                    <radialGradient id="earGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="120" cy="70" r="50" fill="url(#earGlow)" />
                  <circle cx="120" cy="70" r="48" fill="none" stroke="#e2e8f0" strokeWidth="0.75" strokeDasharray="3,3" />
                  <circle cx="120" cy="70" r="38" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4,4" />
                  <circle cx="120" cy="70" r="28" fill="#ffffff" stroke="#2563eb" strokeWidth="1.75" />
                  <circle cx="120" cy="70" r="25" fill="none" stroke="#93c5fd" strokeWidth="0.75" />
                  <path d="M120,48 L120,70 L126,76" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="120" cy="48" r="2" fill="#1e3a8a" />
                  <polygon points="120,70 136,92 128,94 120,70" fill="#fbbf24" opacity="0.8" />
                  <text x="50" y="38" className="font-mono text-[7px] fill-slate-400 font-bold uppercase tracking-wider">Pars Flaccida</text>
                  <line x1="88" y1="36" x2="110" y2="48" stroke="#cbd5e1" strokeWidth="0.5" />
                  <text x="145" y="104" className="font-mono text-[7px] fill-slate-400 font-bold uppercase tracking-wider">Cone of Light</text>
                  <line x1="134" y1="91" x2="150" y2="97" stroke="#cbd5e1" strokeWidth="0.5" />
                </svg>
              );
              meta.preview = (
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 60 60" className="w-9 h-9 border border-slate-200/60 rounded-lg bg-white shrink-0 shadow-sm">
                    <circle cx="30" cy="30" r="22" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="30" y1="8" x2="30" y2="52" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="8" y1="30" x2="52" y2="30" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2,2" />
                    <circle cx="20" cy="40" r="2.5" fill="#ef4444" className="animate-ping" />
                    <circle cx="20" cy="40" r="1.5" fill="#ef4444" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] font-extrabold text-slate-800 uppercase tracking-wide leading-none">Antero-Inferior Quad</p>
                    <p className="text-[8px] text-slate-400 mt-1 leading-none">Safe Myringotomy Site</p>
                  </div>
                </div>
              );
            } else if (t.id === "topic-dns") {
              meta.illustration = (
                <svg viewBox="0 0 240 140" className="w-full h-full max-w-[190px] drop-shadow-md">
                  <defs>
                    <radialGradient id="noseGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="120" cy="70" r="50" fill="url(#noseGlow)" />
                  <path d="M72,106 Q95,106 110,91 T110,48 Q100,34 90,34" fill="none" stroke="#cbd5e1" strokeWidth="1.25" />
                  <path d="M120,42 Q110,65 125,78 T118,102" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="120" y1="42" x2="120" y2="102" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                  <path d="M136,54 C142,54 142,72 136,72" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
                  <path d="M136,54 C142,54 142,72 136,72" fill="none" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                  <text x="35" y="65" className="font-mono text-[7px] fill-slate-400 font-bold uppercase tracking-wider">C-Shaped Curve</text>
                  <line x1="88" y1="63" x2="114" y2="65" stroke="#cbd5e1" strokeWidth="0.5" />
                </svg>
              );
              meta.preview = (
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 60 60" className="w-9 h-9 border border-slate-200/60 rounded-lg bg-white shrink-0 shadow-sm">
                    <rect x="16" y="16" width="28" height="28" rx="2" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                    <path d="M22,30 L12,30" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    <polygon points="12,30 15,27 15,33" fill="#f59e0b" />
                    <text x="30" y="34" className="font-sans text-[8px] font-extrabold fill-slate-700" textAnchor="middle">COTTLE</text>
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] font-extrabold text-slate-800 uppercase tracking-wide leading-none">Cottle's Maneuver</p>
                    <p className="text-[8px] text-slate-400 mt-1 leading-none">Positive = Valve block</p>
                  </div>
                </div>
              );
            } else {
              meta.illustration = (
                <svg viewBox="0 0 240 140" className="w-full h-full max-w-[190px] drop-shadow-md">
                  <defs>
                    <radialGradient id="throatGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="120" cy="70" r="50" fill="url(#throatGlow)" />
                  <rect x="96" y="34" width="48" height="8" rx="2" fill="none" stroke="#cbd5e1" strokeWidth="1.25" />
                  <path d="M92,22 Q120,15 148,22 L144,28 Q120,23 96,28 Z" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1" />
                  <rect x="96" y="46" width="48" height="8" rx="2" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.25" />
                  <rect x="96" y="58" width="48" height="8" rx="2" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.25" />
                  <rect x="96" y="70" width="48" height="8" rx="2" fill="#ffe4e6" stroke="#cbd5e1" strokeWidth="1.25" opacity="0.6" />
                  <line x1="86" y1="56" x2="154" y2="56" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" />
                  <text x="32" y="24" className="font-mono text-[7px] fill-slate-400 font-bold uppercase tracking-wider">Cricoid Cartilage</text>
                  <line x1="88" y1="22" x2="98" y2="24" stroke="#cbd5e1" strokeWidth="0.5" />
                </svg>
              );
              meta.preview = (
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 60 60" className="w-9 h-9 border border-slate-200/60 rounded-lg bg-white shrink-0 shadow-sm">
                    <circle cx="30" cy="30" r="16" fill="none" stroke="#fda4af" strokeWidth="2.5" />
                    <circle cx="30" cy="30" r="16" fill="none" stroke="#f43f5e" strokeWidth="1.25" />
                    <path d="M24,30 L36,30 M30,24 L30,36" stroke="#f43f5e" strokeWidth="1.25" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] font-extrabold text-slate-800 uppercase tracking-wide leading-none">Rings 2-4 Window</p>
                    <p className="text-[8px] text-slate-400 mt-1 leading-none">Avoids Cricoid Stenosis</p>
                  </div>
                </div>
              );
            }

            return (
              <motion.div 
                key={t.id} 
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ 
                  y: -12,
                  boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.08)"
                }}
                className="bg-white border border-slate-150/90 hover:border-blue-400 rounded-[38px] p-6 sm:p-7 transition-all flex flex-col justify-between relative group shadow-[0_2px_15px_rgba(0,0,0,0.015)] overflow-hidden min-h-[720px]"
              >
                {/* Premium Accent Corner Glow */}
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${t.id === "topic-aom" ? "from-blue-500/5 to-indigo-500/0" : t.id === "topic-dns" ? "from-amber-500/5 to-orange-500/0" : "from-rose-500/5 to-red-500/0"} rounded-full blur-3xl pointer-events-none`} />

                <div>
                  {/* Card Header: Category, Difficulty, Bookmark */}
                  <div className="flex justify-between items-center mb-5 relative z-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full border ${meta.badgeBg} uppercase tracking-wider`}>
                        {meta.category}
                      </span>
                      <span className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider">
                        {meta.difficulty}
                      </span>
                    </div>

                    {/* Bookmark Icon Button */}
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={(e) => toggleBookmark(t.id, e)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        isBookmarked 
                        ? "bg-rose-50 text-rose-600 border-rose-200" 
                        : "bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-100"
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Save to Study Folder"}
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                    </motion.button>
                  </div>

                  {/* Beautiful cover illustration */}
                  <div className={`w-full h-44 rounded-2xl bg-gradient-to-br ${meta.gradientFrom} ${meta.gradientTo} flex items-center justify-center p-4 mb-6 relative overflow-hidden border border-slate-100/60`}>
                    <div className="transition-transform duration-500 group-hover:scale-105">
                      {meta.illustration}
                    </div>
                  </div>

                  {/* Estimated Reading Time */}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                    <span>{t.readingTime} min read session</span>
                  </div>

                  {/* Topic Title */}
                  <h3 className="font-display font-extrabold text-slate-950 text-lg sm:text-xl leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                    {t.title}
                  </h3>

                  {/* Short Explanation */}
                  <p className="text-slate-500 text-xs leading-relaxed mb-6 line-clamp-3">
                    {t.summary}
                  </p>
                </div>

                {/* Educational stats panel & visual preview */}
                <div className="mt-auto space-y-5">
                  
                  {/* Clinical stats panel & visual preview */}
                  <div className="bg-slate-50/60 border border-slate-100 rounded-2xl p-4 space-y-3.5">
                    {/* Visual Preview Section */}
                    <div className="pb-3 border-b border-slate-150">
                      {meta.preview}
                    </div>

                    {/* Educational Stats Counts */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{meta.pearlsCount} Clinical Pearls</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>{meta.illustrationsCount} Vector Graphics</span>
                      </div>
                    </div>

                    {/* Download PDF badge */}
                    <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-slate-400" />
                        <span>{meta.downloadBadge}</span>
                      </span>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/60 uppercase">Tablet Ready</span>
                    </div>
                  </div>

                  {/* Learning Progress Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500">
                      <span>MY PROGRESS</span>
                      <span className={meta.progress === 75 ? "text-blue-600" : meta.progress === 40 ? "text-amber-600" : "text-rose-600"}>
                        {meta.progressLabel}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${meta.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${meta.progressColor}`} 
                      />
                    </div>
                  </div>

                  {/* Large Read Now Action Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigateTo(`topic/${t.slug}`)}
                    className="w-full bg-slate-950 hover:bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-600/10 text-xs font-bold py-3.5 px-5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group-hover:bg-slate-900"
                  >
                    <span>Read Active Notes</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Premium Educational Showcase - Everything You Need to Master ENT */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/10 rounded-[48px] my-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border border-slate-200/40 shadow-[0_4px_30px_rgba(224,242,254,0.08)] relative overflow-hidden">
        {/* Soft elegant ambient backgrounds */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-100/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Premium Resource Suite</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[42px] tracking-tight text-slate-900 leading-tight">
              Everything You Need to Master ENT
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Dr. Pulkit's specialized clinical archive provides a tactile, visual-first learning ecosystem designed to translate dense medical textbooks into instant clinical confidence.
            </p>
          </div>

          {/* Six Large Premium Showcase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            
            {/* 1. Clinical Anatomy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-blue-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    <circle cx="100" cy="60" r="45" fill="none" stroke="#2563eb" strokeWidth="0.75" strokeDasharray="3,3" className="animate-spin" style={{ animationDuration: "24s" }} />
                    <circle cx="100" cy="60" r="35" fill="none" stroke="#6366f1" strokeWidth="0.5" opacity="0.5" />
                    {/* Ear pathway */}
                    <path d="M60,60 Q85,40 100,60 T140,60" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M80,60 Q100,80 120,60" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Inner ear cochlea node */}
                    <circle cx="100" cy="60" r="6" fill="#10b981" />
                    <circle cx="120" cy="60" r="4" fill="#3b82f6" />
                    <circle cx="80" cy="60" r="4" fill="#8b5cf6" />
                    {/* Medical Tags */}
                    <line x1="100" y1="60" x2="135" y2="30" stroke="#94a3b8" strokeWidth="0.5" />
                    <circle cx="135" cy="30" r="1.5" fill="#94a3b8" />
                    <text x="138" y="32" className="font-mono text-[6px] fill-slate-400 font-bold">COCHLEA</text>
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/40">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      Clinical Anatomy
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Explore exact structural maps, vestibular labyrinths, and vascular networks. Specifically designed to assist visual-spatial medical memorization.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-blue-700 tracking-wider uppercase">Active Anatomy Node</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                  <span>Vestibular Ossicular System</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100/60">3D Ready</span>
                </div>
                <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-4/5" />
                </div>
              </div>
            </motion.div>

            {/* 2. High-Yield Notes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-amber-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    {/* Book icon container */}
                    <path d="M45,30 C45,25 85,25 100,35 C115,25 155,25 155,30 L155,95 C155,90 115,90 100,98 C85,90 45,90 45,95 Z" fill="none" stroke="#d97706" strokeWidth="1.25" />
                    <line x1="100" y1="35" x2="100" y2="98" stroke="#d97706" strokeWidth="1" />
                    {/* Simulated written lines */}
                    <line x1="55" y1="42" x2="90" y2="42" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="55" y1="52" x2="85" y2="52" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="55" y1="62" x2="90" y2="62" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="55" y1="72" x2="80" y2="72" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
                    
                    <line x1="110" y1="42" x2="145" y2="42" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="110" y1="52" x2="140" y2="52" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="110" y1="62" x2="145" y2="62" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="110" y1="72" x2="135" y2="72" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/40">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                      High-Yield Notes
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Study medical-curated sheets with diagnostic staging, critical landmarks, and redundant textbook filler stripped away for rapid memory recall.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-amber-700 tracking-wider uppercase">High Yield Match</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-bold">
                  <span>AOM vs. OME Diagnosis</span>
                  <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-extrabold">98% Match</span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 italic">Tubal Occlusion • Suppuration • Resolution</p>
              </div>
            </motion.div>

            {/* 3. Clinical Cases */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-emerald-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    {/* Clipboard */}
                    <rect x="65" y="25" width="70" height="75" rx="5" fill="#ffffff" stroke="#10b981" strokeWidth="1.25" />
                    <rect x="85" y="18" width="30" height="10" rx="2" fill="#047857" />
                    {/* Waveform inside clipboard */}
                    <path d="M75,55 L85,55 L90,40 L95,75 L100,50 L105,60 L110,55 L125,55" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Diagnostic checkbox items */}
                    <rect x="75" y="72" width="5" height="5" rx="1" fill="#10b981" />
                    <line x1="85" y1="74" x2="115" y2="74" stroke="#cbd5e1" strokeWidth="1.5" />
                    <rect x="75" y="82" width="5" height="5" rx="1" fill="#10b981" />
                    <line x1="85" y1="84" x2="120" y2="84" stroke="#cbd5e1" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/40">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Clinical Cases
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Analyze diagnostic cases including real ward logs, vestibular test outcomes, and expert specialist therapeutic workflows.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-emerald-700 tracking-wider uppercase">Active Patient File</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                  <span>Unilateral Vestibulopathy</span>
                  <span className="text-[9px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded font-bold border border-teal-100">Case #42</span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-1 italic">Rinne Positive • Weber Lateralized R</p>
              </div>
            </motion.div>

            {/* 4. Medical Illustrations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-sky-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    {/* Magnifying glass zooming into vocal folds */}
                    <circle cx="95" cy="55" r="30" fill="none" stroke="#0284c7" strokeWidth="1.5" />
                    <line x1="116" y1="76" x2="140" y2="100" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                    {/* Vocal fold anatomy inside glass */}
                    <path d="M80,55 Q95,35 110,55" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M80,55 Q95,75 110,55" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" />
                    <line x1="80" y1="55" x2="110" y2="55" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100/40">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                      Medical Illustrations
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Memorize anatomical pathways easily with pristine, hand-sketched vector graphics showing complex clinical regions in high definition.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-sky-700 tracking-wider uppercase">Vector Graphic Preview</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                  <span>Ossicular Chain Layout</span>
                  <span className="text-[9px] text-sky-800 bg-sky-50 px-2 py-0.5 rounded font-bold border border-sky-100">SVG Print</span>
                </div>
                <div className="flex gap-1.5 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                </div>
              </div>
            </motion.div>

            {/* 5. Exam Preparation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-purple-50 to-pink-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-purple-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    {/* Laurel Wreath */}
                    <path d="M60,85 C50,75 50,45 75,35" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M140,85 C150,75 150,45 125,35" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Scholar graduation cap */}
                    <polygon points="100,30 135,42 100,54 65,42" fill="#9333ea" />
                    <rect x="88" y="50" width="24" height="15" fill="#a855f7" />
                    <path d="M125,44 L125,65" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="125" cy="65" r="2.5" fill="#db2777" />
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/40">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                      Exam Preparation
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Build competitive confidence with gold-medal clinical pearls, mock quiz questions, and high-retention flash check grids.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-purple-700 tracking-wider uppercase">Rapid Board Matcher</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                  <span>Gradenigo's Syndrome Triad</span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-extrabold">Correct</span>
                </div>
                <p className="text-[9px] text-slate-400 line-clamp-1 italic">Otitis Media • Abducens Palsy • Retro Pain</p>
              </div>
            </motion.div>

            {/* 6. Downloadable PDFs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[36px] border border-slate-150 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group min-h-[580px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors duration-300" />
              
              <div className="space-y-6">
                {/* Large Illustration (Top Area) */}
                <div className="w-full h-40 bg-gradient-to-br from-rose-50 to-red-50/50 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-rose-100/30">
                  <svg viewBox="0 0 200 120" className="w-full h-full max-w-[150px] drop-shadow-md">
                    {/* Document Folder / Binder */}
                    <path d="M50,30 L90,30 L100,42 L150,42 L150,90 L50,90 Z" fill="none" stroke="#e11d48" strokeWidth="1.25" />
                    {/* Sheets coming out */}
                    <rect x="62" y="38" width="76" height="42" rx="2" fill="#ffffff" stroke="#f43f5e" strokeWidth="0.75" />
                    {/* Download arrow inside */}
                    <path d="M100,46 L100,64 M92,56 L100,64 L108,56" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Card Title & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/40">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-rose-600 transition-colors">
                      Downloadable PDFs
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Export high-resolution vector-preserved study note sheets optimized for clean physical printing or offline tablet annotation.
                  </p>
                </div>
              </div>

              {/* Small Inset Preview Card (Bottom Area) */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
                <span className="text-[9px] font-extrabold text-rose-700 tracking-wider uppercase">Print Export Hub</span>
                <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
                  <span>Otology Full Staging Guide</span>
                  <span className="text-[9px] text-rose-800 bg-rose-50 px-2 py-0.5 rounded font-bold border border-rose-100">Vector PDF</span>
                </div>
                <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-full w-full animate-pulse" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Strong Social Proof & Student Success Hub */}
      <section id="social-proof-hub" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/60">
        {/* Subtle grid and ambient lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16">
          
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full border border-blue-100 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              <span>COMMUNITY & SOCIAL PROOF</span>
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-slate-900 leading-tight">
              Join Thousands of Medical Students
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Scattered across premier medical colleges, thousands of future surgeons, residents, and final-year candidates rely on Dr. Pulkit's high-yield ENT platform to pass exams with confidence.
            </p>
          </div>

          {/* Bento-inspired social proof layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Core Statistics & Regional Heat Map (7 Columns) */}
            <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_15px_rgba(0,0,0,0.01)] relative overflow-hidden group">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-lg leading-snug">
                    Regional Student Footprint
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Hover over major academic hubs to see active candidate engagement from premier medical institutes.
                  </p>
                </div>

                {/* Country Map Vector Mockup */}
                <div className="relative w-full h-64 bg-white/80 border border-slate-150 rounded-2xl p-4 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                  
                  {/* Stylized vector contour map representing regions */}
                  <svg viewBox="0 0 400 240" className="w-full h-full max-w-[340px]">
                    <defs>
                      <radialGradient id="delhiGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="mumbaiGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Stylized Dots / Contour representing country map outline */}
                    <path d="M120,40 C140,30 200,30 220,50 C240,70 280,100 280,120 C280,140 240,160 210,180 C180,200 160,220 150,230 C140,220 130,210 110,190 C90,170 80,150 90,130 C100,110 110,90 100,70 C90,50 100,40 120,40 Z" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4,4" />
                    <path d="M125,45 C145,35 195,35 215,55 C235,75 275,105 275,125 C275,145 235,165 205,185 C175,205 155,225 145,235" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                    
                    {/* Regional Academic Hubs on Map */}
                    {/* Delhi Hub */}
                    <g className="cursor-pointer group/node" transform="translate(160, 65)">
                      <circle cx="0" cy="0" r="28" fill="url(#delhiGlow)" />
                      <circle cx="0" cy="0" r="5" fill="#2563eb" className="animate-ping" style={{ animationDuration: "2.5s" }} />
                      <circle cx="0" cy="0" r="4" fill="#2563eb" />
                      
                      {/* Tooltip */}
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <rect x="-65" y="-45" width="130" height="34" rx="8" fill="#0f172a" />
                        <text x="0" y="-33" className="font-sans font-extrabold text-[8px] fill-white text-center" textAnchor="middle">DELHI REGION (AIIMS, MAMC)</text>
                        <text x="0" y="-22" className="font-mono text-[8px] fill-emerald-400 font-bold text-center" textAnchor="middle">3,400+ Active Students</text>
                        <polygon points="0,-11 -5,-11 0,-6" fill="#0f172a" transform="translate(0, 5)" />
                      </g>
                      
                      {/* Standard label */}
                      <text x="12" y="3" className="font-mono text-[8px] fill-slate-400 font-extrabold uppercase tracking-wider">North Hub</text>
                    </g>

                    {/* Mumbai Hub */}
                    <g className="cursor-pointer group/node" transform="translate(115, 140)">
                      <circle cx="0" cy="0" r="28" fill="url(#mumbaiGlow)" />
                      <circle cx="0" cy="0" r="5" fill="#10b981" className="animate-ping" style={{ animationDuration: "3s" }} />
                      <circle cx="0" cy="0" r="4" fill="#10b981" />
                      
                      {/* Tooltip */}
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <rect x="-65" y="-45" width="130" height="34" rx="8" fill="#0f172a" />
                        <text x="0" y="-33" className="font-sans font-extrabold text-[8px] fill-white text-center" textAnchor="middle">MUMBAI HUB (KEM, GSMC)</text>
                        <text x="0" y="-22" className="font-mono text-[8px] fill-emerald-400 font-bold text-center" textAnchor="middle">2,100+ Active Students</text>
                        <polygon points="0,-11 -5,-11 0,-6" fill="#0f172a" transform="translate(0, 5)" />
                      </g>
                      <text x="-12" y="14" className="font-mono text-[8px] fill-slate-400 font-extrabold uppercase tracking-wider" textAnchor="end">West Hub</text>
                    </g>

                    {/* South Hub (Manipal/Bangalore/Chennai) */}
                    <g className="cursor-pointer group/node" transform="translate(165, 195)">
                      <circle cx="0" cy="0" r="28" fill="url(#delhiGlow)" />
                      <circle cx="0" cy="0" r="5" fill="#6366f1" className="animate-ping" style={{ animationDuration: "2.8s" }} />
                      <circle cx="0" cy="0" r="4" fill="#6366f1" />
                      
                      {/* Tooltip */}
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <rect x="-65" y="-45" width="130" height="34" rx="8" fill="#0f172a" />
                        <text x="0" y="-33" className="font-sans font-extrabold text-[8px] fill-white text-center" textAnchor="middle">SOUTH ZONE (KMC, MMC)</text>
                        <text x="0" y="-22" className="font-mono text-[8px] fill-emerald-400 font-bold text-center" textAnchor="middle">4,200+ Active Students</text>
                        <polygon points="0,-11 -5,-11 0,-6" fill="#0f172a" transform="translate(0, 5)" />
                      </g>
                      <text x="12" y="3" className="font-mono text-[8px] fill-slate-400 font-extrabold uppercase tracking-wider">South Hub</text>
                    </g>

                    {/* East Hub (Kolkata) */}
                    <g className="cursor-pointer group/node" transform="translate(240, 115)">
                      <circle cx="0" cy="0" r="24" fill="url(#mumbaiGlow)" />
                      <circle cx="0" cy="0" r="5" fill="#0ea5e9" className="animate-ping" style={{ animationDuration: "3.2s" }} />
                      <circle cx="0" cy="0" r="4" fill="#0ea5e9" />
                      
                      {/* Tooltip */}
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <rect x="-65" y="-45" width="130" height="34" rx="8" fill="#0f172a" />
                        <text x="0" y="-33" className="font-sans font-extrabold text-[8px] fill-white text-center" textAnchor="middle">EAST ZONE (IPGMER, RG Kar)</text>
                        <text x="0" y="-22" className="font-mono text-[8px] fill-emerald-400 font-bold text-center" textAnchor="middle">1,800+ Active Students</text>
                        <polygon points="0,-11 -5,-11 0,-6" fill="#0f172a" transform="translate(0, 5)" />
                      </g>
                      <text x="12" y="-3" className="font-mono text-[8px] fill-slate-400 font-extrabold uppercase tracking-wider">East Hub</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Community stats row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 mt-6 text-center lg:text-left">
                <div className="space-y-1">
                  <p className="font-display font-black text-slate-900 text-xl sm:text-2xl tracking-tight">15,000+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidates Joined</p>
                </div>
                <div className="space-y-1 border-x border-slate-200 px-4">
                  <p className="font-display font-black text-slate-900 text-xl sm:text-2xl tracking-tight">140+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Medical Institutes</p>
                </div>
                <div className="space-y-1">
                  <p className="font-display font-black text-slate-900 text-xl sm:text-2xl tracking-tight">98.4%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Board Success Rate</p>
                </div>
              </div>
            </div>

            {/* Column 2: Exam Achievements & Medical College Logos (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Exam Achievements Card */}
              <div className="bg-slate-50/50 border border-slate-200 rounded-[32px] p-6 flex flex-col justify-between h-full shadow-[0_2px_15px_rgba(0,0,0,0.01)] relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <h3 className="font-display font-extrabold text-slate-900 text-base leading-tight">
                      Recent Topper Achievements
                    </h3>
                  </div>
                  
                  <div className="space-y-3 pt-1">
                    <div className="flex justify-between items-center bg-white border border-slate-150 p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 font-bold font-mono text-xs flex items-center justify-center border border-amber-100">1st</span>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">Dr. Riddhi Sen</p>
                          <p className="text-[10px] text-slate-400">NEET-PG Rank 12 (ENT Perfect Score)</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">AIIMS Delhi</span>
                    </div>

                    <div className="flex justify-between items-center bg-white border border-slate-150 p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 font-bold font-mono text-xs flex items-center justify-center border border-slate-150">2nd</span>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">Dr. Vikranth Patil</p>
                          <p className="text-[10px] text-slate-400">INI-CET Rank 45</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">KEM Mumbai</span>
                    </div>

                    <div className="flex justify-between items-center bg-white border border-slate-150 p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 font-bold font-mono text-xs flex items-center justify-center border border-orange-100">3rd</span>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">Dr. Clara Mendez</p>
                          <p className="text-[10px] text-slate-400">USMLE Step 2 CK (268 Score)</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">MAMC Delhi</span>
                    </div>
                  </div>
                </div>

                {/* Medical College Logos Placeholder */}
                <div className="pt-5 border-t border-slate-150 mt-5 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">TRUSTED BY CANDIDATES FROM</p>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="bg-white border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-slate-400 tracking-wider shadow-sm hover:border-slate-300 transition-colors">AIIMS</span>
                    <span className="bg-white border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-slate-400 tracking-wider shadow-sm hover:border-slate-300 transition-colors">MAMC</span>
                    <span className="bg-white border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-slate-400 tracking-wider shadow-sm hover:border-slate-300 transition-colors">KMC</span>
                    <span className="bg-white border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-slate-400 tracking-wider shadow-sm hover:border-slate-300 transition-colors">KEM HOSPITAL</span>
                    <span className="bg-white border border-slate-150 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-slate-400 tracking-wider shadow-sm hover:border-slate-300 transition-colors">AFMC</span>
                  </div>
                </div>
              </div>
              
            </div>

          </div>

          {/* Testimonials and Student Success Stories Grid (3 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-slate-50/50 border border-slate-200 rounded-[30px] p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:shadow-xl hover:shadow-slate-200/40 transition-all flex flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  {/* 5-Star Rating block */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-150">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md" 
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</h5>
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.2 rounded font-extrabold border border-emerald-100">VERIFIED</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Medical FAQs Accordion - Bento styled Container */}
      <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-2xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs mt-2">
            Got queries about Dr. Pulkit's system or memberships? Answers to core questions below.
          </p>
        </div>

        <div className="space-y-3.5">
          {MOCK_FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all shadow-sm hover:border-slate-300"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 py-4 font-semibold text-slate-950 text-xs sm:text-sm flex justify-between items-center hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in slide-in-from-top-1 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Premium Final CTA Section (Modern SaaS style) */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 relative overflow-hidden max-w-7xl mx-auto mb-16">
        {/* Soft Modern Gradient Card */}
        <div className="relative rounded-[40px] bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 px-8 py-16 sm:px-16 sm:py-20 lg:py-24 text-center overflow-hidden border border-indigo-950 shadow-2xl">
          
          {/* Soft Illustration / Ambient Lighting Shapes in Background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid layout */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
            
            {/* Soft modern glowing blobs */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
            
            {/* Soft abstract vector graphic simulating anatomical or soundwave contours */}
            <svg viewBox="0 0 800 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.08]" fill="none" stroke="currentColor">
              <path d="M-100,200 C100,100 200,300 400,200 C600,100 700,300 900,200" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
              <path d="M-100,220 C120,120 180,320 400,220 C620,120 680,320 900,220" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="400" cy="200" r="120" stroke="#818cf8" strokeWidth="1" strokeDasharray="6,6" />
              <circle cx="400" cy="200" r="160" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,8" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-blue-200 rounded-full border border-white/15 text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
              <span>UNLIMITED ACCESS</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Start Your ENT Learning Journey Today
              </h2>
              <p className="text-blue-100/70 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                Join thousands of candidates streamlining their clinical studies. Gain immediate access to high-yield otology, rhinology, and laryngology materials.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigateTo("auth/register")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-extrabold rounded-2xl text-xs hover:bg-blue-50 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>
              
              <button
                onClick={() => navigateTo("notes")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-extrabold rounded-2xl text-xs hover:bg-white/15 active:scale-95 border border-white/15 backdrop-blur-sm transition-all cursor-pointer"
              >
                <span>Explore Notes</span>
              </button>
            </div>

            {/* Tiny Trust Element */}
            <p className="text-[10px] text-blue-200/50 font-medium">
              No credit card required • Instant access to free high-yield chapters
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
