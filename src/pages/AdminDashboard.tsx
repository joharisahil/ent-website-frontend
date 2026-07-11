/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Topic, UserRole, UserStatus } from "../types";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  DollarSign, 
  DownloadCloud, 
  Trash2, 
  Edit3, 
  Plus, 
  CheckCircle, 
  FileText, 
  Globe, 
  Sliders, 
  Activity, 
  ShieldAlert, 
  Save 
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { 
    topics, 
    addTopic, 
    updateTopic, 
    deleteTopic, 
    chapters, 
    sections,
    subjects,
    showToast,
    navigateTo 
  } = useApp();

  // Active Admin View: "analytics" | "users" | "content" | "seo"
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "content" | "seo">("analytics");

  // Local state for User Management (simulated CRUD)
  const [usersList, setUsersList] = useState([
    { id: "u-1", name: "Dr. Sarah Jenkins", email: "member@entplatform.com", role: UserRole.MEMBER, status: UserStatus.ACTIVE, joined: "2026-02-14" },
    { id: "u-2", name: "Dr. Rohit Sharma", email: "rohit.sharma@aiims.edu", role: UserRole.MEMBER, status: UserStatus.ACTIVE, joined: "2026-03-01" },
    { id: "u-3", name: "Anish Gupta", email: "anish.mbbs@gmail.com", role: UserRole.MEMBER, status: UserStatus.PENDING_VERIFICATION, joined: "2026-07-10" },
    { id: "u-4", name: "Dr. Edward Jenner", email: "edward.jenner@vaccines.org", role: UserRole.MEMBER, status: UserStatus.SUSPENDED, joined: "2026-01-10" }
  ]);

  // CRUD State for adding new topic
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    isPremium: false,
    chapterId: chapters[0]?.id || "chap-middle-ear",
    sectionId: sections[0]?.id || "sec-ear",
    subjectId: subjects[0]?.id || "sub-ent",
    tags: "Otology, High Yield",
    pdfSize: "2.1 MB",
    readingTime: 10,
    order: 5,
    status: "PUBLISHED" as any
  });

  // User list actions
  const handleToggleRole = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const newRole = u.role === UserRole.MEMBER ? UserRole.ADMIN : UserRole.MEMBER;
        showToast(`Role updated for ${u.name} to ${newRole}`, "info");
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  const handleToggleStatus = (id: string, newStatus: UserStatus) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        showToast(`Status updated for ${u.name} to ${newStatus}`, "warning");
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.title || !newTopic.slug || !newTopic.summary || !newTopic.content) {
      showToast("Please fill in all required syllabus fields.", "error");
      return;
    }

    addTopic({
      subjectId: newTopic.subjectId,
      sectionId: newTopic.sectionId,
      chapterId: newTopic.chapterId,
      title: newTopic.title,
      slug: newTopic.slug,
      summary: newTopic.summary,
      content: `<div class="space-y-4">${newTopic.content}</div>`,
      isPremium: newTopic.isPremium,
      tags: newTopic.tags.split(",").map(s => s.trim()),
      pdfSize: newTopic.pdfSize,
      readingTime: Number(newTopic.readingTime),
      order: Number(newTopic.order),
      status: newTopic.status
    });

    // Reset Form
    setShowAddForm(false);
    setNewTopic({
      title: "",
      slug: "",
      summary: "",
      content: "",
      isPremium: false,
      chapterId: chapters[0]?.id || "chap-middle-ear",
      sectionId: sections[0]?.id || "sec-ear",
      subjectId: subjects[0]?.id || "sub-ent",
      tags: "Otology, High Yield",
      pdfSize: "2.1 MB",
      readingTime: 10,
      order: 5,
      status: "PUBLISHED"
    });
  };

  return (
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-[calc(100vh-64px)] pb-16">
      
      {/* Admin header */}
      <section className="bg-slate-900 text-white py-10 sm:py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-2xl text-white">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded border border-red-500/30 uppercase tracking-wide">
                Dr. Pulkit's Workspace
              </span>
              <h1 className="font-display font-extrabold text-lg sm:text-2xl mt-0.5">Admin Management Control Center</h1>
              <p className="text-slate-400 text-xs">Configure syllabus nodes, track subscriptions, and review audit trails.</p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => { setShowAddForm(true); setActiveTab("content"); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Create Topic Node</span>
            </button>
            <button 
              onClick={() => navigateTo("notes")}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 font-semibold text-xs py-2.5 px-4 rounded-xl cursor-pointer"
            >
              View Public Notes
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1.5 overflow-x-auto select-none border-b lg:border-b-0 pb-3 lg:pb-0 scrollbar-none shrink-0">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${activeTab === "analytics" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Metrics</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${activeTab === "users" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <Users className="w-4 h-4" />
              <span>User & Subscriptions</span>
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${activeTab === "content" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Syllabus Content CRUD</span>
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`text-left p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${activeTab === "seo" ? "bg-white border border-slate-200/85 text-blue-600 shadow-sm font-bold" : "hover:bg-white text-slate-500 hover:text-slate-800"}`}
            >
              <Globe className="w-4 h-4" />
              <span>SEO & Audit Logs</span>
            </button>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-9 bg-white border border-slate-200/80 shadow-sm rounded-[32px] p-6 sm:p-8 min-h-[480px]">
            
            {/* VIEW: ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">System Health & Live Analytics</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Consolidated real-time metrics tracking revenue performance, downloads load, and visitor signups.</p>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="border border-slate-200/80 rounded-[24px] p-5 bg-white shadow-sm hover:shadow-md transition-all space-y-1.5">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">TOTAL REVENUE</span>
                    <p className="font-display font-extrabold text-slate-900 text-base sm:text-lg">₹1,84,320</p>
                    <span className="text-[9px] text-emerald-600 font-bold block">↑ 18.2% this month</span>
                  </div>
                  <div className="border border-slate-200/80 rounded-[24px] p-5 bg-white shadow-sm hover:shadow-md transition-all space-y-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">ACTIVE MEMBERS</span>
                    <p className="font-display font-extrabold text-slate-900 text-base sm:text-lg">482 candidates</p>
                    <span className="text-[9px] text-emerald-600 font-bold block">↑ 34 signups today</span>
                  </div>
                  <div className="border border-slate-200/80 rounded-[24px] p-5 bg-white shadow-sm hover:shadow-md transition-all space-y-1.5">
                    <DownloadCloud className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">PDF DOWNLOADS</span>
                    <p className="font-display font-extrabold text-slate-900 text-base sm:text-lg">1,240 files</p>
                    <span className="text-[9px] text-slate-400 block">Peak bandwidth stable</span>
                  </div>
                  <div className="border border-slate-200/80 rounded-[24px] p-5 bg-white shadow-sm hover:shadow-md transition-all space-y-1.5">
                    <Activity className="w-4 h-4 text-purple-600" />
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">CONVERSION RATE</span>
                    <p className="font-display font-extrabold text-slate-900 text-base sm:text-lg">4.2%</p>
                    <span className="text-[9px] text-emerald-600 font-bold block">↑ industry average 2.5%</span>
                  </div>
                </div>

                {/* Simulated Chart Visualizer */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider">Weekly Performance Curve</h4>
                  <div className="border border-slate-200/80 rounded-[28px] p-6 bg-slate-50/50 shadow-sm space-y-4">
                    {/* Simulated vertical bar heights */}
                    <div className="flex items-end justify-between h-36 gap-3 pt-4 select-none">
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-600 w-full rounded-t-lg h-[40%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mon</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-600 w-full rounded-t-lg h-[55%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Tue</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-600 w-full rounded-t-lg h-[75%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Wed</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-600 w-full rounded-t-lg h-[65%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Thu</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-blue-600 w-full rounded-t-lg h-[85%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Fri</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-indigo-600 w-full rounded-t-lg h-[95%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sat</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="bg-indigo-600 w-full rounded-t-lg h-[80%] hover:opacity-85 transition-all"></div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Sun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW: USERS MANAGEMENT */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">User Directory & Status Triage</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Review student accounts, elevate roles to Admin, or lock profiles if needed.</p>
                </div>

                <div className="border border-slate-200/80 rounded-[24px] overflow-hidden shadow-sm bg-white overflow-x-auto scrollbar-thin">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Member Info</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700">System Role</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Status</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Joined</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {usersList.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-slate-900">{u.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{u.email}</div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg ${u.role === UserRole.ADMIN ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${u.status === UserStatus.ACTIVE ? "text-emerald-600" : u.status === UserStatus.SUSPENDED ? "text-red-500" : "text-amber-500"}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 font-mono">{u.joined}</td>
                          <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                            <button 
                              onClick={() => handleToggleRole(u.id)}
                              className="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-all cursor-pointer active:scale-95"
                            >
                              Toggle Role
                            </button>
                            {u.status === UserStatus.ACTIVE ? (
                              <button 
                                onClick={() => handleToggleStatus(u.id, UserStatus.SUSPENDED)}
                                className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-all cursor-pointer active:scale-95"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleToggleStatus(u.id, UserStatus.ACTIVE)}
                                className="text-[10px] font-bold text-emerald-600 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-all cursor-pointer active:scale-95"
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW: CONTENT CRUD (Live updates!) */}
            {activeTab === "content" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <h3 className="font-display font-extrabold text-slate-900 text-base sm:text-lg">Syllabus Content Management</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Manage individual nodes, drafts, and PDF hand-offs.</p>
                  </div>
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lecture Notes</span>
                    </button>
                  )}
                </div>

                {/* CRUD FORM FOR ADDING TOPIC */}
                {showAddForm && (
                  <form onSubmit={handleAddTopicSubmit} className="bg-slate-50 border border-slate-200 p-5 sm:p-6 rounded-[28px] space-y-4 text-xs font-sans shadow-sm">
                    <div className="flex justify-between items-center border-b pb-2.5 mb-2">
                      <h4 className="font-display font-extrabold text-slate-900 text-sm">Add New Lecture Study Notes</h4>
                      <button type="button" onClick={() => setShowAddForm(false)} className="text-slate-400 font-bold hover:text-slate-650 transition-colors">✕</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Topic Title *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Chronic Otitis Media (CSOM)"
                          value={newTopic.title}
                          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") })}
                          className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SEO Slug (Auto-generated)</label>
                        <input 
                          type="text" 
                          required
                          placeholder="chronic-otitis-media-csom"
                          value={newTopic.slug}
                          onChange={(e) => setNewTopic({ ...newTopic, slug: e.target.value })}
                          className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Summary Breakdown *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Provide a high-yield single sentence clinical summary..."
                        value={newTopic.summary}
                        onChange={(e) => setNewTopic({ ...newTopic, summary: e.target.value })}
                        className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Parent Chapter</label>
                        <select
                          value={newTopic.chapterId}
                          onChange={(e) => setNewTopic({ ...newTopic, chapterId: e.target.value })}
                          className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          {chapters.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reading Time (mins)</label>
                        <input 
                          type="number" 
                          value={newTopic.readingTime}
                          onChange={(e) => setNewTopic({ ...newTopic, readingTime: Number(e.target.value) })}
                          className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Content Type Access</label>
                        <select
                          value={newTopic.isPremium ? "true" : "false"}
                          onChange={(e) => setNewTopic({ ...newTopic, isPremium: e.target.value === "true" })}
                          className="w-full bg-white p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                          <option value="false">Free Online Reading</option>
                          <option value="true">Premium Members Only</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Rich HTML Syllabus Content *</label>
                      <textarea 
                        required
                        rows={6}
                        placeholder="Type medical text, tables or alert grids here. e.g. <p>Chronic suppurative inflammation...</p>"
                        value={newTopic.content}
                        onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                        className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100 font-mono resize-none leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowAddForm(false)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-xl text-center font-semibold transition-all cursor-pointer active:scale-98"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-bold shadow shadow-blue-500/10 active:scale-98 transition-all"
                      >
                        Publish Syllabus Node
                      </button>
                    </div>
                  </form>
                )}

                {/* Active Topics table */}
                <div className="border border-slate-200/80 rounded-[24px] overflow-hidden shadow-sm bg-white overflow-x-auto scrollbar-thin">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Topic Title</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Chapter ID</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700">Access Level</th>
                        <th className="px-4 py-3.5 font-bold text-slate-700 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {topics.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="font-bold text-slate-900">{t.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">/{t.slug}</div>
                          </td>
                          <td className="px-4 py-3.5 text-slate-500 font-mono">{t.chapterId}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.isPremium ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                              {t.isPremium ? "Premium" : "Free"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button 
                              onClick={() => deleteTopic(t.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all cursor-pointer active:scale-95"
                              title="Delete Topic"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW: SEO & SETTINGS */}
            {activeTab === "seo" && (
              <div className="space-y-8 font-sans text-xs">
                {/* SEO Config */}
                <div className="space-y-5">
                  <div className="border-b pb-2.5">
                    <h3 className="font-display font-extrabold text-slate-900 text-base">Meta Tag & SEO Schema Configurations</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Define dynamic canonical domains and default Open Graph cards.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Canonical URL</label>
                      <input type="text" defaultValue="https://drpulkitent.com" className="w-full bg-slate-50 hover:bg-slate-100/30 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Default OG Title</label>
                      <input type="text" defaultValue="Dr. Pulkit Agarwal ENT Platform" className="w-full bg-slate-50 hover:bg-slate-100/30 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-700" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Medical WebPage Schema Template</label>
                    <textarea rows={3} className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono resize-none leading-relaxed text-[11px] text-slate-600 focus:outline-none" readOnly>
{`{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "about": "Otorhinolaryngology Syllabus",
  "author": "Dr. Pulkit Agarwal"
}`}
                    </textarea>
                  </div>
                </div>

                {/* Audit Logs */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider">System Audit Trail</h4>
                  <div className="border border-slate-850 rounded-[24px] p-5 bg-slate-950 text-white font-mono text-[10px] space-y-2.5 leading-relaxed shadow-md">
                    <p className="text-slate-505"><span className="text-slate-400 font-bold">[2026-07-11 01:34]</span> - System kernel successfully loaded and compiled.</p>
                    <p className="text-slate-505"><span className="text-slate-400 font-bold">[2026-07-11 01:35]</span> - LocalStorage database initialized for topics, bookmarks and history.</p>
                    <p className="text-emerald-400"><span className="text-emerald-500 font-bold">[2026-07-11 01:36]</span> - Role changed logs successfully registered in local state.</p>
                    <p className="text-blue-400"><span className="text-blue-500 font-bold">[2026-07-11 01:37]</span> - Live preview synced on host port 3000.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
