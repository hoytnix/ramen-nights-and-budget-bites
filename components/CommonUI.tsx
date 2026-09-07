
import React from 'react';
import PixelBox from './PixelBox';
import { Theme, Toast } from '../types';

export const MaterialIcon: React.FC<{ name: string; className?: string; size?: number }> = ({ name, className = "", size }) => (
  <span 
    className={`material-icons ${className}`} 
    style={size ? { fontSize: `${size}px` } : {}}
  >
    {name}
  </span>
);

export const GameHeader: React.FC<{
  activeTheme: Theme;
  dateDisplay: string;
  hoursDisplay: string;
  minsDisplay: string;
  districtName: string;
  weather: string;
}> = ({ activeTheme, dateDisplay, hoursDisplay, minsDisplay, districtName, weather }) => (
  <PixelBox className="mb-2 flex flex-row justify-between items-center gap-2 p-2 bg-slate-900/90 z-50">
    <div className="flex items-center gap-2 overflow-hidden flex-1">
      <div className="p-1 border border-white bg-red-900 shrink-0 hidden md:block">
        <MaterialIcon name="ramen_dining" size={24} className="text-yellow-400" />
      </div>
      <div className="min-w-0">
        <h1 className={`text-[10px] md:text-sm font-pixel-header whitespace-nowrap overflow-hidden text-ellipsis ${activeTheme.accent}`}>RAMEN NIGHTS</h1>
        {/* Removed date from under title */}
      </div>
    </div>
    
    <div className="flex flex-col items-end gap-1 shrink-0">
      <div className="flex gap-1">
         <div className="bg-black/40 px-2 py-0.5 border border-slate-600 flex items-center gap-2">
           <MaterialIcon name="calendar_today" size={10} className="text-slate-400"/>
           <span className="text-[8px] font-pixel-header text-slate-300">{dateDisplay}</span>
         </div>
         <div className="bg-black/40 px-2 py-0.5 border border-slate-600 flex items-center gap-2">
           <MaterialIcon name="schedule" size={10} className="text-yellow-400"/>
           <span className="text-[8px] font-pixel-header text-yellow-200">{hoursDisplay}:{minsDisplay}</span>
         </div>
      </div>
      <div className="flex gap-1">
         <div className="bg-black/40 px-2 py-0.5 border border-slate-600 flex items-center gap-2">
            <MaterialIcon name="thermostat" size={10} className="text-blue-300"/>
            <span className="text-[8px] font-pixel-header text-blue-200">{weather}</span>
         </div>
         <div className="bg-black/40 px-2 py-0.5 border border-slate-600 flex items-center gap-2">
            <MaterialIcon name="place" size={10} className="text-cyan-400"/>
            <span className="text-[8px] font-pixel-header text-cyan-200">{districtName.split(' ')[0]}</span>
         </div>
      </div>
    </div>
  </PixelBox>
);

export const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => (
  <div className="absolute top-14 left-0 w-full flex flex-col items-center gap-2 pointer-events-none z-[100] px-4">
    {toasts.map((t) => (
      <div 
        key={t.id} 
        className="bg-slate-900/95 border-2 border-yellow-400 px-4 py-3 text-[10px] font-pixel-header text-yellow-100 shadow-[4px_4px_0px_rgba(0,0,0,0.5)] animate-bounce"
        style={{ animationDuration: '0.5s', animationIterationCount: 1 }}
      >
        <div className="flex items-center gap-2">
          <MaterialIcon name="notifications_active" size={12} className="text-yellow-400" />
          <span>{t.message} {t.count && t.count > 1 ? `x${t.count}` : ''}</span>
        </div>
      </div>
    ))}
  </div>
);

export interface ShopRowProps {
  title: string;
  subtitle?: string | React.ReactNode;
  description: string;
  cost: number;
  canAfford: boolean;
  onBuy: () => void;
  isPurchased?: boolean;
  isEquipped?: boolean;
  level?: number;
  actionLabel?: string;
  iconName?: string;
  iconNode?: React.ReactNode;
  borderColor?: string;
  bgColor?: string;
}

export const ShopRow: React.FC<ShopRowProps> = ({
  title, subtitle, description, cost, canAfford, onBuy, isPurchased, isEquipped, level, actionLabel = "BUY", iconName, iconNode, borderColor = "border-slate-700", bgColor = "bg-black/20"
}) => {
  return (
    <div className={`p-2 md:p-3 border-2 ${borderColor} ${bgColor} mb-2 flex justify-between items-center active:bg-white/5 transition-colors`}>
      <div className="flex-1 mr-2 min-w-0">
        <div className="font-pixel-header text-[9px] md:text-[10px] flex items-center gap-1 md:gap-2 truncate">
          {iconNode && <span className="shrink-0">{iconNode}</span>}
          {!iconNode && iconName && <MaterialIcon name={iconName} size={14} />}
          <span className="truncate">{title}</span>
          {level !== undefined && <span className="text-[8px] text-slate-400 shrink-0">LV.{level}</span>}
          {subtitle && <span className="text-[8px] text-yellow-400 ml-1 shrink-0">{subtitle}</span>}
        </div>
        <p className="text-[8px] text-slate-400 mt-0.5 truncate">{description}</p>
      </div>
      
      {isPurchased ? (
        isEquipped ? (
          <button className="px-2 py-1 text-[8px] font-pixel-header border bg-slate-700 text-white cursor-default shrink-0">ACTIVE</button>
        ) : (
          <button onClick={onBuy} className="px-2 py-1 text-[8px] font-pixel-header border bg-blue-600 text-white hover:bg-blue-500 shrink-0">EQUIP</button>
        )
      ) : (
        <button 
          onClick={onBuy} 
          disabled={!canAfford} 
          className={`px-2 py-1 md:px-3 font-pixel-header text-[8px] border-2 shadow-[2px_2px_0_#000] active:shadow-none active:translate-y-0.5 shrink-0 ${canAfford ? 'bg-yellow-600 text-white border-white' : 'bg-slate-800 text-slate-500 border-slate-600'}`}
        >
          ¥{cost.toLocaleString()}
        </button>
      )}
    </div>
  );
};
