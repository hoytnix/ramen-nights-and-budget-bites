
import React, { useEffect, useRef } from 'react';
import { ACHIEVEMENTS, QUESTS, THEMES } from '../constants';
import { SCENES } from '../story';
import { GameStateCheck } from '../types';

export const useStoryManager = (
  checkState: GameStateCheck,
  isLoaded: boolean,
  isSessionStarted: boolean,
  completedAchievements: string[],
  completedQuests: string[],
  unlockedThemes: string[],
  seenSceneIds: string[],
  activeSceneId: string | null,
  setCompletedAchievements: React.Dispatch<React.SetStateAction<string[]>>,
  setCompletedQuests: React.Dispatch<React.SetStateAction<string[]>>,
  setUnlockedThemes: React.Dispatch<React.SetStateAction<string[]>>,
  setAcademicRep: React.Dispatch<React.SetStateAction<number>>,
  setSeenSceneIds: React.Dispatch<React.SetStateAction<string[]>>,
  setActiveSceneId: React.Dispatch<React.SetStateAction<string | null>>,
  addLog: (msg: string, silent?: boolean) => void
) => {
  const lastSceneTime = useRef<number>(0);
  const STORY_COOLDOWN = 120000; // 2 minutes between cutscenes to keep gameplay flowing

  useEffect(() => {
    if (!isLoaded || !isSessionStarted || activeSceneId) return;

    // 1. Narrative Scene Triggering
    // Check if we can trigger a new scene (Respect cooldown unless it's the very first scene)
    const now = Date.now();
    const canTriggerScene = (now - lastSceneTime.current > STORY_COOLDOWN) || seenSceneIds.length === 0;

    if (canTriggerScene) {
      const nextScene = SCENES.find(scene => 
        !seenSceneIds.includes(scene.id) && scene.trigger(checkState)
      );

      if (nextScene) {
        setActiveSceneId(nextScene.id);
        lastSceneTime.current = now;
        return; // Prioritize one scene at a time
      }
    }

    // 2. Auto-unlock seasonal themes (Silent)
    const matchingSeasonalThemes = THEMES.filter(t => t.season === checkState.season && !unlockedThemes.includes(t.id));
    if (matchingSeasonalThemes.length > 0) {
      setUnlockedThemes(prev => [...prev, ...matchingSeasonalThemes.map(t => t.id)]);
      matchingSeasonalThemes.forEach(t => addLog(`SEASONAL GIFT: ${t.name} unlocked!`, true));
    }

    // 3. Achievements
    const newlyAchieved: string[] = [];
    ACHIEVEMENTS.forEach(ach => {
      if (!completedAchievements.includes(ach.id) && ach.req(checkState)) {
        newlyAchieved.push(ach.id);
      }
    });
    if (newlyAchieved.length > 0) {
      setCompletedAchievements(prev => [...prev, ...newlyAchieved]);
      newlyAchieved.forEach(id => {
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (ach) addLog(`ACHIEVEMENT: ${ach.name}`, false);
      });
    }

    // 4. Quests
    const newlyQuested: string[] = [];
    QUESTS.forEach(q => {
      if (!completedQuests.includes(q.id)) {
        let prog = 0;
        if (q.type === 'clicks') prog = checkState.totalClicks;
        else if (q.type === 'haruto_lv') prog = checkState.classmateLevels['haruto'] || 0;
        else if (q.type === 'total_gold') prog = checkState.yen;
        else if (q.type === 'total_staff') prog = Object.values(checkState.classmateLevels).reduce((a, b) => a + b, 0);
        else if (q.type === 'total_upgrades') prog = Object.values(checkState.kitchenLevels).reduce((a, b) => a + b, 0);
        else if (q.type === 'total_rep') prog = checkState.academicRep;
        
        if (prog >= q.goal) newlyQuested.push(q.id);
      }
    });

    if (newlyQuested.length > 0) {
      setCompletedQuests(prev => [...prev, ...newlyQuested]);
      const totalRepReward = newlyQuested.length * 50;
      setAcademicRep(r => r + totalRepReward);
      if (newlyQuested.length > 3) {
        addLog(`MILESTONES: ${newlyQuested.length} tasks completed! (+${totalRepReward} Rep)`);
      } else {
        newlyQuested.forEach(id => {
          const q = QUESTS.find(x => x.id === id);
          if (q) addLog(`${q.successMsg} (+50 Rep)`);
        });
      }
    }
  }, [
    checkState, isLoaded, isSessionStarted, completedAchievements, 
    completedQuests, unlockedThemes, seenSceneIds, activeSceneId, 
    setCompletedAchievements, setCompletedQuests, setUnlockedThemes, 
    setAcademicRep, setSeenSceneIds, setActiveSceneId, addLog
  ]);
};
