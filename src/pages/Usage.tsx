import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, List, TrendingUp } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { cn } from '../lib/utils';

const trafficData = [
  { time: '00:00', stream: 30, auth: 10, compute: 20 },
  { time: '04:00', stream: 45, auth: 15, compute: 25 },
  { time: '08:00', stream: 35, auth: 25, compute: 30 },
  { time: '12:00', stream: 60, auth: 40, compute: 45 },
  { time: '16:00', stream: 75, auth: 30, compute: 55 },
  { time: '20:00', stream: 85, auth: 20, compute: 40 },
  { time: '23:59', stream: 50, auth: 15, compute: 30 },
];

const geoData = [
  { name: 'North America', value: 45, color: '#a3a6ff' },
  { name: 'Europe', value: 30, color: '#a28efc' },
  { name: 'Asia Pacific', value: 25, color: '#ffa5d9' },
];

const usageBreakdown = [
  { id: 'sk_live_2839...19d', name: 'Main_Production_Key', status: 'Healthy', requests: '1,240,492', errorRate: '0.02%', consumption: '$452.10', level: 'High Usage' },
  { id: 'sk_test_9921...02a', name: 'Staging_Env_Legacy', status: 'Inactive', requests: '12,102', errorRate: '0.00%', consumption: '$12.45', level: 'Low Usage' },
  { id: 'sk_live_4410...x91', name: 'Web_App_Frontend_v3', status: 'Throttled', requests: '892,110', errorRate: '4.21%', consumption: '$310.88', level: 'Peak Reach' },
  { id: 'sk_live_1029...77b', name: 'Mobile_SDK_iOS', status: 'Healthy', requests: '562,331', errorRate: '0.05%', consumption: '$198.50', level: 'Normal' },
];

export default function Usage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-bold tracking-tighter text-white mb-2">Usage Analytics</h3>
          <p className="text-on-surface-variant max-w-lg">Real-time resource consumption and request volume distribution across your global infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface-container-low border border-outline-variant/10 rounded-lg p-1">
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-surface-container-highest rounded-md">Last 7 Days</button>
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-white transition-colors">30 Days</button>
            <button className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-white transition-colors">90 Days</button>
          </div>
          <button className="primary-gradient text-on-primary-fixed px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/10 active:scale-95 transition-transform">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Total Requests" value="4.2M" trend={12} variant="primary" />
        <MetricCard label="Avg. Latency" value="42ms" trend={-2} variant="secondary" />
        <MetricCard label="Active Keys" value="128" trendLabel="Current" variant="tertiary" />
        <MetricCard label="Est. Cost" value="$1,420" trendLabel="Budgeted" variant="error" />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 ghost-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h5 className="text-lg font-bold text-white">Traffic by Endpoint</h5>
              <p className="text-on-surface-variant text-sm">Requests per second across primary API routes</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-on-surface-variant font-medium">/v1/stream</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-xs text-on-surface-variant font-medium">/v1/auth</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#48474a" opacity={0.2} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#adaaad', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#adaaad', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1f22', border: '1px solid #48474a', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="stream" stroke="#a3a6ff" fillOpacity={0.1} fill="#a3a6ff" strokeWidth={2} />
                <Area type="monotone" dataKey="auth" stroke="#a28efc" fillOpacity={0.1} fill="#a28efc" strokeWidth={2} />
                <Area type="monotone" dataKey="compute" stroke="#ffa5d9" fillOpacity={0.1} fill="#ffa5d9" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 bg-surface-container-low rounded-xl p-8 flex flex-col ghost-border">
          <h5 className="text-lg font-bold text-white mb-1">Geo Distribution</h5>
          <p className="text-on-surface-variant text-sm mb-8">Requests by region</p>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={geoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {geoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1f22', border: '1px solid #48474a', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white font-bold text-xl">100%</span>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {geoData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", item.name === 'North America' ? 'bg-primary' : item.name === 'Europe' ? 'bg-secondary' : 'bg-tertiary')} />
                  <span className="text-xs text-on-surface font-medium">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl overflow-hidden ghost-border">
        <div className="px-8 py-6 flex items-center justify-between border-b border-outline-variant/10">
          <h5 className="text-lg font-bold text-white">Detailed Usage Breakdown</h5>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-container-low">
                <th className="px-8 py-4">API Name / Key ID</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Requests (24h)</th>
                <th className="px-8 py-4">Error Rate</th>
                <th className="px-8 py-4 text-right">Consumption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {usageBreakdown.map((row) => (
                <tr key={row.id} className="hover:bg-surface-bright transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{row.name}</span>
                      <span className="text-xs text-on-surface-variant font-mono">{row.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "px-2 py-1 text-[10px] font-bold rounded-full border uppercase tracking-tighter",
                      row.status === 'Healthy' ? 'bg-primary/10 text-primary border-primary/20' :
                      row.status === 'Inactive' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' :
                      'bg-error-dim/10 text-error-dim border-error-dim/20'
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm font-medium text-on-surface">{row.requests}</td>
                  <td className="px-8 py-4 text-sm font-medium text-on-surface text-center">{row.errorRate}</td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-white">{row.consumption}</span>
                      <span className={cn(
                        "text-[10px]",
                        row.level === 'High Usage' ? 'text-primary' : 
                        row.level === 'Peak Reach' ? 'text-error-dim' : 
                        'text-on-surface-variant'
                      )}>{row.level}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
