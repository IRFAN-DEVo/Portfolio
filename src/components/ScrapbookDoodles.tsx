import React from 'react';

// Hand-drawn Python Logo Doodle (sketchbook style)
export const DoodlePython: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 130 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      {/* Hand-drawn pencil hatch pattern */}
      <pattern id="pythonHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      </pattern>
    </defs>

    {/* Secondary Ghost Sketch Contour (hand-drawn double line pencil stroke) */}
    <g opacity="0.32" transform="translate(1.2, 1.2)">
      <path
        d="M63.5 6 c-15.5 0-29.5 6.2-29.5 23.5 v17.5 h29.5 v6 h-42.5 c-11 0-20 9.5-20 25.5 c0 16 8 26 22.5 26 h14 v-19.5 c0-12 10.5-22.5 22.5-22.5 h34 c9.5 0 17-7.5 17-17 v-15.5 c0-15-13-23.5-28.5-23.5 h-11 z"
        fill="none"
        strokeWidth="1.2"
      />
      <circle cx="50" cy="24" r="4.5" fill="none" strokeWidth="1.2" />
      <path
        d="M66.5 124 c15.5 0 29.5-6.2 29.5-23.5 v-17.5 h-29.5 v-6 h42.5 c11 0 20-9.5 20-25.5 c0-16-8-26-22.5-26 h-14 v19.5 c0 12-10.5 22.5-22.5 22.5 h-34 c-9.5 0-17 7.5-17 17 v15.5 c0 15 13 23.5 28.5 23.5 h11 z"
        fill="none"
        strokeWidth="1.2"
      />
      <circle cx="80" cy="106" r="4.5" fill="none" strokeWidth="1.2" />
    </g>

    {/* Primary Hand-Drawn Snake 1 (Top segment) */}
    <path
      d="M64 5.5 c-16 0-30 6.5-30 24 v18 h30 v6 h-43 c-11.5 0-20.5 9.8-20.5 26.5 c0 16.8 8.5 27 23 27 h14.5 v-20.5 c0-12.2 10.8-23 23-23 h35 c9.8 0 17.5-7.7 17.5-17.5 v-16.5 c0-15.5-13.2-24.5-29-24.5 h-10.5 z"
      fill="url(#pythonHatch)"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    {/* Snake 1 Eye */}
    <circle cx="50.5" cy="23.5" r="4" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" />

    {/* Primary Hand-Drawn Snake 2 (Bottom segment) */}
    <path
      d="M66 124.5 c16 0 30-6.5 30-24 v-18 h-30 v-6 h43 c11.5 0 20.5-9.8 20.5-26.5 c0-16.8-8.5-27-23-27 h-14.5 v20.5 c0 12.2-10.8 23-23 23 h-35 c-9.8 0-17.5 7.7-17.5 17.5 v16.5 c0 15.5 13.2 24.5 29 24.5 h10.5 z"
      fill="url(#pythonHatch)"
      stroke="currentColor"
      strokeWidth="2.2"
    />
    {/* Snake 2 Eye */}
    <circle cx="79.5" cy="106.5" r="4" fill="currentColor" fillOpacity="0.85" stroke="currentColor" strokeWidth="1.5" />

    {/* Hand-drawn accent scribbles / motion dashes */}
    <path d="M14 18 C18 14, 24 12, 30 14" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
    <path d="M116 112 C112 116, 106 118, 100 116" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
  </svg>
);

// Delicate Hand-drawn Botanical Flower (matching the reference image on the left)
export const BotanicalFlower: React.FC<{ className?: string }> = ({ className = 'w-16 h-36' }) => (
  <svg
    viewBox="0 0 80 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Stem */}
    <path d="M40 175 C38 130, 42 70, 32 28" />
    <path d="M40 95 C48 85, 58 75, 62 65" />
    <path d="M38 125 C30 115, 20 110, 16 100" />
    <path d="M39 145 C46 138, 55 132, 60 122" />

    {/* Leaves */}
    <path d="M62 65 C58 55, 48 58, 40 85 C48 80, 58 75, 62 65 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M16 100 C12 90, 24 88, 38 115 C28 112, 18 108, 16 100 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M60 122 C55 112, 45 115, 39 138 C47 132, 56 128, 60 122 Z" fill="currentColor" fillOpacity="0.08" />

    {/* Main Top Flower */}
    <circle cx="32" cy="24" r="5" fill="#f6f1e7" stroke="currentColor" strokeWidth="1.8" />
    {/* Petals */}
    <ellipse cx="32" cy="12" rx="3.5" ry="6.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="32" cy="36" rx="3.5" ry="6.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="20" cy="24" rx="6.5" ry="3.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="44" cy="24" rx="6.5" ry="3.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="23" cy="15" rx="5" ry="3.5" transform="rotate(-40 23 15)" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="41" cy="33" rx="5" ry="3.5" transform="rotate(-40 41 33)" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="23" cy="33" rx="5" ry="3.5" transform="rotate(40 23 33)" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="41" cy="15" rx="5" ry="3.5" transform="rotate(40 41 15)" fill="currentColor" fillOpacity="0.06" />

    {/* Secondary Lower Flower */}
    <circle cx="63" cy="63" r="3.5" fill="#f6f1e7" stroke="currentColor" strokeWidth="1.6" />
    <ellipse cx="63" cy="54" rx="2.5" ry="4.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="63" cy="72" rx="2.5" ry="4.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="54" cy="63" rx="4.5" ry="2.5" fill="currentColor" fillOpacity="0.06" />
    <ellipse cx="72" cy="63" rx="4.5" ry="2.5" fill="currentColor" fillOpacity="0.06" />
  </svg>
);

