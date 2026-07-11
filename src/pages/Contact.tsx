/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Clock } from "lucide-react";

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Academic Inquiry",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast("Thank you! Dr. Pulkit's support desk has received your message.", "success");
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Header - Large Bento Hero Card */}
      <section className="bg-white border border-slate-200/80 rounded-[32px] py-10 sm:py-14 text-center px-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10 opacity-60"></div>

        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50/60 px-3.5 py-1 rounded-full border border-blue-100">
            CONNECT WITH US
          </span>
          <h1 className="font-display font-extrabold text-slate-900 text-2xl sm:text-4xl mt-4 tracking-tight leading-tight">
            We Are Here to Support Your Journey
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Have questions about billing, academic content, or organizing a custom clinical workshop? Contact us directly.
          </p>
        </div>
      </section>

      {/* Main Content - Side-by-side Bento Arrangement */}
      <section className="py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Contact Details (Left Column) - Staggered Bento Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6 justify-between">
            
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 shadow-sm space-y-4">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">SUPPORT DESK</span>
              <h2 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                Support Hub & Offices
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our support staff is dedicated to responding to both billing queries and academic suggestions within 24 business hours.
              </p>
            </div>

            {/* Support Cards */}
            <div className="grid grid-cols-1 gap-4">
              
              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-[24px] shadow-sm hover:border-blue-200 transition-colors">
                <div className="bg-blue-50 text-blue-600 shrink-0 h-10 w-10 rounded-xl flex items-center justify-center">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm">Direct Email</h4>
                  <p className="text-xs text-slate-500">contact@drpulkitent.com</p>
                  <p className="text-[10px] text-blue-600 font-bold mt-1">Checked daily by Dr. Pulkit</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-[24px] shadow-sm hover:border-blue-200 transition-colors">
                <div className="bg-blue-50 text-blue-600 shrink-0 h-10 w-10 rounded-xl flex items-center justify-center">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm">Telephone Hotline</h4>
                  <p className="text-xs text-slate-500">+91 98100 54321</p>
                  <p className="text-[10px] text-slate-400 mt-1">Mon–Fri, 9:00 AM – 5:00 PM IST</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-[24px] shadow-sm hover:border-blue-200 transition-colors">
                <div className="bg-blue-50 text-blue-600 shrink-0 h-10 w-10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-extrabold text-slate-900 text-xs sm:text-sm">Clinical Office Location</h4>
                  <p className="text-xs text-slate-500">Surgical Otology Wing, Phase II, New Delhi, India</p>
                </div>
              </div>

            </div>

            {/* Operating Times */}
            <div className="bg-white border border-slate-200/80 rounded-[20px] p-4 shadow-sm flex items-center gap-2.5 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Average response window: <strong className="text-slate-900">&lt; 18 hours</strong></span>
            </div>
          </div>

          {/* Form Card (Right Column) - Styled as a Large Bento Input Block */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 shadow-sm rounded-[32px] p-6 sm:p-8 hover:shadow-md transition-all">
            {submitted ? (
              <div className="text-center py-12 space-y-5">
                <div className="bg-emerald-50 text-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-slate-900 text-lg">Inquiry Submitted Successfully</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out, {formData.name}! We have routed your inquiry regarding <strong>"{formData.subject}"</strong> to the appropriate desk. A team member will follow up with you shortly.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Academic Inquiry", message: "" });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer shadow shadow-blue-500/10 active:scale-95"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-lg">Send Dr. Pulkit a Message</h3>
                  <p className="text-xs text-slate-400 mt-1">Complete the clinical query form below for quick feedback.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Jane Doe"
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jane@hospital.com"
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Inquiry Category</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all cursor-pointer"
                  >
                    <option value="Academic Inquiry">Academic Syllabus Question</option>
                    <option value="Billing Support">Membership & Billing Support</option>
                    <option value="Surgical Workshop">Surgical Workshops & Seminars</option>
                    <option value="Collaboration">Professional Partnership Proposal</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Detailed Message *</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your surgical clinical or syllabus query in detail..."
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 px-6 rounded-xl w-full flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 transition-all active:scale-98"
                >
                  {loading ? (
                    <span>Routing inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Support Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
