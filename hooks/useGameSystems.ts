
import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  CLASSMATES, RAMEN_RECIPES, KITCHEN_UPGRADES, WEATHER_METADATA, DISTRICTS
} from '../constants';
import { SeasonType, Toast, WeatherType } from '../types';

interface SystemState {
  classmateLevels: Record<string, number>;
  kitchenLevels: Record<string, number>;
  activeRecipeId: string;
  weather: WeatherType;
  currentSeason: SeasonType;
  igt: number;
  activeBuffs: Record<string, number>;
  trophies: string[];
  shopLevel: number;
  activeDistrictIdx: number;
  isSessionStarted: boolean;
}

export const useGameSystems = (
  state: SystemState,
  setYen: React.Dispatch<React.SetStateAction<number>>,
  setAcademicRep: React.Dispatch<React.SetStateAction<number>>,
  setIgt: React.Dispatch<React.SetStateAction<number>>,
  setDayCount: React.Dispatch<React.SetStateAction<number>>,
  setWeather: React.Dispatch<React.SetStateAction<WeatherType>>,
  setWeatherTicksRemaining: React.Dispatch<React.SetStateAction<number>>,
  setLogs: React.Dispatch<React.SetStateAction<string[]>>,
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>,
  activeSceneId: string | null
) => {
  
  const weatherData = useMemo(() => 
    WEATHER_METADATA.find(w => w.id === state.weather) || WEATHER_METADATA[0], 
  [state.weather]);

  const activeRecipe = useMemo(() => 
    RAMEN_RECIPES.find(r => r.id === state.activeRecipeId) || RAMEN_RECIPES[0], 
  [state.activeRecipeId]);

  const isBuffActive = useCallback((id: string) => 
    (state.activeBuffs[id] || 0) > Date.now(), 
  [state.activeBuffs]);

  // Expenses: Rent + Salaries
  const getExpenses = useCallback(() => {
    let salaryTotal = 0;
    CLASSMATES.forEach(cm => {
      const level = state.classmateLevels[cm.id] || 0;
      salaryTotal += level * cm.baseSalary;
    });
    
    const currentDistrict = DISTRICTS[state.activeDistrictIdx];
    const rentTotal = currentDistrict.baseRent;
    
    return { salaries: salaryTotal, rent: rentTotal, total: salaryTotal + rentTotal };
  }, [state.classmateLevels, state.activeDistrictIdx]);

  const getYps = useCallback(() => {
    let base = 0;
    CLASSMATES.forEach(cm => {
      const level = state.classmateLevels[cm.id] || 0;
      base += level * cm.baseYps;
    });
    base += (activeRecipe?.baseValue || 100) * 2; 
    let multiplier = 1;
    KITCHEN_UPGRADES.forEach(ku => {
      const level = state.kitchenLevels[ku.id] || 0;
      multiplier *= Math.pow(ku.multiplier, level);
    });
    if (state.trophies.length > 0) multiplier *= (1 + (state.trophies.length * 0.5));
    multiplier *= (1 + (state.shopLevel * 0.05));

    const passiveMults: Record<string, number> = {
      shio: 1.1, tantan: 1.2, paitan: 1.25, ebi: 1.3, wagyu: 1.5, 
      gold: 2.0, galaxy: 2.0, chrono: 4.0, omni: 10.0
    };
    if (passiveMults[state.activeRecipeId]) multiplier *= passiveMults[state.activeRecipeId];
    multiplier *= (weatherData?.incomeMult || 1.0);

    if (state.weather === 'RAINY' || state.weather === 'THUNDERSTORM') {
        if (state.activeRecipeId === 'curry') multiplier *= 1.5;
        if (state.weather === 'THUNDERSTORM' && state.activeRecipeId === 'volcano') multiplier *= 2.0;
    }
    if ((state.weather === 'SNOWY' || state.weather === 'BLIZZARD') && state.activeRecipeId === 'miso') multiplier *= 2.0;
    if (state.weather === 'HEATWAVE') {
        if (state.activeRecipeId === 'tsukemen') multiplier *= 2.0;
        if (state.activeRecipeId === 'volcano') multiplier *= 6.0;
    }
    if (state.weather === 'ACID_RAIN' && state.activeRecipeId === 'void') multiplier *= 3.0;
    if (state.weather === 'CHERRY_BLOSSOMS' && state.activeRecipeId === 'yuzu') multiplier *= 2.0;
    if (state.weather === 'BLOOD_MOON' && state.activeRecipeId === 'void') multiplier *= 4.0;
    if (state.weather === 'METEOR_SHOWER' && state.activeRecipeId === 'galaxy') multiplier *= 3.0;

    if (state.currentSeason === 'WINTER' && state.activeRecipeId === 'miso') multiplier *= 1.5;
    if (state.currentSeason === 'SUMMER' && state.activeRecipeId === 'tsukemen') multiplier *= 1.5;
    if (state.currentSeason === 'AUTUMN' && state.activeRecipeId === 'veggie') multiplier *= 1.5;
    if (state.currentSeason === 'SPRING' && state.activeRecipeId === 'yuzu') multiplier *= 1.5;
    
    if (isBuffActive('lucky_cat')) multiplier *= 1.1;
    if (isBuffActive('staff_party')) multiplier *= 2.0;
    
    const hours = Math.floor(state.igt / 60);
    const isNight = hours >= 22 || hours <= 4;
    if (isNight) {
        multiplier *= 1.3;
        if (state.activeRecipeId === 'tonkotsu') multiplier *= 2.5;
        if (state.activeRecipeId === 'void') multiplier *= 6.0;
    }
    
    const currentDistrict = DISTRICTS[state.activeDistrictIdx];
    if (currentDistrict.id === 'ginza' && state.activeRecipeId === 'truffle') multiplier *= 3.0;
    if (currentDistrict.id === 'shibuya' && state.activeRecipeId === 'neon') multiplier *= 2.0;
    
    return base * multiplier;
  }, [state, activeRecipe, weatherData, isBuffActive]);

  const addLog = useCallback((msg: string, silent: boolean = false) => {
    const hours = Math.floor(state.igt / 60).toString().padStart(2, '0');
    const mins = (state.igt % 60).toString().padStart(2, '0');
    setLogs(prev => [`[${hours}:${mins}] ${msg}`, ...prev].slice(0, 8));
    
    if (silent || !state.isSessionStarted) return;

    setToasts(prev => {
      const now = Date.now() + Math.random();
      const lastToast = prev[prev.length - 1];
      let newToast: Toast;
      let newPrev = prev;
      if (lastToast && lastToast.message === msg) {
        newToast = { ...lastToast, id: now, count: (lastToast.count || 1) + 1 };
        newPrev = prev.slice(0, -1);
      } else {
        newToast = { id: now, message: msg, count: 1 };
      }
      setTimeout(() => {
        setToasts(curr => curr.filter(t => t.id !== now));
      }, 2500);
      return [...newPrev, newToast];
    });
  }, [state.igt, state.isSessionStarted, setLogs, setToasts]);

  // REFS to prevent interval recreation
  const getYpsRef = useRef(getYps);
  const getExpensesRef = useRef(getExpenses);
  const addLogRef = useRef(addLog);
  const activeSceneIdRef = useRef(activeSceneId);
  const stateRef = useRef(state);

  useEffect(() => {
    getYpsRef.current = getYps;
    getExpensesRef.current = getExpenses;
    addLogRef.current = addLog;
    activeSceneIdRef.current = activeSceneId;
    stateRef.current = state;
  }, [getYps, getExpenses, addLog, activeSceneId, state]);

  // Main Loop
  useEffect(() => {
    const timer = setInterval(() => {
      // Time stops during cutscenes
      if (activeSceneIdRef.current) return;

      // Update Time
      setIgt(prev => {
        const next = prev + 10;
        if (next >= 1440) {
          setDayCount(d => d + 1);
          return 0;
        }
        return next;
      });

      // Update Weather Logic
      setWeatherTicksRemaining(prev => {
        if (prev <= 1) {
          const hours = Math.floor(stateRef.current.igt / 60);
          const isDay = hours >= 6 && hours <= 18;
          const isNight = !isDay;
          const validWeather = WEATHER_METADATA.filter(w => {
            if (w.id === 'BLOOD_MOON' || w.id === 'AURORA' || w.id === 'METEOR_SHOWER') return isNight;
            if (w.id === 'CHERRY_BLOSSOMS') return stateRef.current.currentSeason === 'SPRING';
            if (w.id === 'HEATWAVE') return stateRef.current.currentSeason === 'SUMMER' && isDay;
            if (w.id === 'SNOWY' || w.id === 'BLIZZARD') return stateRef.current.currentSeason === 'WINTER';
            return true;
          });
          const totalWeight = validWeather.reduce((sum, w) => sum + w.weight, 0);
          let random = Math.random() * totalWeight;
          let selected = validWeather[0];
          for (const w of validWeather) {
            if (random < w.weight) { selected = w; break; }
            random -= w.weight;
          }
          setWeather(selected.id);
          addLogRef.current(`${selected.rarity} WEATHER: ${selected.name}`, true);
          return 36 + Math.floor(Math.random() * 36);
        }
        return prev - 1;
      });
      
      // Calculate earnings and expenses
      const earnings = getYpsRef.current() / 6;
      // Expenses are per in-game day (1440 mins). We tick every 10 mins (144 ticks per day).
      const expensesPerTick = getExpensesRef.current().total / 144;
      
      setYen(y => y + earnings - expensesPerTick);
      setAcademicRep(r => r + (earnings * 0.005));
    }, 1000);

    return () => clearInterval(timer);
  }, [setIgt, setDayCount, setWeather, setWeatherTicksRemaining, setYen, setAcademicRep]);

  return { getYps, getExpenses, addLog, isBuffActive, weatherData, activeRecipe };
};
