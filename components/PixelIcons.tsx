
import React from 'react';

interface IconProps {
  id: string;
  size?: number;
  className?: string;
}

// Define SVG with children prop in the type
const SVG = ({ size, children, className }: { size: number, children: React.ReactNode, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={className} 
    shapeRendering="crispEdges"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

// --- STAFF ICONS (Classmates) ---
export const StaffIcon: React.FC<IconProps> = ({ id, size = 24, className }) => {
  // Explicitly type content to avoid 'any' and help JSX inference
  let content: React.ReactNode;
  switch (id) {
    case 'haruto': // Engineering (Wrench)
      content = (
        <g>
          <path d="M10 2 H14 V6 H10 Z" fill="#9E9E9E" /> {/* Head */}
          <path d="M4 11 H7 V14 H4 Z" fill="#9E9E9E" /> {/* Handle Base */}
          <path d="M6 5 H11 V12 H6 Z" transform="rotate(-45 8.5 8.5)" fill="#BDBDBD" /> {/* Shaft */}
          <rect x="11" y="3" width="2" height="2" fill="#424242" />
        </g>
      );
      break;
    case 'akari': // Chemistry (Flask)
      content = (
        <g>
          <path d="M6 2 H10 V6 L13 14 H3 L6 6 V2 Z" fill="#E1BEE7" fillOpacity="0.4" />
          <path d="M3 14 L6 6 V2 H10 V6 L13 14 H3 Z" stroke="#7B1FA2" strokeWidth="1" fill="none" />
          <path d="M4 13 L6 8 H10 L12 13 H4 Z" fill="#9C27B0" /> {/* Liquid */}
          <rect x="7" y="4" width="2" height="2" fill="#FFF" opacity="0.5" />
        </g>
      );
      break;
    case 'sato': // Art (Palette)
      content = (
        <g>
          <path d="M2 8 C2 4 5 1 9 1 C13 1 15 5 15 8 C15 11 13 12 12 12 C11 12 11 11 11 10 C11 9 10 8 9 8 C8 8 8 9 8 10 C8 13 5 14 2 11 Z" fill="#D7CCC8" />
          <circle cx="5" cy="5" r="1" fill="#F44336" />
          <circle cx="8" cy="3" r="1" fill="#2196F3" />
          <circle cx="11" cy="5" r="1" fill="#FFEB3B" />
          <path d="M2 14 L6 10" stroke="#795548" strokeWidth="2" /> {/* Brush handle */}
        </g>
      );
      break;
    case 'yuki': // Law (Gavel/Scales)
      content = (
        <g>
          <rect x="7" y="2" width="2" height="12" fill="#FFD54F" /> {/* Pole */}
          <rect x="4" y="12" width="8" height="2" fill="#FFD54F" /> {/* Base */}
          <path d="M2 4 H6 L8 2 L10 4 H14" stroke="#FFA000" strokeWidth="1" fill="none" />
          <path d="M2 4 L3 7 H5 L6 4" fill="#E0E0E0" opacity="0.8" />
          <path d="M10 4 L11 7 H13 L14 4" fill="#E0E0E0" opacity="0.8" />
        </g>
      );
      break;
    case 'kenji': // Math (Calculator/Abacus)
      content = (
        <g>
          <rect x="3" y="2" width="10" height="12" rx="1" fill="#37474F" />
          <rect x="4" y="3" width="8" height="3" fill="#C5E1A5" />
          <rect x="4" y="7" width="2" height="2" fill="#90A4AE" />
          <rect x="7" y="7" width="2" height="2" fill="#90A4AE" />
          <rect x="10" y="7" width="2" height="2" fill="#90A4AE" />
          <rect x="4" y="10" width="2" height="2" fill="#90A4AE" />
          <rect x="7" y="10" width="2" height="2" fill="#90A4AE" />
          <rect x="10" y="10" width="2" height="2" fill="#FF7043" />
        </g>
      );
      break;
    case 'taro': // Econ (Yen Stack)
      content = (
        <g>
          <rect x="4" y="10" width="8" height="4" rx="1" fill="#FFC107" stroke="#FF6F00" strokeWidth="1" />
          <rect x="4" y="6" width="8" height="4" rx="1" fill="#FFC107" stroke="#FF6F00" strokeWidth="1" />
          <rect x="4" y="2" width="8" height="4" rx="1" fill="#FFC107" stroke="#FF6F00" strokeWidth="1" />
          <text x="8" y="9" fontSize="6" textAnchor="middle" fill="#3E2723" fontFamily="sans-serif">¥</text>
        </g>
      );
      break;
    case 'hana': // Bio (Sprout)
      content = (
        <g>
          <rect x="7" y="8" width="2" height="6" fill="#8D6E63" />
          <rect x="5" y="12" width="6" height="2" fill="#5D4037" />
          <path d="M8 8 C8 8 4 8 4 4 C4 0 8 4 8 8 Z" fill="#66BB6A" />
          <path d="M8 8 C8 8 12 8 12 4 C12 0 8 4 8 8 Z" fill="#81C784" />
        </g>
      );
      break;
    case 'ryu': // Sports (Whistle/Shoe)
      content = (
        <g>
          <path d="M2 6 H10 V10 H2 Z" fill="#BDBDBD" />
          <circle cx="8" cy="8" r="4" fill="#9E9E9E" />
          <rect x="11" y="7" width="4" height="2" fill="#616161" />
          <circle cx="12" cy="8" r="1" fill="#212121" />
          <rect x="6" y="2" width="2" height="12" fill="#FF5252" opacity="0.8" transform="rotate(45 7 8)" />
        </g>
      );
      break;
    case 'emi': // CompSci (Floppy Disk)
      content = (
        <g>
          <rect x="2" y="2" width="12" height="12" rx="1" fill="#3F51B5" />
          <rect x="5" y="2" width="6" height="4" fill="#E8EAF6" />
          <rect x="4" y="8" width="8" height="4" fill="#1A237E" />
          <rect x="10" y="9" width="1" height="2" fill="#FF5252" />
        </g>
      );
      break;
    case 'profx': // Prof (Grad Cap)
      content = (
        <g>
          <path d="M2 6 L8 2 L14 6 L8 10 Z" fill="#212121" stroke="#000" strokeWidth="0.5" />
          <rect x="13" y="6" width="1" height="6" fill="#FFD700" />
          <circle cx="13.5" cy="12.5" r="1" fill="#FFD700" />
          <path d="M4 8 V12 C4 13 12 13 12 12 V8" fill="#424242" />
        </g>
      );
      break;
    default:
      content = <rect x="4" y="4" width="8" height="8" fill="#9E9E9E" />;
  }

  // Use explicit children prop to avoid inference issues in some TSX environments
  return <SVG size={size} className={className} children={content} />;
};

// --- KITCHEN ICONS ---
export const KitchenIcon: React.FC<IconProps> = ({ id, size = 24, className }) => {
  // Explicitly type content
  let content: React.ReactNode;
  switch (id) {
    case 'stove':
      content = (
        <g>
          <rect x="2" y="6" width="12" height="8" fill="#424242" />
          <rect x="3" y="7" width="10" height="2" fill="#212121" />
          <circle cx="5" cy="11" r="1" fill="#F44336" />
          <circle cx="8" cy="11" r="1" fill="#F44336" />
          <circle cx="11" cy="11" r="1" fill="#F44336" />
          <path d="M4 5 C4 5 5 2 6 2 C7 2 8 5 8 5" fill="#FF5722" />
          <path d="M8 5 C8 5 9 3 10 3 C11 3 12 5 12 5" fill="#FF5722" />
        </g>
      );
      break;
    case 'extruder':
      content = (
        <g>
          <rect x="4" y="2" width="8" height="4" fill="#78909C" />
          <rect x="6" y="6" width="4" height="6" fill="#B0BEC5" />
          <rect x="2" y="12" width="12" height="2" fill="#546E7A" />
          <rect x="7" y="12" width="2" height="4" fill="#FFD54F" /> {/* Noodle */}
        </g>
      );
      break;
    case 'kettle':
      content = (
        <g>
          <path d="M2 6 H14 L12 14 H4 L2 6 Z" fill="#5D4037" />
          <path d="M4 6 C4 4 12 4 12 6" stroke="#8D6E63" strokeWidth="1" fill="none" />
          <rect x="12" y="2" width="2" height="4" fill="#BDBDBD" transform="rotate(45 13 4)" /> {/* Handle */}
        </g>
      );
      break;
    case 'sousvide':
      content = (
        <g>
          <rect x="3" y="6" width="10" height="8" fill="#81D4FA" opacity="0.5" />
          <rect x="10" y="2" width="2" height="12" fill="#212121" />
          <rect x="10" y="3" width="2" height="1" fill="#F44336" />
          <circle cx="11" cy="13" r="1" fill="#212121" />
        </g>
      );
      break;
    case 'robot':
      content = (
        <g>
          <rect x="6" y="8" width="4" height="6" fill="#BDBDBD" />
          <rect x="4" y="14" width="8" height="2" fill="#616161" />
          <rect x="7" y="4" width="2" height="4" fill="#757575" />
          <path d="M4 4 H6 V2 H4 Z" fill="#EF5350" /> {/* Claw L */}
          <path d="M10 4 H12 V2 H10 Z" fill="#EF5350" /> {/* Claw R */}
        </g>
      );
      break;
    case 'fusion':
      content = (
        <g>
          <circle cx="8" cy="8" r="4" fill="#0288D1" />
          <circle cx="8" cy="8" r="2" fill="#E1F5FE">
             <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <ellipse cx="8" cy="8" rx="7" ry="2" stroke="#4FC3F7" strokeWidth="0.5" transform="rotate(45 8 8)" />
          <ellipse cx="8" cy="8" rx="7" ry="2" stroke="#4FC3F7" strokeWidth="0.5" transform="rotate(-45 8 8)" />
        </g>
      );
      break;
    case 'quantum':
      content = (
        <g>
          <rect x="4" y="4" width="8" height="8" fill="#311B92" />
          <rect x="6" y="6" width="4" height="4" fill="#7C4DFF" />
          <path d="M2 2 L6 6 M14 2 L10 6 M2 14 L6 10 M14 14 L10 10" stroke="#B388FF" strokeWidth="1" />
        </g>
      );
      break;
    case 'ai_mgr':
      content = (
        <g>
          <rect x="2" y="2" width="12" height="12" fill="#1B5E20" />
          <rect x="4" y="4" width="8" height="8" fill="#2E7D32" />
          <rect x="6" y="12" width="1" height="2" fill="#FFD700" />
          <rect x="9" y="12" width="1" height="2" fill="#FFD700" />
          <rect x="12" y="6" width="2" height="1" fill="#FFD700" />
          <circle cx="8" cy="8" r="2" fill="#F44336" />
        </g>
      );
      break;
    case 'reality':
      content = (
        <g>
          <circle cx="8" cy="8" r="7" fill="#263238" />
          <path d="M8 8 L8 1 M8 8 L14 5 M8 8 L14 11 M8 8 L8 15 M8 8 L2 11 M8 8 L2 5" stroke="#EC407A" strokeWidth="1" />
          <circle cx="8" cy="8" r="2" fill="#FFF" />
        </g>
      );
      break;
    default:
      content = <rect x="4" y="4" width="8" height="8" fill="#607D8B" />;
  }
  // Use explicit children prop to avoid inference issues in some TSX environments
  return <SVG size={size} className={className} children={content} />;
};

// --- ITEM ICONS ---
export const ItemIcon: React.FC<IconProps> = ({ id, size = 24, className }) => {
  // Explicitly type content
  let content: React.ReactNode;
  switch (id) {
    case 'coffee':
      content = (
        <g>
          <rect x="4" y="4" width="6" height="8" fill="#FFF" />
          <path d="M10 5 H12 V9 H10" stroke="#FFF" strokeWidth="1" fill="none" />
          <rect x="5" y="5" width="4" height="6" fill="#3E2723" />
          <path d="M6 2 Q7 4 6 5" stroke="#BDBDBD" strokeWidth="0.5" />
          <path d="M8 1 Q9 3 8 4" stroke="#BDBDBD" strokeWidth="0.5" />
        </g>
      );
      break;
    case 'energy_drink':
      content = (
        <g>
          <rect x="5" y="2" width="6" height="12" fill="#0D47A1" />
          <rect x="5" y="2" width="6" height="1" fill="#BDBDBD" />
          <path d="M7 6 L9 6 L6 10 L8 10 L6 12" fill="#FFEB3B" />
        </g>
      );
      break;
    case 'marketing':
      content = (
        <g>
          <path d="M2 6 L6 4 V12 L2 10 Z" fill="#E0E0E0" />
          <path d="M6 4 L12 2 V14 L6 12 Z" fill="#F44336" />
          <rect x="2" y="7" width="2" height="2" fill="#212121" />
          <path d="M13 5 L15 3 M13 8 H16 M13 11 L15 13" stroke="#FFC107" strokeWidth="1" />
        </g>
      );
      break;
    case 'lucky_cat':
      content = (
        <g>
          <circle cx="8" cy="10" r="4" fill="#FFF" />
          <circle cx="6" cy="6" r="2" fill="#FFF" />
          <circle cx="10" cy="6" r="2" fill="#FFF" />
          <path d="M10 8 L12 4 L14 6 L12 10" fill="#FFF" /> {/* Raised paw */}
          <circle cx="8" cy="12" r="1.5" fill="#FFD700" /> {/* Coin */}
          <path d="M7 10 L9 10" stroke="#000" strokeWidth="0.5" />
        </g>
      );
      break;
    case 'scallion':
      content = (
        <g>
          <rect x="2" y="2" width="12" height="12" fill="#212121" opacity="0.1" rx="2" />
          <rect x="7" y="8" width="2" height="6" fill="#FFF" /> {/* Root */}
          <rect x="6" y="2" width="4" height="8" fill="#76FF03" /> {/* Stalk */}
          <rect x="6" y="2" width="4" height="2" fill="#FFEB3B" opacity="0.5" /> {/* Glow */}
        </g>
      );
      break;
    case 'staff_party':
      content = (
        <g>
          <circle cx="6" cy="6" r="3" fill="#E91E63" />
          <line x1="6" y1="9" x2="6" y2="14" stroke="#FFF" strokeWidth="0.5" />
          <circle cx="10" cy="5" r="3" fill="#2196F3" />
          <line x1="10" y1="8" x2="10" y2="13" stroke="#FFF" strokeWidth="0.5" />
          <circle cx="8" cy="8" r="3" fill="#FFEB3B" />
        </g>
      );
      break;
    case 'tv_ad':
      content = (
        <g>
          <rect x="2" y="4" width="12" height="8" fill="#212121" />
          <rect x="3" y="5" width="10" height="6" fill="#64B5F6" />
          <polygon points="6,6 10,8 6,10" fill="#FFF" />
          <rect x="4" y="12" width="8" height="1" fill="#424242" />
        </g>
      );
      break;
    case 'influencer':
      content = (
        <g>
          <rect x="5" y="2" width="6" height="12" rx="1" fill="#212121" />
          <rect x="6" y="3" width="4" height="8" fill="#E0E0E0" />
          <circle cx="8" cy="12" r="1" fill="#757575" />
          <path d="M7 5 H9" stroke="#EF5350" strokeWidth="1" />
          <path d="M7 7 H8" stroke="#2196F3" strokeWidth="1" />
        </g>
      );
      break;
    default:
      content = <circle cx="8" cy="8" r="4" fill="#9C27B0" />;
  }
  // Use explicit children prop to avoid inference issues in some TSX environments
  return <SVG size={size} className={className} children={content} />;
};
