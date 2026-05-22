import React from 'react';
import { Crown, Plus, Menu, Sparkles } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import Button from '../common/Button';
import { Influencer } from '../../types';

interface HeaderProps {
  influencers: Influencer[];
  onInfluencerSelect: (name: string) => void;
  onUpgradeClick: () => void;
  onCreateCampaignClick: () => void;
  onMenuToggle: () => void;
}

export default function Header({
  influencers,
  onInfluencerSelect,
  onUpgradeClick,
  onCreateCampaignClick,
  onMenuToggle
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-xs px-4 sm:px-6 lg:px-8 py-3" id="header-nav">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        <div className="flex flex-1 items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#1D72F2] to-[#2563EB] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#1D72F2]/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A] font-heading">
                Reelax
              </span>
              <span className="text-[10px] font-bold block bg-[#EFF6FF] text-[#1D72F2] px-1.5 py-0.2 rounded-md uppercase tracking-wider text-center mt-[-2px]">
                Partner
              </span>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <SearchBar influencers={influencers} onSelect={onInfluencerSelect} />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 border-t border-[#F1F5F9] md:border-t-0 pt-3 md:pt-0">
          
          <Button 
            variant="gradient" 
            icon={Crown} 
            onClick={onUpgradeClick}
            id="upgrade-button"
          >
            Upgrade
          </Button>

          <Button 
            variant="primary" 
            icon={Plus} 
            onClick={onCreateCampaignClick}
            id="create-campaign-button"
          >
            Create Campaign
          </Button>

          <div className="h-8 w-px bg-[#E2E8F0] hidden sm:block"></div>

          <div className="flex items-center gap-2 cursor-pointer">
            <div 
              onClick={() => onInfluencerSelect('Profile options')}
              className="w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 border-2 border-white shadow-xs flex items-center justify-center text-[#1D72F2] font-bold text-sm select-none transition-colors"
            >
              AP
            </div>
            <button 
              type="button"
              onClick={onMenuToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
