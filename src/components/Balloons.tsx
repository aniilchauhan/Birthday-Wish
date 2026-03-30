import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Heart } from 'lucide-react';

const Balloon = ({ color, delay, side, offset }: { color: string, delay: number, side: 'left' | 'right', offset: string }) => {
  return (
    <motion.div
      initial={{ y: '100vh', x: 0 }}
      animate={{ y: '-120vh', x: [-15, 15, -15] }}
      transition={{ 
        y: { duration: 12 + Math.random() * 5, repeat: Infinity, ease: 'linear', delay },
        x: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay }
      }}
      className={cn("absolute -bottom-20 z-10 pointer-events-none", side === 'left' ? 'left-0' : 'right-0')}
      style={{
        [side]: offset,
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Heart shaped balloon */}
        <div style={{ color }} className="relative drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
          
          <Heart 
            size={56} 
            fill="currentColor" 
            strokeWidth={0} // Remove outline for a solid balloon feel
            className="vector-heart" 
          />

          {/* Artificial 3D shiny highlight to make it look like a balloon and not just an icon */}
          <div className="absolute top-[8px] left-[10px] w-2.5 h-6 bg-white/50 -rotate-[24deg] rounded-full blur-[2px]" />
          <div className="absolute top-[5px] left-[15px] w-1.5 h-3 bg-white/70 -rotate-[24deg] rounded-full blur-[1px]" />

          {/* Tiny romantic text message written in the middle of the balloon */}
          <div className="absolute inset-0 flex items-center justify-center mt-[-4px] pointer-events-none">
            <span className="text-[7px] font-black text-white/90 uppercase tracking-tighter leading-[1] text-center drop-shadow-md">
              I Love<br/>You
            </span>
          </div>

          {/* The small knotted tie exactly at the bottom of the heart */}
          <div 
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent" 
            style={{ borderBottomColor: color }} 
          />
        </div>
        
        {/* Floating white string hanging from the tie */}
        <div className="w-px h-24 bg-white/40 shadow-sm mt-1" />
      </div>
    </motion.div>
  );
};

const Balloons = () => {
  // Classic Romantic & Festive neon/pastel balloon colors
  const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#06d6a0', '#118ab2', '#8338ec', '#ff006e'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <React.Fragment key={`group-${i}`}>
          <Balloon 
            side="left"
            color={colors[i % colors.length]}
            delay={i * 2 + Math.random()}
            offset={`${2 + Math.random() * 12}%`} /* Stay on the left 2-14% width */
          />
          <Balloon 
            side="right"
            color={colors[(i + 4) % colors.length]}
            delay={i * 2 + Math.random() + 1}
            offset={`${2 + Math.random() * 12}%`} /* Stay on the right 2-14% width */
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Balloons;
