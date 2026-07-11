/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ShieldCheck, FileCheck, DollarSign, ChevronRight, Scale } from "lucide-react";

export const Legal: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();
  
  // Tab switcher depending on which route triggered: "privacy" | "terms" | "refund"
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "refund">("privacy");

  useEffect(() => {
    if (currentRoute === "privacy") setActiveTab("privacy");
    else if (currentRoute === "terms") setActiveTab("terms");
    else if (currentRoute === "refund") setActiveTab("refund");
  }, [currentRoute]);

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-[calc(100vh-64px)] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Title */}
      <section className="bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-10 shadow-sm relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/40 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigateTo("home")}>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800">Legal Policies</span>
          </div>

          <h1 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">
            Compliance & Guidelines
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
            Please read our standard medical data, billing security, and cancellation regulations carefully.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Side Tabs */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1.5 overflow-x-auto select-none border-b lg:border-b-0 pb-3 lg:pb-0 shrink-0">
            <button
              onClick={() => { setActiveTab("privacy"); navigateTo("privacy"); }}
              className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 cursor-pointer shrink-0 text-left transition-all ${activeTab === "privacy" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => { setActiveTab("terms"); navigateTo("terms"); }}
              className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 cursor-pointer shrink-0 text-left transition-all ${activeTab === "terms" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <Scale className="w-4 h-4" />
              <span>Terms & Conditions</span>
            </button>
            <button
              onClick={() => { setActiveTab("refund"); navigateTo("refund"); }}
              className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 cursor-pointer shrink-0 text-left transition-all ${activeTab === "refund" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Cancellation & Refund</span>
            </button>
          </div>

          {/* Content Pane */}
          <div className="lg:col-span-9 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-[32px] shadow-sm space-y-6 leading-relaxed text-xs sm:text-sm hover:shadow-md transition-all">
            
            {/* PRIVACY POLICY */}
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">Privacy & Medical Data Policy</h2>
                <p className="text-slate-400 text-[10px] -mt-1 font-mono font-bold uppercase tracking-wider">Last updated: July 11, 2026</p>
                
                <p className="text-slate-600 leading-relaxed">
                  At Dr. Pulkit Agarwal ENT Learning Platform, we prioritize candidate privacy and medical credential security. This Policy outlines how our databases secure, process, and retain student or resident information.
                </p>

                <h4 className="font-extrabold text-slate-900 mt-5">1. Information We Collect</h4>
                <p className="text-slate-600 leading-relaxed">
                  We collect basic information supplied upon registration, specifically your Full Name, Medical/Institutional Email, and optional medical license details for membership audits.
                </p>

                <h4 className="font-extrabold text-slate-900">2. Processing & Security</h4>
                <p className="text-slate-600 leading-relaxed">
                  We do not lease or sell candidate profiles to external pharmaceutical or recruitment agencies. All payment pipelines are processed over end-to-end encrypted PCI-DSS channels.
                </p>

                <h4 className="font-extrabold text-slate-900">3. Cookies & Cache</h4>
                <p className="text-slate-600 leading-relaxed">
                  Our application relies on standard browser Cache and LocalStorage modules to maintain active bookmarks, download logs, and dark theme visual preferences.
                </p>
              </div>
            )}

            {/* TERMS AND CONDITIONS */}
            {activeTab === "terms" && (
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">Terms & Intellectual Property Conditions</h2>
                <p className="text-slate-400 text-[10px] -mt-1 font-mono font-bold uppercase tracking-wider">Last updated: July 11, 2026</p>

                <p className="text-slate-600 leading-relaxed">
                  By accessing Dr. Pulkit's specialized clinical ENT syllabus, notes, or AI interactive co-pilots, you accept the following terms of usage:
                </p>

                <h4 className="font-extrabold text-slate-900 mt-5">1. Copyright & Syllabus Distribution</h4>
                <p className="text-slate-600 leading-relaxed">
                  All materials, PDF handouts, diagrams, and video outlines are the exclusive intellectual property of Dr. Pulkit Agarwal. Re-distributing, hosting on public torrents, or modifying notes content without written consent carries strict intellectual property penalties.
                </p>

                <h4 className="font-extrabold text-slate-900">2. Medical Consultation Disclaimer</h4>
                <p className="text-slate-600 leading-relaxed">
                  Content is structured strictly for certification exam prep (NEET-PG, NEXT, USMLE) and MS residency training. This content does not substitute professional medical consultations or certified local clinical guidelines.
                </p>

                <h4 className="font-extrabold text-slate-900">3. Termination</h4>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to suspend or block student accounts found accessing resources via multiple parallel sessions or sharing authorization credentials with third parties.
                </p>
              </div>
            )}

            {/* REFUND POLICY */}
            {activeTab === "refund" && (
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">Cancellation & Refund Policy</h2>
                <p className="text-slate-400 text-[10px] -mt-1 font-mono font-bold uppercase tracking-wider">Last updated: July 11, 2026</p>

                <p className="text-slate-600 leading-relaxed">
                  We believe in delivering ultimate academic value. If our clinical notes or video modules do not help you master your ENT chapters, we support your right to cancellation.
                </p>

                <h4 className="font-extrabold text-slate-900 mt-5">1. Standard 7-Day Guarantee</h4>
                <p className="text-slate-600 leading-relaxed">
                  If you are unsatisfied with your Pro Access or Elite Membership, contact our support team at <strong className="text-blue-600">contact@drpulkitent.com</strong> within 7 calendar days of your initial purchase. We will issue a 100% full refund, no questions asked.
                </p>

                <h4 className="font-extrabold text-slate-900">2. Cancellation Conditions</h4>
                <p className="text-slate-600 leading-relaxed">
                  To protect our content from fraudulent downloads, accounts that have downloaded more than 10 complete PDF handouts within their first 7 days are ineligible for immediate refunds.
                </p>

                <h4 className="font-extrabold text-slate-900">3. Processing Window</h4>
                <p className="text-slate-600 leading-relaxed">
                  Approved refunds are credited back to your original credit card or bank account within 5–7 business days.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
