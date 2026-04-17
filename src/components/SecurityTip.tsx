import React, { useState } from 'react';
import { Shield, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SecurityTip() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          className="fixed bottom-20 md:bottom-8 right-8 w-72 p-5 rounded-2xl glass-panel border border-primary/10 shadow-2xl hidden lg:block z-40"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Security Tip</span>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-on-surface leading-snug mb-4 font-medium">
            Never share your secret keys in public code repositories or client-side code.
          </p>
          <a className="text-xs font-bold text-white flex items-center gap-1 hover:gap-2 transition-all cursor-pointer" href="#">
            Learn about key rotation
            <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
