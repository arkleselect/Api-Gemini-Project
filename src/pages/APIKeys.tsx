import React, { useState } from 'react';
import { Plus, Filter, MoreVertical, Terminal, Key as KeyIcon, Copy, Check } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import SecurityTip from '../components/SecurityTip';
import Modal from '../components/Modal';
import { cn } from '../lib/utils';

const keysStats = [
  { label: 'Global Request Volume', value: '2.4M', trend: 12.4, trendLabel: 'Live', variant: 'primary' },
  { label: 'Active Keys', value: '12', subValue: '/ 50', progress: 24, footer: 'You are currently using 24% of your allotted enterprise key capacity.', variant: 'secondary' },
];

const apiKeys = [
  { name: 'Production_Main_v2', type: 'Universal Access', snippet: 'ob_live_••••••••w9x2', created: 'Oct 12, 2023', lastUsed: '2 mins ago', status: 'Active' },
  { name: 'Staging_Sandbox', type: 'Restricted Read-Only', snippet: 'ob_test_••••••••kL04', created: 'Nov 04, 2023', lastUsed: 'Yesterday', status: 'Active' },
  { name: 'Legacy_V1_Core', type: 'Legacy Integration', snippet: 'ob_live_••••••••m3s1', created: 'Jan 21, 2022', lastUsed: '3 months ago', status: 'Revoked' },
  { name: 'Analytics_Service_Bot', type: 'Monitoring Only', snippet: 'ob_live_••••••••r7p9', created: 'Dec 01, 2023', lastUsed: 'Just now', status: 'Active' },
];

export default function APIKeys() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock key generation
    const randomStr = Math.random().toString(36).substring(7);
    setCreatedKey(`ob_live_${randomStr}_${Date.now().toString(36)}`);
  };

  const copyToClipboard = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeAndReset = () => {
    setIsModalOpen(false);
    setCreatedKey(null);
    setNewKeyName('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white headline-lg">API Keys</h2>
          <p className="text-on-surface-variant body-md max-w-md">Manage your authentication tokens and monitor their usage across your obsidian clusters.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="primary-gradient text-on-primary-fixed font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 hover:shadow-[0_0_20px_rgba(163,166,255,0.3)] transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Key</span>
        </button>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeAndReset} 
        title={createdKey ? "API Key Created" : "Create New API Key"}
      >
        {!createdKey ? (
          <form onSubmit={handleCreateKey} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Key Name</label>
              <input 
                type="text" 
                placeholder="e.g. Production_Analytics_v1"
                required
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-on-surface-variant/40"
              />
              <p className="text-[10px] text-on-surface-variant/60">Choose a descriptive name to help you identify the key's purpose later.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Access Scope</label>
              <select className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all appearance-none cursor-pointer">
                <option>Universal Access (Read/Write)</option>
                <option>Restricted Read-Only</option>
                <option>Monitoring Only</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button"
                onClick={closeAndReset}
                className="px-6 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-2 primary-gradient text-on-primary-fixed rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-transform"
              >
                Create Key
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <KeyIcon className="w-5 h-5" />
                <span className="text-sm font-bold">Your Secret Key</span>
              </div>
              <div className="relative group">
                <input 
                  readOnly 
                  value={createdKey}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-3 text-xs font-mono text-white pr-12 focus:ring-0 outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="bg-error/5 border border-error/10 p-4 rounded-xl">
               <p className="text-xs text-error font-medium leading-relaxed">
                 Warning: This is the last time you will see this key. Store it securely in a password manager.
               </p>
            </div>
            <button 
              onClick={closeAndReset}
              className="w-full py-3 primary-gradient text-on-primary-fixed font-bold rounded-lg text-sm active:scale-95 transition-transform"
            >
              Done, I've saved it
            </button>
          </div>
        )}
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          <MetricCard 
            label={keysStats[0].label} 
            value={keysStats[0].value} 
            trend={keysStats[0].trend} 
            trendLabel={keysStats[0].trendLabel} 
            variant="primary" 
          />
        </div>
        <div className="lg:col-span-4">
          <MetricCard 
            label={keysStats[1].label} 
            value={keysStats[1].value} 
            subValue={keysStats[1].subValue} 
            progress={keysStats[1].progress} 
            footer={keysStats[1].footer}
            variant="secondary" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button className="bg-surface-container-high px-3 py-1.5 rounded-lg text-sm text-white font-medium flex items-center gap-2 ghost-border hover:bg-surface-bright transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm text-on-surface-variant hover:text-white transition-colors">
              View: All Keys
            </button>
          </div>
          <div className="text-sm text-on-surface-variant">
            Showing <span className="text-white font-medium">1-10</span> of 12
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">
                <th className="px-6 py-3">Key Name</th>
                <th className="px-6 py-3">Key Snippet</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Last Used</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((key, i) => (
                <tr key={i} className="bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <td className="px-6 py-4 rounded-l-xl">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{key.name}</span>
                      <span className="text-[10px] text-on-surface-variant/60">{key.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-primary/10 px-2 py-1 rounded w-fit">
                       <Terminal className="w-3 h-3 text-primary" />
                       <code className="text-xs font-mono text-primary">{key.snippet}</code>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{key.created}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{key.lastUsed}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      key.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-on-surface-variant/10 text-on-surface-variant'
                    )}>
                      <span className={cn("w-1 h-1 rounded-full", key.status === 'Active' ? 'bg-emerald-400' : 'bg-on-surface-variant')} />
                      {key.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right rounded-r-xl">
                    <button className="text-on-surface-variant hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-8 px-2">
          <button className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-white transition-colors group disabled:opacity-30" disabled>
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary-fixed font-bold text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-white transition-colors text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-white transition-colors text-sm">3</button>
            <span className="mx-1 text-on-surface-variant">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-white transition-colors text-sm">12</button>
          </div>
          <button className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-white transition-colors group">
            <span>Next</span>
          </button>
        </div>
      </div>
      <SecurityTip />
    </div>
  );
}
