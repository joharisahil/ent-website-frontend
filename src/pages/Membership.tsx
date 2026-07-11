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
  Lock 
} from "lucide-react";

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
    <div className="font-sans text-slate-600 bg-slate-50/60 min-h-screen pb-16">
      
      {/* Title */}
      <section className="py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase">
            MEMBERSHIP ACCESS
          </span>
          <h1 className="font-display font-extrabold text-slate-900 text-2xl sm:text-4xl mt-3 tracking-tight">
            Unlock Unlimited High-Yield ENT Learning
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Gain full permission to download medical PDFs, access clinical summaries, review surgical case files, and consult our AI Interactive Tutor.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Active plan ribbon if member */}
        {currentUser?.membership && (
          <div className="mb-8 max-w-lg mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4.5 rounded-[24px] shadow flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-100" />
              <div>
                <span>Active Plan: {currentUser.membership.planName}</span>
                <p className="text-[10px] text-emerald-100 font-normal mt-0.5">Renewal date: {new Date(currentUser.membership.expiresAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("dashboard/member")}
              className="bg-white text-emerald-700 hover:bg-slate-50 py-1.5 px-3.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors"
            >
              My Dashboard
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {MOCK_PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-[32px] p-8 flex flex-col justify-between transition-all relative ${plan.popular ? "border-blue-500 ring-4 ring-blue-50 bg-white shadow-md" : "border-slate-200/80 shadow-sm bg-white hover:shadow-md"}`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-full border border-blue-500 uppercase tracking-wider shadow">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">{plan.name}</h3>
                <p className="text-slate-400 text-xs mt-1.5 min-h-[36px]">{plan.description}</p>
                
                <div className="my-6">
                  <span className="font-display font-extrabold text-slate-950 text-3xl sm:text-4xl">{plan.price}</span>
                  <span className="text-slate-400 text-xs font-semibold ml-1">/{plan.billing}</span>
                </div>

                <ul className="space-y-3.5 text-xs">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 leading-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-8 border-t border-slate-100">
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer active:scale-95 text-center flex justify-center items-center gap-1.5 ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10" : "bg-slate-100 hover:bg-slate-200 text-slate-800"}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Comparison Matrix - Bento Box */}
        <div className="mt-16 max-w-4xl mx-auto border border-slate-200/80 rounded-[32px] overflow-hidden shadow-sm bg-white hover:shadow-md transition-all">
          <div className="bg-slate-50/50 p-5 border-b border-slate-250 text-center">
            <h3 className="font-display font-bold text-slate-950 text-sm sm:text-base">Compare Access Matrix</h3>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-6 py-4 font-semibold text-slate-700">Capabilities</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Guest / Free</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Pro Plan</th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">Elite Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Read Syllabus online</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                </tr>
                <tr className="bg-slate-50/10">
                  <td className="px-6 py-4 font-medium text-slate-900">Interactive AI Tutor Assistant</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Download High-Yield PDF Notes</td>
                  <td className="px-6 py-4 text-center text-slate-300">No</td>
                  <td className="px-6 py-4 text-center text-slate-700 font-semibold">15 per month</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-bold">Unlimited</td>
                </tr>
                <tr className="bg-slate-50/10">
                  <td className="px-6 py-4 font-medium text-slate-900">Ad-Free Learning Experience</td>
                  <td className="px-6 py-4 text-center text-slate-300">With Ads</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-900">Direct Email Q&A with Dr. Pulkit</td>
                  <td className="px-6 py-4 text-center text-slate-300">No</td>
                  <td className="px-6 py-4 text-center text-slate-300">No</td>
                  <td className="px-6 py-4 text-center text-emerald-500 font-bold">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* Checkout Modal Overlay */}
      {checkoutPlan && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <h4 className="font-display font-bold text-sm">Secure Payment Gateway</h4>
              </div>
              <button 
                onClick={() => setCheckoutPlan(null)}
                className="text-white/75 hover:text-white hover:bg-white/10 p-1.5 rounded-full cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCompletePayment} className="p-6 space-y-4 text-slate-700">
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Plan Selected:</span>
                <div className="flex justify-between items-center font-bold text-slate-900 text-sm">
                  <span>{checkoutPlan.name}</span>
                  <span className="text-blue-600">{checkoutPlan.price}</span>
                </div>
                <p className="text-[10px] text-slate-500">{checkoutPlan.description}</p>
              </div>

              {/* Mock Credit Card form */}
              <div className="space-y-3 font-sans text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 block">Card Number</label>
                  <input 
                    type="text" 
                    required
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-slate-900 font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block">Expiry Date</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-slate-900 font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 block">CVC Security Code</label>
                    <input 
                      type="password" 
                      required
                      maxLength={3}
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-slate-900 font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 py-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>PCI-DSS compliant 256-bit secure gateway transfer.</span>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setCheckoutPlan(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-35 text-white py-3 rounded-xl text-xs font-bold transition-all shadow shadow-blue-500/10 flex justify-center items-center cursor-pointer"
                >
                  {processing ? <span>Processing...</span> : <span>Complete Purchase</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
