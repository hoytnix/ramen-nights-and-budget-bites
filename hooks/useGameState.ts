import { useState, useEffect } from 'react';
import { WeatherType, Particle, Toast } from '../types';

export const useGameState = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [yen, setYen] = useState(0);
  const [academicRep, setAcademicRep] = useState(0);
  const [shopLevel, setShopLevel] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);
  const [activeDistrictIdx, setActiveDistrictIdx] = useState(0);
  const [igt, setIgt] = useState(540); 
  const [dayCount, setDayCount] = useState(0);
  const [weather, setWeather] = useState<WeatherType>('AVERAGE');
  const [weatherTicksRemaining, setWeatherTicksRemaining] = useState(24);
  const [classmateLevels, setClassmateLevels] = useState<Record<string, number>>({ 'haruto': 1 });
  const [kitchenLevels, setKitchenLevels] = useState<Record<string, number>>({});
  const [unlockedRecipes, setUnlockedRecipes] = useState<string[]>(['shoyu']);
  const [activeRecipeId, setActiveRecipeId] = useState('shoyu');
  const [logs, setLogs] = useState<string[]>(["SYSTEM: Terminal initialized. Economics 301 project active."]);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [unlockedThemes, setUnlockedThemes] = useState<string[]>(['classic']);
  const [activeThemeId, setActiveThemeId] = useState('classic');
  const [completedAchievements, setCompletedAchievements] = useState<string[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [trophies, setTrophies] = useState<string[]>([]);
  const [storyFlags, setStoryFlags] = useState<Record<string, boolean>>({});
  const [seenSceneIds, setSeenSceneIds] = useState<string[]>([]);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [activeBuffs, setActiveBuffs] = useState<Record<string, number>>({});
  const [particles, setParticles] = useState<Particle[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem('ramen_nights_ultimate_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setYen(data.yen ?? 0);
        setAcademicRep(data.academicRep ?? 0);
        setShopLevel(data.shopLevel ?? 1);
        setTotalClicks(data.totalClicks ?? 0);
        setActiveDistrictIdx(data.activeDistrictIdx ?? 0);
        setIgt(data.igt ?? 540);
        setDayCount(data.dayCount ?? 0);
        setWeather(data.weather ?? 'AVERAGE');
        setWeatherTicksRemaining(data.weatherTicksRemaining ?? 24);
        setClassmateLevels(data.classmateLevels ?? { 'haruto': 1 });
        setKitchenLevels(data.kitchenLevels ?? {});
        setItemCounts(data.itemCounts ?? {});
        setUnlockedRecipes(data.unlockedRecipes ?? ['shoyu']);
        setActiveRecipeId(data.activeRecipeId ?? 'shoyu');
        setCompletedAchievements(data.completedAchievements ?? []);
        setCompletedQuests(data.completedQuests ?? []);
        setTrophies(data.trophies ?? []);
        setUnlockedThemes(data.unlockedThemes ?? ['classic']);
        setActiveThemeId(data.activeThemeId ?? 'classic');
        setLogs(data.logs ?? ["SYSTEM: Data synchronization successful."]);
        setStoryFlags(data.storyFlags ?? {});
        setSeenSceneIds(data.seenSceneIds ?? []);
      } catch (e) { console.error("Save error", e); }
    }
    setIsLoaded(true);
    setTimeout(() => setIsSessionStarted(true), 2000);
  }, []);

  // Save persistence
  useEffect(() => {
    if (!isLoaded) return;
    const gameData = {
      yen, academicRep, shopLevel, totalClicks, activeDistrictIdx, igt, dayCount, weather, 
      weatherTicksRemaining, classmateLevels, kitchenLevels, itemCounts, unlockedRecipes, activeRecipeId, 
      completedAchievements, completedQuests, trophies, unlockedThemes, activeThemeId, logs,
      storyFlags, seenSceneIds
    };
    localStorage.setItem('ramen_nights_ultimate_save', JSON.stringify(gameData));
  }, [yen, academicRep, shopLevel, totalClicks, activeDistrictIdx, igt, dayCount, weather, weatherTicksRemaining, classmateLevels, kitchenLevels, itemCounts, unlockedRecipes, activeRecipeId, completedAchievements, completedQuests, trophies, unlockedThemes, activeThemeId, logs, storyFlags, seenSceneIds, isLoaded]);

  return {
    isLoaded, isSessionStarted, yen, setYen, academicRep, setAcademicRep,
    shopLevel, setShopLevel, totalClicks, setTotalClicks,
    activeDistrictIdx, setActiveDistrictIdx, igt, setIgt,
    dayCount, setDayCount, weather, setWeather,
    weatherTicksRemaining, setWeatherTicksRemaining,
    classmateLevels, setClassmateLevels, kitchenLevels, setKitchenLevels,
    unlockedRecipes, setUnlockedRecipes, activeRecipeId, setActiveRecipeId,
    logs, setLogs, itemCounts, setItemCounts,
    unlockedThemes, setUnlockedThemes, activeThemeId, setActiveThemeId,
    completedAchievements, setCompletedAchievements,
    completedQuests, setCompletedQuests, trophies, setTrophies,
    storyFlags, setStoryFlags, seenSceneIds, setSeenSceneIds,
    activeSceneId, setActiveSceneId, activeBuffs, setActiveBuffs,
    particles, setParticles, toasts, setToasts
  };
};