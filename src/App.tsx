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

      {/* Primary Dynamic Content Frame */}
      <main className="flex-grow pt-[64px]">
        {renderCurrentPage()}
      </main>

      {/* Floating Interactive AI Tutor Panel */}
      <AIHelper />

      {/* Compliance / Footer Summary Section */}
      <Footer />
    </div>
  );
}
