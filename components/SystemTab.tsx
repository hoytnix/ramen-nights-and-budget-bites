
import React from 'react';
import PixelBox from './PixelBox';
import { MaterialIcon } from './CommonUI';
import { DISTRICTS, getLevelThreshold } from '../constants';
import { District } from '../types';

interface SystemTabProps {
  academicRep: number;
  shopLevel: number;
  currentDistrict: District;
  yps: number;
  season: string;
  logs: string[];
  trophies: string[];
  onReset: () => void;
}

export const SystemTab: React.FC<SystemTabProps> = ({ 
  academicRep, shopLevel, currentDistrict, yps, season, logs, trophies, onReset 
}) => {
  const formatCurrency = (amount: number) => `¥${Math.floor(amount).toLocaleString()}`;
  
  const nextLevelRep = getLevelThreshold(shopLevel);
  const prevLevelRep = shopLevel === 1 ? 0 : getLevelThreshold(shopLevel - 1);
  const levelProgress = Math.min(100, ((academicRep - prevLevelRep) / (nextLevelRep - prevLevelRep)) * 100);

  const districtProgress = Math.min(100, (academicRep / (currentDistrict.reqRep || 1)) * 100);
  
  return (
    <div className="flex flex-col h-full p-2 overflow-y-auto custom-scrollbar pb-20 space-y-6">
      {/* Status Sheet */}
      <PixelBox variant="black" className="bg-slate-900">
         <h3 className="text-[8px] font-pixel-header mb-4 text-green-400 uppercase tracking-tighter flex items-center justify-between">
           <div className="flex items-center gap-2"><MaterialIcon name="analytics" size={12}/> ACADEMIC STATUS</div>
           <span className="text-yellow-400">RANK {shopLevel}</span>
         </h3>
         <div className="space-y-4">
           
           {/* Level Progress */}
           <div>
             <div className="flex justify-between items-center text-[10px] font-pixel-body mb-2">
               <span className="text-slate-400 uppercase tracking-tighter">Next Level Goal</span>
               <span className="text-yellow-400">{academicRep.toFixed(0)} / {nextLevelRep}</span>
             </div>
             <div className="h-3 bg-slate-800 border border-slate-700 p-0.5 relative">
               <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${levelProgress}%` }} />
             </div>
           </div>

           {/* Current District Goal */}
           <div>
             <div className="flex justify-between items-center text-[10px] font-pixel-body mb-2">
               <span className="text-slate-400 uppercase tracking-tighter">Goal: {currentDistrict.name}</span>
               <span className="text-cyan-400">{academicRep.toFixed(0)} / {currentDistrict.reqRep} REP</span>
             </div>
             <div className="h-3 bg-slate-800 border border-slate-700 p-0.5 relative">
               <div className="h-full bg-cyan-600 transition-all duration-500" style={{ width: `${districtProgress}%` }} />
               <div className="absolute inset-0 flex items-center justify-center text-[7px] font-pixel-header text-white mix-blend-difference">
                  {districtProgress.toFixed(1)}% TO GRADUATION
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-3 text-[10px] font-pixel-body">
             <div className="p-2 border border-slate-800 bg-black/20 text-center">
               <span className="block text-slate-400 text-[8px] uppercase">Season</span>
               <span className="text-cyan-400">{season}</span>
             </div>
             <div className="p-2 border border-slate-800 bg-black/20 text-center">
               <span className="block text-slate-400 text-[8px] uppercase">Income Bonus</span>
               <span className="text-green-400">+{shopLevel * 5}%</span>
             </div>
           </div>
         </div>
      </PixelBox>

      {/* Trophies Section */}
      <div className="p-4 border border-slate-800 bg-black/20">
          <h4 className="text-[8px] font-pixel-header text-yellow-500 uppercase mb-2">District Badges</h4>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {DISTRICTS.map(d => {
              const hasTrophy = trophies.includes(d.id);
              return (
                <div key={d.id} className={`shrink-0 w-16 h-16 border-2 flex items-center justify-center transition-all ${hasTrophy?'bg-yellow-600/20 border-yellow-500 shadow-[0_0_10px_rgba(255,215,0,0.3)]':'bg-slate-900 border-slate-800 opacity-50'}`}>
                  {hasTrophy ? <MaterialIcon name="emoji_events" size={24} className="text-yellow-400"/> : <MaterialIcon name="lock" size={16} className="text-slate-700"/>}
                </div>
              );
            })}
          </div>
      </div>

      <button onClick={onReset} className="w-full mt-4 flex items-center justify-center gap-2 p-3 border border-red-900 bg-red-950/20 text-[10px] font-pixel-header text-red-500 hover:bg-red-900 hover:text-white transition-all">
         <MaterialIcon name="delete_forever" size={14}/> RESET SAVE DATA
      </button>
    </div>
  );
};
