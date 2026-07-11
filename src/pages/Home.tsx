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
  ChevronDown 
} from "lucide-react";
import { MOCK_FAQS, MOCK_TESTIMONIALS } from "../data/mockData";
import docProfile from "../assets/dr_pulkit_agarwal.jpg"

export const Home: React.FC = () => {
  const { navigateTo, topics } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleStartLearning = () => {
    navigateTo("notes");
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen pb-16">
      
      {/* 1. Hero Section - Bento Grid style */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
        {/* Subtle decorative medical grids/pulses */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-12 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
          <div className="absolute bottom-12 right-10 w-96 h-96 bg-sky-400 rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Hero Text Card (Bento Box - Spans 7 cols on large) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                    <Award className="w-3.5 h-3.5" />
                    Accredited Medical Education Syllabus
                  </span>
                </div>
                
                <h1 className="font-display font-extrabold text-slate-900 leading-[1.15] text-3xl sm:text-5xl tracking-tight">
                  Master Otorhinolaryngology with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Clinical Clarity</span>
                </h1>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl">
                  High-yield ENT learning resources, surgical walkthroughs, and premium printable study notes prepared by <strong>Dr. Pulkit Agarwal</strong>. Tailored specifically for NEET-PG, NEXT, and USMLE candidates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-8 mt-auto">
                <button 
                  onClick={handleStartLearning}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigateTo("membership")}
                  className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 hover:border-blue-200 rounded-full transition-all cursor-pointer flex justify-center"
                >
                  Explore Membership Plans
                </button>
              </div>
            </div>

            {/* Featured Note Bento Card (Bento Box - Spans 5 cols on large) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative">
              <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                Online Now
              </div>

              <div className="space-y-6">
                <div className="flex gap-2.5 items-center">
                  <div className="bg-blue-50 border border-blue-100 p-2.5 rounded-2xl text-blue-600">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">Featured Lecture Notes</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Surgical Anatomy Series</p>
                  </div>
                </div>

                {/* Sample Interactive card item */}
                <div className="bg-slate-50/50 border border-slate-150 p-5 rounded-2xl space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold bg-blue-100/50 text-blue-600 px-2 py-0.5 rounded">Otology</span>
                    <span className="text-[10px] text-slate-400 font-medium">8 min read</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">Acute Otitis Media (AOM): Staging & Care</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Deep dive into the 4 classic clinical stages from tubal occlusion through suppuration and resolution.
                  </p>
                  <button 
                    onClick={() => navigateTo("topic/acute-otitis-media-aom")}
                    className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Online Free</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-blue-50/40 p-3.5 rounded-2xl border border-blue-100 text-xs mt-6">
                <span className="font-semibold text-blue-900">PDF Study Notes Included?</span>
                <span className="bg-blue-600 text-white font-bold text-[9px] px-2.5 py-1 rounded-full">YES, DOWNLOADABLE</span>
              </div>
            </div>

          </div>

          {/* Stats Bento Row - 3 small aligned bento boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="space-y-1">
                <p className="font-display font-extrabold text-slate-950 text-xl sm:text-2xl tracking-tight">99.4%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Exam Pass Rate</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-blue-600">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="space-y-1">
                <p className="font-display font-extrabold text-slate-950 text-xl sm:text-2xl tracking-tight">15,000+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Medical Scholars</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-sky-500">
                <Users className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
              <div className="space-y-1">
                <p className="font-display font-extrabold text-slate-950 text-xl sm:text-2xl tracking-tight">100+</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">High-Yield Guides</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl text-indigo-500">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet Dr. Pulkit Agarwal (Bento Layout) */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Image container Card (Bento - spans 5) */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[32px] p-6 shadow-sm flex flex-col justify-center items-center hover:shadow-md transition-all">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[28px] rotate-2 scale-[0.98] opacity-10"></div>
                <img 
                  src={docProfile}
                  alt="Dr. Pulkit Agarwal" 
                  className="w-full max-w-xs rounded-[28px] object-cover shadow-lg border-4 border-white relative z-10"
                />
              </div>
              <div className="mt-4 text-center">
                <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full border border-blue-100">
                  CONSULTANT ENT SURGEON
                </span>
              </div>
            </div>

            {/* Doctor Intro text Card (Bento - spans 7) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[32px] p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full border border-slate-200 uppercase tracking-wide">
                    Meet Your Instructor
                  </span>
                </div>
                
                <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight leading-tight">
                  Dr. Pulkit Agarwal <span className="text-slate-400 text-sm font-normal font-sans block sm:inline sm:ml-2">(MS Otorhinolaryngology)</span>
                </h2>
                
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  As an active Consultant ENT surgeon and medical instructor, I understand the friction students face when reading dense clinical manuals. Our curriculum strips away redundant filler, providing <strong>anatomically exact, visual, and exam-focused</strong> study material.
                </p>
                
                <div className="space-y-3.5 pt-2 text-slate-700 border-t border-slate-100">
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong>MS Graduate</strong> with gold medal credentials in clinical otolaryngology.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong>Mentored 10,000+ candidates</strong> across premier medical colleges for NEET-PG/NEXT.</p>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p><strong>Clinical-Focused Method:</strong> Notes are embedded with diagnostic tables, Cottle's test, myringotomy landmarks, and real case histories.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button 
                  onClick={() => navigateTo("about")}
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Dr. Pulkit's full teaching story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Featured Notes and Chapters Grid - Bento Card elements */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs bg-sky-50 text-sky-600 font-bold px-3 py-1 rounded-full uppercase border border-sky-100">
            Syllabus Focus
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight mt-3">
            High-Yield Clinical Notes
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Begin with these core, premium guides containing high-resolution schematics, diagnostic criteria, and standard treatment guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((t) => (
            <div 
              key={t.id} 
              className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-[28px] p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded">
                    {t.tags?.[0] || "ENT Module"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {t.readingTime} min read
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug mb-2">
                  {t.title}
                </h3>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-4 line-clamp-3">
                  {t.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.isPremium ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                  {t.isPremium ? "Premium Notes" : "Free Online"}
                </span>
                
                <button 
                  onClick={() => navigateTo(`topic/${t.slug}`)}
                  className="bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 text-[10px] font-bold py-1.5 px-3.5 rounded-full transition-all cursor-pointer"
                >
                  Read Notes
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-10">
          <button 
            onClick={() => navigateTo("notes")}
            className="inline-flex items-center gap-1 px-5 py-2.5 rounded-full border border-slate-200/80 hover:border-blue-400 text-xs font-bold text-slate-700 hover:text-blue-600 bg-white transition-colors cursor-pointer"
          >
            <span>Explore All Chapters & Sections</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Platform Benefits - Bento styling with Visual Contrast */}
      <section className="bg-slate-900 text-white py-16 rounded-[40px] my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
              Why Residents Trust Dr. Pulkit
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Our system is built purposefully around clean learning, distraction-free notes, and durable downloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Benefit Bento Box 1 */}
            <div className="bg-slate-850 border border-slate-800 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">Optimal Typography</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  No distractions. Custom line-spacing, high-yield alert callouts, and clean tables crafted for medical comprehension.
                </p>
              </div>
            </div>

            {/* Benefit Bento Box 2 */}
            <div className="bg-slate-850 border border-slate-800 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">Printable PDF Downloads</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Keep notes on your offline tablets or print them for physical annotation during clinical ward rounds.
                </p>
              </div>
            </div>

            {/* Benefit Bento Box 3 */}
            <div className="bg-slate-850 border border-slate-800 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white">AI Chat Assistant</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Instant diagnostic or surgical explanations anytime. Select pre-populated high-yield terms or enter custom inputs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Student Testimonials Grid - Bento Card details */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs text-blue-600 font-bold px-3 py-1 bg-white border border-slate-200 rounded-full">
            Student Reviews
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight mt-3">
            Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-6">
              <p className="text-slate-500 text-xs italic leading-relaxed">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">{t.name}</h5>
                  <p className="text-[10px] text-slate-400 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
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

    </div>
  );
};
