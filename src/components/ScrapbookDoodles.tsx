import React from 'react';

// Hand-drawn Python Logo Doodle (Authentic sketchbook style)
export const DoodlePython: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      {/* Fine diagonal pencil shading pattern */}
      <pattern id="pyHatch" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeWidth="0.85" opacity="0.18" />
      </pattern>
    </defs>

    {/* Secondary Ghost Sketch Underdrawing (Pencil Draft) */}
    <g opacity="0.28" transform="translate(1.4, 1.4)">
      <path
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008z"
        transform="translate(0 10.26)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268z"
        transform="translate(0 10.26)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </g>

    {/* Bottom Snake Segment */}
    <g transform="translate(0 10.26)">
      {/* Opaque Paper Mask */}
      <path
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268z"
        fill="#fbf9f4"
      />
      {/* Pencil Shading Fill */}
      <path
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268z"
        fill="url(#pyHatch)"
      />
      {/* Hand-drawn Outline */}
      <path
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Eye Dot */}
      <circle cx="77.8" cy="92.6" r="3.4" fill="currentColor" />
    </g>

    {/* Top Snake Segment */}
    <g transform="translate(0 10.26)">
      {/* Opaque Paper Mask */}
      <path
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008z"
        fill="#fbf9f4"
      />
      {/* Pencil Shading Fill */}
      <path
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008z"
        fill="url(#pyHatch)"
      />
      {/* Hand-drawn Outline */}
      <path
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Eye Dot */}
      <circle cx="50" cy="14.2" r="3.4" fill="currentColor" />
    </g>

    {/* Hand-drawn accent sketch lines */}
    <path d="M12 22 C16 16, 24 14, 28 17" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
    <path d="M116 98 C112 104, 104 106, 100 103" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
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

