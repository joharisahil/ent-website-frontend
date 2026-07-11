/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Stethoscope, Send, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Successfully subscribed ${email} to Dr. Pulkit's high-yield newsletters!`, "success");
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-850 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Platform Branding */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 text-white" onClick={() => navigateTo("home")}>
              <div className="bg-gradient-to-br from-blue-500 to-sky-400 p-2 rounded-lg text-white">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Dr. Pulkit Agarwal
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An enterprise-grade medical training platform delivering high-yield otorhinolaryngology study guides, summaries, and surgical walkthroughs for modern candidates.
            </p>
            <div className="pt-2 text-xs flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-300">contact@drpulkitent.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-300">+91 98100 54321</span>
              </div>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wide">Quick Directory</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo("notes")} className="hover:text-white hover:underline cursor-pointer">
                  All ENT Study Notes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("membership")} className="hover:text-white hover:underline cursor-pointer">
                  Membership Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("about")} className="hover:text-white hover:underline cursor-pointer">
                  Meet Dr. Pulkit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("contact")} className="hover:text-white hover:underline cursor-pointer">
                  Get In Touch
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wide">Legal & Policies</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo("privacy")} className="hover:text-white hover:underline cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("terms")} className="hover:text-white hover:underline cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("refund")} className="hover:text-white hover:underline cursor-pointer">
                  Cancellation & Refund Policy
                </button>
              </li>
              <li className="text-[10px] text-slate-500 italic">
                Verified Medical Education Platform
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wide">High-Yield Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly high-yield summaries, clinical case studies, and updates directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter doctor's email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 flex-grow"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2.5 transition-colors cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-500">
              We never spam. Unsubscribe at any time.
            </p>
          </div>

        </div>

        {/* Medical Education Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 leading-relaxed max-w-4xl mx-auto">
            <strong>Medical Disclaimer:</strong> The content on this platform is solely for educational, licensing, and residency preparation purposes. It does not constitute medical advice, diagnostics, or treatment. Always consult certified clinical guidelines and local practice policies for emergency patient care.
          </p>
          <p className="text-xs text-slate-600 mt-4 font-mono">
            &copy; {new Date().getFullYear()} Dr. Pulkit Agarwal ENT Learning Platform. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
