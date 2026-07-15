/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { MOCK_PRICING_PLANS } from "../data/mockData";
import { UserRole, MembershipStatus, Theme } from "../types";
import { 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Star,
  Zap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Membership: React.FC = () => {
  const { currentUser, setCurrentUser, showToast, navigateTo } = useApp();
  const [checkoutPlan, setCheckoutPlan] = useState<any | null>(null);
  const [cardDetails, setCardDetails] = useState({ number: "4111 2222 3333 4444", expiry: "12/28", cvc: "123" });
  const [processing, setProcessing] = useState(false);

  const handleOpenCheckout = (plan: any) => {
    if (!currentUser) {
      showToast("Please sign in or create an account first to activate a plan.", "warning");
      navigateTo("auth/login");
      return;
    }
    setCheckoutPlan(plan);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      
      // Update local state to active Elite Membership status
      const updatedUser = {
        ...currentUser,
        role: UserRole.MEMBER, // Upgrade role if they were guest
        membership: {
          status: MembershipStatus.ACTIVE,
          planId: checkoutPlan.id,
          planName: checkoutPlan.name,
          expiresAt: new Date(Date.now() + 3600000 * 24 * 180).toISOString() // 6 months
        }
      };
      
      setCurrentUser(updatedUser);
      setCheckoutPlan(null);
      showToast(`Congratulations! You have unlocked ${checkoutPlan.name}!`, "success");
      navigateTo("dashboard/member");
    }, 1500);
  };

  return (
    <div className="font-sans text-slate-600 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen pb-24 relative overflow-hidden">
      {/* Decorative Grid and Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/10 w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px]" />
      </div>

      {/* Header Section */}
      <section className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-100/70 shadow-sm uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Membership Access</span>
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-slate-900 text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
          >
            Unlock Unlimited{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
              High-Yield ENT
            </span>{" "}
            Learning
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm sm:text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Gain immediate full access to download medical PDFs, interactive clinical summaries, surgical walkthroughs, and consult our advanced AI Interactive Tutor.
          </motion.p>
        </div>
      </section>

      {/* Active Membership Status Notification */}
      <div className="max-w-4xl mx-auto px-4">
        {currentUser?.membership && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-5 rounded-3xl shadow-xl shadow-emerald-500/10 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs sm:text-sm font-semibold border border-emerald-400/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="bg-white/20 p-2 rounded-2xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <span className="text-sm font-bold block sm:inline">Active Plan: {currentUser.membership.planName}</span>
                <p className="text-[11px] text-emerald-100 font-medium mt-0.5 sm:mt-0">
                  Renewal date: {new Date(currentUser.membership.expiresAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("dashboard/member")}
              className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95 py-3 px-6 rounded-2xl text-xs font-bold cursor-pointer transition-all shadow-md"
            >
              Go to My Dashboard
            </button>
          </motion.div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {MOCK_PRICING_PLANS.map((plan, index) => {
            const isElite = plan.popular;
            return (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative rounded-[32px] p-8 flex flex-col justify-between transition-all border ${
                  isElite 
                    ? "bg-slate-900 text-white border-slate-800 shadow-2xl shadow-indigo-950/20" 
                    : "bg-white text-slate-600 border-slate-150 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-sky-100/30"
                }`}
              >
                {/* Popular / Elite Badge */}
                {isElite && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 z-20">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-extrabold text-[10px] px-4.5 py-1.5 rounded-full border border-blue-500 uppercase tracking-widest shadow-lg shadow-blue-500/25">
                      <Zap className="w-3 h-3 fill-white text-white animate-pulse" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display font-extrabold text-xl sm:text-2xl ${isElite ? "text-white" : "text-slate-900"}`}>
                      {plan.name}
                    </h3>
                    {isElite && (
                      <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-extrabold px-3 py-1 rounded-full border border-indigo-500/20">
                        BEST VALUE
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-xs mt-3 min-h-[36px] leading-relaxed ${isElite ? "text-slate-400" : "text-slate-500"}`}>
                    {plan.description}
                  </p>
                  
                  {/* Pricing Display */}
                  <div className="my-8 flex items-baseline gap-1.5">
                    <span className={`font-display font-extrabold text-3xl sm:text-5xl ${isElite ? "text-white" : "text-slate-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs font-semibold ${isElite ? "text-slate-400" : "text-slate-400"}`}>
                      / {plan.billing}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className={`space-y-4 pt-6 border-t ${isElite ? "border-slate-800" : "border-slate-100"}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isElite ? "text-slate-500" : "text-slate-400"}`}>
                      Included capabilities
                    </p>
                    <ul className="space-y-4 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className={`p-0.5 rounded-full mt-0.5 ${isElite ? "bg-indigo-500/10 text-indigo-400" : "bg-emerald-50 text-emerald-600"}`}>
                            <Check className="w-3.5 h-3.5 font-bold" />
                          </div>
                          <span className={`leading-normal ${isElite ? "text-slate-300" : "text-slate-600"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className={`pt-6 mt-10 border-t ${isElite ? "border-slate-800" : "border-slate-100"}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenCheckout(plan)}
                    className={`w-full py-4 rounded-2xl font-bold text-xs transition-all cursor-pointer flex justify-center items-center gap-2 group ${
                      isElite 
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25" 
                        : "bg-slate-100 hover:bg-slate-250 text-slate-800"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Plan Comparison Matrix Section */}
        <div className="mt-24 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100/70">
              <Info className="w-3.5 h-3.5" />
              <span>Features comparison</span>
            </span>
            <h3 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight">
              Detailed Plan Matrix
            </h3>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-slate-150 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 bg-white"
          >
            <div className="overflow-x-auto text-xs">
              <table className="min-w-full divide-y divide-slate-150 text-left">
                <thead>
                  <tr className="bg-slate-50/70">
                    <th className="px-6 py-4.5 font-bold text-slate-800">Capabilities</th>
                    <th className="px-6 py-4.5 font-bold text-slate-800 text-center">Guest / Free</th>
                    <th className="px-6 py-4.5 font-bold text-slate-800 text-center">Pro Plan</th>
                    <th className="px-6 py-4.5 font-bold text-slate-800 text-center text-blue-600 bg-blue-50/30">Elite Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Read Syllabus online</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Interactive AI Tutor Assistant</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Download High-Yield PDF Notes</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">No</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-slate-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">15 / month</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/10">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">Unlimited</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Ad-Free Learning Experience</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400 font-medium">With Ads</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">Direct Email Q&A with Dr. Pulkit</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">No</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-400">No</span>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-50/10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Yes</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Checkout Modal Overlay - Completely Redesigned Payment Screen */}
      <AnimatePresence>
        {checkoutPlan && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-150 rounded-[32px] max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center relative">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-xl text-blue-400 border border-blue-500/20">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-white">Checkout Gateway</h4>
                    <p className="text-[10px] text-slate-400 font-medium">PCI-DSS 256-bit Secure Layer</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCheckoutPlan(null)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCompletePayment} className="p-6 space-y-6 text-slate-700">
                {/* Plan Selection Summary Panel */}
                <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/60 p-4 rounded-2xl text-xs space-y-1">
                  <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">Plan Selected</span>
                  <div className="flex justify-between items-center font-bold text-slate-900 text-base">
                    <span>{checkoutPlan.name}</span>
                    <span className="text-blue-600 font-extrabold">{checkoutPlan.price}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">{checkoutPlan.description}</p>
                </div>

                {/* Credit Card Details Inputs */}
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 font-mono pl-10 pr-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 font-mono px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-center shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CVC Security Code</label>
                      <input 
                        type="password" 
                        required
                        maxLength={3}
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        className="w-full bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 font-mono px-3.5 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-center shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 py-1 border-t border-slate-100 pt-4">
                  <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Secure 256-bit SSL transaction verified by our banking merchant.</span>
                </div>

                {/* Form Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setCheckoutPlan(null)}
                    className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 disabled:opacity-35 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 flex justify-center items-center cursor-pointer active:scale-95"
                  >
                    {processing ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </span>
                    ) : (
                      <span>Complete Purchase</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
