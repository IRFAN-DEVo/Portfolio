import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroAnimationProps {
  wordmark?: string;
  onComplete?: () => void;
}

export default function IntroSequenceOverlay({
  wordmark = 'IRFAN',
  onComplete,
}: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const exclRef = useRef<SVGSVGElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const portfolioTextRef = useRef<HTMLDivElement>(null);
  const portLeftRef = useRef<HTMLSpanElement>(null);
  const folioRightRef = useRef<HTMLSpanElement>(null);

  // Stages:
  // 1: Dot falling
  // 2: Exclamation point (!)
  // 3: IRFAN
  // 4: Morph to PORTFOLIO
  // 5: Split PORT / FOLIO and reveal
  const [stage, setStage] = useState<number>(1);
  const [displayText, setDisplayText] = useState<string>(wordmark);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Check if intro has already run in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('irfan_intro_viewed') === 'true') {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
          sessionStorage.setItem('irfan_intro_viewed', 'true');
          if (onComplete) onComplete();
        },
      });

      // STAGE 1: Dot drops from top of viewport to center (0s -> 0.75s)
      tl.set(dotRef.current, { y: -300, scale: 0.8, opacity: 0 });
      tl.to(dotRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.inOut',
      });

      // STAGE 2: Dot transforms into Exclamation Mark (!) (0.75s -> 1.4s)
      tl.to(dotRef.current, {
        scaleY: 2.2,
        scaleX: 0.4,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setStage(2),
      });

      tl.fromTo(
        exclRef.current,
        { scaleY: 0.2, scaleX: 1.8, opacity: 0 },
        { scaleY: 1, scaleX: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
      );

      // Pulse exclamation point briefly
      tl.to(exclRef.current, {
        scale: 1.1,
        filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.95))',
        duration: 0.35,
        yoyo: true,
        repeat: 1,
      });

      // STAGE 3: Exclamation mark stretches & morphs into IRFAN (1.75s -> 2.6s)
      tl.to(exclRef.current, {
        scaleX: 3.5,
        scaleY: 0.1,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setStage(3);
          setDisplayText(wordmark);
        },
      });

      tl.fromTo(
        wordmarkRef.current,
        { scaleX: 0.2, scaleY: 2.2, opacity: 0, filter: 'blur(16px)' },
        {
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
        }
      );

      // Hold IRFAN proudly
      tl.to({}, { duration: 0.85 });

      // STAGE 4: IRFAN letters morph into PORTFOLIO (3.45s -> 4.4s)
      tl.call(() => {
        setStage(4);
        const targetWord = 'PORTFOLIO';
        const startWord = wordmark;
        let progress = 0;

        const interval = setInterval(() => {
          progress += 0.18;
          const current = targetWord
            .split('')
            .map((char, idx) => {
              if (idx < Math.floor(progress * targetWord.length)) {
                return char;
              }
              return idx < startWord.length ? startWord[idx] : char;
            })
            .join('');

          setDisplayText(current);

          if (progress >= 1) {
            clearInterval(interval);
            setDisplayText(targetWord);
          }
        }, 40);
      });

      tl.to({}, { duration: 0.95 });

      // STAGE 5: PORTFOLIO splits horizontally: "PORT" to left, "FOLIO" to right (4.4s -> 5.5s)
      tl.call(() => setStage(5));

      const splitDist = typeof window !== 'undefined' && window.innerWidth < 768 ? 95 : 240;

      tl.to(portLeftRef.current, {
        x: -splitDist,
        duration: 1.2,
        ease: 'power3.out',
      });

      tl.to(
        folioRightRef.current,
        {
          x: splitDist,
          duration: 1.2,
          ease: 'power3.out',
        },
        '<'
      );

      // Fade out intro overlay to reveal homepage and particle portrait
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        pointerEvents: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [wordmark, onComplete]);

  const handleSkip = () => {
    setIsFinished(true);
    sessionStorage.setItem('irfan_intro_viewed', 'true');
    if (onComplete) onComplete();
  };

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] text-white select-none overflow-hidden"
    >
      {/* Skip Intro Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-50 px-4 py-2 rounded-full bg-[#111111]/80 border border-white/20 hover:border-white text-xs font-mono-code uppercase tracking-wider text-[#A0A0A0] hover:text-white transition-all backdrop-blur-md"
      >
        Skip Intro &rarr;
      </button>

      {/* STAGE 1: Glowing Dropping Dot */}
      {stage === 1 && (
        <div
          ref={dotRef}
          className="w-5 h-5 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.95)]"
        />
      )}

      {/* STAGE 2: Exclamation Mark (!) */}
      {stage === 2 && (
        <svg
          ref={exclRef}
          viewBox="0 0 100 140"
          className="w-24 h-32 sm:w-32 sm:h-40 drop-shadow-[0_0_35px_rgba(255,255,255,0.85)]"
        >
          <path
            d="M 44 14 L 56 14 L 53 82 L 47 82 Z"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="108" r="8" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      )}

      {/* STAGE 3 & 4: Wordmark (IRFAN -> PORTFOLIO) */}
      {(stage === 3 || stage === 4) && (
        <div ref={wordmarkRef} className="text-center px-4">
          <h1
            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter uppercase leading-none"
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 15%, #E5E5E5 40%, #707070 70%, #A3A3A3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 20px 50px rgba(255, 255, 255, 0.2))',
            }}
          >
            {displayText}
          </h1>
          {stage === 3 && (
            <p className="text-xs sm:text-sm font-mono-code uppercase tracking-[0.3em] text-[#888888] mt-4 animate-pulse">
              Python / Django Developer
            </p>
          )}
        </div>
      )}

      {/* STAGE 5: PORTFOLIO Horizontal Split */}
      {stage === 5 && (
        <div
          ref={portfolioTextRef}
          className="flex items-center justify-center font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase leading-none whitespace-nowrap px-4"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 15%, #DCDCDC 42%, #4F4F4F 72%, #8A8A8A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <span ref={portLeftRef} className="inline-block">
            PORT
          </span>
          <span ref={folioRightRef} className="inline-block">
            FOLIO
          </span>
        </div>
      )}
    </div>
  );
}

