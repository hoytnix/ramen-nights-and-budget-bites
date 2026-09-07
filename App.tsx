
import React, { useState, useEffect, useMemo } from 'react';
import { GameHeader, ToastContainer } from './components/CommonUI';
import MainClicker from './components/MainClicker';
import TabSystem from './components/TabSystem';
import SidePanel from './components/SidePanel';
import CutsceneModal from './components/CutsceneModal';
import DistrictMap from './components/DistrictMap';
import { 
  DISTRICTS, THEMES, getLevelThreshold, getLevelReward
} from './constants';
import { SCENES } from './story';
import { 
  SeasonType, Particle, Item, Classmate, Upgrade, RamenRecipe, Theme, GameActions
} from './types';

// Hooks
import { useGameState } from './hooks/useGameState';
import { useGameSystems } from './hooks/useGameSystems';
import { useStoryManager } from './hooks/useStoryManager';

const getSeasonFromMonth = (month: number): SeasonType => {
  if (month >= 2 && month <= 4) return 'SPRING';
  if (month >= 5 && month <= 7) return 'SUMMER';
  if (month >= 8 && month <= 10) return 'AUTUMN';
  return 'WINTER';
};

const getClassmateCost = (baseCost: number, level: number) => Math.floor(baseCost * Math.pow(1.5, level));
const getKitchenCost = (baseCost: number, level: number) => Math.floor(baseCost * Math.pow(4.0, level));
const getItemCost = (baseCost: number, count: number) => Math.floor(baseCost * Math.pow(1.8, count));

