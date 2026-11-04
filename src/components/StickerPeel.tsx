import React, { useState, useRef, useCallback } from 'react';

export interface StickerPeelProps {
  imageSrc: string;
  width?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  curlRadius?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  backColor?: string;
  followPointer?: boolean;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onReady?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

type Corner = 'tr' | 'tl' | 'br' | 'bl';

export default function StickerPeel({
  imageSrc,
  peelBackHoverPct = 26,
  peelBackActivePct = 42,
  backColor = '#ede4d4',
  followPointer = true,
  draggable = true,
  onDragStart,
  onDragEnd,
  className = '',
  style,
}: StickerPeelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [corner, setCorner] = useState<Corner>('tr');

  // Track cursor position to select nearest corner smoothly
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!followPointer || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Hysteresis threshold: only switch when firmly in a quadrant
      if (x > 0.52 && y < 0.48) setCorner('tr');
      else if (x < 0.48 && y < 0.48) setCorner('tl');
      else if (x > 0.52 && y > 0.52) setCorner('br');
      else if (x < 0.48 && y > 0.52) setCorner('bl');
    },
    [followPointer]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setPressed(true);
    containerRef.current?.setPointerCapture?.(e.pointerId);
    onDragStart?.();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setPressed(false);
    containerRef.current?.releasePointerCapture?.(e.pointerId);
    onDragEnd?.();
  };

  // Peel depth calculation (px)
  const isPeeled = hovered || pressed;
  const currentPct = pressed ? peelBackActivePct : isPeeled ? peelBackHoverPct : 0;
  // Curl size in pixels based on standard 340px width
  const curlSize = Math.round((currentPct / 100) * 280);

  // Dynamic clip-paths for front photo based on active corner
  const getClipPath = () => {
    if (!isPeeled || curlSize <= 2) return 'none';
    const c = curlSize;
    switch (corner) {
      case 'tr':
        return `polygon(0 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% 100%, 0 100%)`;
      case 'tl':
        return `polygon(${c}px 0, 100% 0, 100% 100%, 0 100%, 0 ${c}px)`;
      case 'br':
        return `polygon(0 0, 100% 0, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, 0 100%)`;
      case 'bl':
        return `polygon(0 0, 100% 0, 100% 100%, ${c}px 100%, 0 calc(100% - ${c}px))`;
    }
  };

  const clipPath = getClipPath();

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-full select-none overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      style={{
        touchAction: 'none',
        ...style,
      }}
    >
      {/* ======================================================== */}
      {/* 1. Underlying Polaroid Card Texture (under the peel)     */}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 bg-[#e8dfcf] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d5c9b4 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
        }}
      />

      {/* ======================================================== */}
      {/* 2. Soft Realistic Curved Shadow cast under the curled flap*/}
      {/* ======================================================== */}
      <div
        className={`absolute pointer-events-none transition-all duration-300 ease-out ${
          isPeeled ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          top: corner.includes('t') ? 0 : 'auto',
          bottom: corner.includes('b') ? 0 : 'auto',
          left: corner.includes('l') ? 0 : 'auto',
          right: corner.includes('r') ? 0 : 'auto',
          width: `${curlSize * 1.5}px`,
          height: `${curlSize * 1.5}px`,
          background: `radial-gradient(ellipse at ${
            corner === 'tr'
              ? '0% 100%'
              : corner === 'tl'
              ? '100% 100%'
              : corner === 'br'
              ? '0% 0%'
              : '100% 0%'
          }, rgba(35, 22, 10, 0.45) 0%, rgba(35, 22, 10, 0.18) 45%, transparent 75%)`,
          filter: 'blur(5px)',
        }}
      />

      {/* ======================================================== */}
      {/* 3. The Front Photo (Cleanly clipped with smooth transition)*/}
      {/* ======================================================== */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
        }}
      >
        <img
          src={imageSrc}
          alt="Mohammed Irfan K — Python / Django Backend Developer"
          className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01]"
          draggable={false}
          loading="eager"
        />

        {/* Ambient Vinyl Specular Gloss */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 35%, transparent 65%)',
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 4. Curled Vinyl Peel Flap (Showing realistic back & sheen)*/}
      {/* ======================================================== */}
      <div
        className={`absolute pointer-events-none transition-all duration-300 ease-out ${
          isPeeled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          top: corner.includes('t') ? 0 : 'auto',
          bottom: corner.includes('b') ? 0 : 'auto',
          left: corner.includes('l') ? 0 : 'auto',
          right: corner.includes('r') ? 0 : 'auto',
          width: `${curlSize}px`,
          height: `${curlSize}px`,
        }}
      >
        {/* Curled Flap with Vinyl Paper Backing */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundColor: backColor,
            backgroundImage: `linear-gradient(${
              corner === 'tr'
                ? '225deg'
                : corner === 'tl'
                ? '135deg'
                : corner === 'br'
                ? '315deg'
                : '45deg'
            }, rgba(255,255,255,0.45) 0%, rgba(240,230,215,0.95) 45%, rgba(195,180,160,0.85) 100%)`,
            clipPath:
              corner === 'tr'
                ? 'polygon(0 0, 100% 0, 0 100%)'
                : corner === 'tl'
                ? 'polygon(0 0, 100% 0, 100% 100%)'
                : corner === 'br'
                ? 'polygon(100% 100%, 0 100%, 100% 0)'
                : 'polygon(0 100%, 100% 100%, 0 0)',
            boxShadow: '0 6px 14px rgba(30, 20, 10, 0.28)',
            borderBottomRightRadius: corner === 'tl' ? '3px' : '0',
            borderBottomLeftRadius: corner === 'tr' ? '3px' : '0',
            borderTopRightRadius: corner === 'bl' ? '3px' : '0',
            borderTopLeftRadius: corner === 'br' ? '3px' : '0',
          }}
        >
          {/* Subtle Cylindrical Highlight along the fold edge */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              background: `linear-gradient(${
                corner === 'tr'
                  ? '45deg'
                  : corner === 'tl'
                  ? '-45deg'
                  : corner === 'br'
                  ? '-45deg'
                  : '45deg'
              }, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
