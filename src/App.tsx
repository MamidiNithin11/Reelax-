import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import LayoutWrapper from './components/layout/LayoutWrapper';
import BillingForm from './components/dashboard/BillingForm';
import OrderSummary from './components/dashboard/OrderSummary';
import AnalyticsCard from './components/dashboard/AnalyticsCard';
import DataTable from './components/dashboard/DataTable';
import Badge from './components/common/Badge';
import { Sparkles, ArrowLeft, X, TrendingUp, CheckCircle, HelpCircle } from 'lucide-react';
import { BillingDetails, BillingCycle, Influencer } from './types';

const INDIAN_STATES_CITIES: Record<string, string[]> = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Delhi": ["New Delhi", "Noida", "Gurugram", "Dwarka"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Secunderabad", "Warangal"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur", "Ghaziabad"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Ambala", "Panipat"]
};

const INFLUENCERS_DATA: Influencer[] = [
  { name: 'Sravan Kumar', niche: 'Tech & AI Specialist', followers: '120K' },
  { name: 'Saurabh Gadgil', niche: 'Lifestyle & Creative Design', followers: '340K' },
  { name: 'Abhigyan Pandey', niche: 'SaaS Dev & Solopreneur', followers: '45K' },
  { name: 'Tech Burner', niche: 'Tech & Gadgets Consumer Tech', followers: '11M' },
  { name: 'Tanmay Bhat', niche: 'Comedy, Veneration, & Web3', followers: '4.5M' },
  { name: 'Shraddha Jain', niche: 'Satire, Humorous Vlogs, & Media', followers: '800K' }
];

export default function App() {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    companyName: 'abhigyan',
    email: 'abhigyan.pandey@getreelax.com',
    gstNumber: '',
    panNumber: '',
    premise: '',
    street: '',
    state: '',
    city: '',
    country: 'India',
    pinCode: ''
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Startup' | 'Growth'>('Startup');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('quarterly');
  const [walletApplied, setWalletApplied] = useState(false);
  const [selectedCouponCode, setSelectedCouponCode] = useState<string>('WELCOME20');
  
  const [isSaved, setIsSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    if (toastNotification) {
      const timer = setTimeout(() => {
        setToastNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastNotification]);

  const triggerToast = (message: string, type: 'success' | 'info' | 'error') => {
    setToastNotification({ message, type });
  };

  const handleSaveDetails = (updatedDetails: BillingDetails) => {
    setBillingDetails(updatedDetails);
    setIsSaved(true);
    triggerToast("✓ Billing details successfully authorized & persistent locally!", "success");
  };

  const handleCancelForm = () => {
    setBillingDetails({
      companyName: 'abhigyan',
      email: 'abhigyan.pandey@getreelax.com',
      gstNumber: '',
      panNumber: '',
      premise: '',
      street: '',
      state: '',
      city: '',
      country: 'India',
      pinCode: ''
    });
    setIsSaved(false);
    triggerToast("Billing form reverted to defaults.", "info");
  };

  const handleApplyCouponSelection = (code: string) => {
    setSelectedCouponCode(code);
    if (code) {
      triggerToast(`Successful coupon code: ${code} applied.`, "success");
    } else {
      triggerToast("Coupon deduction code cleared.", "info");
    }
  };

  const handleProceedSecureCheckout = () => {
    setIsProcessing(true);
    triggerToast("Redirecting securely to encrypted checkout gateway...", "info");
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast("🎉 Checkout Transaction complete! Workspace workspace initiated.", "success");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans">
      
      {toastNotification && (
        <div 
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 animate-slide-up ${
            toastNotification.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : toastNotification.type === 'error' 
                ? 'bg-rose-50 border-rose-200 text-rose-800' 
                : 'bg-[#EFF6FF] border-blue-200 text-blue-800'
          }`}
          id="toast-notification"
        >
          <div className="text-sm font-semibold tracking-wide">
            {toastNotification.message}
          </div>
          <button 
            type="button"
            onClick={() => setToastNotification(null)}
            className="p-1 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Header 
        influencers={INFLUENCERS_DATA}
        onInfluencerSelect={(name) => triggerToast(`Selected target partner: ${name} to preview metrics.`, "info")}
        onUpgradeClick={() => {
          setSelectedPlan(prev => prev === 'Startup' ? 'Growth' : 'Startup');
          triggerToast("Pricing level successfully shifted!", "info");
        }}
        onCreateCampaignClick={() => triggerToast("Initializing secure campaign workspace creation...", "info")}
        onMenuToggle={() => setSidebarOpen(true)}
      />

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(view) => triggerToast(`Navigated to dashboard view: ${view}`, "info")}
      />

      <LayoutWrapper>
        
        <div className="mb-6">
          <button 
            type="button"
            onClick={() => triggerToast("Pricing plans catalog loaded.", "info")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#1D72F2] transition-colors py-1 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to plans</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          
          <div className="lg:col-span-7">
            <BillingForm 
              initialDetails={billingDetails}
              statesCities={INDIAN_STATES_CITIES}
              onSave={handleSaveDetails}
              onCancel={handleCancelForm}
            />
          </div>

          <div className="lg:col-span-5">
            <OrderSummary 
              selectedPlan={selectedPlan}
              billingCycle={billingCycle}
              walletApplied={walletApplied}
              selectedCouponCode={selectedCouponCode}
              onPlanToggle={() => {
                setSelectedPlan(prev => prev === 'Startup' ? 'Growth' : 'Startup');
                triggerToast("Switched plan option details.", "info");
              }}
              onBillingCycleChange={(cycle) => setBillingCycle(cycle)}
              onWalletToggle={() => setWalletApplied(!walletApplied)}
              onCouponSelect={handleApplyCouponSelection}
              onProceedPayment={handleProceedSecureCheckout}
              isProcessing={isProcessing}
            />
          </div>

        </div>

        <div className="border-t border-[#E2E8F0] pt-10 mt-10">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                Associated Workspace Analytics
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold uppercase">Supplements the pixel-perfect template structure</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="blue">Automated Ledger</Badge>
              <Badge variant="emerald">Live Syncing</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <AnalyticsCard 
              title="Campaign Budget Allocation" 
              value="₹1,24,900" 
              change={14.8} 
              changeType="positive" 
            />
            <AnalyticsCard 
              title="Verified Reach Metric" 
              value="4.8M Impressions" 
              change={28.4} 
              changeType="positive" 
            />
            <AnalyticsCard 
              title="Average Engagement Rate" 
              value="5.62%" 
              change={1.2} 
              changeType="negative" 
            />
          </div>

          <DataTable />
        </div>

      </LayoutWrapper>

      <footer className="bg-white border-t border-[#E2E8F0] py-8 mt-12 text-center text-xs font-semibold text-slate-400">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-slate-700">Reelax Media Partner Platforms</span>
            <span>© 2026. All rights secured.</span>
          </div>
          <div className="flex gap-4">
            <a href="#help" onClick={(e) => { e.preventDefault(); triggerToast("Loading support help modules...", "info"); }} className="hover:text-slate-600">Privacy Terms</a>
            <a href="#help" onClick={(e) => { e.preventDefault(); triggerToast("Loading support help modules...", "info"); }} className="hover:text-slate-600">User Agreement</a>
            <a href="#help" onClick={(e) => { e.preventDefault(); triggerToast("Loading support help modules...", "info"); }} className="hover:text-slate-600">Secure API Docs</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
