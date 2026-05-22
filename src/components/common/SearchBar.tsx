import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Influencer } from '../../types';

interface SearchBarProps {
  influencers: Influencer[];
  onSelect: (name: string) => void;
}

export default function SearchBar({ influencers, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = influencers.filter(inf => 
    inf.name.toLowerCase().includes(query.toLowerCase()) || 
    inf.niche.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(e.target.value.length > 0);
          }}
          onFocus={() => {
            if (query.length > 0) setOpen(true);
          }}
          placeholder="Find influencers to collaborate with" 
          className="w-full bg-[#F8F9FC] border border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#1D72F2] focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-[#1D72F2]/10 transition-all rounded-xl pl-4 pr-11 py-2.5 text-sm placeholder:text-slate-400 font-medium text-slate-800"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400">
          <Search className="w-4.5 h-4.5 text-slate-400" />
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-xl shadow-2xl p-2 z-50 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#F1F5F9] mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matches ({filtered.length})</span>
            <button 
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-[#1D72F2] font-semibold hover:underline"
            >
              Close
            </button>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-sm text-slate-400">
              No influencers found matching "{query}"
            </div>
          ) : (
            filtered.map((inf, i) => (
              <div 
                key={i}
                onClick={() => {
                  setQuery(inf.name);
                  setOpen(false);
                  onSelect(inf.name);
                }}
                className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800">{inf.name}</div>
                  <div className="text-xs text-slate-500">{inf.niche}</div>
                </div>
                <div className="text-xs font-semibold px-2 py-1 bg-blue-50 text-[#1D72F2] rounded-md">{inf.followers}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
