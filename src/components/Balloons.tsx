import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const Balloon = ({ color, delay, side, offset }: { color: string, delay: number, side: 'left' | 'right', offset: string }) => {
  return (
    <motion.div
      initial={{ y: '100vh', x: 0 }}
      animate={{ y: '-120vh', x: [-15, 15, -15] }}
      transition={{ 
        y: { duration: 12 + Math.random() * 5, repeat: Infinity, ease: 'linear', delay },
        x: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay }
      }}
      className={cn("absolute -bottom-20 z-50 pointer-events-none", side === 'left' ? 'left-0' : 'right-0')}
      style={{
        [side]: offset,
      }}
    >
      <div 
        style={{
          width: '50px',
          height: '65px',
          backgroundColor: color,
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.4)',
        }}
        className="relative shadow-md"
      >
        {/* Balloon tie */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent" style={{ borderBottomColor: color }} />
        {/* String */}
        <div className="absolute -bottom-24 left-1/2 w-px h-24 bg-white/40 shadow-sm" />
      </div>
    </motion.div>
  );
};

const Balloons = () => {
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
