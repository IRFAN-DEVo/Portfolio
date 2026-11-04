import { motion } from 'framer-motion';
import { ArrowDown, Mail, ArrowUpRight } from 'lucide-react';
import ParticlePortraitCanvas from '@/components/ParticlePortraitCanvas';
import TypingRole from '@/components/TypingRole';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const githubLink = SOCIAL_LINKS.find((s) => s.id === 'github')?.url || 'https://github.com/IRFAN-DEVo';
  const linkedinLink = SOCIAL_LINKS.find((s) => s.id === 'linkedin')?.url || 'https://linkedin.com/in/mohammed-irfan-a4b3153b3';

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#050505]"
    >
      {/* Background radial gradient glow for subtle depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff5c3d]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center w-full">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111]/90 border border-white/10 text-xs font-mono-code text-[#A0A0A0] mb-6 backdrop-blur-md shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5c3d] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5c3d]" />
          </span>
          <span>Available for Roles &amp; Projects</span>
        </motion.div>

        {/* Focal Visual: Animated Particle / Dot-Matrix Portrait Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square my-2 flex items-center justify-center"
        >
          {/* Subtle circular boundary ring */}
          <div className="absolute inset-0 rounded-full border border-white/[0.06] pointer-events-none" />
          
          <ParticlePortraitCanvas
            imageSrc="/images/particle_reference.jpg"
            className="w-full h-full rounded-full overflow-hidden"
          />
        </motion.div>

        {/* Main Headline: "Hi, I'm IRFAN" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-3">
            Hi, I'm <span className="gradient-headline">IRFAN</span>
          </h1>

          {/* Animated Typing Subtitle Cycling Roles */}
          <div className="text-base sm:text-xl md:text-2xl font-mono-code text-[#ff5c3d] font-medium h-9 flex items-center justify-center">
            <TypingRole
              roles={[
                'Python / Django Developer',
                'Backend Systems Engineer',
                'REST API & PostgreSQL Specialist',
                'React & Full-Stack Builder',
              ]}
              typingSpeed={75}
              deletingSpeed={40}
              pauseTime={2000}
            />
          </div>
        </motion.div>

        {/* Concise Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-[#999999] max-w-xl mx-auto mt-4 mb-8 leading-relaxed font-light"
        >
          Building secure, production-minded REST APIs, licensing backends, and payment-integrated web apps with Django REST Framework, PostgreSQL, and React. Backed by rigorous hands-on QA testing.
        </motion.p>

        {/* Two CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,92,61,0.25)] hover:shadow-[0_0_35px_rgba(255,92,61,0.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View Projects</span>
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => scrollTo('#contact')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111111] border border-white/15 hover:border-white text-white font-mono-code font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-white/[0.04] hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
          >
            <Mail size={15} />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Social Profile Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d]/50 hover:bg-white/[0.04] transition-all hover:scale-105"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d]/50 hover:bg-white/[0.04] transition-all hover:scale-105"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label="Send Email"
            className="p-3 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d]/50 hover:bg-white/[0.04] transition-all hover:scale-105"
            title="Email"
          >
            <Mail size={18} />
          </a>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.button
          onClick={() => scrollTo('#about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-[#666666] hover:text-white transition-colors flex flex-col items-center gap-1.5 focus:outline-none group"
        >
          <span className="text-[10px] font-mono-code uppercase tracking-widest text-[#888888] group-hover:text-white transition-colors">
            Scroll to Explore
          </span>
          <ArrowDown size={14} className="animate-bounce text-[#ff5c3d]" />
        </motion.button>
      </div>
    </section>
  );
}
