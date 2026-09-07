
import React from 'react';
import { MaterialIcon } from './CommonUI';
import { THEMES } from '../constants';
import { Theme } from '../types';

interface DecorTabProps {
  yen: number;
  unlockedThemes: string[];
  activeThemeId: string;
  onBuyTheme: (t: Theme) => void;
  onEquipTheme: (id: string) => void;
}

export const DecorTab: React.FC<DecorTabProps> = ({
  yen, unlockedThemes, activeThemeId, onBuyTheme, onEquipTheme
}) => {
  return (
    <div className="flex flex-col h-full p-2 overflow-y-auto custom-scrollbar pb-20">
      <div className="text-[8px] font-pixel-header text-cyan-400 mb-4 flex items-center gap-2 justify-center border-b border-cyan-900 pb-2">
        <MaterialIcon name="palette" size={12}/> AMBIANCE SETTINGS
      </div>
      <div className="grid grid-cols-1 gap-3">
        {THEMES.map(t => {
          const isUnlocked = unlockedThemes.includes(t.id);
          const isActive = activeThemeId === t.id;
          return (
            <div key={t.id} className={`p-4 border-2 transition-all ${isActive?'border-white bg-white/10':'border-slate-800 bg-black/20'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-pixel-header uppercase" style={{ color: t.accent.replace('text-', '') }}>{t.name}</p>
                  {t.season && <p className="text-[8px] text-yellow-500 mt-1 flex items-center gap-1 uppercase tracking-tighter"><MaterialIcon name="card_giftcard" size={8}/> Auto-Unlock: {t.season}</p>}
                </div>
                {isUnlocked ? (
                  <button onClick={() => onEquipTheme(t.id)} className={`px-4 py-1 text-[8px] font-pixel-header border ${isActive?'bg-slate-700':'bg-cyan-600'}`}>EQUIP</button>
                ) : (
                  <button onClick={() => onBuyTheme(t)} disabled={yen < t.cost} className={`px-4 py-1 text-[8px] font-pixel-header border ${yen>=t.cost?'bg-yellow-600':'bg-slate-800 text-slate-500'}`}>{t.cost === 0 ? 'LOCKED' : `¥${t.cost.toLocaleString()}`}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
