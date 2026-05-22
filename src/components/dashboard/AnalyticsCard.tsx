import React from 'react';
import { AreaChart, TrendingUp, Sparkles, Users } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: number;
  changeType: 'positive' | 'negative';
}

export default function AnalyticsCard({
  title,
  value,
  change,
  changeType
}: AnalyticsCardProps) {
  const isPositive = changeType === 'positive';

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-blue-50 text-[#1D72F2] rounded-xl">
          <AreaChart className="w-4 h-4" />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold text-slate-950 font-heading tracking-tight">
          {value}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {isPositive ? '+' : '-'}{change}%
          </span>
          <span className="text-xs text-slate-400 font-medium">vs benchmark benchmark</span>
        </div>

        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
            <span>Instagram allocation</span>
            <span>72%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1D72F2] to-indigo-500 rounded-full" style={{ width: '72%' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