export default function App() {
  const g = useGameState();

  // Shared Constants
  const currentDistrict = DISTRICTS[g.activeDistrictIdx];
  const nextDistrict = g.activeDistrictIdx < DISTRICTS.length - 1 ? DISTRICTS[g.activeDistrictIdx + 1] : undefined;
  const currentInGameDate = useMemo(() => {
    const baseDate = new Date(2025, 8, 1, 0, 0);
    baseDate.setDate(baseDate.getDate() + g.dayCount);
    return baseDate;
  }, [g.dayCount]);
  const currentSeason = useMemo(() => getSeasonFromMonth(currentInGameDate.getMonth()), [currentInGameDate]);
  const activeTheme = useMemo(() => THEMES.find(t => t.id === g.activeThemeId) || THEMES[0], [g.activeThemeId]);

  // Visual state
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Core Systems Hook
  const systems = useGameSystems(
    { ...g, currentSeason },
    g.setYen, g.setAcademicRep, g.setIgt, g.setDayCount, g.setWeather, 
    g.setWeatherTicksRemaining, g.setLogs, g.setToasts, g.activeSceneId
  );

  // Story Manager Hook
  useStoryManager(
    { ...g, season: currentSeason },
    g.isLoaded, g.isSessionStarted, g.completedAchievements, g.completedQuests, g.unlockedThemes, 
    g.seenSceneIds, g.activeSceneId, g.setCompletedAchievements, g.setCompletedQuests, 
    g.setUnlockedThemes, g.setAcademicRep, g.setSeenSceneIds, g.setActiveSceneId, systems.addLog
  );

  // Actions for the Cutscene/Story system
  const gameActions: GameActions = {
    setYen: (fn: (prev: number) => number) => g.setYen(prev => fn(prev)),
    setRep: (fn: (prev: number) => number) => g.setAcademicRep(prev => fn(prev)),
    setStoryFlag: (flag: string, value: boolean) => g.setStoryFlags(prev => ({ ...prev, [flag]: value })),
    addLog: (msg: string) => systems.addLog(msg),
    addBuff: (id: string, duration: number) => g.setActiveBuffs(prev => ({ ...prev, [id]: Date.now() + duration }))
  };

  const activeScene = useMemo(() => SCENES.find(s => s.id === g.activeSceneId), [g.activeSceneId]);

  // Level Up Logic
  useEffect(() => {
    const reqForNextLevel = getLevelThreshold(g.shopLevel);
    if (g.academicRep >= reqForNextLevel) {
      const reward = getLevelReward(g.shopLevel);
      g.setShopLevel(prev => prev + 1);
      g.setYen(prev => prev + reward);
      systems.addLog(`LEVEL UP! Shop reached Rank ${g.shopLevel + 1}. Bonus: ¥${reward.toLocaleString()}!`, !g.isSessionStarted);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
  }, [g.academicRep, g.shopLevel, g.isSessionStarted, systems.addLog]);

  // UI Handlers
  const handleManualClick = (e: React.MouseEvent) => {
    if (g.activeSceneId) return; // Disable clicking during cutscenes
    g.setTotalClicks(c => c + 1);
    let clickVal = (systems.activeRecipe?.baseValue || 100) * (1 + (g.academicRep * 0.0001)); 
    if (systems.isBuffActive('energy_drink')) clickVal *= 2;
    g.setYen(y => y + clickVal);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    g.setParticles(prev => [...prev, { id: Date.now(), x, y, val: `¥${Math.floor(clickVal).toLocaleString()}` }]);
  };

  const handleExpandDistrict = () => {
    if (nextDistrict && g.yen >= nextDistrict.unlockCost && g.academicRep >= nextDistrict.reqRep) {
      const districtId = currentDistrict.id;
      g.setTrophies(prev => prev.includes(districtId) ? prev : [...prev, districtId]);
      g.setActiveDistrictIdx(i => i + 1);
      g.setYen(0); g.setAcademicRep(0); g.setShopLevel(1); g.setKitchenLevels({}); g.setClassmateLevels({ 'haruto': 1 }); 
      systems.addLog(`ASCENSION: ${nextDistrict.name}! Items Reset.`, false);
    } else systems.addLog("Cannot afford expansion yet!", false);
  };

  const resetGame = () => { if (window.confirm("RESET RAMEN SHOP?")) { localStorage.removeItem('ramen_nights_ultimate_save'); window.location.reload(); } };

  const time = {
    hours: Math.floor(g.igt / 60).toString().padStart(2, '0'),
    mins: (g.igt % 60).toString().padStart(2, '0'),
    date: `${currentInGameDate.getFullYear().toString().slice(-2)}-${(currentInGameDate.getMonth() + 1).toString().padStart(2, '0')}-${currentInGameDate.getDate().toString().padStart(2, '0')}`
  };

  return (
    <div 
      className={`h-[100dvh] transition-all duration-[3000ms] text-white selection:bg-yellow-400 selection:text-black font-pixel-body overflow-hidden flex items-center justify-center p-0 md:p-4`}
      style={{ backgroundColor: activeTheme.bg, filter: systems.weatherData?.colorFilter || 'none' } as React.CSSProperties}
    >
      <div className="w-full h-full max-w-md landscape:max-w-6xl md:max-w-6xl flex flex-col landscape:flex-row md:flex-row relative shadow-2xl overflow-hidden bg-black/20 md:border-4 md:border-white/10 rounded-none md:rounded-lg game-container">
        
        {/* CUTSCENE OVERLAY */}
        {activeScene && (
          <CutsceneModal 
            scene={activeScene}
            gameState={{ ...g, season: currentSeason }}
            gameActions={gameActions}
            onClose={() => {
              g.setSeenSceneIds(prev => [...prev, activeScene.id]);
              g.setActiveSceneId(null);
            }}
          />
        )}

        <ToastContainer toasts={g.toasts} />

        {showLevelUp && (
          <div className="absolute inset-0 z-[110] flex flex-col items-center justify-center bg-black/40 pointer-events-none animate-appear">
            <h2 className="text-4xl md:text-6xl font-pixel-header text-yellow-400 drop-shadow-[4px_4px_0_#000] animate-bounce mb-2">LEVEL UP!</h2>
            <p className="font-pixel-header text-white text-lg drop-shadow-[2px_2px_0_#000]">RANK {g.shopLevel}</p>
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0 main-pane">
          <div className="shrink-0 z-50">
            <GameHeader 
              activeTheme={activeTheme}
              dateDisplay={time.date}
              hoursDisplay={time.hours}
              minsDisplay={time.mins}
              districtName={currentDistrict.name}
              weather={systems.weatherData.name}
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="basis-[45%] md:basis-[50%] shrink-0 min-h-0 z-10 p-2 pb-0">
              <MainClicker 
                yen={g.yen}
                activeRecipe={systems.activeRecipe}
                activeTheme={activeTheme}
                currentDistrict={currentDistrict}
                nextDistrict={nextDistrict}
                academicRep={g.academicRep}
                particles={g.particles}
                clickActive={false}
                isBuffActive={systems.isBuffActive('energy_drink')}
                weather={g.weather}
                handleManualClick={handleManualClick}
                onExpandDistrict={handleExpandDistrict}
              />
            </div>

            <div className="basis-[55%] md:basis-[50%] grow min-h-0 z-20 overflow-hidden">
               <TabSystem 
                {...g}
                currentDistrict={currentDistrict}
                yps={systems.getYps()}
                season={currentSeason}
                onReset={resetGame}
                onBuyRecipe={(r: RamenRecipe) => { if (g.yen >= r.cost && !g.unlockedRecipes.includes(r.id)) { g.setYen(y => y - r.cost); g.setUnlockedRecipes(p => [...p, r.id]); systems.addLog(`Learned ${r.name}`); } }}
                onEquipRecipe={g.setActiveRecipeId}
                onBuyItem={(item: Item) => { 
                  const cost = getItemCost(item.cost, g.itemCounts[item.id] || 0);
                  if (g.yen >= cost) {
                    g.setYen(y => y - cost);
                    g.setItemCounts(p => ({ ...p, [item.id]: (p[item.id] || 0) + 1 }));
                    if (item.id === 'energy_drink') { g.setActiveBuffs(p => ({ ...p, energy_drink: Date.now() + 60000 })); systems.addLog(`Energy Drink active!`); }
                    else if (item.id === 'marketing') { g.setAcademicRep(r => r + 50); systems.addLog(`+50 Rep.`); }
                    else if (item.id === 'scallion') { g.setYen(y => y + 30000); systems.addLog(`Sold Golden Scallion!`); }
                    else if (item.id === 'lucky_cat') { g.setActiveBuffs(p => ({ ...p, lucky_cat: Date.now() + 300000 })); systems.addLog('Lucky Cat active!'); }
                    else if (item.id === 'staff_party') { g.setActiveBuffs(p => ({ ...p, staff_party: Date.now() + 300000 })); systems.addLog('Staff Party!'); }
                  }
                }}
                onBuyClassmate={(cm: Classmate) => {
                  const level = g.classmateLevels[cm.id] || 0;
                  const cost = getClassmateCost(cm.baseCost, level);
                  if (g.yen >= cost) {
                    g.setYen(y => y - cost);
                    g.setClassmateLevels(p => ({ ...p, [cm.id]: level + 1 }));
                    systems.addLog(level === 0 ? `Hired ${cm.name}` : `${cm.name} trained (LV up)`);
                  }
                }}
                onBuyKitchen={(ku: Upgrade) => {
                  const level = g.kitchenLevels[ku.id] || 0;
                  const cost = getKitchenCost(ku.baseCost, level);
                  if (g.yen >= cost) {
                    g.setYen(y => y - cost);
                    g.setKitchenLevels(p => ({ ...p, [ku.id]: level + 1 }));
                    systems.addLog(`Kitchen +1`);
                  }
                }}
                onBuyTheme={(t: Theme) => { if (g.yen >= t.cost && !g.unlockedThemes.includes(t.id)) { g.setYen(y => y - t.cost); g.setUnlockedThemes(p => [...p, t.id]); systems.addLog(`Style: ${t.name}`); } }}
                onEquipTheme={g.setActiveThemeId}
                getClassmateCost={getClassmateCost}
                getKitchenCost={getKitchenCost}
                getItemCost={getItemCost}
              />
            </div>
          </div>
        </div>

        <div className="hidden landscape:flex md:flex landscape:w-72 md:w-80 lg:w-96 flex-col shrink-0 min-h-0 border-l-2 border-white/10 bg-black/40 p-4 side-pane custom-scrollbar overflow-y-auto">
          <SidePanel 
             logs={g.logs}
             academicRep={g.academicRep}
             shopLevel={g.shopLevel}
             currentDistrict={currentDistrict}
             yps={systems.getYps()}
             expenses={systems.getExpenses()}
             season={currentSeason}
             onReset={resetGame}
          />
          <div className="mt-6 aspect-square w-full bg-black/30 border-2 border-slate-800 p-2 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse z-10"></div>
              <h4 className="absolute top-2 left-2 font-pixel-header text-[8px] text-cyan-400 uppercase z-10 drop-shadow-md">District Intel: {currentDistrict.name}</h4>
              <DistrictMap districtId={currentDistrict.id} className="w-full h-full opacity-80" />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 p-2 border border-slate-700">
                <p className="font-pixel-body text-[10px] text-slate-300 leading-tight italic">"{currentDistrict.flavor}"</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
