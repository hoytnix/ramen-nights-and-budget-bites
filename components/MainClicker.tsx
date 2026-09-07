
import React from 'react';
import PixelBox from './PixelBox';
import RamenBowl from './RamenBowl';
import WeatherWindow from './WeatherWindow';
import { MaterialIcon } from './CommonUI';
import { District, Particle, RamenRecipe, Theme, WeatherType } from '../types';

interface MainClickerProps {
  yen: number;
  activeRecipe: RamenRecipe;
  activeTheme: Theme;
  currentDistrict: District;
  nextDistrict?: District;
  academicRep: number;
  particles: Particle[];
  clickActive: boolean;
  isBuffActive: boolean;
  weather: WeatherType;
  handleManualClick: (e: React.MouseEvent) => void;
  onExpandDistrict: () => void;
}

const MainClicker: React.FC<MainClickerProps> = ({
  yen, activeRecipe, activeTheme, currentDistrict, nextDistrict, academicRep,
  particles, clickActive, isBuffActive, weather, handleManualClick, onExpandDistrict
}) => {
  const formatCurrency = (amount: number) => `¥${Math.floor(amount).toLocaleString()}`;
  
  const canAffordNext = nextDistrict && yen >= nextDistrict.unlockCost;
  const hasRepForNext = nextDistrict && academicRep >= nextDistrict.reqRep;

  return (
    <div className="h-full flex flex-col gap-2 p-1">
      {/* Container Box */}
      <div className="flex-1 relative w-full overflow-hidden border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-slate-900">
        
        {/* BACKGROUND LAYER: Weather Window */}
        <div className="absolute inset-0 z-0">
          <WeatherWindow weather={weather} />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          
          {/* Stats Header Floating */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none">
            <div className="pointer-events-auto bg-black/70 p-2 border border-white/50 backdrop-blur-sm">
              <p className="text-[8px] text-slate-300 font-pixel-header uppercase tracking-widest">FUNDS</p>
              <h2 className={`text-lg md:text-xl font-pixel-header text-yellow-400 drop-shadow-md`}>
                {formatCurrency(yen)}
              </h2>
            </div>
            <div className="text-right bg-black/80 p-2 border border-blue-400 max-w-[60%] pointer-events-auto shadow-sm backdrop-blur-sm">
               <div className="flex items-center justify-end gap-1 mb-1">
                 <MaterialIcon name="restaurant_menu" size={10} className="text-blue-300"/>
                 <p className="text-[8px] font-pixel-header text-blue-300 tracking-tighter uppercase truncate">{activeRecipe.name}</p>
               </div>
               <div className="flex items-start justify-end gap-1">
                 <MaterialIcon name="trending_up" size={10} className="text-green-400 shrink-0 mt-0.5"/>
                 <p className="text-[8px] text-green-200 leading-tight">{activeRecipe.bonus}</p>
               </div>
               {isBuffActive && (
                 <div className="mt-1 pt-1 border-t border-slate-700 flex items-center justify-end gap-1">
                   <MaterialIcon name="bolt" size={10} className="text-yellow-400 animate-pulse"/>
                   <p className="text-[7px] font-pixel-header text-yellow-400 animate-pulse">BOOST ACTIVE</p>
                 </div>
               )}
            </div>
          </div>

          {/* Clicker Button (The Bowl) */}
          <div className="relative mt-8">
            <button 
              onClick={handleManualClick} 
              className={`relative transform transition-all active:scale-95 touch-manipulation group`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Wooden Counter Surface under the bowl */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#5D4037] border-t-4 border-[#3E2723] rounded-t-lg shadow-lg"></div>

              {/* The Bowl */}
              <div className={`relative z-10 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transition-transform duration-100 ${clickActive ? 'translate-y-1' : 'group-hover:-translate-y-1'}`}>
                <RamenBowl recipeId={activeRecipe.id} size={128} className="relative z-10" />
              </div>

              {/* Particles */}
              <div className="absolute inset-0 pointer-events-none z-50">
                {particles.map(p => (
                  <div key={p.id} className="absolute text-[12px] font-pixel-header text-yellow-400 animate-float-up whitespace-nowrap drop-shadow-[2px_2px_0_#000]" style={{ left: p.x, top: p.y }}>
                    {p.val}
                  </div>
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* District / Expansion Bar */}
      {nextDistrict ? (
        <div 
          onClick={canAffordNext && hasRepForNext ? onExpandDistrict : undefined}
          className={`shrink-0 border-2 border-white p-2 flex justify-between items-center transition-all ${
            canAffordNext && hasRepForNext 
              ? "bg-gradient-to-r from-red-800 to-red-600 cursor-pointer animate-pulse shadow-[0_4px_0_#000] active:translate-y-1 active:shadow-none" 
              : "bg-slate-900 opacity-90"
          }`}
        >
          <div>
            <h3 className="font-pixel-header text-[8px] uppercase tracking-tighter text-white">
              NEXT: {nextDistrict.name}
            </h3>
            <div className="flex gap-2">
              <span className={`text-[8px] font-pixel-header ${canAffordNext ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(nextDistrict.unlockCost)}
              </span>
              <span className={`text-[8px] font-pixel-header ${hasRepForNext ? 'text-green-400' : 'text-red-400'}`}>
                REP: {academicRep.toFixed(0)}/{nextDistrict.reqRep}
              </span>
            </div>
          </div>
          <MaterialIcon name="arrow_forward" className={canAffordNext && hasRepForNext ? "text-white" : "text-slate-600"} />
        </div>
      ) : (
        <div className="shrink-0 bg-slate-900 border-2 border-slate-600 p-2 text-center">
          <h3 className="font-pixel-header text-[8px] uppercase tracking-tighter text-yellow-400">
            Max Expansion Reached
          </h3>
        </div>
      )}
    </div>
  );
};

export default MainClicker;
