
import React, { useMemo } from 'react';
import { MaterialIcon } from './CommonUI';
import { QUESTS, ACHIEVEMENTS } from '../constants';
import { Quest } from '../types';

interface TasksTabProps {
  completedQuests: string[];
  completedAchievements: string[];
}

export const TasksTab: React.FC<TasksTabProps> = ({ completedQuests, completedAchievements }) => {
  // Group quests by type and find the first uncompleted one for each
  const activeQuests = useMemo(() => {
    const typesSeen = new Set<string>();
    const stacked: Quest[] = [];
    
    for (const q of QUESTS) {
      if (!completedQuests.includes(q.id)) {
        if (!typesSeen.has(q.type)) {
          stacked.push(q);
          typesSeen.add(q.type);
        }
      }
    }
    return stacked;
  }, [completedQuests]);

  return (
    <div className="flex flex-col h-full p-2 overflow-y-auto custom-scrollbar pb-20">
      <section className="mb-6">
        <h4 className="text-[8px] font-pixel-header text-cyan-400 mb-2 flex items-center gap-2 underline tracking-tighter uppercase">
          <MaterialIcon name="track_changes" size={12}/> ACTIVE TASKS
        </h4>
        {activeQuests.map(q => (
          <div key={q.id} className="p-3 border-2 border-cyan-600 bg-cyan-950/20 mb-2">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-pixel-header uppercase">{q.name}</p>
              <div className="px-1 bg-cyan-800 text-[6px] font-pixel-header text-white">ACTIVE</div>
            </div>
            <p className="text-[8px] text-slate-400">{q.desc}</p>
            <p className="text-[8px] text-yellow-400 mt-1">Reward: +50 Rep</p>
          </div>
        ))}
        {activeQuests.length === 0 && (
          <p className="text-[8px] text-slate-500 text-center py-4">All tasks complete!</p>
        )}
      </section>
      
      <section>
         <h4 className="text-[8px] font-pixel-header text-yellow-500 mb-2 flex items-center gap-2 uppercase underline">
           <MaterialIcon name="emoji_events" size={12}/> MEDALS
         </h4>
         <div className="grid grid-cols-2 gap-2">
           {ACHIEVEMENTS.map(ach => {
             const isDone = completedAchievements.includes(ach.id);
             return (
               <div key={ach.id} className={`p-2 border ${isDone?'border-yellow-400 bg-yellow-400/10':'border-slate-800 opacity-40'} flex flex-col justify-center min-h-[60px]`}>
                 <p className="text-[8px] font-pixel-header uppercase text-center">{ach.name}</p>
                 {isDone && <MaterialIcon name="star" size={12} className="text-yellow-400 mx-auto mt-1"/>}
               </div>
             );
           })}
         </div>
      </section>
    </div>
  );
};
