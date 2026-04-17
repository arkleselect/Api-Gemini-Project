import React from 'react';
import { LayoutDashboard, Key, BarChart3, Receipt, Settings, HelpCircle, LogOut, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'apikeys', label: 'API Keys', icon: Key },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'billing', label: 'Billing', icon: Receipt },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant/10 fixed left-0 top-0 z-50 py-6 px-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center">
          <Cpu className="text-on-primary-fixed w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Obsidian Flux</h1>
          <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-widest font-bold">Enterprise Console</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-300 group font-medium text-[0.875rem] leading-6",
                isActive 
                  ? "text-white bg-surface-container border-r-2 border-primary-dim" 
                  : "text-on-surface-variant hover:bg-surface-container hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1">
        <button className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-white transition-all duration-300 group font-medium text-[0.875rem]">
          <HelpCircle className="w-5 h-5" />
          <span>Support</span>
        </button>
        <button className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-white transition-all duration-300 group font-medium text-[0.875rem]">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
