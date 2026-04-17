import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: number;
  trendLabel?: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'default';
  progress?: number;
  footer?: string;
}

export default function MetricCard({
  label,
  value,
  subValue,
  trend,
  trendLabel,
  icon: Icon,
  variant = 'default',
  progress,
  footer
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary': return 'bg-primary/10 text-primary';
      case 'secondary': return 'bg-secondary/10 text-secondary';
      case 'tertiary': return 'bg-tertiary/10 text-tertiary';
      case 'error': return 'bg-error/10 text-error';
      default: return 'bg-surface-container-highest/20 text-on-surface-variant';
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    return trend > 0 ? 'text-primary' : 'text-error';
  };

  return (
    <div className="bg-surface-container-low p-6 rounded-xl ghost-border flex flex-col justify-between hover:bg-surface-container transition-all duration-300 group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", getVariantStyles())}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          {trend !== undefined && (
            <div className={cn("text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1", trend > 0 ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error')}>
              {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(trend)}%
            </div>
          )}
          {trendLabel && (
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-highest/50 px-2 py-1 rounded-full">{trendLabel}</span>
          )}
        </div>
        <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {value}
          {subValue && <span className="text-on-surface-variant text-sm font-medium ml-2">{subValue}</span>}
        </h3>
      </div>
      
      {(progress !== undefined || footer) && (
        <div className="mt-4 space-y-3">
          {progress !== undefined && (
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-500", variant === 'secondary' ? 'bg-secondary' : 'bg-primary')} 
                style={{ width: `${progress}%` }} 
              />
            </div>
          )}
          {footer && (
            <p className="text-xs text-on-surface-variant/70 italic leading-relaxed">{footer}</p>
          )}
        </div>
      )}
    </div>
  );
}
