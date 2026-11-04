import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HandDrawnLoaderProps {
  /** Optional callback fired when progress hits 100% and fade-out completes */
  onComplete?: () => void;
  /** Speed / duration factor for simulated loading (default ~1800ms) */
  duration?: number;
}

/**
 * HandDrawnLoader
 * Minimalistic, hand-sketched loading screen matching the scrapbook portfolio aesthetic.
 * Features hand-drawn sketched borders, pencil-hatch fill, handwritten typography,
 * and smooth Framer Motion percentage & width animation.
 */
export default function HandDrawnLoader({
  onComplete,
  duration = 1800,
}: HandDrawnLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Calculate interval step based on total duration
    const totalSteps = 100;
    const baseInterval = Math.max(12, Math.floor(duration / totalSteps));

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Small organic jitter in increments to mimic human/natural loading
        const step = Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 1;
        const next = Math.min(100, prev + step);

        if (next === 100) {
          clearInterval(interval);
          // Brief pause at 100% before fading out
          setTimeout(() => {
            setIsVisible(false);
          }, 250);
        }
        return next;
      });
    }, baseInterval);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="hand-drawn-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf8f5] select-none cursor-wait"
          style={{
            // Subtle paper grain background
            backgroundImage: `radial-gradient(#e8e0d5 0.75px, transparent 0.75px), radial-gradient(#efe7dc 0.75px, #faf8f5 0.75px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* Centered Loading Container */}
          <div className="flex flex-col items-center w-full px-6">
            {/* 1. Percentage Text Centered Directly Above Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-handwritten text-3xl sm:text-4xl text-[#2b251f] font-bold tracking-wider mb-4 leading-none"
              style={{
                fontFamily: "'Kalam', 'Caveat', cursive",
              }}
            >
              {progress}%
            </motion.div>

            {/* 2. Sketched Loading Bar Outer Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] h-7 sm:h-8">
              {/* Secondary Ghost Sketch Line (mimics natural pencil double-stroke from reference) */}
              <div
                className="absolute inset-0 pointer-events-none border border-[#2b251f]/35"
                style={{
                  borderRadius: '240px 18px 235px 14px / 14px 240px 14px 235px',
                  transform: 'scale(1.015, 1.1) translate(0.5px, 0.5px)',
                }}
              />

              {/* Tertiary faint bottom sketch line */}
              <div
                className="absolute -bottom-0.5 left-2 right-3 h-[1px] bg-[#2b251f]/25 pointer-events-none"
                style={{
                  transform: 'rotate(-0.3deg)',
                }}
              />

              {/* Main Hand-Drawn Bar Container */}
              <div
                className="relative w-full h-full border-2 border-[#2b251f] overflow-hidden bg-[#faf8f5]/80"
                style={{
                  // Hand-drawn sketchy border radius trick
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}
              >
                {/* 3. Inner Fill with Pencil Hatch Texture */}
                <motion.div
                  className="h-full relative overflow-hidden"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    mass: 0.8,
                  }}
                  style={{
                    backgroundColor: '#2b251f',
                    // Diagonal pencil hatch stroke texture matching the reference photo
                    backgroundImage: `repeating-linear-gradient(
                      -55deg,
                      rgba(250, 248, 245, 0.12) 0px,
                      rgba(250, 248, 245, 0.12) 1.5px,
                      transparent 1.5px,
                      transparent 4px
                    )`,
                    // Slightly uneven hand-drawn edge on the inner fill
                    borderRadius: '255px 12px 180px 12px / 12px 180px 12px 255px',
                  }}
                >
                  {/* Subtle highlight scribble on inner fill top edge */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10" />

                  {/* Right edge sketch pencil shading border */}
                  <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#1e1b18] opacity-80" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
