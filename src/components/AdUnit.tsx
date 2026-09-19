import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { AdSlot, getAdSettings, AdSetting } from '../lib/store';

interface AdUnitProps {
  slot: AdSlot;
  className?: string;
  height?: string;
}

export function AdUnit({ slot, className, height = 'h-24' }: AdUnitProps) {
  const [adConfig, setAdConfig] = useState<AdSetting | null>(null);

  useEffect(() => {
    const settings = getAdSettings();
    const config = settings.find(s => s.id === slot);
    if (config) {
      setAdConfig(config);
    }
  }, [slot]);

  // Handle window resize for responsive device checking if needed
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!adConfig || !adConfig.enabled) {
    return null;
  }

  if (adConfig.device === 'mobile' && !isMobile) return null;
  if (adConfig.device === 'pc' && isMobile) return null;

  // If there's an actual code, we render it (dangerouslySetInnerHTML or a script injection strategy)
  // For safety in this preview, we'll just show the placeholder if code is empty.
  if (adConfig.code) {
    return (
      <div 
        className={cn("w-full overflow-hidden flex justify-center", className)}
        dangerouslySetInnerHTML={{ __html: adConfig.code }}
      />
    );
  }

  // Fallback visual placeholder when no code is provided but ad is enabled
  return (
    <div className={cn(
      "w-full bg-slate-50/60 border border-dashed border-slate-200/90 flex flex-col items-center justify-center text-slate-400 font-medium overflow-hidden relative rounded-2xl transition-all select-none my-2",
      height,
      className
    )}>
      <span className="bg-slate-200/80 text-slate-500 text-[9px] px-2 py-0.5 rounded-full absolute top-2 right-2 tracking-wider font-semibold">
        ADVERTISEMENT
      </span>
      <div className="flex items-center gap-2 text-slate-400">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
        <p className="text-xs font-medium text-slate-400">{adConfig.name} 스폰서 영역</p>
      </div>
    </div>
  );

}
