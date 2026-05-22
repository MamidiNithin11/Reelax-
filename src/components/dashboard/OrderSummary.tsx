import React, { useState } from 'react';
import { Crown, Check, Wallet, ChevronDown, Tag, Info, ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Coupon, BillingCycle } from '../../types';

interface OrderSummaryProps {
  selectedPlan: 'Startup' | 'Growth';
  billingCycle: BillingCycle;
  walletApplied: boolean;
  selectedCouponCode: string;
  onPlanToggle: () => void;
  onBillingCycleChange: (cycle: BillingCycle) => void;
  onWalletToggle: () => void;
  onCouponSelect: (code: string) => void;
  onProceedPayment: () => void;
  isProcessing: boolean;
}

export default function OrderSummary({
  selectedPlan,
  billingCycle,
  walletApplied,
  selectedCouponCode,
  onPlanToggle,
  onBillingCycleChange,
  onWalletToggle,
  onCouponSelect,
  onProceedPayment,
  isProcessing
}: OrderSummaryProps) {
  const [couponInput, setCouponInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const monthlyRates = {
    Startup: 4999,
    Growth: 9999
  };

  const getBaseSubtotal = () => {
    if (selectedPlan === 'Startup' && billingCycle === 'quarterly') {
      return 14999.00;
    }
    if (selectedPlan === 'Growth' && billingCycle === 'quarterly') {
      return 29999.00;
    }

    const rate = monthlyRates[selectedPlan];
    if (billingCycle === 'monthly') return rate;
    if (billingCycle === 'annual') return rate * 12 * 0.8;
    return rate * 3;
  };

  const getDiscountAmount = (subtotal: number) => {
    if (!selectedCouponCode) return 0;
    if (selectedCouponCode === 'WELCOME20') {
      if (selectedPlan === 'Startup' && billingCycle === 'quarterly') {
        return 9001.00;
      }
      return subtotal * 0.20;
    }
    if (selectedCouponCode === 'ANNUAL50') {
      return subtotal * 0.50;
    }
    return 0;
  };

  const baseSubtotal = getBaseSubtotal();
  const couponDiscount = getDiscountAmount(baseSubtotal);
  const taxableBase = Math.max(0, baseSubtotal - couponDiscount);
  const gstTax = taxableBase * 0.18;
  const walletDeduction = walletApplied ? 500.00 : 0.00;
  
  const finalTotal = Math.max(0, baseSubtotal + gstTax - couponDiscount - walletDeduction);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6" id="order-summary-column-panel">
      
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6" id="order-summary-card">
        <h2 className="text-lg font-extrabold text-slate-900 font-heading tracking-tight mb-4 flex items-center justify-between">
          <span>Order Summary</span>
          <Badge variant="blue">ACTIVE PREVIEW</Badge>
        </h2>

        <div className="bg-white border border-[#EFF6FF] rounded-2xl p-5 bg-linear-to-b from-[#FFF] to-[#F1F5F9]/30" id="plan-details-box">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  ₹{selectedPlan === 'Startup' ? '4,999' : '9,999'}
                </span>
                <span className="text-xs font-semibold text-slate-500 font-sans">
                  /month
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Includes {selectedPlan === 'Startup' ? '5,000' : '15,000'} credits/mo.</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-extrabold text-blue-500 uppercase tracking-widest block">
                SELECTED PLAN
              </span>
              <span className="text-lg font-extrabold text-slate-900 block font-heading tracking-tight mt-0.5">
                {selectedPlan}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-1 flex items-center gap-1.5 justify-between">
          <div className="bg-slate-100 p-1 flex rounded-lg w-full">
            {(['monthly', 'quarterly', 'annual'] as BillingCycle[]).map((cycle) => (
              <button 
                key={cycle}
                type="button"
                onClick={() => onBillingCycleChange(cycle)}
                className={`flex-1 text-center text-xs py-1.5 rounded-md font-bold transition-all uppercase tracking-wider cursor-pointer ${
                  billingCycle === cycle ? 'bg-white shadow-xs text-slate-800' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cycle === 'monthly' ? '1 Month' : cycle === 'quarterly' ? 'Quarterly' : 'Annual %'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Button 
            variant="outline"
            className="w-full text-[#1D72F2] border-[#1D72F2] hover:bg-blue-50/50 uppercase"
            onClick={onPlanToggle}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Switch to {selectedPlan === 'Startup' ? 'Growth Plan' : 'Startup Plan'}</span>
          </Button>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 space-y-4" id="accounting-summary-card">
        
        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
          walletApplied ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50/50 border-[#E2E8F0]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#EFF6FF] rounded-lg text-[#1D72F2]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Wallet Balance</h4>
              <p className="text-xs text-slate-500 mt-0.5">₹500.00 available</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onWalletToggle}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              walletApplied 
                ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' 
                : 'bg-white border-[#E2E8F0] text-[#1D72F2] hover:bg-[#1D72F2] hover:text-white'
            }`}
          >
            {walletApplied ? 'Remove' : 'Apply'}
          </button>
        </div>

        <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
          <button 
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50/50 text-slate-800 text-sm font-bold border-b border-[#E2E8F0]"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#1D72F2]" />
              <span>Apply Coupon</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="p-4 space-y-4 bg-white">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Enter coupon code" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-[#F8F9FC] border border-[#E2E8F0] rounded-xl pl-4 pr-16 py-2.5 text-sm font-medium focus:outline-hidden placeholder:text-slate-400"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      if (couponInput.toUpperCase() === 'WELCOME20' || couponInput.toUpperCase() === 'ANNUAL50') {
                        onCouponSelect(couponInput.toUpperCase());
                        setCouponInput('');
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-[#1D72F2] uppercase"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100">
                {[
                  { code: 'WELCOME20', description: '20% off on your first month' },
                  { code: 'ANNUAL50', description: '50% off on annual plans' }
                ].map((item) => {
                  const isActive = selectedCouponCode === item.code;
                  return (
                    <div 
                      key={item.code}
                      onClick={() => onCouponSelect(isActive ? '' : item.code)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isActive ? 'bg-[#EFF6FF]/60 border-blue-200 text-slate-800' : 'bg-white hover:bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-md ${
                            isActive ? 'bg-[#1D72F2] text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 font-medium">{item.description}</p>
                      </div>

                      <div className="shrink-0 ml-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isActive ? 'border-[#1D72F2]' : 'border-slate-300'
                        }`}>
                          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#1D72F2]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
          
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-500">Subtotal</span>
            <span className="font-bold text-slate-800 font-heading">
              ₹{formatCurrency(baseSubtotal)}
            </span>
          </div>

          {selectedCouponCode && (
            <div className="flex items-center justify-between text-sm text-blue-600 bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50">
              <span className="font-semibold text-xs text-blue-800">Coupon ({selectedCouponCode})</span>
              <span className="font-extrabold font-heading text-xs">
                -₹{formatCurrency(couponDiscount)}
              </span>
            </div>
          )}

          {walletApplied && (
            <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50/50 px-3 py-1.5 rounded-lg border border-emerald-100/50">
              <span className="font-semibold text-emerald-800">Wallet balance applied</span>
              <span className="font-bold font-heading">
                -₹500.00
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-500 flex items-center gap-1 cursor-help group relative">
              <span>Tax (18% GST)</span>
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span className="absolute bottom-6 left-0 hidden group-hover:block bg-slate-900 text-white text-[10px] p-2 rounded-lg w-52 z-50">
                18% GST of taxable base ₹{formatCurrency(taxableBase)} (Subtotal minus coupon discount).
              </span>
            </span>
            <span className="font-bold text-slate-800 font-heading">
              ₹{formatCurrency(gstTax)}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
            <div>
              <span className="text-sm font-extrabold text-slate-900 block font-heading tracking-tight">
                Total due today
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Recurring billing follows plan cycles</span>
            </div>
            <span className="text-3xl font-black text-slate-900 tracking-tight font-heading">
              ₹{formatCurrency(finalTotal)}
            </span>
          </div>

          <div className="pt-3">
            <Button 
              variant="primary" 
              className="w-full py-4 text-center cursor-pointer font-bold tracking-wide shadow-lg hover:scale-[1.01] uppercase"
              onClick={onProceedPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Connecting gateway...' : 'Proceed to Payment'}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted checkout sandbox</span>
          </div>

        </div>

      </div>

    </div>
  );
}
