/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { UserRole } from "../types";
import { 
  Stethoscope, 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  BookOpen, 
  LogOut, 
  Sparkles, 
  Lock, 
  Award, 
  Sliders, 
  Bookmark, 
  DownloadCloud, 
  Settings 
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    currentUser, 
    loginAs, 
    logout, 
    notifications, 
    markNotificationRead,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(true);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo("notes");
  };

  const handleLogoClick = () => {
    navigateTo("home");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      {/* Role Switcher Widget (Pristine Tooltip-like Ribbon) */}
      {roleSwitcherOpen && (
        <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white px-4 py-2 sm:py-2.5 text-xs font-medium flex flex-col md:flex-row gap-2.5 justify-between items-center shadow-inner">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
            <span className="leading-tight text-[11px] sm:text-xs text-center md:text-left">
              <strong>DEMO ACTIVE:</strong> <span className="hidden sm:inline">Toggle system roles to evaluate permissions & access levels instantly.</span><span className="sm:hidden">Toggle roles to test permission states.</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
            <button 
              onClick={() => loginAs("guest")} 
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-xs transition-all font-semibold ${!currentUser ? "bg-white text-blue-700 shadow" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              Guest<span className="hidden sm:inline"> (Non-Member)</span>
            </button>
            <button 
              onClick={() => loginAs("member")} 
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-xs transition-all font-semibold ${currentUser?.role === UserRole.MEMBER ? "bg-white text-blue-700 shadow" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              Member<span className="hidden sm:inline"> (Pro Account)</span>
            </button>
            <button 
              onClick={() => loginAs("admin")} 
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-xs transition-all font-semibold ${currentUser?.role === UserRole.SUPER_ADMIN ? "bg-white text-blue-700 shadow" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              <span className="hidden sm:inline">Dr. Pulkit </span>Admin
            </button>
            <button 
              onClick={() => setRoleSwitcherOpen(false)} 
              className="ml-1 sm:ml-2 hover:bg-white/20 p-1 rounded-full text-white/80 hover:text-white"
              title="Hide switcher"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Branding */}
        <div 
          onClick={handleLogoClick} 
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer hover:opacity-90 transition-opacity min-w-0"
          id="nav-logo"
        >
          <div className="bg-gradient-to-br from-blue-500 to-sky-400 p-2 sm:p-2.5 rounded-xl text-white shadow-md shadow-blue-500/10 shrink-0">
            <Stethoscope className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-display font-bold text-slate-900 tracking-tight text-[12px] xs:text-sm sm:text-base truncate max-w-[110px] xs:max-w-[140px] sm:max-w-none">
                Dr. Pulkit Agarwal
              </span>
              <span className="text-[8px] sm:text-[10px] bg-blue-50 text-blue-600 font-bold px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded-full border border-blue-100 shrink-0">
                ENT
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] text-slate-500 block font-sans tracking-wide uppercase font-medium -mt-0.5 truncate max-w-[140px] sm:max-w-none">
              Medical Learning Platform
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button 
            onClick={() => navigateTo("home")} 
            className={`transition-colors cursor-pointer hover:text-blue-600 ${currentRoute === "home" ? "text-blue-600" : ""}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigateTo("notes")} 
            className={`transition-colors cursor-pointer hover:text-blue-600 ${currentRoute === "notes" || currentRoute === "topic" ? "text-blue-600" : ""}`}
          >
            Notes
          </button>
          <button 
            onClick={() => navigateTo("membership")} 
            className={`transition-colors cursor-pointer hover:text-blue-600 ${currentRoute === "membership" ? "text-blue-600" : ""}`}
          >
            Membership
          </button>
          <button 
            onClick={() => navigateTo("about")} 
            className={`transition-colors cursor-pointer hover:text-blue-600 ${currentRoute === "about" ? "text-blue-600" : ""}`}
          >
            About
          </button>
          <button 
            onClick={() => navigateTo("contact")} 
            className={`transition-colors cursor-pointer hover:text-blue-600 ${currentRoute === "contact" ? "text-blue-600" : ""}`}
          >
            Contact
          </button>
        </nav>

        {/* Global Controls & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-48 xl:w-64">
            <input 
              type="text" 
              placeholder="Search medical notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white text-slate-800 rounded-full py-2 pl-3 pr-8 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <button type="submit" className="absolute right-2.5 text-slate-400 hover:text-blue-600">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Search trigger for tablet */}
          <button 
            onClick={() => { navigateTo("notes"); setSearchQuery(""); }} 
            className="lg:hidden text-slate-500 hover:text-blue-600 p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            title="Search Notes"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="text-slate-500 hover:text-blue-600 p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 transition-colors relative shrink-0"
              id="notif-bell"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2.5 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="font-semibold text-slate-900 text-sm">Notifications</h4>
                  <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto px-1 py-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 text-xs">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { markNotificationRead(n.id); setNotifOpen(false); }}
                        className={`p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-xs mb-1 ${!n.read ? "bg-blue-50/40 border-l-2 border-blue-500" : ""}`}
                      >
                        <div className="flex justify-between items-start mb-0.5">
                          <span className="font-semibold text-slate-900">{n.title}</span>
                          <span className="text-[9px] text-slate-400">Just now</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 p-1 rounded-full border border-slate-200 hover:border-blue-400 hover:bg-slate-50 transition-all cursor-pointer"
                id="profile-trigger"
              >
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                  alt={currentUser.fullName} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 pr-2">
                  {currentUser.fullName.split(" ")[0]}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{currentUser.fullName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    {currentUser.role === UserRole.SUPER_ADMIN ? (
                      <span className="mt-1 text-[9px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100 inline-block">
                        Platform Admin
                      </span>
                    ) : currentUser.membership ? (
                      <span className="mt-1 text-[9px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 inline-block">
                        Elite Member
                      </span>
                    ) : (
                      <span className="mt-1 text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block">
                        Free Account
                      </span>
                    )}
                  </div>
                  <div className="p-1 border-b border-slate-100 text-xs">
                    {/* Role dependent dashboard link */}
                    {currentUser.role === UserRole.SUPER_ADMIN ? (
                      <button 
                        onClick={() => { navigateTo("dashboard/admin"); setProfileOpen(false); }}
                        className="w-full text-left p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Admin Panel
                      </button>
                    ) : (
                      <button 
                        onClick={() => { navigateTo("dashboard/member"); setProfileOpen(false); }}
                        className="w-full text-left p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
                      >
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        My Learning Hub
                      </button>
                    )}
                  </div>
                  <div className="p-1">
                    <button 
                      onClick={() => { logout(); setProfileOpen(false); }}
                      className="w-full text-left p-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold text-xs"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => navigateTo("auth/login")} 
                className="hidden sm:inline-block px-3 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigateTo("auth/register")} 
                className="px-3 sm:px-4.5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Join Now
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-500 hover:text-blue-600 p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-150 bg-white p-4 space-y-3 shadow-lg absolute w-full left-0 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => { navigateTo("home"); setMobileMenuOpen(false); }} 
              className={`p-2.5 rounded-xl hover:bg-slate-50 text-left ${currentRoute === "home" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Home
            </button>
            <button 
              onClick={() => { navigateTo("notes"); setMobileMenuOpen(false); }} 
              className={`p-2.5 rounded-xl hover:bg-slate-50 text-left ${currentRoute === "notes" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Notes
            </button>
            <button 
              onClick={() => { navigateTo("membership"); setMobileMenuOpen(false); }} 
              className={`p-2.5 rounded-xl hover:bg-slate-50 text-left ${currentRoute === "membership" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Membership
            </button>
            <button 
              onClick={() => { navigateTo("about"); setMobileMenuOpen(false); }} 
              className={`p-2.5 rounded-xl hover:bg-slate-50 text-left ${currentRoute === "about" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              About
            </button>
            <button 
              onClick={() => { navigateTo("contact"); setMobileMenuOpen(false); }} 
              className={`p-2.5 rounded-xl hover:bg-slate-50 text-left ${currentRoute === "contact" ? "text-blue-600 bg-blue-50/50" : ""}`}
            >
              Contact
            </button>
          </nav>

          {!currentUser && (
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button 
                onClick={() => { navigateTo("auth/login"); setMobileMenuOpen(false); }} 
                className="w-full py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                Sign In
              </button>
              <button 
                onClick={() => { navigateTo("auth/register"); setMobileMenuOpen(false); }} 
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 text-center rounded-xl"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
