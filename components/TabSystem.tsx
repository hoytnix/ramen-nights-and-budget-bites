
import React from 'react';
import { MaterialIcon } from './CommonUI';
import { District, RamenRecipe, Item, Classmate, Upgrade, Theme } from '../types';

// Modular Tabs
import { ShopTab } from './ShopTab';
import { DecorTab } from './DecorTab';
import { TasksTab } from './TasksTab';
import { SystemTab } from './SystemTab';

interface TabSystemProps {
  yen: number;
  classmateLevels: Record<string, number>;
  kitchenLevels: Record<string, number>;
  itemCounts: Record<string, number>;
  unlockedRecipes: string[];
  activeRecipeId: string;
  unlockedThemes: string[];
  activeThemeId: string;
  completedQuests: string[];
  completedAchievements: string[];
  trophies: string[];
  
  // SidePanel integration props
  logs: string[];
  academicRep: number;
  shopLevel: number;
  currentDistrict: District;
  yps: number;
  season: string;
  onReset: () => void;
  
  onBuyRecipe: (r: RamenRecipe) => void;
  onEquipRecipe: (id: string) => void;
  onBuyItem: (item: Item) => void;
  onBuyClassmate: (cm: Classmate) => void;
  onBuyKitchen: (ku: Upgrade) => void;
  onBuyTheme: (t: Theme) => void;
  onEquipTheme: (id: string) => void;

  // Cost Functions
  getClassmateCost: (base: number, lvl: number) => number;
  getKitchenCost: (base: number, lvl: number) => number;
  getItemCost: (base: number, count: number) => number;
}

const TabSystem: React.FC<TabSystemProps> = ({
  yen, classmateLevels, kitchenLevels, itemCounts, unlockedRecipes, activeRecipeId, unlockedThemes, activeThemeId,
  completedQuests, completedAchievements, trophies,
  logs, academicRep, shopLevel, currentDistrict, yps, season, onReset,
  onBuyRecipe, onEquipRecipe, onBuyItem, onBuyClassmate, onBuyKitchen, onBuyTheme, onEquipTheme,
  getClassmateCost, getKitchenCost, getItemCost
}) => {
  const [activeTab, setActiveTab] = React.useState('shops');

  const getTabClass = (tab: string) => 
    `flex-1 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-[8px] md:text-[10px] font-pixel-header border-t-2 border-r-2 border-l-2 transition-all ${activeTab === tab ? 'bg-blue-800 border-white text-white z-10 -mb-0.5 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]' : 'bg-black/40 border-slate-700 text-slate-500 hover:bg-slate-800/60 active:bg-slate-800'}`;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Main Tabs Header */}
      <div className="flex border-b-2 border-white bg-slate-950 shrink-0 overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('shops')} className={getTabClass('shops')}>
          <MaterialIcon name="store" size={16}/> <span className="hidden xs:inline">SHOP</span>
        </button>
        <button onClick={() => setActiveTab('themes')} className={getTabClass('themes')}>
          <MaterialIcon name="palette" size={16}/> <span className="hidden xs:inline">DECOR</span>
        </button>
        <button onClick={() => setActiveTab('quests')} className={getTabClass('quests')}>
          <MaterialIcon name="assignment" size={16}/> <span className="hidden xs:inline">TASK</span>
        </button>
        <button onClick={() => setActiveTab('system')} className={getTabClass('system')}>
          <MaterialIcon name="settings" size={16}/> <span className="hidden xs:inline">SYS</span>
        </button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 min-h-0 relative bg-black/60">
        {activeTab === 'shops' && (
          <ShopTab 
            yen={yen}
            classmateLevels={classmateLevels}
            kitchenLevels={kitchenLevels}
            itemCounts={itemCounts}
            unlockedRecipes={unlockedRecipes}
            activeRecipeId={activeRecipeId}
            onBuyRecipe={onBuyRecipe}
            onEquipRecipe={onEquipRecipe}
            onBuyItem={onBuyItem}
            onBuyClassmate={onBuyClassmate}
            onBuyKitchen={onBuyKitchen}
            getClassmateCost={getClassmateCost}
            getKitchenCost={getKitchenCost}
            getItemCost={getItemCost}
          />
        )}

        {activeTab === 'themes' && (
          <DecorTab 
            yen={yen}
            unlockedThemes={unlockedThemes}
            activeThemeId={activeThemeId}
            onBuyTheme={onBuyTheme}
            onEquipTheme={onEquipTheme}
          />
        )}

        {activeTab === 'quests' && (
          <TasksTab 
            completedQuests={completedQuests}
            completedAchievements={completedAchievements}
          />
        )}

        {activeTab === 'system' && (
          <SystemTab 
            academicRep={academicRep}
            shopLevel={shopLevel}
            currentDistrict={currentDistrict}
            yps={yps}
            season={season}
            logs={logs}
            trophies={trophies}
            onReset={onReset}
          />
        )}
      </div>
    </div>
  );
};

export default TabSystem;
