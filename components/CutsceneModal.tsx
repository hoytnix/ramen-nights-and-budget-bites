
import React, { useState, useEffect } from 'react';
import PixelBox from './PixelBox';
import { MaterialIcon } from './CommonUI';
import { Scene, DialogNode, DialogChoice, GameStateCheck, GameActions } from '../types';

interface CutsceneModalProps {
  scene: Scene;
  gameState: GameStateCheck;
  gameActions: GameActions;
  onClose: () => void;
}

const CutsceneModal: React.FC<CutsceneModalProps> = ({ scene, gameState, gameActions, onClose }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(scene.initialNodeId);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentNode: DialogNode | undefined = currentNodeId ? scene.nodes[currentNodeId] : undefined;

  // Typewriter effect
  useEffect(() => {
    if (!currentNode) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const fullText = currentNode.text;
    
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.substring(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // Speed of typing

    return () => clearInterval(interval);
  }, [currentNode]);

  const handleChoice = (choice: DialogChoice) => {
    if (choice.effect) {
      choice.effect(gameActions);
    }
    
    if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
    } else {
      onClose();
    }
  };

  if (!currentNode) return null;

  return (
    <div className="absolute inset-0 z-[100] bg-black/60 flex items-end justify-center pb-4 md:pb-10 p-4">
      <div className="w-full max-w-2xl animate-appear" style={{ animationDuration: '0.3s' }}>
        <PixelBox variant="blue" className="relative min-h-[180px] flex flex-col">
          {/* Header / Speaker */}
          <div className="absolute -top-6 left-4 bg-blue-900 border-2 border-white px-4 py-1 flex items-center gap-2 shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
             <MaterialIcon name={currentNode.speakerIcon || 'face'} size={20} className="text-yellow-400" />
             <span className="font-pixel-header text-[10px] text-white uppercase tracking-widest">{currentNode.speaker}</span>
          </div>

          {/* Text Body */}
          <div className="flex-1 mt-4 mb-4">
             <p className="font-pixel-body text-white text-[14px] leading-relaxed">
               {displayedText}
               {isTyping && <span className="inline-block w-2 h-4 bg-white ml-1 animate-pulse"/>}
             </p>
          </div>

          {/* Choices */}
          <div className="flex flex-col gap-2 mt-auto">
            {!isTyping && currentNode.choices.map((choice, idx) => {
              // Check requirement if exists
              if (choice.req && !choice.req(gameState)) return null;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left bg-black/40 hover:bg-white/10 border-2 border-slate-500 hover:border-yellow-400 p-2 text-[10px] font-pixel-header text-cyan-200 hover:text-white transition-all flex justify-between group"
                >
                  <span className="group-hover:translate-x-2 transition-transform">▶ {choice.text}</span>
                </button>
              );
            })}
            {isTyping && (
              <div className="text-center text-[8px] text-slate-400 font-pixel-header animate-pulse">
                ...
              </div>
            )}
          </div>
        </PixelBox>
      </div>
    </div>
  );
};

export default CutsceneModal;
