/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from "react";
import { useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AIHelper } from "./components/AIHelper";

// Import all sub-pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Membership } from "./pages/Membership";
import { NotesExplorer } from "./pages/NotesExplorer";
import { TopicDetail } from "./pages/TopicDetail";
import { Auth } from "./pages/Auth";
import { MemberDashboard } from "./pages/MemberDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Legal } from "./pages/Legal";

export default function App() {
  const { currentRoute, showToast } = useApp();

  // Scroll to top upon hash route transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentRoute]);

  // Client-Side Router mapping
  const renderCurrentPage = () => {
    if (currentRoute === "home" || currentRoute === "") {
      return <Home />;
    }
    if (currentRoute === "about") {
      return <About />;
    }
    if (currentRoute === "contact") {
      return <Contact />;
    }
    if (currentRoute === "membership") {
      return <Membership />;
    }
    if (currentRoute === "notes") {
      return <NotesExplorer />;
    }
    
    // Topic detail matches topic/:slug prefix
    if (currentRoute.startsWith("topic/")) {
      return <TopicDetail />;
    }
    
    // Auth screens
    if (currentRoute.startsWith("auth/")) {
      return <Auth />;
    }

    // Dashboard screens
    if (currentRoute === "dashboard/member") {
      return <MemberDashboard />;
    }
    if (currentRoute === "dashboard/admin") {
      return <AdminDashboard />;
    }

    // Legal & compliance screens
    if (currentRoute === "privacy" || currentRoute === "terms" || currentRoute === "refund") {
      return <Legal />;
    }

    // Default Fallback
    return (
      <div className="text-center py-24 font-sans bg-white">
        <h2 className="text-xl font-bold text-slate-900">404 - Page Node Not Found</h2>
        <p className="text-slate-400 text-xs mt-1.5">The requested hash path is invalid or is currently undergoing clinical update.</p>
        <button 
          onClick={() => window.location.hash = "#/home"}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-5 rounded-full"
        >
          Return to Home Portal
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* Global Clinical Header */}
      <Navbar />

      {/* 
        ROOT CAUSE OF THE BLANK WHITE SPACE:
        The <Navbar /> component is structured as a `sticky top-0` header. Sticky elements in CSS 
        reside in the normal document flow on load, meaning the browser automatically places the 
        subsequent <main> container directly beneath the navbar without any overlapping.
        
        The previous implementation of the <main> container had an explicit `pt-[64px]` padding-top offset.
        Since the sticky header already reserved its own height in the document flow (including the 
        dynamic-height demo switcher ribbon), this `pt-[64px]` created a redundant 64px vertical gap 
        that translated to an unwanted blank white space on initial load.
        
        SOLUTION:
        By removing `pt-[64px]` from <main>, the layout flow is restored to its natural, pristine state. 
        All pages and sections (including the Home Hero) start immediately and beautifully below the 
        sticky navigation bar with consistent spacing, without requiring any negative margin hacks or custom CSS.
      */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Floating Interactive AI Tutor Panel */}
      <AIHelper />

      {/* Compliance / Footer Summary Section */}
      <Footer />
    </div>
  );
}
