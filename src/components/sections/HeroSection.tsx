import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import ParticlePortraitCanvas from '@/components/ParticlePortraitCanvas';

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-end justify-center overflow-hidden bg-cover bg-center select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #252525 0%, #050505 75%, #000000 100%)',
      }}
    >
      {/* Background Soft Glow & Vignette */}
      <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] pointer-events-none" />

      {/* Full Viewport 3D Particle Portrait Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full pointer-events-auto z-10 overflow-hidden"
      >
        <ParticlePortraitCanvas
          imageSrc="/images/particle_reference.jpg"
          className="w-full h-full"
        />
      </motion.div>

      {/* Bottom Composition: PORTFOLIO + Role + Contact CTAs */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 flex flex-col justify-end pointer-events-none">
        {/* Giant Metallic Chrome Heading */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[16vw] md:text-[11rem] lg:text-[14.5rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 pointer-events-auto"
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))',
          }}
        >
          PORTFOLIO
        </motion.h1>

        {/* Lower Row: Role on left, Arrow & Contact Pill on right */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-1 sm:mt-2 pointer-events-auto">
          {/* Role: Bold White + Light Italic */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-2xl md:text-3xl text-white drop-shadow-md flex items-center gap-2"
          >
            <span className="font-bold tracking-tight">Python / Django</span>
            <span className="font-light italic text-gray-400 font-serif">Developer</span>
          </motion.div>

          {/* Action Buttons matching screenshot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3.5"
          >
            {/* Circular Arrow Button (Scroll to About) */}
            <button
              onClick={() => scrollTo('#about')}
              aria-label="Scroll down to explore"
              className="w-12 h-12 rounded-full border border-white/20 hover:border-white bg-[#0e0e0e]/70 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg group"
            >
              <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Contact Pill Button */}
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3 rounded-full border border-white/20 hover:border-white bg-[#0e0e0e]/70 backdrop-blur-md text-xs sm:text-sm font-medium tracking-wider uppercase text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Contact
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
