
import React, { useState } from 'react';
import { ShopRow } from './CommonUI';
import RamenBowl from './RamenBowl';
import { StaffIcon, KitchenIcon, ItemIcon } from './PixelIcons';
import { RAMEN_RECIPES, ITEMS, CLASSMATES, KITCHEN_UPGRADES } from '../constants';
import { RamenRecipe, Item, Classmate, Upgrade } from '../types';

interface ShopTabProps {
  yen: number;
  classmateLevels: Record<string, number>;
  kitchenLevels: Record<string, number>;
  itemCounts: Record<string, number>;
  unlockedRecipes: string[];
  activeRecipeId: string;
  onBuyRecipe: (r: RamenRecipe) => void;
  onEquipRecipe: (id: string) => void;
  onBuyItem: (item: Item) => void;
  onBuyClassmate: (cm: Classmate) => void;
  onBuyKitchen: (ku: Upgrade) => void;
  
  getClassmateCost: (base: number, lvl: number) => number;
  getKitchenCost: (base: number, lvl: number) => number;
  getItemCost: (base: number, count: number) => number;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  yen, classmateLevels, kitchenLevels, itemCounts, unlockedRecipes, activeRecipeId,
  onBuyRecipe, onEquipRecipe, onBuyItem, onBuyClassmate, onBuyKitchen,
  getClassmateCost, getKitchenCost, getItemCost
}) => {
  const [subTab, setSubTab] = useState<'recipes' | 'items' | 'staff' | 'kitchen'>('staff');

  const getSubTabClass = (tab: string) => 
    `flex-1 py-2 text-[8px] md:text-[9px] font-pixel-header text-center border-b-2 transition-colors ${subTab === tab ? 'border-yellow-400 text-yellow-400 bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`;

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-900/80 shrink-0">
        <button onClick={() => setSubTab('staff')} className={getSubTabClass('staff')}>STAFF</button>
        <button onClick={() => setSubTab('recipes')} className={getSubTabClass('recipes')}>RECIPES</button>
        <button onClick={() => setSubTab('kitchen')} className={getSubTabClass('kitchen')}>KITCHEN</button>
        <button onClick={() => setSubTab('items')} className={getSubTabClass('items')}>ITEMS</button>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-2 pb-20 custom-scrollbar">
        {subTab === 'staff' && (
          <div className="space-y-2">
            <div className="text-[8px] font-pixel-header text-slate-500 mb-2 uppercase tracking-widest text-center">- Recruitment & Payroll -</div>
            {CLASSMATES.map(cm => {
              const level = classmateLevels[cm.id] || 0;
              const cost = getClassmateCost(cm.baseCost, level);
              const salary = (level + 1) * cm.baseSalary;
              return (
                <ShopRow
                  key={cm.id}
                  title={cm.name}
                  description={`${cm.description} Salary: ¥${salary.toLocaleString()}/day`}
                  level={level}
                  cost={cost}
                  canAfford={yen >= cost}
                  onBuy={() => onBuyClassmate(cm)}
                  borderColor="border-blue-400"
                  bgColor="bg-blue-950/40"
                  iconNode={<StaffIcon id={cm.id} size={24} />}
                />
              );
            })}
          </div>
        )}

        {subTab === 'recipes' && (
          <div className="space-y-2">
             <div className="text-[8px] font-pixel-header text-slate-500 mb-2 uppercase tracking-widest text-center">- Broth Research -</div>
            {RAMEN_RECIPES.map(r => (
              <ShopRow
                key={r.id}
                title={r.name}
                description={r.description}
                cost={r.cost}
                canAfford={yen >= r.cost}
                isPurchased={unlockedRecipes.includes(r.id)}
                isEquipped={activeRecipeId === r.id}
                onBuy={() => unlockedRecipes.includes(r.id) ? onEquipRecipe(r.id) : onBuyRecipe(r)}
                borderColor={activeRecipeId === r.id ? "border-green-400" : "border-slate-700"}
                bgColor={activeRecipeId === r.id ? "bg-green-900/10" : "bg-black/20"}
                iconNode={<RamenBowl recipeId={r.id} size={24} />}
              />
            ))}
          </div>
        )}

        {subTab === 'kitchen' && (
          <div className="space-y-2">
            <div className="text-[8px] font-pixel-header text-slate-500 mb-2 uppercase tracking-widest text-center">- Equipment -</div>
            {KITCHEN_UPGRADES.map(ku => {
              const level = kitchenLevels[ku.id] || 0;
              const cost = getKitchenCost(ku.baseCost, level);
              return (
                <ShopRow
                  key={ku.id}
                  title={ku.name}
                  description={`POWER: ${ku.multiplier}x`}
                  subtitle={<span className="text-slate-500">+{level}</span>}
                  cost={cost}
                  canAfford={yen >= cost}
                  onBuy={() => onBuyKitchen(ku)}
                  borderColor="border-slate-400"
                  bgColor="bg-slate-900"
                  iconNode={<KitchenIcon id={ku.id} size={24} />}
                />
              );
            })}
          </div>
        )}

        {subTab === 'items' && (
          <div className="space-y-2">
            <div className="text-[8px] font-pixel-header text-slate-500 mb-2 uppercase tracking-widest text-center">- Consumables -</div>
            {ITEMS.map(item => {
              const count = itemCounts[item.id] || 0;
              const cost = getItemCost(item.cost, count);
              return (
                <ShopRow
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  cost={cost}
                  canAfford={yen >= cost}
                  onBuy={() => onBuyItem(item)}
                  borderColor="border-purple-500"
                  bgColor="bg-purple-950/20"
                  iconNode={<ItemIcon id={item.id} size={24} />}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
