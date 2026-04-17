import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, Database, Coins, Zap, Activity, Cpu, AlertTriangle } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const usageData = [
  { name: 'Day 01', inbound: 4000, outbound: 2400 },
  { name: 'Day 05', inbound: 3000, outbound: 1398 },
  { name: 'Day 10', inbound: 2000, outbound: 9800 },
  { name: 'Day 15', inbound: 2780, outbound: 3908 },
  { name: 'Day 20', inbound: 1890, outbound: 4800 },
  { name: 'Day 25', inbound: 2390, outbound: 3800 },
  { name: 'Day 30', inbound: 3490, outbound: 4300 },
];

const distributionData = [
  { name: 'US-East', value: 45 },
  { name: 'EU-West', value: 32 },
  { name: 'AP-South', value: 15 },
  { name: 'Other', value: 8 },
];

const activity = [
  { id: 1, event: 'API Key Rotation', resource: 'auth_key_0x92...', status: 'Completed', time: '2 mins ago', cost: '--', icon: Cpu, color: 'text-primary' },
  { id: 2, event: 'Model Inference Batch', resource: 'gpt4-flux-v2', status: 'Active', time: '14 mins ago', cost: '$12.42', icon: Activity, color: 'text-secondary' },
  { id: 3, event: 'Rate Limit Reached', resource: 'node_cluster_eu', status: 'Failed', time: '1 hr ago', cost: '--', icon: AlertTriangle, color: 'text-error' },
  { id: 4, event: 'Snapshot Created', resource: 'db_prod_backup_9', status: 'Scheduled', time: '3 hrs ago', cost: '$0.05', icon: Database, color: 'text-on-surface-variant' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Dashboard Overview</h2>
          <p className="text-on-surface-variant text-sm">System performance and resource allocation for the current billing cycle.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-surface-container-high text-on-surface text-sm font-medium rounded-lg hover:bg-surface-bright transition-all border border-outline-variant/15">
            Export Data
          </button>
          <button className="px-4 py-2 primary-gradient text-on-primary-fixed text-sm font-bold rounded-lg active:scale-95 transition-transform">
            Upgrade Tier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Current Balance" 
          value="$14,280.45" 
          trend={12.5} 
          icon={Wallet} 
          variant="secondary" 
        />
        <MetricCard 
          label="Storage Usage" 
          value="842.5 GB" 
          trendLabel="Optimal" 
          icon={Database} 
          variant="primary" 
        />
        <MetricCard 
          label="Active Tokens" 
          value="12.4M" 
          trendLabel="High" 
          icon={Coins} 
          variant="tertiary" 
        />
        <MetricCard 
          label="Total Requests" 
          value="1.2M" 
          subValue="/hr" 
          trendLabel="Live" 
          icon={Zap} 
          variant="error" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6 bg-surface-container p-8 rounded-xl ghost-border overflow-hidden relative">
           <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-lg font-bold text-white">Usage Analytics</h4>
              <p className="text-xs text-on-surface-variant">Real-time resource consumption (last 30 days)</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-md border border-outline-variant/10">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-medium text-on-surface-variant">Inbound</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-md border border-outline-variant/10">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-[10px] font-medium text-on-surface-variant">Outbound</span>
              </div>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a3a6ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a3a6ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a28efc" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a28efc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#48474a" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#adaaad', fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f1f22', border: '1px solid #48474a', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#a3a6ff" fillOpacity={1} fill="url(#colorInbound)" strokeWidth={2} />
                <Area type="monotone" dataKey="outbound" stroke="#a28efc" fillOpacity={1} fill="url(#colorOutbound)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-surface-container p-8 rounded-xl ghost-border overflow-hidden">
          <h4 className="text-lg font-bold text-white mb-1">Request Distribution</h4>
          <p className="text-xs text-on-surface-variant mb-8">Requests by regional data centers</p>
          <div className="space-y-6">
            {distributionData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-on-surface-variant">{item.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-low rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={cn(
                      "h-full rounded-full",
                      item.name.includes('US') ? 'bg-primary' : item.name.includes('EU') ? 'bg-secondary' : 'bg-tertiary'
                    )} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl ghost-border overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h4 className="text-lg font-bold text-white">Recent Activity</h4>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">
                <th className="px-6 py-4">Transaction / Event</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {activity.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-surface-bright transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                          <Icon className={cn("w-4 h-4", item.color)} />
                        </div>
                        <span className="text-sm font-semibold text-white">{item.event}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant font-mono">{item.resource}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tight",
                        item.status === 'Completed' ? 'bg-primary/10 text-primary' :
                        item.status === 'Active' ? 'bg-secondary/10 text-secondary' :
                        item.status === 'Failed' ? 'bg-error/10 text-error' :
                        'bg-surface-container-highest text-on-surface-variant'
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{item.time}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">{item.cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
