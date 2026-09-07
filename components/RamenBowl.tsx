
import React, { useMemo } from 'react';

interface RamenBowlProps {
  recipeId: string;
  size?: number;
  className?: string;
}

// Color Palette
const C = {
  BOWL_RED: '#D32F2F',
  BOWL_BLACK: '#212121',
  BOWL_GOLD: '#FFD700',
  BOWL_BLUE: '#1976D2',
  BOWL_CYAN: '#00BCD4',
  BOWL_PURPLE: '#7B1FA2',
  
  NOODLE: '#F0E68C',
  NOODLE_DARK: '#F57F17',
  
  EGG_WHITE: '#FFFFFF',
  EGG_YOLK: '#FFC107',
  
  NORI: '#004D40',
  CHASHU: '#8D6E63',
  CHASHU_SWIRL: '#5D4037',
  ONION: '#4CAF50',
  NARUTO_WHITE: '#FFEBEE',
  NARUTO_PINK: '#E91E63',
  CORN: '#FFEB3B',
  BUTTER: '#FFF176',
  MENMA: '#D7CCC8',
  MEAT_RED: '#B71C1C',
  SHRIMP: '#FF7043',
  
  FIRE_RED: '#FF3D00',
  STAR_WHITE: '#FFFFFF',
  NEON_BLUE: '#00E5FF',
};

// Configuration Map
const RECIPE_STYLES: Record<string, { broth: string; bowl: string; toppings: string[]; particle?: string }> = {
  shoyu: { broth: '#5D4037', bowl: C.BOWL_RED, toppings: ['nori', 'onion', 'chashu', 'egg'] },
  shio: { broth: '#FFF9C4', bowl: C.BOWL_RED, toppings: ['onion', 'naruto', 'egg', 'menma'] },
  miso: { broth: '#E65100', bowl: C.BOWL_BLACK, toppings: ['corn', 'butter', 'chashu', 'onion'] },
  veggie: { broth: '#81C784', bowl: '#4E342E', toppings: ['corn', 'onion', 'nori', 'menma'] },
  tantan: { broth: '#BF360C', bowl: C.BOWL_BLACK, toppings: ['mince', 'onion', 'chashu'] },
  tsukemen: { broth: '#3E2723', bowl: '#3E2723', toppings: ['nori', 'egg', 'chashu'] },
  paitan: { broth: '#FFF59D', bowl: C.BOWL_RED, toppings: ['onion', 'chashu', 'egg'] },
  curry: { broth: '#AFB42B', bowl: C.BOWL_BLUE, toppings: ['chashu', 'onion'] },
  tonkotsu: { broth: '#F5F5F5', bowl: C.BOWL_BLACK, toppings: ['egg', 'chashu', 'onion', 'black_garlic'] },
  yuzu: { broth: '#FFEB3B', bowl: '#FBC02D', toppings: ['egg', 'onion', 'naruto'] },
  ebi: { broth: '#FF7043', bowl: C.BOWL_RED, toppings: ['shrimp', 'onion', 'egg'] },
  wagyu: { broth: '#3E2723', bowl: C.BOWL_BLACK, toppings: ['wagyu', 'onion', 'egg'] },
  truffle: { broth: '#9E9E9E', bowl: '#212121', toppings: ['truffle', 'egg', 'chashu'] },
  gold: { broth: '#FFD700', bowl: C.BOWL_BLACK, toppings: ['gold_leaf', 'egg'], particle: 'sparkle' },
  neon: { broth: '#00E5FF', bowl: '#212121', toppings: ['neon_onion', 'naruto'], particle: 'glow' },
  volcano: { broth: '#D50000', bowl: '#212121', toppings: ['fire', 'mince', 'onion'], particle: 'ember' },
  void: { broth: '#000000', bowl: '#4A148C', toppings: ['stars'], particle: 'void' },
  galaxy: { broth: '#311B92', bowl: '#000000', toppings: ['stars', 'glitter', 'egg'], particle: 'cosmos' },
  chrono: { broth: '#B0BEC5', bowl: '#607D8B', toppings: ['clock_gear', 'onion'], particle: 'time' },
  omni: { broth: '#FFFFFF', bowl: C.BOWL_GOLD, toppings: ['all'], particle: 'rainbow' },
};

