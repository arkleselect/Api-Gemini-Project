import React from 'react';
import { CreditCard, Download, Filter, Zap, User, Mail, MapPin, ReceiptText } from 'lucide-react';
import { cn } from '../lib/utils';

const invoices = [
  { id: 'INV-2024-001', date: 'Jan 14, 2024', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2023-012', date: 'Dec 14, 2023', amount: '$350.00', status: 'Paid' },
  { id: 'INV-2023-011', date: 'Nov 14, 2023', amount: '$350.00', status: 'Paid' },
  { id: 'INV-2023-010', date: 'Oct 14, 2023', amount: '$350.00', status: 'Refunded' },
];

export default function Billing() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-tighter text-on-surface">Subscription Management</h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">Manage your enterprise license, monitor usage limits in real-time, and download your historical tax invoices.</p>
        </div>
        <button className="primary-gradient text-on-primary-fixed font-bold py-3 px-8 rounded-lg active:scale-95 transition-transform flex items-center gap-2">
          <Zap className="w-5 h-5 flex-shrink-0" />
          Upgrade Plan
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 bg-surface-container rounded-xl p-8 ghost-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="px-3 py-1 bg-primary/10 text-primary text-[0.65rem] font-bold uppercase tracking-widest rounded-full">Active Plan</span>
              <h3 className="text-3xl font-bold mt-4 tracking-tight">Flux Pro Enterprise</h3>
              <p className="text-on-surface-variant mt-1">Billed annually • Next renewal July 14, 2024</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold tracking-tighter">$4,200</span>
              <span className="text-on-surface-variant block">/year</span>
            </div>
          </div>
          <div className="mt-12 space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">API Credits</span>
                <span className="text-on-surface-variant">84,200 / 100,000</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full primary-gradient rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/10">
              <div>
                <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-1">Seats Used</p>
                <p className="text-xl font-bold">12 / 20</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-1">Storage</p>
                <p className="text-xl font-bold">4.2 TB</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-1">Uptime SLA</p>
                <p className="text-xl font-bold">99.99%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-8 ghost-border flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Mail className="text-primary w-5 h-5" />
              Billing Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                  <User className="text-on-surface-variant w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Alex Chen</p>
                  <p className="text-xs text-on-surface-variant">Finance Director</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                  <Mail className="text-on-surface-variant w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">billing@acmecorp.com</p>
                  <p className="text-xs text-on-surface-variant">Primary Email</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                  <MapPin className="text-on-surface-variant w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">Acme Corp HQ</p>
                  <p className="text-xs text-on-surface-variant">123 Silicon Alley, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 text-sm font-semibold border border-outline-variant/20 rounded-lg hover:bg-surface-container-high transition-colors">
            Edit Billing Information
          </button>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl overflow-hidden ghost-border">
        <div className="px-8 py-6 flex items-center justify-between border-b border-outline-variant/10">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors">
              <Filter className="text-on-surface-variant w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors">
              <Download className="text-on-surface-variant w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-bold">Invoice ID</th>
                <th className="px-8 py-4 text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-bold">Billing Date</th>
                <th className="px-8 py-4 text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-bold">Amount</th>
                <th className="px-8 py-4 text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-bold">Status</th>
                <th className="px-8 py-4 text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-bright/50 transition-colors cursor-default">
                  <td className="px-8 py-5 text-sm font-medium">{inv.id}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{inv.date}</td>
                  <td className="px-8 py-5 text-sm font-bold">{inv.amount}</td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-tighter",
                      inv.status === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-error/10 text-error-dim'
                    )}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">View Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-surface-container-low flex justify-center">
          <button className="text-on-surface-variant text-xs hover:text-white transition-colors">Load more transactions</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-surface-container-low rounded-xl ghost-border flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-black rounded border border-white/10 flex items-center justify-center overflow-hidden">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Visa Ending in 4242</p>
              <p className="text-xs text-on-surface-variant">Expires 12/26</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-primary/10 text-primary text-[0.6rem] font-bold uppercase rounded">Default</span>
        </div>
        <div className="p-6 bg-surface-container-low border border-dashed border-outline-variant/30 rounded-xl flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors group">
          <div className="flex items-center gap-2 text-on-surface-variant group-hover:text-white transition-colors">
            <ReceiptText className="w-5 h-5" />
            <span className="text-sm font-medium">Add New Payment Method</span>
          </div>
        </div>
      </div>
    </div>
  );
}
