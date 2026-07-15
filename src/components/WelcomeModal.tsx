import React, { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, BookOpen, UserPlus, LogIn, GraduationCap } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const { navigateTo } = useApp();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleAction = (route: string) => {
    onClose();
    navigateTo(route);
  };

  const handleContinueAsGuest = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          id="welcome-modal-overlay"
        >
          {/* Backdrop Blur & Fade Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-md"
            id="welcome-modal-backdrop"
          />

          {/* Dialog Card: Scale & Fade animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white border border-slate-150 rounded-[24px] w-full max-w-[550px] overflow-hidden shadow-2xl relative z-10 flex flex-col my-8"
            id="welcome-modal-card"
          >
            {/* Soft background visual details */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-12 right-12 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top-Right Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-2 rounded-full transition-colors z-20 cursor-pointer"
              id="welcome-modal-close-btn"
              aria-label="Close welcome modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body Content */}
            <div className="p-8 sm:p-10 flex flex-col text-center relative z-10">
              
              {/* Animated Icon Badge */}
              <div className="mx-auto mb-6">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="bg-gradient-to-br from-blue-600 to-sky-500 w-16 h-16 rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/20"
                >
                  <GraduationCap className="w-8 h-8" />
                </motion.div>
              </div>

              {/* Sub-badge alert */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100/50 mx-auto text-[10px] font-extrabold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Scholar Workspace</span>
              </div>

              {/* Typography Headings */}
              <h2 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight leading-tight">
                Welcome to Dr. Pulkit's ENT Learning Platform
              </h2>
              <p className="text-slate-500 text-xs sm:text-[13px] mt-3 leading-relaxed">
                Create your free account to unlock premium study notes, downloadable PDFs, bookmarks, progress tracking, and future AI-powered learning tools.
              </p>

              {/* Action Buttons Frame */}
              <div className="mt-8 space-y-3 w-full">
                {/* 1. Create Free Account (Primary CTA) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction("auth/register")}
                  className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/15 cursor-pointer"
                  id="welcome-modal-btn-register"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Free Account</span>
                </motion.button>

                {/* 2. Login (Secondary CTA) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction("auth/login")}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200/80 font-bold py-3.5 px-6 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="welcome-modal-btn-login"
                >
                  <LogIn className="w-4 h-4 text-slate-500" />
                  <span>Login</span>
                </motion.button>

                {/* Divider */}
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* 3. Continue as Guest (Tertiary CTA) */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleContinueAsGuest}
                  className="w-full text-slate-500 hover:text-slate-800 font-bold py-2 text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  id="welcome-modal-btn-guest"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Continue as Guest</span>
                </motion.button>
              </div>

              {/* Tiny Footer disclaimer */}
              <p className="text-[10px] text-slate-400 mt-6 font-medium">
                By entering, you agree to our Terms of Use and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
