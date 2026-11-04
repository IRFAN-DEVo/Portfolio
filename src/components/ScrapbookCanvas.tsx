import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  rotation: number;
  vRot: number;
}

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function ScrapbookCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Warm paper fiber specks / ambient dust
    const speckCount = Math.min(50, Math.floor(width / 35));
    const particles: Particle[] = Array.from({ length: speckCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.35 + 0.1,
      baseAlpha: Math.random() * 0.35 + 0.1,
      rotation: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.02,
    }));

    // Interactive subtle ink ripples
    const inkDrops: InkDrop[] = [];
    const handlePointerMove = (e: MouseEvent) => {
      if (Math.random() < 0.25) {
        inkDrops.push({
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.random() * 14 + 10,
          alpha: 0.18,
        });
        if (inkDrops.length > 25) inkDrops.shift();
      }
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let animId = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw paper specks
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(160, 140, 115, ${p.alpha})`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      }

      // Draw subtle ink ripples
      for (let i = inkDrops.length - 1; i >= 0; i--) {
        const drop = inkDrops[i];
        drop.radius += 0.4;
        drop.alpha *= 0.95;

        if (drop.alpha < 0.01 || drop.radius > drop.maxRadius) {
          inkDrops.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(90, 70, 50, ${drop.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

