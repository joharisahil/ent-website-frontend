/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  DownloadCloud, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Lock, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles 
} from "lucide-react";

interface PDFViewerProps {
  topicId: string;
  pdfUrl?: string;
  pdfSize?: string;
  isPremium: boolean;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ topicId, pdfUrl, pdfSize, isPremium }) => {
  const { currentUser, navigateTo, triggerDownload } = useApp();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Determine if user has download & full-view rights
  const hasAccess = !!currentUser; // Any logged-in user can read PDF (Members get standard/elite)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 20, 180));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 20, 60));

  const handleDownload = () => {
    triggerDownload(topicId);
  };

  const handlePageNext = () => setCurrentPage(prev => Math.min(prev + 1, 4));
  const handlePagePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Render guest blurred preview
  if (!hasAccess) {
    return (
      <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-100 shadow-inner my-6 relative max-w-4xl mx-auto font-sans">
        {/* PDF Header controls */}
        <div className="bg-slate-900 text-white p-3 px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <FileText className="w-4 h-4 text-red-500" />
            <span>Document Preview: {pdfSize || "3.5 MB"}</span>
          </div>
          <div className="flex gap-1">
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300">
              GUEST_VIEW
            </span>
          </div>
        </div>

        {/* Blurred Canvas Area */}
        <div className="p-8 h-96 relative flex items-center justify-center overflow-hidden bg-slate-50">
          {/* Mock Document Backdrop - heavily blurred */}
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-md blur-md select-none pointer-events-none opacity-40">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-28 bg-blue-100/50 rounded-xl w-full border border-blue-200 my-4"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Frosted Glass Callout Container */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md flex flex-col justify-center items-center px-4 py-8 text-center text-white">
            <div className="bg-blue-600 p-4 rounded-3xl shadow-xl shadow-blue-500/20 max-w-sm w-full mx-auto border border-blue-400">
              <div className="bg-white/15 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5 text-white" />
              </div>
              
              <h4 className="font-display font-bold text-base leading-tight">
                Download Dr. Pulkit's Study Notes
              </h4>
              <p className="text-white/85 text-[11px] leading-relaxed mt-1.5 mb-4">
                Full-text PDF downloads, clinical diagrams, and high-yield study resources are restricted to registered users. Accessing is free and quick!
              </p>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => navigateTo("auth/login")}
                  className="bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow active:scale-95"
                >
                  Sign In to Download
                </button>
                <button 
                  onClick={() => navigateTo("membership")}
                  className="bg-blue-500 hover:bg-blue-400 border border-blue-400/50 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Explore Memberships
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render full embedded reader for Members
  return (
    <div className={`border border-slate-200 rounded-3xl overflow-hidden bg-slate-100 shadow-md my-6 relative max-w-4xl mx-auto font-sans transition-all ${isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : ""}`}>
      
      {/* Reader Controls Bar */}
      <div className="bg-slate-900 text-white p-3 px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
        {/* Left Side: title */}
        <div className="flex items-center gap-2 font-semibold">
          <FileText className="w-4 h-4 text-emerald-500" />
          <span>Active PDF: Page {currentPage} of 4</span>
          <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
            SECURE_VIEW
          </span>
        </div>

        {/* Center: zoom and navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
            <button onClick={handlePagePrev} disabled={currentPage === 1} className="hover:bg-white/10 p-1 rounded disabled:opacity-30 cursor-pointer">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1">{currentPage} / 4</span>
            <button onClick={handlePageNext} disabled={currentPage === 4} className="hover:bg-white/10 p-1 rounded disabled:opacity-30 cursor-pointer">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg p-1">
            <button onClick={handleZoomOut} className="hover:bg-white/10 p-1 rounded cursor-pointer">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[10px] w-9 text-center">{zoom}%</span>
            <button onClick={handleZoomIn} className="hover:bg-white/10 p-1 rounded cursor-pointer">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg cursor-pointer"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={handleDownload}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Embedded Document Canvas */}
      <div className={`p-4 overflow-auto bg-slate-500 flex justify-center ${isFullscreen ? "h-[calc(100vh-50px)]" : "h-[450px]"}`}>
        <div 
          className="bg-white border border-slate-350 shadow-2xl p-8 rounded-lg text-slate-800 transition-all text-xs leading-relaxed flex flex-col justify-between"
          style={{ width: `${600 * (zoom / 100)}px`, minHeight: `${800 * (zoom / 100)}px` }}
        >
          {/* PDF Page content */}
          <div>
            <div className="border-b border-slate-200 pb-3 mb-6 flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Dr. Pulkit Agarwal ENT Learning Resource</span>
              <span className="font-mono">Page {currentPage} of 4</span>
            </div>

            {currentPage === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold font-display text-slate-900 border-l-4 border-blue-500 pl-3">
                  ACUTE OTITIS MEDIA (AOM) — DIAGNOSTIC & THERAPEUTIC MATRIX
                </h2>
                <p className="text-xs text-slate-500 italic">Author: Dr. Pulkit Agarwal (Otorhinolaryngology Expert)</p>
                
                <h4 className="font-semibold text-slate-900 text-sm mt-4">Section I: Eustachian Pathomechanics</h4>
                <p>
                  Eustachian tube dysfunction represents the prerequisite for middle ear effusion. Tubal congestion causes immediate oxygen absorption, establishing negative intratympanic pressure. Transudation follows, and if nasopharyngeal flora reflexively aspirates, clinical suppuration occurs rapidly.
                </p>

                <h4 className="font-semibold text-slate-900 text-sm">Pathological Staging Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Stage of Tubal Occlusion:</strong> Eustachian mucosal swelling, retracted pars tensa, negative middle ear pressure.</li>
                  <li><strong>Stage of Presuppuration:</strong> Hyperemia of tympanic blood vessels, exudation, acute localized pain.</li>
                  <li><strong>Stage of Suppuration:</strong> Purulent pooling under tension, bulging, severe pediatric distress.</li>
                </ul>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Section II: Otoscopic Analysis & Staging</h3>
                <p>
                  Otoscopic visualization constitutes the gold standard of ENT triage. Pneumatic insufflation must be conducted to evaluate tympanic compliance. Reductions in compliance confirm middle ear fluid load, signaling myringitis or acute suppuration.
                </p>
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 mt-4">
                  <h5 className="font-bold text-slate-900 text-[11px] mb-1">Clinical Diagnostic Criteria:</h5>
                  <p className="text-[10px] text-slate-600 leading-relaxed">
                    1. Rapid onset of otalgia or pediatric tugging.<br/>
                    2. Erythema or severe bulging of the pars tensa.<br/>
                    3. Fluid line, air-fluid levels, or purulent otorrhea in resolution.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Section III: Pharmacology & Surgical Access</h3>
                <p>
                  Oral high-dose Amoxicillin continues to hold absolute first-line standing for pediatric and adult suppurative conditions. For recurrent cases or co-existing purulent conjunctivitis, escalate to clavulanate.
                </p>
                <h4 className="font-semibold text-slate-900 text-xs">Myringotomy Protocol:</h4>
                <p>
                  Myringotomy is performed via a tiny crescentic radial incision in the <strong>antero-inferior quadrant</strong>. This quadrant provides the widest, safest access margin while minimizing any traumatic risk to the ossicles (specifically the incudostapedial articulation) or the chorda tympani nerve.
                </p>
              </div>
            )}

            {currentPage === 4 && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Section IV: Clinical References & Exam Pearls</h3>
                <p>
                  1. Gradenigo's Syndrome: Triad of apical petrositis, abducens (VI) nerve palsy, and persistent deep retro-orbital pain.<br/>
                  2. Grisel's Syndrome: Subluxation of atlanto-axial joint secondary to pharyngeal or middle ear infections.<br/>
                  3. Lighthouse Sign: A pulsing, rhythmic light reflection visible on otoscopy during active fluid discharge from a small perforation.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-[11px] text-blue-800 mt-6 font-medium">
                  🌟 Exam Key: Always look for a horizontal wide Eustachian tube in infants when explaining the higher prevalence of AOM.
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-150 pt-4 mt-12 flex justify-between items-center text-[10px] text-slate-400 font-semibold font-mono">
            <span>© Dr. Pulkit Agarwal ENT Platform</span>
            <span>RESTRICTED_COPY_DO_NOT_DISTRIBUTE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
