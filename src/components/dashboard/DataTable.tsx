import React from 'react';
import { CreditCard, ExternalLink, DownloadCloud } from 'lucide-react';
import Badge from '../common/Badge';

export default function DataTable() {
  const transactions = [
    { id: 'TXN-9021', date: 'May 10, 2026', desc: 'Startup Quarterly Campaign Renewal', amount: '₹16,078.64', status: 'completed' },
    { id: 'TXN-8845', date: 'Feb 10, 2026', desc: 'Influencer Collaboration Booking Charge', amount: '₹4,999.00', status: 'completed' },
    { id: 'TXN-4052', date: 'Nov 10, 2025', desc: 'Trial Workspace Workspace Upgrade', amount: '₹14,999.00', status: 'completed' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Transaction Ledger</h3>
          <p className="text-xs text-slate-400 mt-1">Review past billing statements </p>
        </div>
        <Badge variant="slate">3 logs available</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-6">Reference ID</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Purpose</th>
              <th className="py-3 px-6">Amount Paid</th>
              <th className="py-3 px-6">State Status</th>
              <th className="py-3 px-6 text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 text-xs font-medium">
            {transactions.map((txn) => (
              <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-6 font-mono font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>{txn.id}</span>
                </td>
                <td className="py-3.5 px-6 table-cell whitespace-nowrap text-slate-500">{txn.date}</td>
                <td className="py-3.5 px-6 table-cell">{txn.desc}</td>
                <td className="py-3.5 px-6 font-bold text-slate-900">{txn.amount}</td>
                <td className="py-3.5 px-6">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ● Success
                  </span>
                </td>
                <td className="py-3.5 px-6 text-center">
                  <button className="p-1 px-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#1D72F2] rounded-md transition-all inline-flex items-center gap-1 text-[10px] font-bold">
                    <DownloadCloud className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
