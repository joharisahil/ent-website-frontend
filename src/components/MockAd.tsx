/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Award, ExternalLink, ShieldCheck } from "lucide-react";

interface MockAdProps {
  placement: "intro" | "inline" | "sidebar" | "footer";
}

export const MockAd: React.FC<MockAdProps> = ({ placement }) => {
  // Simulating different ad campaigns based on placement
  const getAdContent = () => {
    switch (placement) {
      case "intro":
        return {
          title: "PrepGenie NEET-PG Grand Test Series",
          description: "All-India Ranking Series with comprehensive video explanations. Curated by top medical faculty.",
          cta: "Take Free Test",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=300",
          tag: "Sponsor"
        };
      case "sidebar":
        return {
          title: "Littmann Stethoscope Premium Sale",
          description: "32% off authorized Littmann Classic III monitoring scopes. Limited edition slate series.",
          cta: "Get Offer",
          image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300",
          tag: "Featured Partner"
        };
      case "footer":
        return {
          title: "Clinical Fellowships in Surgical Otology",
          description: "Dr. Pulkit Agarwal's selective 6-month hands-on fellowship starting Fall 2026. Register your resume.",
          cta: "Apply Now",
          image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=300",
          tag: "Internal Career"
        };
      default:
        return {
          title: "Marrow Master MCQ Bank 2026",
          description: "15,000+ clinical scenario questions aligned strictly with the latest NMC exam models.",
          cta: "Unlock Q-Bank",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300",
          tag: "Sponsored Study Aid"
        };
    }
  };

  const ad = getAdContent();

  if (placement === "sidebar") {
    return (
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col gap-3 font-sans mt-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">{ad.tag}</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </div>
        <img src={ad.image} alt={ad.title} className="w-full h-28 object-cover rounded-xl" />
        <div>
          <h5 className="font-semibold text-slate-900 text-xs tracking-tight">{ad.title}</h5>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{ad.description}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 rounded-xl transition-colors w-full cursor-pointer">
          {ad.cta}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200/80 p-4 sm:p-5 rounded-2xl my-6 flex flex-col sm:flex-row items-center gap-4 font-sans shadow-sm">
      <img 
        src={ad.image} 
        alt={ad.title} 
        className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200" 
      />
      <div className="flex-grow text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
          <span className="text-[9px] font-bold bg-slate-200/60 text-slate-600 px-1.5 py-0.5 rounded uppercase tracking-wider">
            {ad.tag}
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <h4 className="font-bold text-slate-900 text-sm">{ad.title}</h4>
        <p className="text-xs text-slate-500 mt-1 leading-normal">{ad.description}</p>
      </div>
      <button className="bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 hover:border-blue-300 font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-all shadow-sm active:scale-95 cursor-pointer">
        {ad.cta}
      </button>
    </div>
  );
};