const RamenBowl: React.FC<RamenBowlProps> = ({ recipeId, size = 32, className = "" }) => {
  const config = RECIPE_STYLES[recipeId] || RECIPE_STYLES['shoyu'];
  const has = (t: string) => config.toppings.includes(t) || config.toppings.includes('all');

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      shapeRendering="crispEdges"
    >
      {/* --- BOWL --- */}
      {/* Rim Back */}
      <rect x="2" y="16" width="28" height="2" fill={config.bowl} fillOpacity="0.8" />
      
      {/* Broth (Clip to bowl shape manually by layering) */}
      <rect x="4" y="17" width="24" height="10" fill={config.broth} />
      
      {/* Noodles (Visible surface) */}
      <path d="M6 19 C8 17 10 21 12 19 C14 17 16 21 18 19 C20 17 22 21 24 19" stroke={C.NOODLE} strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 21 C10 19 12 23 14 21 C16 19 18 23 20 21" stroke={C.NOODLE_DARK} strokeWidth="1" strokeOpacity="0.5"/>

      {/* --- TOPPINGS --- */}

      {/* Chashu (Pork Slice) */}
      {has('chashu') && (
        <g>
          <circle cx="20" cy="18" r="4" fill={C.CHASHU} />
          <path d="M20 18 Q22 16 20 15" stroke={C.CHASHU_SWIRL} strokeWidth="1" />
        </g>
      )}

      {/* Wagyu Beef */}
      {has('wagyu') && (
         <rect x="14" y="16" width="10" height="6" rx="1" fill={C.MEAT_RED} transform="rotate(-10 19 19)"/>
      )}

      {/* Egg (Ajitsuke Tamago) */}
      {has('egg') && (
        <g transform="translate(8, 16)">
          <ellipse cx="4" cy="4" rx="3.5" ry="4" fill={C.EGG_WHITE} />
          <circle cx="4" cy="4" r="2" fill={C.EGG_YOLK} />
        </g>
      )}

      {/* Nori (Seaweed) */}
      {has('nori') && (
        <g>
          <rect x="20" y="8" width="6" height="10" fill={C.NORI} transform="rotate(10 23 13)" />
          <rect x="16" y="9" width="6" height="10" fill={C.NORI} transform="rotate(-5 19 14)" />
        </g>
      )}

      {/* Narutomaki (Fish Cake) */}
      {has('naruto') && (
        <g transform="translate(15, 20)">
          <circle cx="3" cy="3" r="3" fill={C.NARUTO_WHITE} />
          <path d="M3 3 L4 2 M3 3 L2 4 M3 3 A 1 1 0 0 1 4 4" stroke={C.NARUTO_PINK} strokeWidth="1" />
        </g>
      )}

      {/* Corn & Butter */}
      {has('corn') && (
        <g>
          <rect x="12" y="18" width="2" height="2" fill={C.CORN} />
          <rect x="14" y="19" width="2" height="2" fill={C.CORN} />
          <rect x="13" y="17" width="2" height="2" fill={C.CORN} />
        </g>
      )}
      {has('butter') && <rect x="15" y="17" width="3" height="3" fill={C.BUTTER} stroke="#FFA000" strokeWidth="0.5" />}

      {/* Green Onions */}
      {(has('onion') || has('neon_onion')) && (
        <g fill={has('neon_onion') ? C.NEON_BLUE : C.ONION}>
          <rect x="14" y="21" width="2" height="2" />
          <rect x="18" y="22" width="2" height="2" />
          <rect x="11" y="20" width="2" height="2" />
        </g>
      )}

      {/* Shrimp */}
      {has('shrimp') && (
        <path d="M16 16 C18 14 22 16 22 19 C22 21 19 21 19 19" stroke={C.SHRIMP} strokeWidth="3" strokeLinecap="round" />
      )}

      {/* Special: Fire/Volcano */}
      {has('fire') && (
        <path d="M10 16 L12 10 L14 16 L16 8 L18 16" fill={C.FIRE_RED} opacity="0.8">
           <animate attributeName="d" values="M10 16 L12 10 L14 16 L16 8 L18 16; M10 16 L11 11 L14 15 L17 9 L18 16; M10 16 L12 10 L14 16 L16 8 L18 16" dur="0.5s" repeatCount="indefinite" />
        </path>
      )}

      {/* Special: Stars */}
      {has('stars') && (
        <g fill={C.STAR_WHITE}>
           <rect x="12" y="19" width="1" height="1" />
           <rect x="20" y="20" width="1" height="1" />
           <rect x="16" y="22" width="1" height="1" />
           <rect x="24" y="18" width="1" height="1" />
        </g>
      )}

      {/* Special: Gold Leaf */}
      {has('gold_leaf') && (
        <g fill="#FFD700" stroke="#FFF" strokeWidth="0.5">
           <polygon points="16,16 18,17 17,19 15,18" />
        </g>
      )}

      {/* --- BOWL BODY (Front Layer) --- */}
      {/* Main Body */}
      <path d="M4 18 L6 26 L10 29 L22 29 L26 26 L28 18 Z" fill={config.bowl} />
      {/* Decorative Band */}
      <path d="M5 22 L27 22" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="2 2" />
      
      {/* --- PARTICLES/EFFECTS --- */}
      {config.particle === 'glow' && (
        <circle cx="16" cy="16" r="10" stroke={C.NEON_BLUE} strokeWidth="1" strokeOpacity="0.5">
           <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
           <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

    </svg>
  );
};

export default RamenBowl;
