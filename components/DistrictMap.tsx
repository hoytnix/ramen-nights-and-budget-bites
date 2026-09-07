
import React from 'react';

interface DistrictMapProps {
  districtId: string;
  className?: string;
}

const TrafficPacket = ({ 
  x, y, color, duration, delay, path, size = 1 
}: { 
  x: string, y: string, color: string, duration: string, delay: string, path: string, size?: number 
}) => (
  <rect x={x} y={y} width={size} height={size} fill={color}>
    <animateMotion 
      path={path} 
      dur={duration} 
      begin={delay} 
      repeatCount="indefinite" 
    />
    <animate 
      attributeName="opacity" 
      values="0;1;1;0" 
      dur={duration} 
      begin={delay} 
      repeatCount="indefinite" 
    />
  </rect>
);

const DistrictMap: React.FC<DistrictMapProps> = ({ districtId, className = "" }) => {
  const renderTraffic = () => {
    switch (districtId) {
      case 'hongo': // Calm, scholarly flow
        return (
          <g>
            {/* Street Grid */}
            <rect x="7" y="0" width="2" height="16" fill="#1A237E" opacity="0.3" />
            <rect x="0" y="7" width="16" height="2" fill="#1A237E" opacity="0.3" />
            
            {/* Traffic Packets - Pedestrians and light transit */}
            <TrafficPacket x="7.5" y="-1" color="#81D4FA" duration="6s" delay="0s" path="M 0 0 V 18" />
            <TrafficPacket x="8.5" y="17" color="#E1F5FE" duration="7s" delay="2s" path="M 0 0 V -18" />
            <TrafficPacket x="-1" y="7.5" color="#81D4FA" duration="8s" delay="1s" path="M 0 0 H 18" />
            <TrafficPacket x="17" y="8.5" color="#E1F5FE" duration="5s" delay="3s" path="M 0 0 H -18" />
            
            {/* Static Campus Blocks */}
            <rect x="1" y="1" width="5" height="5" fill="#1A237E" opacity="0.2" />
            <rect x="10" y="10" width="5" height="5" fill="#1A237E" opacity="0.2" />
          </g>
        );
      case 'shibuya': // Chaotic Scramble
        return (
          <g>
            {/* Scramble Intersection */}
            <rect x="5" y="0" width="6" height="16" fill="#311B92" opacity="0.2" />
            <rect x="0" y="5" width="16" height="6" fill="#311B92" opacity="0.2" />
            
            {/* Crosswalk Visuals */}
            <rect x="5" y="4" width="6" height="1" fill="#FFF" opacity="0.1" />
            <rect x="5" y="11" width="6" height="1" fill="#FFF" opacity="0.1" />
            
            {/* High Density Traffic Packets */}
            {/* Vertical */}
            <TrafficPacket x="5.5" y="-1" color="#00E5FF" duration="3s" delay="0s" path="M 0 0 V 18" />
            <TrafficPacket x="7.5" y="-1" color="#FF4081" duration="4s" delay="1s" path="M 0 0 V 18" />
            <TrafficPacket x="10.5" y="17" color="#00E5FF" duration="3.5s" delay="0.5s" path="M 0 0 V -18" />
            
            {/* Horizontal */}
            <TrafficPacket x="-1" y="5.5" color="#FFEB3B" duration="4.5s" delay="2s" path="M 0 0 H 18" />
            <TrafficPacket x="17" y="9.5" color="#00E5FF" duration="3s" delay="1.5s" path="M 0 0 H -18" />
            
            {/* Diagonal Scramble (The iconic Shibuya move) */}
            <TrafficPacket x="5" y="5" color="#FFF" duration="5s" delay="0s" path="M 0 0 L 6 6" size={0.5} />
            <TrafficPacket x="11" y="5" color="#FFF" duration="5s" delay="1s" path="M 0 0 L -6 6" size={0.5} />
            <TrafficPacket x="5" y="11" color="#FFF" duration="5s" delay="2s" path="M 0 0 L 6 -6" size={0.5} />
          </g>
        );
      case 'shinjuku': // Multi-lane Express and Rail
        return (
          <g>
            {/* Highway Lanes */}
            <rect x="0" y="2" width="16" height="4" fill="#212121" opacity="0.4" />
            <rect x="0" y="10" width="16" height="4" fill="#212121" opacity="0.4" />
            
            {/* Fast Traffic */}
            <TrafficPacket x="-2" y="2.5" color="#FFD600" duration="2s" delay="0s" path="M 0 0 H 20" size={1.5} />
            <TrafficPacket x="-2" y="4.5" color="#FFF" duration="2.5s" delay="1s" path="M 0 0 H 20" />
            
            <TrafficPacket x="18" y="10.5" color="#00B0FF" duration="1.8s" delay="0.5s" path="M 0 0 H -20" size={1.5} />
            <TrafficPacket x="18" y="12.5" color="#FFF" duration="2.2s" delay="1.2s" path="M 0 0 H -20" />
            
            {/* Railway */}
            <rect x="0" y="7.5" width="16" height="1" fill="#4CAF50" opacity="0.3" />
            <rect x="-6" y="7.5" width="6" height="1" fill="#E0E0E0">
              <animate attributeName="x" values="-6;22" dur="4s" repeatCount="indefinite" />
            </rect>
          </g>
        );
      case 'ginza': // Orderly, Luxury Grid
        return (
          <g>
            {/* Clean Grid Lines */}
            {[0, 4, 8, 12].map(pos => (
              <React.Fragment key={pos}>
                <rect x={pos + 1.5} y="0" width="1" height="16" fill="#37474F" opacity="0.2" />
                <rect x="0" y={pos + 1.5} width="16" height="1" fill="#37474F" opacity="0.2" />
              </React.Fragment>
            ))}
            
            {/* Slow, High-Value Traffic */}
            <TrafficPacket x="1.5" y="-2" color="#FFD700" duration="10s" delay="0s" path="M 0 0 V 20" size={1.2} />
            <TrafficPacket x="9.5" y="18" color="#BDBDBD" duration="12s" delay="5s" path="M 0 0 V -20" size={1.2} />
            <TrafficPacket x="-2" y="5.5" color="#FFD700" duration="15s" delay="2s" path="M 0 0 H 20" size={1.2} />
            <TrafficPacket x="18" y="13.5" color="#BDBDBD" duration="11s" delay="7s" path="M 0 0 H -20" size={1.2} />
            
            {/* Boutique Dots (Customers entering buildings) */}
            <circle cx="3" cy="3" r="0.5" fill="#FFF">
              <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="11" cy="7" r="0.5" fill="#FFF">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg 
      viewBox="0 0 16 16" 
      className={`w-full h-full ${className}`} 
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* HUD Scanner Background */}
      <rect width="16" height="16" fill="#0A0A0F" />
      
      {/* Grid Pattern Overlay */}
      <defs>
        <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
          <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#FFFFFF" strokeWidth="0.05" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="16" height="16" fill="url(#grid)" />
      
      {/* Traffic Layer */}
      {renderTraffic()}
      
      {/* Scanner Bar (The "Visualizer" feel) */}
      <rect x="0" y="0" width="16" height="0.5" fill="#00E5FF" opacity="0.2">
        <animate attributeName="y" values="-1;17" dur="4s" repeatCount="indefinite" />
      </rect>
      
      {/* Corner Brackets */}
      <path d="M 1 3 V 1 H 3" stroke="#00E5FF" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 13 1 H 15 V 3" stroke="#00E5FF" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 1 13 V 15 H 3" stroke="#00E5FF" strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 13 15 H 15 V 13" stroke="#00E5FF" strokeWidth="0.5" fill="none" opacity="0.5" />
    </svg>
  );
};

export default DistrictMap;
