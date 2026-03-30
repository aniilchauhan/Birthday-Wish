import React from 'react';
import { motion } from 'motion/react';

const colors = [
  '#ff0055', // Neon Pink/Red
  '#00ff22', // Neon Green
  '#00bbff', // Neon Blue
  '#ffaa00', // Neon Warm Yellow/Orange
  '#aa00ff', // Neon Purple
];

interface StringNodeProps {
  remaining: number;
  index: number;
  colIndex: number;
  swayDuration: number;
}

// A recursive physics component! 
// Instead of rotating a single straight stick, we link tiny wire segments.
// If every node rotates slightly relative to its parent, they mathematically form a smooth, perfect flexible curve!
const StringNode: React.FC<StringNodeProps> = ({ remaining, index, colIndex, swayDuration }) => {
  if (remaining <= 0) return null;
  
  const color = colors[(colIndex + (index * 2)) % colors.length];
  const blinkDelay = ((index + colIndex) % 3) * 0.5 + Math.random() * 0.3;

  return (
    <motion.div
      // A small rotation applied recursively creates an authentic curved string
      // e.g. Node 1 is 2deg, Node 5 is actually 10deg real-world rotation!
      animate={{ rotate: [-1.8, 1.8, -1.8] }}
      transition={{ 
        duration: swayDuration, 
        repeat: Infinity, 
        ease: 'easeInOut'
      }}
      className="flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
    >
      {/* Physical wire segment linking to next bulb */}
      <div className="w-[2px] h-8 bg-slate-700/80" />
      
      {/* Bulb Socket */}
      <div className="w-1.5 h-2.5 bg-slate-700 rounded-t-sm" />
      
      {/* Glowing Bulb */}
      <motion.div
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: blinkDelay }}
        className="w-3.5 h-5 rounded-[50%] z-10 relative"
        style={{
          backgroundColor: color,
          boxShadow: `0px 5px 24px 8px ${color}80, 0px 0px 10px 2px ${color}`,
        }}
      />
      
      {/* Recursively attach the next node to the BOTTOM of this bulb! */}
      <StringNode 
        remaining={remaining - 1} 
        index={index + 1} 
        colIndex={colIndex} 
        swayDuration={swayDuration} 
      />
    </motion.div>
  );
};

const FairyLights = () => {
  const horizontalBulbs = 45;
  const baseVerticalBulbsCount = 6;
  
  // 3 strings on the far Left, 3 strings on the far Right
  const stringPositions = [2, 9, 16, 84, 91, 98];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[110] pointer-events-none overflow-hidden">
      
      {/* 1. HORIZONTAL TOP ROW */}
      <div className="absolute top-0 left-0 right-0 flex justify-around w-full" style={{ padding: '0 10px' }}>
        {/* Main wire curving nicely across the top */}
        <div 
          className="absolute top-0 left-0 w-full h-[30px] border-b-2 border-slate-700/80" 
          style={{ borderRadius: '50%', marginTop: '-15px' }} 
        />
        
        {[...Array(horizontalBulbs)].map((_, i) => {
          const color = colors[i % colors.length];
          const blinkDelay = (i % 3) * 0.5;
          const drop = Math.abs(Math.sin((i / (horizontalBulbs - 1)) * Math.PI)) * 15;

          return (
            <div 
              key={`h-bulb-${i}`} 
              className="relative z-10 flex flex-col items-center" 
              style={{ marginTop: `${drop}px` }}
            >
              <div className="w-1.5 h-2.5 bg-slate-700 rounded-t-sm" />
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: blinkDelay }}
                className="w-3.5 h-5 rounded-[50%]"
                style={{
                  backgroundColor: color,
                  boxShadow: `0px 5px 24px 8px ${color}80, 0px 0px 10px 2px ${color}`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. SIX VERTICAL STRINGS (3 Left, 3 Right) */}
      {stringPositions.map((leftPos, colIndex) => {
        
        // Organic wind sway speed
        const swayDuration = 3.5 + colIndex * 0.4;
        
        // Curtain length effect
        let stringBulbCount = baseVerticalBulbsCount;
        if (colIndex === 0 || colIndex === 5) stringBulbCount += 8; 
        else if (colIndex === 1 || colIndex === 4) stringBulbCount += 4; 
        else stringBulbCount += 1; 

        return (
          <div
            key={`v-string-${colIndex}`}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: `${leftPos}%` }}
          >
            {/* Start the recursive physics chain here! */}
            <StringNode 
              remaining={stringBulbCount} 
              index={0} 
              colIndex={colIndex} 
              swayDuration={swayDuration} 
            />
          </div>
        );
      })}

    </div>
  );
};

export default FairyLights;
