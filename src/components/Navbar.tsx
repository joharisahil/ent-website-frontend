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
  BookOpen, 
  LogOut, 
  Sliders, 
  Settings 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

  const navItems = [
    { label: "Home", route: "home" },
    { label: "Study Notes", route: "notes" },
    { label: "Membership", route: "membership" },
    { label: "About", route: "about" },
    { label: "Contact", route: "contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-[0_2px_20px_rgba(224,242,254,0.15)]">
      {/* Role Switcher Widget (Pristine Tooltip-like Ribbon) */}
      <AnimatePresence>
        {roleSwitcherOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-900 text-slate-100 px-4 py-2 text-xs font-medium flex flex-col md:flex-row gap-2.5 justify-between items-center shadow-md border-b border-slate-800 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              <span className="leading-tight text-[11px] sm:text-xs text-center md:text-left text-slate-300">
                <strong className="text-white font-semibold">DEMO ACTIVE:</strong> Toggle system roles to evaluate permissions & access levels instantly.
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              <button 
                onClick={() => loginAs("guest")} 
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] transition-all font-semibold cursor-pointer ${!currentUser ? "bg-blue-600 text-white shadow-sm shadow-blue-900/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"}`}
              >
                Guest (Free)
              </button>
              <button 
                onClick={() => loginAs("member")} 
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] transition-all font-semibold cursor-pointer ${currentUser?.role === UserRole.MEMBER ? "bg-blue-600 text-white shadow-sm shadow-blue-900/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"}`}
              >
                Pro Member
              </button>
              <button 
                onClick={() => loginAs("admin")} 
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] transition-all font-semibold cursor-pointer ${currentUser?.role === UserRole.SUPER_ADMIN ? "bg-blue-600 text-white shadow-sm shadow-blue-900/30" : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"}`}
              >
                Dr. Pulkit (Admin)
              </button>
              <button 
                onClick={() => setRoleSwitcherOpen(false)} 
                className="ml-1 sm:ml-2 hover:bg-slate-800 p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Hide switcher"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Branding */}
        <motion.div 
          onClick={handleLogoClick} 
          whileHover={{ scale: 1.01 }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
          id="nav-logo"
        >
          <div className="bg-gradient-to-tr from-blue-600 to-sky-450 p-2 sm:p-2.5 rounded-2xl text-white shadow-md shadow-blue-500/10 shrink-0">
            <Stethoscope className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-slate-900 tracking-tight text-sm sm:text-base md:text-lg truncate">
                Dr. Pulkit Agarwal
              </span>
              <span className="text-[9px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                ENT
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-400 block font-sans tracking-wider uppercase font-semibold -mt-0.5 truncate">
              Medical Learning Platform
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600 relative">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route || (item.route === "notes" && currentRoute === "topic");
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`px-3.5 py-1.5 rounded-full transition-all relative font-medium text-xs lg:text-sm cursor-pointer ${isActive ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-blue-50/70 rounded-full -z-10 border border-blue-100/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Global Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-44 xl:w-56">
            <input 
              type="text" 
              placeholder="Search study notes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 rounded-full py-2 pl-3.5 pr-8 border border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            />
            <button type="submit" className="absolute right-2.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Search trigger for mobile/tablet */}
          <button 
            onClick={() => { navigateTo("notes"); setSearchQuery(""); }} 
            className="lg:hidden text-slate-500 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            title="Search Notes"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative shrink-0">
            <button 
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="text-slate-500 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-colors relative shrink-0 cursor-pointer"
              id="notif-bell"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-80 bg-white border border-slate-150 rounded-2xl shadow-xl shadow-slate-200/30 z-50 py-2.5 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h4 className="font-semibold text-slate-900 text-xs">Notifications</h4>
                    <span className="text-[9px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto px-1.5 py-1">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-xs">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => { markNotificationRead(n.id); setNotifOpen(false); }}
                          className={`p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-xs mb-1 border border-transparent ${!n.read ? "bg-blue-50/30 border-blue-100/50" : ""}`}
                        >
                          <div className="flex justify-between items-start mb-0.5">
                            <span className="font-semibold text-slate-900">{n.title}</span>
                            <span className="text-[9px] text-slate-400 font-medium">Just now</span>
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 p-1 rounded-full border border-slate-150 hover:border-blue-400 hover:bg-slate-50 transition-all cursor-pointer"
                id="profile-trigger"
              >
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                  alt={currentUser.fullName} 
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 pr-2">
                  {currentUser.fullName.split(" ")[0]}
                </span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-slate-150 rounded-2xl shadow-xl shadow-slate-200/30 z-50 py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.fullName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                      {currentUser.role === UserRole.SUPER_ADMIN ? (
                        <span className="mt-1.5 text-[9px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100 inline-block">
                          Platform Admin
                        </span>
                      ) : currentUser.membership ? (
                        <span className="mt-1.5 text-[9px] font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 inline-block">
                          Elite Member
                        </span>
                      ) : (
                        <span className="mt-1.5 text-[9px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block">
                          Free Account
                        </span>
                      )}
                    </div>
                    <div className="p-1 border-b border-slate-100 text-xs">
                      {currentUser.role === UserRole.SUPER_ADMIN ? (
                        <button 
                          onClick={() => { navigateTo("dashboard/admin"); setProfileOpen(false); }}
                          className="w-full text-left p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          Admin Panel
                        </button>
                      ) : (
                        <button 
                          onClick={() => { navigateTo("dashboard/member"); setProfileOpen(false); }}
                          className="w-full text-left p-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          My Learning Hub
                        </button>
                      )}
                    </div>
                    <div className="p-1">
                      <button 
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full text-left p-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-750 transition-colors flex items-center gap-2 font-semibold text-xs cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => navigateTo("auth/login")} 
                className="hidden sm:inline-block px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
              >
                Sign In
              </button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo("auth/register")} 
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Join Now
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-500 hover:text-blue-600 p-2 rounded-xl hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white p-4 space-y-3 shadow-xl absolute w-full left-0 z-40 overflow-hidden"
          >
            <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button 
                    key={item.route}
                    onClick={() => { navigateTo(item.route); setMobileMenuOpen(false); }} 
                    className={`p-3 rounded-xl hover:bg-slate-50 text-left transition-colors cursor-pointer ${isActive ? "text-blue-600 bg-blue-50/50" : ""}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {!currentUser && (
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button 
                  onClick={() => { navigateTo("auth/login"); setMobileMenuOpen(false); }} 
                  className="w-full py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { navigateTo("auth/register"); setMobileMenuOpen(false); }} 
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 text-center rounded-xl cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
