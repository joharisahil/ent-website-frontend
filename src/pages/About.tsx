/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useApp } from "../context/AppContext";
import { Award, BookOpen, Stethoscope, Compass, Heart, GraduationCap, ArrowRight } from "lucide-react";

export const About: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Header Banner - Styled as a large Bento Hero Card */}
      <section className="bg-white border border-slate-200/80 rounded-[32px] py-10 sm:py-14 text-center px-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50/60 px-3.5 py-1 rounded-full border border-blue-100">
            OUR FOUNDATION
          </span>
          <h1 className="font-display font-extrabold text-slate-900 text-2xl sm:text-4xl mt-4 tracking-tight leading-tight">
            Academic Integrity Meets Clinical Skill
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Eliminating clinical abstraction to empower the next generation of otorhinolaryngology residents and students.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Vision Grid */}
      <section className="space-y-6">
        
        {/* Row 1: Doctor Story & Credentials - Two Connected Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Story (Left Card) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">THE INSTRUCTOR</span>
              <h2 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight flex items-center gap-2.5">
                <Stethoscope className="w-5.5 h-5.5 text-blue-600" />
                Meet Dr. Pulkit Agarwal
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dr. Pulkit Agarwal holds a <strong>Master of Surgery (MS) in Otorhinolaryngology</strong>, graduating at the top of his clinical class. He has dedicated his professional career to both high-stakes microsurgical ENT interventions and classroom mentoring.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Disappointed by standard, dry text-heavy curriculum books that focus on endless memorization, Dr. Pulkit developed a <strong>spatial, high-yield methodology</strong>. By correlating the anatomical middle ear cleft or paranasal cavities with 3D clinical models, he helps students easily solve complex multi-step boards questions.
              </p>
            </div>

            <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100/60 mt-4">
              <p className="text-xs text-blue-900 leading-normal font-medium italic">
                "Our platform is built to solve one core problem: medical textbooks are too dense. We pull out the diagnostic criteria, safety guidelines, and surgical steps so you can focus on mastering your boards and saving lives in the wards."
              </p>
              <span className="block text-[10px] text-blue-600 font-bold mt-2.5">— Dr. Pulkit Agarwal, MS (ENT)</span>
            </div>
          </div>

          {/* Visual Showcase (Right Card) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-[32px] p-4 shadow-sm flex items-center justify-center relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600" 
              alt="Medical Consultation" 
              className="rounded-[24px] w-full h-full min-h-[300px] object-cover border border-slate-100 group-hover:scale-102 transition-transform duration-500"
            />
          </div>

        </div>

        {/* Row 2: Vision & Mission Cards - Triple Bento Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Compass className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-extrabold text-slate-900 text-sm sm:text-base">Our Mission</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              To supply premium, easily navigable, and up-to-date ENT resources. We ensure high-quality content is readable online for free by any student, anywhere in the world.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-extrabold text-slate-900 text-sm sm:text-base">Teaching Philosophy</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We focus on 3D spatial retention over static memorization. By understanding safe surgical landmarks and disease stages, everything else falls into place naturally.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-extrabold text-slate-900 text-sm sm:text-base">Future Horizon</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our architecture is built from the ground up to support surgical video libraries, real-time quizzes, offline flashcards, and interactive AI clinical mentors.
            </p>
          </div>

        </div>

      </section>

      {/* 3. CTA - Dark Bento Card */}
      <section className="bg-slate-900 border border-slate-950 rounded-[32px] text-white py-12 px-6 sm:px-12 text-center relative overflow-hidden shadow-lg shadow-slate-950/10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-900/40 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-display font-extrabold text-xl sm:text-3xl tracking-tight leading-tight">
            Ready to Accelerate Your Clinical Expertise?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Get instant access to free online notes, interactive tutoring modules, or register a premium membership for printable PDF resources.
          </p>
          <div className="flex justify-center pt-2">
            <button 
              onClick={() => navigateTo("notes")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10 active:scale-95 transition-all"
            >
              <span>Explore Notes Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