// Realistic Washi Tape
export const WashiTape: React.FC<{
  className?: string;
  variant?: 'cream' | 'pink' | 'sage' | 'kraft';
  rotation?: string;
}> = ({ className = 'w-28 h-7', variant = 'cream', rotation = '-rotate-2' }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'pink':
        return 'washi-tape-pink';
      case 'sage':
        return 'washi-tape-sage';
      case 'kraft':
        return 'bg-[#ba9d77]/75 border-y border-[#a88a62]/50';
      default:
        return 'washi-tape';
    }
  };

  return (
    <div
      className={`absolute z-30 pointer-events-none select-none rounded-[1px] ${rotation} ${getVariantClass()} ${className}`}
      style={{
        clipPath: 'polygon(3% 0%, 97% 2%, 100% 98%, 0% 96%)',
      }}
    />
  );
};

// Hand-Drawn Doodle Arrow
export const DoodleArrow: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 18 C25 12, 45 20, 48 38 C49 43, 44 48, 38 46 C34 44, 38 36, 46 42" />
    <path d="M42 34 L48 42 L38 44" />
  </svg>
);

// Hand-drawn Star (✦)
export const DoodleStar: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
  >
    <path d="M15 2 L15 28 M2 15 L28 15 M6 6 L24 24 M6 24 L24 6" />
  </svg>
);

// Hand-drawn Heart
export const DoodleHeart: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 25 C12 21, 4 16, 4 9 C4 5, 8 3, 11 4 C13 5, 14 7, 15 9 C16 7, 17 5, 19 4 C22 3, 26 5, 26 9 C26 16, 18 21, 15 25 Z" />
  </svg>
);

// Organic Ink Splatter (matching reference bottom right)
export const InkSplatter: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 60 60"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    opacity="0.85"
  >
    <circle cx="30" cy="30" r="10" />
    <path d="M30 20 C28 12, 33 10, 31 4 C29 10, 31 16, 30 20 Z" />
    <path d="M40 30 C48 31, 52 28, 56 31 C50 33, 44 31, 40 30 Z" />
    <path d="M22 36 C16 43, 10 46, 6 52 C12 47, 18 42, 22 36 Z" />
    <circle cx="48" cy="18" r="2.2" />
    <circle cx="16" cy="14" r="1.8" />
    <circle cx="42" cy="48" r="2.5" />
    <circle cx="20" cy="48" r="1.5" />
    <circle cx="52" cy="39" r="1.2" />
  </svg>
);

// Hand-drawn Cool Sunglasses Smiley Sticker
export const CoolSmileySticker: React.FC<{ className?: string }> = ({
  className = 'w-14 h-14',
}) => (
  <div className={`relative inline-block select-none ${className}`}>
    <img
      src="/images/cool_smiley.png"
      alt="Cool Sunglasses Smiley"
      className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-[1px_2px_5px_rgba(40,25,15,0.18)]"
      draggable={false}
    />
  </div>
);

// Retro Smiley Sticker (legacy)
export const SmileySticker: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <div
    className={`rounded-full bg-[#f6b7c2] border border-[#e89aa8] flex items-center justify-center shadow-md select-none ${className}`}
    style={{
      boxShadow: '0 3px 8px rgba(60, 30, 40, 0.15)',
    }}
  >
    <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#542d34]" fill="currentColor">
      {/* Eyes */}
      <circle cx="14" cy="15" r="2.5" />
      <circle cx="26" cy="15" r="2.5" />
      {/* Hand-drawn smile */}
      <path
        d="M12 24 C14 29, 26 29, 28 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// Vintage Rubber Stamp
export const StampBadge: React.FC<{
  text?: string;
  subtext?: string;
  color?: string;
  className?: string;
}> = ({ text = 'MOHAMMED IRFAN', subtext = 'BACKEND DEV', color = '#df6b5c', className = '' }) => (
  <div
    className={`inline-flex flex-col items-center justify-center p-2 rounded-full border-2 border-dashed uppercase font-typewriter select-none rotate-[-6deg] opacity-85 ${className}`}
    style={{ borderColor: color, color }}
  >
    <span className="text-[9px] tracking-widest font-bold">{text}</span>
    <span className="text-[7px] tracking-wider mt-0.5 opacity-90">{subtext}</span>
  </div>
);

