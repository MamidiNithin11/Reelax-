import React from 'react';
import { X, Sparkles, Shield, User, Landmark, History, LogOut } from 'lucide-react';
import Button from '../common/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ isOpen, onClose, onNavigate }: SidebarProps) {
  if (!isOpen) return null;

  const steps = [
    { id: 'billing', label: 'Billing Settings', icon: Landmark, desc: 'Configure company information' },
    { id: 'profile', label: 'User Profiles', icon: User, desc: 'Manage account delegates' },
    { id: 'security', label: 'Security & Access', icon: Shield, desc: 'API certificates & keys' },
    { id: 'history', label: 'Order History', icon: History, desc: 'Subscribed billing log' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#1D72F2]" />
              <h2 className="text-lg font-bold text-slate-800">Workspace Menu</h2>
            </div>
            <button 
              type="button" 
              onClick={onClose} 
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-slate-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Workspace Controls</span>
              {steps.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-blue-50 group-hover:text-[#1D72F2] transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#1D72F2] transition-colors">{item.label}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F8F9FC] border border-blue-100/50 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-800">Mock Sandbox Environment</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Prices and transactional math matches the Reelax checkout design templates exactly. Toggling state will show dynamic local live feedback.
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <Button 
              variant="outline" 
              className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700" 
              onClick={() => {
                onClose();
                onNavigate('logout');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
