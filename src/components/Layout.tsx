import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import { HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const titles: Record<string, string> = {
    dashboard: 'Dashboard / Overview',
    apikeys: 'API Keys',
    usage: 'Analytics / Usage Overview',
    billing: 'Billing & Subscription',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      
      <main className="md:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <TopBar title={titles[activeTab]} />
        
        <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <MobileNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Floating Action Button */}
      <div className="fixed bottom-20 md:bottom-8 right-8 z-50 group">
        <button className="w-14 h-14 primary-gradient text-on-primary-fixed rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300">
          <HelpCircle className="w-8 h-8" />
        </button>
        <div className="absolute bottom-16 right-0 bg-surface-container-highest p-3 rounded-xl ghost-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none scale-0 group-hover:scale-100 origin-bottom-right transition-transform">
          <p className="text-xs font-semibold">Priority Support</p>
        </div>
      </div>
    </div>
  );
}
