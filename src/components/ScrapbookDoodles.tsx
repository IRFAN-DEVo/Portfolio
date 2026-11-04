import React from 'react';

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

// Retro Smiley Sticker (matching reference top pink sticker)
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

