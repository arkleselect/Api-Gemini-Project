import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-surface-container-low/70 backdrop-blur-xl flex items-center justify-between px-8 border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        {title ? (
           <h2 className="text-white font-semibold tracking-tight text-sm">
             {title.split('/').map((part, i, arr) => (
               <React.Fragment key={i}>
                 {i > 0 && <span className="mx-2 text-outline-variant">/</span>}
                 <span className={i === arr.length - 1 ? "text-primary/90" : ""}>{part.trim()}</span>
               </React.Fragment>
             ))}
           </h2>
        ) : (
          <div className="relative group">
            <span className="absolute inset-y-0 left-3 flex items-center text-on-surface-variant">
              <Search className="w-4 h-4" />
            </span>
            <input
              className="bg-surface-container-highest/50 border-none ring-1 ring-outline-variant/20 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-primary/40 focus:ring-2 transition-all w-64 text-on-surface placeholder:text-on-surface-variant/50"
              placeholder="Search keys..."
              type="text"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-white transition-colors duration-200 active:scale-95">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-on-surface-variant hover:text-white transition-colors duration-200 active:scale-95">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">Alex Rivera</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Pro Plan</p>
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/20">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://picsum.photos/seed/profile/200/200"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
