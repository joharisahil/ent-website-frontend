/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, MessageSquare, Send, X, Bot, RefreshCw, GraduationCap } from "lucide-react";
import { useApp } from "../context/AppContext";

export const AIHelper: React.FC = () => {
  const { showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string; isHTML?: boolean }>>([
    {
      sender: "ai",
      text: "Hello! I am your <strong>ENT AI Tutor</strong> trained on Dr. Pulkit's curriculum. Ask me any conceptual or surgical question about ear, nose, or throat pathology!"
    }
  ]);

  const highYieldSuggestions = [
    { label: "Gradenigo's Syndrome", q: "What is Gradenigo's Syndrome?" },
    { label: "Lighthouse Sign", q: "What is the Lighthouse Sign in AOM?" },
    { label: "Safe Myringotomy Quadrant", q: "Why do we do myringotomy in the antero-inferior quadrant?" }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMsgUser = { sender: "user" as const, text: textToSend };
    setMessages(prev => [...prev, newMsgUser]);
    setQuery("");
    setLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("gradenigo") || lower.includes("syndrome")) {
        responseText = `
          <div class="space-y-2 text-xs">
            <p><strong>Gradenigo's Syndrome</strong> is a classic, high-yield ENT triad representing apical petrositis (infection spreading to the petrous apex of the temporal bone):</p>
            <ol class="list-decimal pl-4 space-y-1 font-semibold text-slate-800">
              <li>Deep, persistent retro-orbital pain (referred along Cranial Nerve V - Trigeminal).</li>
              <li>Abducens nerve palsy (Cranial Nerve VI), causing lateral rectus paralysis and diplopia.</li>
              <li>Persistent, foul-smelling ear discharge (otorrhea) secondary to chronic middle ear infection.</li>
            </ol>
            <div class="bg-blue-50 border-l-2 border-blue-400 p-2 text-[10px] text-blue-800">
              <strong>Clinical Pearl:</strong> Immediate high-dose intravenous line antibiotics are mandated. Surgical petrous apicectomy is reserved for non-responsive cases.
            </div>
          </div>
        `;
      } else if (lower.includes("lighthouse") || lower.includes("sign")) {
        responseText = `
          <div class="space-y-2 text-xs">
            <p>The <strong>Lighthouse Sign</strong> is a characteristic visual phenomenon observed during otoscopic examination in the late stage of <strong>Acute Otitis Media (AOM)</strong>.</p>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Description:</strong> It refers to a pulsating, rhythmic light reflection or a tiny droplet of purulent discharge pumping out from a small pin-point perforation in the tympanic membrane.</li>
              <li><strong>Mechanism:</strong> The pulsation is transmitted directly from the highly congested mucosal blood vessels in the middle ear space.</li>
              <li><strong>Significance:</strong> Confirms a tiny perforation under high tension. Prompts immediate monitoring to ensure the infection transitions safely to complete resolution.</li>
            </ul>
          </div>
        `;
      } else if (lower.includes("myringotomy") || lower.includes("quadrant") || lower.includes("antero")) {
        responseText = `
          <div class="space-y-2 text-xs">
            <p>Myringotomy is surgically indicated for severe suppurative ear pain or impending intracranial complications. It is <strong>strictly performed in the antero-inferior quadrant</strong> of the tympanic membrane for two fundamental anatomical reasons:</p>
            <ul class="list-disc pl-4 space-y-1">
              <li><strong>Ossicular Safety:</strong> The posterior half of the tympanic membrane houses the delicate ossicular chain (incus, stapes articulation) and the chorda tympani nerve. Operating antero-inferiorly eliminates any risk of traumatic sensorineural hearing loss or taste disruption.</li>
              <li><strong>Incision Site:</strong> The anterior half is highly vascular and heals extremely well. It provides optimal dependent drainage of pooled middle ear secretions.</li>
            </ul>
          </div>
        `;
      } else {
        responseText = `
          <div class="space-y-2 text-xs">
            <p>Thank you for asking about <strong>"${textToSend}"</strong>! Here is Dr. Pulkit's standard clinical overview:</p>
            <p>In Otorhinolaryngology, we prioritize 3D spatial relationships and anatomical landmarks. Whether examining the middle ear cleft, the nasal valve, or the tracheobronchial tree, remember:</p>
            <ul class="list-disc pl-4 space-y-1">
              <li>Confirm the patient's symptoms via clinical and radiological evidence first.</li>
              <li>Manage conservatively with targeted antibiotic coverage or topical decongestants where indicated.</li>
              <li>Escalate to surgical interventions (Myringotomy, Septoplasty, or Tracheostomy) for refractory or emergency airway conditions.</li>
            </ul>
            <p class="text-[10px] text-slate-500 italic">Feel free to type "Gradenigo", "Lighthouse", or "Myringotomy" for deep high-yield breakdowns!</p>
          </div>
        `;
      }

      setMessages(prev => [...prev, { sender: "ai", text: responseText, isHTML: true }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="font-sans">
      {/* Trigger Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if(!isOpen) showToast("ENT AI Tutor is now online", "info");
        }}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30 group"
      >
        <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold pr-1">ENT AI Tutor</span>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </button>

      {/* Main Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[480px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-blue-600 to-sky-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/15 p-2 rounded-xl">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs">ENT AI Interactive Tutor</h4>
                <p className="text-[9px] text-white/80">Offline Syllabus Co-Pilot (v1.2)</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Suggested High-Yield Chips */}
          <div className="bg-slate-50 border-b border-slate-150 p-2.5 flex gap-1.5 overflow-x-auto select-none shrink-0 scrollbar-none">
            {highYieldSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.q)}
                className="bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Messages Log */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-50/50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    m.sender === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: m.text }} />
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: m.text }} />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3 flex items-center gap-2 text-xs text-slate-400 shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing syllabus answer...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(query); }}
            className="p-3 border-t border-slate-150 flex gap-2 bg-white shrink-0"
          >
            <input 
              type="text" 
              placeholder="Ask a medical/surgical ENT question..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="flex-grow bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-35 text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
