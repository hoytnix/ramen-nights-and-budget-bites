
import React from 'react';
import PixelBox from './PixelBox';
import { MaterialIcon } from './CommonUI';
import { District } from '../types';
import { getLevelThreshold } from '../constants';

interface SidePanelProps {
  logs: string[];
  academicRep: number;
  shopLevel: number;
  currentDistrict: District;
  yps: number;
  expenses: { salaries: number; rent: number; total: number };
  season: string;
  onReset: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ logs, academicRep, shopLevel, currentDistrict, yps, expenses, season, onReset }) => {
  const formatCurrency = (amount: number) => `¥${Math.floor(amount).toLocaleString()}`;
  
  // Progress towards next level
  const nextLevelRep = getLevelThreshold(shopLevel);
  const prevLevelRep = shopLevel === 1 ? 0 : getLevelThreshold(shopLevel - 1);
  const currentLevelProgress = academicRep - prevLevelRep;
  const progressPercent = Math.min(100, (currentLevelProgress / (nextLevelRep - prevLevelRep)) * 100);

  return (
    <div className="space-y-6">
      <PixelBox variant="blue" className="h-[300px] flex flex-col">
        <h3 className="text-[8px] font-pixel-header mb-4 text-cyan-300 uppercase tracking-widest underline">Journal</h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar text-[10px] font-pixel-body">
          {logs.map((log, i) => (
            <div key={i} className={i === 0 ? 'text-white' : 'text-slate-500'}>
              {log}{i === 0 && <span className="inline-block w-1 h-1 bg-white ml-2 animate-pulse" />}
            </div>
          ))}
        </div>
      </PixelBox>

      <PixelBox variant="black" className="bg-slate-900">
         <h3 className="text-[8px] font-pixel-header mb-4 text-green-400 uppercase tracking-tighter flex justify-between">
           <span>Shop Status</span>
           <span className="text-yellow-400">LV.{shopLevel}</span>
         </h3>
         <div className="space-y-4">
           <div>
             <div className="flex justify-between items-center text-[10px] font-pixel-body mb-2">
               <span className="text-slate-400 uppercase tracking-tighter">Academic Reputation</span>
               <span className="text-yellow-400">{academicRep.toFixed(0)} / {nextLevelRep}</span>
             </div>
             <div className="h-2 bg-slate-800 border border-slate-700 p-0.5">
               <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
             </div>
           </div>
           
           <div className="grid grid-cols-1 gap-1 text-[10px] font-pixel-body">
             <div className="flex justify-between border-b border-slate-800 pb-1">
               <span className="text-slate-400 uppercase">Gross YPS</span>
               <span className="text-green-400">{formatCurrency(yps)}</span>
             </div>
             <div className="flex justify-between border-b border-slate-800 pb-1">
               <span className="text-slate-400 uppercase">Staff Salary</span>
               <span className="text-red-400">-{formatCurrency(expenses.salaries)}</span>
             </div>
             <div className="flex justify-between border-b border-slate-800 pb-1">
               <span className="text-slate-400 uppercase">District Rent</span>
               <span className="text-red-400">-{formatCurrency(expenses.rent)}</span>
             </div>
             <div className="flex justify-between border-b border-slate-800 pt-1 font-bold">
               <span className="text-white uppercase">Net Profit/Day</span>
               <span className={yps * 144 - expenses.total >= 0 ? "text-green-400" : "text-red-400"}>
                 {formatCurrency(yps * 144 - expenses.total)}
               </span>
             </div>
           </div>

           <button onClick={onReset} className="w-full mt-2 flex items-center justify-center gap-2 p-2 border border-red-900 bg-red-950/20 text-[8px] font-pixel-header text-red-500 hover:bg-red-900 hover:text-white transition-all">
             <MaterialIcon name="restart_alt" size={12}/> DELETE SAVE
           </button>
         </div>
      </PixelBox>
    </div>
  );
};

export default SidePanel;
