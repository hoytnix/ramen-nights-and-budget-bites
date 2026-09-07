
import React from 'react';
import { WeatherType } from '../types';

interface WeatherWindowProps {
  weather: WeatherType;
  className?: string;
}

const WeatherWindow: React.FC<WeatherWindowProps> = ({ weather, className = "" }) => {
  
  // Background Colors per weather
  const bgClasses: Record<string, string> = {
    'AVERAGE': 'bg-gradient-to-b from-[#81D4FA] to-[#B3E5FC]',
    'CLEAR': 'bg-gradient-to-b from-[#4FC3F7] to-[#81D4FA]',
    'RAINY': 'bg-gradient-to-b from-[#37474F] to-[#546E7A]',
    'CLOUDY': 'bg-gradient-to-b from-[#90A4AE] to-[#B0BEC5]',
    'SNOWY': 'bg-gradient-to-b from-[#CFD8DC] to-[#ECEFF1]',
    'HEATWAVE': 'bg-gradient-to-b from-[#FF7043] to-[#FFAB91]',
    'THUNDERSTORM': 'bg-gradient-to-b from-[#1a237e] to-[#283593]',
    'FOGGY': 'bg-gradient-to-b from-[#90A4AE] to-[#78909C]',
    'BLIZZARD': 'bg-gradient-to-b from-[#ECEFF1] to-[#FFFFFF]',
    'SANDSTORM': 'bg-gradient-to-b from-[#8D6E63] to-[#6D4C41]',
    'ACID_RAIN': 'bg-gradient-to-b from-[#2E7D32] to-[#1B5E20]',
    'CHERRY_BLOSSOMS': 'bg-gradient-to-b from-[#FCE4EC] to-[#F8BBD0]',
    'AURORA': 'bg-gradient-to-b from-[#1a1313] via-[#4a148c] to-[#01579b]',
    'BLOOD_MOON': 'bg-gradient-to-b from-[#4a0000] to-[#000000]',
    'METEOR_SHOWER': 'bg-gradient-to-b from-[#0d1b2a] to-[#000814]',
  };

  const bgClass = bgClasses[weather] || bgClasses['AVERAGE'];

  return (
    <div className={`relative w-full h-full overflow-hidden border-4 border-[#3E2723] bg-[#3E2723] shadow-inner ${className}`}>
      
      {/* 1. Sky / Atmosphere */}
      <div className={`absolute inset-0 ${bgClass} transition-all duration-[2000ms]`}></div>

      {/* 2. Celestial Bodies / Specials */}
      {(weather === 'CLEAR' || weather === 'AVERAGE') && (
        <div className={`absolute top-4 right-8 w-12 h-12 bg-[#FFF176] rounded-full shadow-[0_0_20px_rgba(255,235,59,0.8)] ${weather === 'AVERAGE' ? 'opacity-40 scale-75' : 'animate-pulse'}`} />
      )}
      
      {weather === 'BLOOD_MOON' && (
        <div className="absolute top-4 right-8 w-14 h-14 bg-[#D32F2F] rounded-full shadow-[0_0_40px_rgba(211,47,47,1)]" />
      )}

      {(weather === 'CLOUDY' || weather === 'RAINY' || weather === 'THUNDERSTORM' || weather === 'AVERAGE') && (
        <>
          <div className="absolute top-2 -left-20 w-32 h-12 bg-white/40 rounded-full blur-md animate-cloud-slow" />
          {weather !== 'AVERAGE' && <div className="absolute top-8 -right-20 w-40 h-16 bg-white/30 rounded-full blur-md animate-cloud-fast" />}
          {weather === 'AVERAGE' && <div className="absolute top-12 -right-40 w-32 h-8 bg-white/20 rounded-full blur-md animate-cloud-slow" style={{ animationDelay: '5s' }} />}
        </>
      )}

      {/* 3. City Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-80 z-10">
        <div className="w-full h-full flex items-end">
          {[8, 6, 11, 5, 14, 9, 6, 16, 10, 4, 12].map((h, i) => (
            <div key={i} className="bg-[#120a0a] mx-[1px] grow border-t border-slate-800" style={{ height: `${h * 4}px` }}>
              {/* Random tiny lights in buildings */}
              {h > 10 && <div className="mt-2 ml-1 w-1 h-1 bg-yellow-400/40"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Weather Particles Overlay */}
      {(weather === 'RAINY' || weather === 'THUNDERSTORM') && (
        <div className="absolute inset-0 animate-rain opacity-60 pointer-events-none z-20"></div>
      )}
      {weather === 'THUNDERSTORM' && (
        <div className="absolute inset-0 bg-white/80 animate-lightning pointer-events-none z-30"></div>
      )}
      {(weather === 'SNOWY' || weather === 'BLIZZARD') && (
        <div className={`absolute inset-0 animate-snow pointer-events-none z-20 ${weather === 'BLIZZARD' ? 'opacity-100' : 'opacity-80'}`}></div>
      )}
      {weather === 'HEATWAVE' && (
        <div className="absolute inset-0 animate-heat pointer-events-none mix-blend-overlay z-20"></div>
      )}
      {weather === 'FOGGY' && (
        <div className="absolute inset-0 bg-white/50 animate-fog pointer-events-none blur-[2px] z-20"></div>
      )}
      {weather === 'SANDSTORM' && (
        <div className="absolute inset-0 animate-sand opacity-50 pointer-events-none z-20"></div>
      )}
      {weather === 'ACID_RAIN' && (
        <div className="absolute inset-0 animate-rain opacity-80 pointer-events-none hue-rotate-[90deg] z-20"></div>
      )}
      {weather === 'CHERRY_BLOSSOMS' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="petal" style={{ 
              left: `${Math.random() * 100}%`, 
              top: '-20px', 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}></div>
          ))}
        </div>
      )}
      {weather === 'AURORA' && (
        <div className="absolute inset-0 opacity-50 mix-blend-screen animate-aurora z-20">
          <div className="absolute top-0 w-full h-2/3 bg-gradient-to-t from-transparent via-green-400 to-transparent blur-2xl"></div>
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-transparent via-purple-400 to-transparent blur-2xl"></div>
        </div>
      )}
      {weather === 'METEOR_SHOWER' && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="absolute w-[1px] h-[40px] bg-white opacity-0 animate-[float-up_1s_linear_infinite]" style={{ 
               left: `${Math.random() * 100}%`, 
               top: `${Math.random() * 100}%`, 
               transform: 'rotate(45deg)', 
               animationDelay: `${i * 1.5}s`,
               opacity: 0.8
             }}></div>
          ))}
        </div>
      )}

      {/* 5. Window Frame */}
      <div className="absolute inset-0 border-[8px] border-[#5D4037] pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-40"></div>
      <div className="absolute top-[60%] left-0 right-0 h-3 bg-[#5D4037] border-y border-[#3E2723] shadow-sm z-40"></div>
      <div className="absolute top-0 bottom-[40%] left-1/2 -ml-1.5 w-3 bg-[#5D4037] border-x border-[#3E2723] shadow-sm z-40"></div>

      {/* 6. Reflection */}
      <div className="absolute top-4 left-4 w-32 h-64 bg-gradient-to-br from-white/10 to-transparent skew-x-12 pointer-events-none z-50"></div>
    </div>
  );
};

export default WeatherWindow;
