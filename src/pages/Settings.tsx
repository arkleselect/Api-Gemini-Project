import React from 'react';
import { User, Shield, Users, Bell, Globe, Save } from 'lucide-react';
import { cn } from '../lib/utils';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User, description: 'Manage your personal account settings and preferences.' },
  { id: 'team', label: 'Team', icon: Users, description: 'Invite team members and manage their access permissions.' },
  { id: 'security', label: 'Security', icon: Shield, description: 'Configure multi-factor authentication and security policies.' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Choose how you want to be notified about system events.' },
  { id: 'compliance', label: 'Compliance', icon: Globe, description: 'Manage data residency and regulatory compliance settings.' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = React.useState('profile');

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Settings</h2>
        <p className="text-on-surface-variant text-sm">Configure your enterprise cluster environment and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar for Settings */}
        <div className="lg:col-span-1 space-y-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-semibold">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container rounded-2xl ghost-border p-8 space-y-8">
            <div className="border-b border-outline-variant/10 pb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {settingsSections.find(s => s.id === activeSection)?.label} Settings
              </h3>
              <p className="text-on-surface-variant text-sm border-none">
                {settingsSections.find(s => s.id === activeSection)?.description}
              </p>
            </div>

            {/* Mock Form Fields */}
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="Alex Rivera"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="alex.rivera@obsidianflux.com"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Obsidian Main Cluster"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all"
                />
              </div>

              <div className="pt-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Public Profile</p>
                  <p className="text-xs text-on-surface-variant">Allow your profile to be discoverable by other team members.</p>
                </div>
                <button className="w-12 h-6 bg-primary rounded-full relative transition-colors">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-on-primary-fixed rounded-full" />
                </button>
              </div>

              <div className="pt-8 border-t border-outline-variant/10 flex justify-end gap-3">
                <button className="px-6 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:text-white transition-colors">
                  Cancel
                </button>
                <button className="px-8 py-2 primary-gradient text-on-primary-fixed rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-transform">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-error/5 border border-error/10 rounded-2xl p-8 space-y-4">
            <h4 className="text-error font-bold text-lg">Danger Zone</h4>
            <p className="text-on-surface-variant text-sm">
              Actions in this section are permanent and cannot be undone. Please be certain before proceeding.
            </p>
            <button className="px-6 py-2 border border-error/20 text-error hover:bg-error/10 rounded-lg text-sm font-bold transition-all">
              Delete Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
