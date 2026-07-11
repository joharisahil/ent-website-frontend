/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { 
  BookOpen, 
  Bookmark, 
  DownloadCloud, 
  Bell, 
  Settings, 
  Award, 
  Clock, 
  Trash2, 
  CreditCard, 
  Moon, 
  Sun, 
  Sliders, 
  ChevronRight, 
  Mail, 
  Lock 
} from "lucide-react";
import { Theme } from "../types";

export const MemberDashboard: React.FC = () => {
  const { 
    currentUser, 
    bookmarks, 
    downloads, 
    readingHistory, 
    notifications, 
    markNotificationRead, 
    topics, 
    navigateTo, 
    removeBookmark,
    activeTheme,
    setActiveTheme,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<"overview" | "bookmarks" | "notifications" | "settings">("overview");

  // Filter topics in reading history
  const userReading = readingHistory.filter(h => h.userId === currentUser?.id);
  const userBookmarks = bookmarks.filter(b => b.userId === currentUser?.id);
  const userDownloads = downloads.filter(d => d.userId === currentUser?.id);

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Account settings and notification preferences saved!", "success");
  };

  const handleBookmarkClick = (topicId: string) => {
    const target = topics.find(t => t.id === topicId);
    if (target) navigateTo(`topic/${target.slug}`);
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen pb-16">
      
      {/* 1. Header Hero Banner - Styled as a Premium Bento Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-950 text-white rounded-[32px] p-6 sm:p-8 border border-slate-800/80 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
              alt={currentUser?.fullName} 
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-md"
            />
            <div>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2.5 py-1 rounded border border-blue-500/30 uppercase tracking-wider">
                Student Portal
              </span>
              <h1 className="font-display font-extrabold text-lg sm:text-2xl mt-1.5 tracking-tight">{currentUser?.fullName}</h1>
              <p className="text-slate-400 text-xs mt-0.5">{currentUser?.email}</p>
            </div>
          </div>

          {/* Membership Status Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-1.5 w-full md:w-auto min-w-[240px]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Access Status</span>
            {currentUser?.membership ? (
              <>
                <div className="flex justify-between items-center font-bold text-emerald-400">
                  <span>{currentUser.membership.planName}</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-400">Expires: {new Date(currentUser.membership.expiresAt).toLocaleDateString()}</p>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center font-bold text-amber-500">
                  <span>Standard Guest Account</span>
                  <Lock className="w-4 h-4 text-amber-500" />
                </div>
                <button 
                  onClick={() => navigateTo("membership")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-1.5 px-3 rounded-lg mt-2 transition-all cursor-pointer text-center"
                >
                  Upgrade to Elite Access
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Menu Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Navigation rail (Left) - Styled as an Elegant Bento list */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1.5 overflow-x-auto select-none border-b lg:border-b-0 pb-3 lg:pb-0 scrollbar-none shrink-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 w-full ${activeTab === "overview" ? "bg-white border border-slate-200 text-blue-600 shadow-sm font-bold" : "bg-white/40 hover:bg-white text-slate-500 hover:text-slate-800 border border-transparent"}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learning Hub Overview</span>
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 w-full ${activeTab === "bookmarks" ? "bg-white border border-slate-200 text-blue-600 shadow-sm font-bold" : "bg-white/40 hover:bg-white text-slate-500 hover:text-slate-800 border border-transparent"}`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks & Downloads</span>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 w-full ${activeTab === "notifications" ? "bg-white border border-slate-200 text-blue-600 shadow-sm font-bold" : "bg-white/40 hover:bg-white text-slate-500 hover:text-slate-800 border border-transparent"}`}
            >
              <Bell className="w-4 h-4" />
              <span>My Notifications ({notifications.filter(n=>!n.read).length})</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 w-full ${activeTab === "settings" ? "bg-white border border-slate-200 text-blue-600 shadow-sm font-bold" : "bg-white/40 hover:bg-white text-slate-500 hover:text-slate-800 border border-transparent"}`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Security</span>
            </button>
          </div>

          {/* Dynamic Details Box (Right) - Highly Styled Bento Container */}
          <div className="lg:col-span-9 bg-white border border-slate-200/85 shadow-sm rounded-[32px] p-6 sm:p-8 min-h-[420px] hover:shadow-md transition-all">
            
            {/* VIEW: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">Welcome to Your Learning Hub</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Track your active curriculum progression and recent updates.</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-slate-150 rounded-2xl p-5 bg-slate-50/50 space-y-1 hover:bg-slate-50 transition-colors">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] text-slate-400 font-bold block">RECORDS READ</span>
                    <p className="font-display font-extrabold text-slate-900 text-lg mt-1">{userReading.length} topics</p>
                  </div>
                  <div className="border border-slate-150 rounded-2xl p-5 bg-slate-50/50 space-y-1 hover:bg-slate-50 transition-colors">
                    <Bookmark className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] text-slate-400 font-bold block">SAVED BOOKMARKS</span>
                    <p className="font-display font-extrabold text-slate-900 text-lg mt-1">{userBookmarks.length} guides</p>
                  </div>
                  <div className="border border-slate-150 rounded-2xl p-5 bg-slate-50/50 space-y-1 hover:bg-slate-50 transition-colors">
                    <DownloadCloud className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] text-slate-400 font-bold block">COMPLETED DOWNLOADS</span>
                    <p className="font-display font-extrabold text-slate-900 text-lg mt-1">{userDownloads.length} files</p>
                  </div>
                </div>

                {/* Reading History Progress */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-slate-900 text-xs tracking-wider uppercase">Active Reading History</h4>
                  {userReading.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
                      No active reading progress logs. Open any ENT syllabus topic to track your progress!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {userReading.map(r => (
                        <div 
                          key={r.id} 
                          onClick={() => handleBookmarkClick(r.topicId)}
                          className="border border-slate-200/80 p-4 rounded-2xl bg-slate-50/30 hover:bg-slate-50 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex justify-between items-center gap-4 text-xs"
                        >
                          <div className="space-y-1.5 w-full max-w-sm">
                            <h5 className="font-bold text-slate-950">{r.topicTitle}</h5>
                            {/* Simple Progress Bar */}
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-slate-200/60 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${r.progress}%` }}></div>
                              </div>
                              <span className="font-mono text-[10px] text-slate-500 shrink-0 font-bold">{r.progress}%</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* VIEW: BOOKMARKS & DOWNLOADS */}
            {activeTab === "bookmarks" && (
              <div className="space-y-8">
                
                {/* Bookmarks Section */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-slate-900 text-xs tracking-wider uppercase">Saved Bookmarks</h3>
                  {userBookmarks.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl bg-slate-50/20">
                      No bookmarked topics.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {userBookmarks.map(b => {
                        const target = topics.find(t => t.id === b.topicId);
                        if (!target) return null;
                        return (
                          <div 
                            key={b.id} 
                            className="border border-slate-200 rounded-2xl p-4 bg-slate-50/20 shadow-sm hover:border-blue-300 transition-colors flex justify-between items-start gap-3 group"
                          >
                            <div 
                              onClick={() => handleBookmarkClick(b.topicId)}
                              className="space-y-1.5 cursor-pointer flex-grow text-xs"
                            >
                              <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-500">{target.tags?.[0] || "ENT"}</span>
                              <h5 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{target.title}</h5>
                              <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-1">{target.summary}</p>
                            </div>
                            <button 
                              onClick={() => removeBookmark(b.topicId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                              title="Delete bookmark"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Downloads Section */}
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-slate-900 text-xs tracking-wider uppercase">Download History</h3>
                  {userDownloads.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl bg-slate-50/20">
                      No downloaded PDF files yet.
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto scrollbar-thin">
                      <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                        <thead className="bg-slate-50/80">
                          <tr>
                            <th className="px-5 py-3.5 font-semibold text-slate-700">Topic Title</th>
                            <th className="px-5 py-3.5 font-semibold text-slate-700">Downloaded At</th>
                            <th className="px-5 py-3.5 font-semibold text-slate-700 text-right">Format</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {userDownloads.map(d => (
                            <tr key={d.id} className="hover:bg-slate-50/50">
                              <td className="px-5 py-3.5 font-bold text-slate-900">{d.topicTitle}</td>
                              <td className="px-5 py-3.5 text-slate-400">{new Date(d.downloadedAt).toLocaleDateString()}</td>
                              <td className="px-5 py-3.5 text-right">
                                <span className="bg-red-50 text-red-600 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-100">PDF Document</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* VIEW: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">My Alerts & Inboxes</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Stay informed about upcoming live clinical streams, workshops, or notes publications.</p>
                </div>

                <div className="space-y-3 pt-2">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-4.5 rounded-2xl border transition-all cursor-pointer text-xs flex justify-between items-start gap-3 hover:shadow-sm ${!n.read ? "bg-blue-50/30 border-blue-200 hover:border-blue-300" : "bg-slate-50/30 border-slate-200 hover:border-slate-350"}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h5 className="font-bold text-slate-950">{n.title}</h5>
                          {!n.read && (
                            <span className="bg-blue-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded">NEW</span>
                          )}
                        </div>
                        <p className="text-slate-600 leading-relaxed">{n.message}</p>
                        <span className="block text-[9px] text-slate-400 pt-1">{new Date(n.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW: ACCOUNT SETTINGS */}
            {activeTab === "settings" && (
              <form onSubmit={handlePreferencesSubmit} className="space-y-6 font-sans text-xs">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base">Account Settings</h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">Manage personal metadata, theme options, and security locks.</p>
                </div>

                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visual Canvas Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => { setActiveTheme(Theme.LIGHT); showToast("Light theme applied", "info"); }}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTheme === Theme.LIGHT ? "border-blue-500 bg-blue-50/20 text-blue-600 font-bold" : "border-slate-200 hover:border-slate-300 text-slate-500"}`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>Light Theme</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTheme(Theme.DARK); showToast("Dark theme applied (Medical-Dark)", "info"); }}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTheme === Theme.DARK ? "border-blue-500 bg-slate-900 text-white font-bold" : "border-slate-200 hover:border-slate-300 text-slate-500"}`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>Dark Theme</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTheme(Theme.SYSTEM); showToast("System theme applied", "info"); }}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTheme === Theme.SYSTEM ? "border-blue-500 bg-blue-50/20 text-blue-600 font-bold" : "border-slate-200 hover:border-slate-300 text-slate-500"}`}
                    >
                      <Sliders className="w-4 h-4" />
                      <span>System Choice</span>
                    </button>
                  </div>
                </div>

                {/* Email Notification options */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Notification Preferences</label>
                  <div className="space-y-3.5 bg-slate-50/50 p-4.5 rounded-2xl border border-slate-200">
                    <label className="flex items-start gap-3 select-none cursor-pointer">
                      <input type="checkbox" defaultChecked className="mt-0.5 cursor-pointer accent-blue-600" />
                      <div>
                        <span className="font-bold text-slate-950 block">High-Yield Study Digest</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Receive notifications when Dr. Pulkit releases new ear, nose, or throat chapters.</p>
                      </div>
                    </label>
                    <div className="border-t border-slate-200 my-2.5"></div>
                    <label className="flex items-start gap-3 select-none cursor-pointer">
                      <input type="checkbox" className="mt-0.5 cursor-pointer accent-blue-600" />
                      <div>
                        <span className="font-bold text-slate-950 block">Marketing & Promotions</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Get early-bird discounts on physical surgical workshops and mock trial test series.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Passwords */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Change Password</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="password" placeholder="New Password" className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100" />
                    <input type="password" placeholder="Confirm Password" className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer shadow shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Save Profile Settings
                </button>
              </form>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
