import React, { useState } from 'react';
import { Save, Building2, Mail, MapPin } from 'lucide-react';
import Button from '../common/Button';
import { BillingDetails } from '../../types';

interface BillingFormProps {
  initialDetails: BillingDetails;
  statesCities: Record<string, string[]>;
  onSave: (details: BillingDetails) => void;
  onCancel: () => void;
}

export default function BillingForm({
  initialDetails,
  statesCities,
  onSave,
  onCancel
}: BillingFormProps) {
  const [details, setDetails] = useState<BillingDetails>(initialDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!details.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }
    if (!details.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (details.pinCode && !/^\d{5,6}$/.test(details.pinCode)) {
      newErrors.pinCode = "Enter a valid pincode";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSave(details);
  };

  const handleFieldChange = (key: keyof BillingDetails, val: string) => {
    setDetails(prev => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs p-6 md:p-8" id="billing-card-form">
      <div className="mb-8 border-b border-[#F1F5F9] pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
          Review your details
        </h1>
        <p className="text-base font-bold text-slate-800 mt-2 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#1D72F2]" />
          Billing Information
        </p>
      </div>

      <form onSubmit={validate} className="space-y-5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              value={details.companyName}
              onChange={(e) => handleFieldChange('companyName', e.target.value)}
              placeholder="e.g. Abhigyan Media"
              className={`w-full bg-[#F8F9FC] border ${errors.companyName ? 'border-rose-500 focus:ring-rose-500/10' : 'border-[#E2E8F0] focus:ring-[#1D72F2]/10'} focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 transition-all`}
              required
            />
            {errors.companyName && (
              <p className="text-xs text-rose-500 font-semibold">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Email address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="email" 
                value={details.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="email@company.com"
                className={`w-full bg-[#F8F9FC] border ${errors.email ? 'border-rose-500 focus:ring-rose-500/10' : 'border-[#E2E8F0] focus:ring-[#1D72F2]/10'} focus:border-[#1D72F2] focus:bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-slate-800 focus:outlinehidden focus:ring-4 transition-all`}
                required
              />
              <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 font-semibold">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              GST Number <span className="text-slate-400 text-[10px] font-semibold">(Optional)</span>
            </label>
            <input 
              type="text" 
              value={details.gstNumber}
              onChange={(e) => handleFieldChange('gstNumber', e.target.value.toUpperCase())}
              placeholder="GST Number"
              maxLength={15}
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              PAN Number <span className="text-slate-400 text-[10px] font-semibold">(Optional)</span>
            </label>
            <input 
              type="text" 
              value={details.panNumber}
              onChange={(e) => handleFieldChange('panNumber', e.target.value.toUpperCase())}
              placeholder="PAN Number"
              maxLength={10}
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Premise/House no.
            </label>
            <input 
              type="text" 
              value={details.premise}
              onChange={(e) => handleFieldChange('premise', e.target.value)}
              placeholder="Premise/House no."
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Street
            </label>
            <input 
              type="text" 
              value={details.street}
              onChange={(e) => handleFieldChange('street', e.target.value)}
              placeholder="Street"
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              State
            </label>
            <select 
              value={details.state} 
              onChange={(e) => {
                setDetails(prev => ({ ...prev, state: e.target.value, city: '' }));
              }}
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all"
            >
              <option value="">Select state</option>
              {Object.keys(statesCities).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              City
            </label>
            <select 
              value={details.city}
              onChange={(e) => handleFieldChange('city', e.target.value)}
              disabled={!details.state}
              className={`w-full ${!details.state ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#F8F9FC] focus:bg-white cursor-pointer'} border border-[#E2E8F0] focus:border-[#1D72F2] rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-hidden focus:ring-4 transition-all`}
            >
              <option value="">{details.state ? "Select city" : "Select state first"}</option>
              {details.state && statesCities[details.state].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Country
            </label>
            <div className="relative">
              <input 
                type="text" 
                value={details.country} 
                disabled
                className="w-full bg-slate-100 border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed select-none"
              />
              <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wide">
              Pin Code
            </label>
            <input 
              type="text" 
              value={details.pinCode}
              onChange={(e) => handleFieldChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Pincode"
              className="w-full bg-[#F8F9FC] border border-[#E2E8F0] focus:border-[#1D72F2] focus:bg-white rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all placeholder:text-slate-400"
            />
          </div>

        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#F1F5F9] mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            icon={Save}
          >
            Save Details
          </Button>
        </div>

      </form>
    </div>
  );
}
