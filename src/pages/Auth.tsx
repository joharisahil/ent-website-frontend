/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Stethoscope, LogIn, UserPlus, HelpCircle, ShieldAlert, CheckCircle } from "lucide-react";

export const Auth: React.FC = () => {
  const { currentRoute, navigateTo, setCurrentUser, loginAs, showToast, topics, triggerDownload } = useApp();
  
  // Tab switcher: "login" | "register" | "forgot" | "verify"
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot" | "verify">(
    currentRoute.endsWith("register") ? "register" : "login"
  );

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }));
  };

  const checkAutoDownloadResume = () => {
    const pendingDownloadTopicId = localStorage.getItem("ent_redirect_download_topic_id");
    if (pendingDownloadTopicId) {
      localStorage.removeItem("ent_redirect_download_topic_id");
      const targetTopic = topics.find(t => t.id === pendingDownloadTopicId);
      if (targetTopic) {
        showToast(`Resuming PDF download for "${targetTopic.title}"`, "info");
        setTimeout(() => {
          triggerDownload(pendingDownloadTopicId);
          navigateTo(`topic/${targetTopic.slug}`);
        }, 800);
        return true;
      }
    }
    return false;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showToast("Please enter your email and password.", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Simulate login
      const dummyUser = {
        id: "user-sarah",
        fullName: formData.email.split("@")[0].toUpperCase(),
        email: formData.email,
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
        role: "MEMBER" as any,
        status: "ACTIVE" as any,
        provider: "EMAIL" as any,
        preferences: { theme: "LIGHT" as any, emailNotifications: true, marketingEmails: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCurrentUser(dummyUser);
      showToast("Signed in successfully!", "success");

      // Resume download if pending, else navigate to home or dashboard
      const resumed = checkAutoDownloadResume();
      if (!resumed) {
        navigateTo("dashboard/member");
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      showToast("Please complete all required fields.", "error");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }
    if (!formData.agreeTerms) {
      showToast("You must accept the Terms & Conditions.", "warning");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTab("verify");
      showToast("Registration successful! A verification token was emailed.", "info");
    }, 1200);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      const verifiedUser = {
        id: "user-new",
        fullName: formData.fullName || "Dr. Guest Candidate",
        email: formData.email,
        avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150",
        role: "MEMBER" as any,
        status: "ACTIVE" as any,
        provider: "EMAIL" as any,
        preferences: { theme: "LIGHT" as any, emailNotifications: true, marketingEmails: true },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCurrentUser(verifiedUser);
      showToast("Account verified and unlocked successfully!", "success");

      const resumed = checkAutoDownloadResume();
      if (!resumed) {
        navigateTo("dashboard/member");
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      const googleUser = {
        id: "user-google",
        fullName: "Dr. Alexander Fleming",
        email: "alexander.fleming@gmail.com",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
        role: "MEMBER" as any,
        status: "ACTIVE" as any,
        provider: "GOOGLE" as any,
        preferences: { theme: "LIGHT" as any, emailNotifications: true, marketingEmails: false },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCurrentUser(googleUser);
      showToast("Signed in securely with Google!", "success");

      const resumed = checkAutoDownloadResume();
      if (!resumed) {
        navigateTo("dashboard/member");
      }
    }, 900);
  };

  return (
    <div className="font-sans text-slate-700 bg-slate-50 min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-[32px] overflow-hidden shadow-xl">
        
        {/* Banner Logo */}
        <div className="bg-slate-900 text-white p-6 text-center space-y-2">
          <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-base tracking-tight">Dr. Pulkit Agarwal</h2>
          <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">ENT Medical Learning Platform</p>
        </div>

        {/* Tab selector */}
        {activeTab !== "verify" && activeTab !== "forgot" && (
          <div className="flex border-b border-slate-150 text-xs font-bold text-center">
            <button 
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3.5 transition-colors cursor-pointer ${activeTab === "login" ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50/10" : "text-slate-400 hover:text-slate-600"}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3.5 transition-colors cursor-pointer ${activeTab === "register" ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50/10" : "text-slate-400 hover:text-slate-600"}`}
            >
              Create Account
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-5 text-slate-600">
          
          {/* VIEW: LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">Password</label>
                  <button 
                    type="button"
                    onClick={() => setActiveTab("forgot")}
                    className="text-[10px] text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow shadow-blue-500/10"
              >
                {loading ? <span>Verifying credentials...</span> : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold">OR CONTINUOUS VIA</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3 rounded-xl transition-colors cursor-pointer text-center text-xs flex justify-center items-center gap-2"
              >
                <img src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=40" alt="Google" className="w-4 h-4 rounded-full" />
                <span>Sign In with Google</span>
              </button>
            </form>
          )}

          {/* VIEW: REGISTER FORM */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Candidate Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  required
                  placeholder="e.g. Dr. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block uppercase">Confirm Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 py-1 select-none">
                <input 
                  type="checkbox" 
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-0.5"
                />
                <label htmlFor="agreeTerms" className="text-[10px] text-slate-500 leading-tight cursor-pointer">
                  I accept the <strong>Terms of Service</strong>, <strong>Privacy Regulations</strong>, and <strong>Cancellation Policy</strong>.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <span>Provisioning account...</span> : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {activeTab === "forgot" && (
            <div className="space-y-4 text-xs font-sans">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex gap-3 text-blue-800">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Enter your registered medical address. If matching records exist in our credential logs, we will email a secure 6-digit reset code.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase">Registered Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="doctor@hospital.com"
                  className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setActiveTab("login")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-center"
                >
                  Back to Login
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    showToast("Reset instructions sent to your email!", "success");
                    setActiveTab("login");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-center"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          )}

          {/* VIEW: EMAIL VERIFICATION */}
          {activeTab === "verify" && (
            <form onSubmit={handleVerifySubmit} className="space-y-4 text-xs font-sans">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex gap-3 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Verification token dispatched!</strong> Please check your medical inbox for our 6-digit verification pin (use "123456" for instant demo verification).
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 block uppercase text-center">Enter 6-Digit Code</label>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  placeholder="123456"
                  className="w-full bg-slate-50 text-base font-bold font-mono py-3 rounded-xl border focus:outline-none focus:border-blue-500 text-center tracking-widest"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <span>Verifying credentials...</span> : (
                  <span>Verify Code & Sign In</span>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
