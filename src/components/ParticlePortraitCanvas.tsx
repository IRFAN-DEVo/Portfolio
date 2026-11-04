import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ParticlePortraitProps {
  imageSrc?: string;
  className?: string;
}

export default function ParticlePortraitCanvas({
  imageSrc = '/images/particle_reference.jpg',
  className = '',
}: ParticlePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize randomized background stars
    const starCount = width < 768 ? 90 : 180;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.6 + 0.15,
      baseAlpha: Math.random() * 0.6 + 0.15,
      speed: Math.random() * 0.2 + 0.05,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      twinklePhase: Math.random() * Math.PI * 2,
    }));
    starsRef.current = stars;

    // Load portrait and sample pixel brightness
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const isMobile = width < 768;

      // Calculate responsive portrait bounding box
      const targetSize = isMobile ? Math.min(300, width * 0.85) : Math.min(420, width * 0.5, height * 0.55);
      const aspect = img.height / img.width;
      const targetW = targetSize;
      const targetH = targetSize * aspect;

      offscreen.width = targetW;
      offscreen.height = targetH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, targetW, targetH);
      const imgData = offCtx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      const particles: Particle[] = [];
      const step = isMobile ? 4 : 3;

      // Position portrait centered in canvas
      const startX = width / 2 - targetW / 2;
      const startY = height / 2 - targetH / 2 - (isMobile ? 15 : 25);

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const idx = (y * targetW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Compute luminance value
          const brightness = r * 0.299 + g * 0.587 + b * 0.114;

          // Only create particle for visible features
          if (a > 40 && brightness > 30) {
            const posX = startX + x;
            const posY = startY + y;

            // Dot size and brightness mapped to pixel luminance
            const normalizedBrightness = brightness / 255;
            const baseSize = 0.8 + normalizedBrightness * 1.1;
            const baseAlpha = 0.35 + normalizedBrightness * 0.65;

            // Pure stippled monochrome dot colors
            const shade = Math.min(255, Math.floor(brightness + 30));
            const color = `rgb(${shade}, ${shade}, ${shade})`;

            particles.push({
              x: posX,
              y: posY,
              originX: posX,
              originY: posY,
              vx: 0,
              vy: 0,
              size: baseSize,
              baseSize,
              alpha: baseAlpha,
              baseAlpha,
              twinkleSpeed: Math.random() * 0.05 + 0.02,
              twinklePhase: Math.random() * Math.PI * 2,
              color,
            });
          }
        }
      }

      particlesRef.current = particles;
    };

    img.onerror = () => {
      img.src = '/images/profile.jpg';
    };

    // Mouse movement interaction handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Continuous 60fps render loop
    let time = 0;
    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Starfield Particles
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < 0) s.y = height;

        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(0.9, s.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.fill();
      }

      // 2. Draw Stippled Portrait Particles with Physics & Repulsion
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      const repelRadius = 85;
      const repelForce = 3.5;
      const springFactor = 0.05;
      const friction = 0.88;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft cursor repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * repelForce;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring return to original position
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * springFactor;
        p.vy += homeDy * springFactor;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Organic micro-twinkle
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = Math.sin(p.twinklePhase) * 0.18;
        const currentAlpha = Math.max(0.2, Math.min(1, p.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imageSrc]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full select-none ${className}`}
    />
  );
}
