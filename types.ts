
export interface District {
  id: string;
  name: string;
  baseRent: number;
  reqRep: number;
  unlockCost: number;
  flavor: string;
  bossName?: string;
}

export interface Theme {
  id: string;
  name: string;
  cost: number;
  bg: string;
  accent: string;
  season?: string;
}

export interface RamenRecipe {
  id: string;
  name: string;
  baseValue: number;
  cost: number;
  description: string;
  bonus: string;
}

export interface Classmate {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  baseYps: number;
  baseSalary: number; // New property
}

export interface Upgrade {
  id: string;
  name: string;
  multiplier: number;
  baseCost: number;
}

export interface Item {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  req: (state: GameStateCheck) => boolean;
}

export interface Quest {
  id: string;
  name: string;
  desc: string;
  goal: number;
  type: 'clicks' | 'haruto_lv' | 'total_gold' | 'total_staff' | 'total_upgrades' | 'total_rep';
  successMsg: string;
}

export interface GameStateCheck {
  yen: number;
  academicRep: number;
  shopLevel: number;
  classmateLevels: Record<string, number>;
  unlockedRecipes: string[];
  totalClicks: number;
  kitchenLevels: Record<string, number>;
  itemCounts: Record<string, number>;
  // Narrative additions
  dayCount: number;
  igt: number;
  weather: WeatherType;
  season: SeasonType;
  storyFlags: Record<string, boolean>;
  activeDistrictIdx: number;
  activeRecipeId: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  val: string;
}

export interface Toast {
  id: number;
  message: string;
  type?: 'info' | 'success' | 'warning';
  count?: number;
}

// Story / Cutscene Types
export interface GameActions {
  setYen: (fn: (prev: number) => number) => void;
  setRep: (fn: (prev: number) => number) => void;
  setStoryFlag: (flag: string, value: boolean) => void;
  addLog: (msg: string) => void;
  addBuff: (id: string, durationMs: number) => void;
}

export interface DialogChoice {
  text: string;
  nextNodeId: string | null; // null ends the scene
  effect?: (actions: GameActions) => void;
  req?: (state: GameStateCheck) => boolean;
}

export interface DialogNode {
  id: string;
  speaker: string;
  text: string;
  speakerIcon?: string; // Material Icon name
  choices: DialogChoice[];
}

export interface Scene {
  id: string;
  trigger: (state: GameStateCheck) => boolean;
  initialNodeId: string;
  nodes: Record<string, DialogNode>;
}

export type WeatherType = 
  | 'AVERAGE' | 'CLEAR' | 'RAINY' | 'CLOUDY' | 'SNOWY' | 'HEATWAVE' 
  | 'THUNDERSTORM' | 'FOGGY' | 'BLIZZARD' | 'SANDSTORM' 
  | 'ACID_RAIN' | 'CHERRY_BLOSSOMS' | 'AURORA' | 'BLOOD_MOON' 
  | 'METEOR_SHOWER';

export interface WeatherMetadata {
  id: WeatherType;
  name: string;
  weight: number;
  description: string;
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'LEGENDARY';
  colorFilter?: string;
  incomeMult: number;
}

export type SeasonType = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
