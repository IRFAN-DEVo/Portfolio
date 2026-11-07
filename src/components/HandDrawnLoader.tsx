import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HandDrawnLoaderProps {
  /** Callback fired immediately when progress hits 100% and bar is fully filled */
  onLoaded?: () => void;
  /** Optional callback fired when progress hits 100% and fade-out completes */
  onComplete?: () => void;
  /** Speed / duration factor for simulated loading in ms (default 1800ms) */
  duration?: number;
}

/**
 * HandDrawnLoader
 * Minimalistic, hand-sketched loading screen matching the scrapbook portfolio aesthetic.
 * Features hand-drawn sketched borders, pencil-hatch fill, handwritten typography,
 * and synchronized percentage & width animation.
 */
export default function HandDrawnLoader({
  onLoaded,
  onComplete,
  duration = 1800,
}: HandDrawnLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Store callbacks in refs so they never recreate effects or desynchronize
  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let animFrameId: number;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / duration);

      // Natural ease-out cubic curve: starts briskly, smoothly glides to 100%
      const eased = 1 - Math.pow(1 - ratio, 2.4);
      const current = Math.min(100, Math.round(eased * 100));

      setProgress(current);

      if (ratio < 1) {
        animFrameId = requestAnimationFrame(update);
      } else {
        // Ensure 100% is explicitly rendered
        setProgress(100);

        // Hold at 100% with the full bar for 300ms so the completed 100% state is clearly visible
        setTimeout(() => {
          // Mount home page content now that loading has fully finished
          onLoadedRef.current?.();
          // Begin smoothly dissolving the loading screen
          setIsVisible(false);
        }, 300);
      }
    };

    animFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animFrameId);
  }, [duration]);

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current?.()}>
      {isVisible && (
        <motion.div
          key="hand-drawn-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf8f5] select-none cursor-wait"
          style={{
            // Subtle paper grain background matching scrapbook style
            backgroundImage: `radial-gradient(#e8e0d5 0.75px, transparent 0.75px), radial-gradient(#efe7dc 0.75px, #faf8f5 0.75px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        >
          {/* Centered Loading Container */}
          <div className="flex flex-col items-center w-full px-6">
            {/* 1. Percentage Text Centered Directly Above Loading Bar */}
            <div
              className="font-handwritten text-3xl sm:text-4xl text-[#2b251f] font-bold tracking-wider mb-4 leading-none select-none"
              style={{
                fontFamily: "'Kalam', 'Caveat', cursive",
              }}
            >
              {progress}%
            </div>

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
                className="relative w-full h-full border-2 border-[#2b251f] overflow-hidden bg-[#faf8f5]"
                style={{
                  // Hand-drawn sketchy border radius
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                }}
              >
                {/* 3. Inner Fill with Diagonal Pencil Hatch Texture */}
                <div
                  className="h-full relative overflow-hidden transition-[width] duration-75 ease-linear"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: '#2b251f',
                    // Diagonal pencil hatch stroke texture matching the reference photo
                    backgroundImage: `repeating-linear-gradient(
                      -55deg,
                      rgba(250, 248, 245, 0.14) 0px,
                      rgba(250, 248, 245, 0.14) 1.5px,
                      transparent 1.5px,
                      transparent 4px
                    )`,
                    // Uneven hand-drawn border curve that completes neatly at 100%
                    borderRadius:
                      progress >= 96
                        ? '255px 15px 225px 15px / 15px 225px 15px 255px'
                        : '255px 4px 4px 15px / 15px 4px 4px 255px',
                  }}
                >
                  {/* Subtle highlight scribble on inner fill top edge */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10" />

                  {/* Right edge sketch pencil shading border */}
                  <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#1e1b18] opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
