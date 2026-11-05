import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Lanyard from '@/components/Lanyard';
import {
  DoodlePython,
  WashiTape,
  DoodleArrow,
  DoodleStar,
  InkSplatter,
  CoolSmileySticker,
} from '@/components/ScrapbookDoodles';

export default function HeroSection() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Clean Django Architecture', done: true },
    { id: 2, text: 'High-Throughput REST APIs', done: true },
    { id: 3, text: 'Concurrency & PostgreSQL', done: true },
    { id: 4, text: 'React Full-Stack Systems', done: true },
    { id: 5, text: 'Ship next big innovation', done: false },
  ]);

  // Spring physics mimicking physical paper/cardboard thrown onto a desk
  const throwPhysics = {
    type: 'spring' as const,
    stiffness: 240,
    damping: 22,
    mass: 1.1,
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 75;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Outer Decorative Sketch Border Container (matching reference photo border) */}
      <div className="relative w-full max-w-7xl mx-auto border-2 border-[#2b251f]/20 rounded-2xl p-4 sm:p-8 lg:p-12 bg-[#f4efe5]/60 shadow-[0_4px_30px_rgba(50,35,20,0.06)]">
        {/* Subtle Inner Border Frame */}
        <div className="absolute inset-2 sm:inset-3 border border-[#2b251f]/10 rounded-xl pointer-events-none" />

        {/* Hand-Drawn Python Symbol in Background */}
        <div className="hidden lg:block absolute left-4 sm:left-6 top-14 sm:top-18 text-[#2b251f]/75 pointer-events-none select-none rotate-[-4deg]">
          <DoodlePython className="w-24 h-24 xl:w-28 xl:h-28" />
        </div>

        {/* Four Corner Hand-Drawn Crosshairs */}
        <div className="absolute top-4 left-4 text-[#2b251f]/30 font-typewriter text-xs select-none">+</div>
        <div className="absolute top-4 right-4 text-[#2b251f]/30 font-typewriter text-xs select-none">+</div>
        <div className="absolute bottom-4 left-4 text-[#2b251f]/30 font-typewriter text-xs select-none">+</div>
        <div className="absolute bottom-4 right-4 text-[#2b251f]/30 font-typewriter text-xs select-none">+</div>

        {/* Main Collage Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* ============================================================ */}
          {/* 1. LEFT CARD: TORN KRAFT PAPER CARD (Craft systems, not just code) */}
          {/* Thrown onto the desk from top-left with spring momentum */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: -380, y: -200, rotate: -50, scale: 1.4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: -1.8, scale: 1 }}
            transition={throwPhysics}
            className="lg:col-span-5 relative bg-[#cbb393] text-[#1e1b18] p-7 sm:p-9 rounded-sm shadow-[3px_6px_20px_rgba(50,35,15,0.18)]"
            style={{
              clipPath: 'polygon(0% 1%, 98% 0%, 100% 97%, 1% 100%)',
            }}
          >
            {/* Top Washi Tape */}
            <WashiTape
              className="w-32 h-7 -top-3.5 left-12"
              variant="cream"
              rotation="rotate-1"
            />

            {/* Handwritten Main Heading */}
            <h1 className="font-handwritten text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-[#1e1b18] mb-4">
              Craft systems, <br />
              <span className="relative inline-block">
                not just code.
                {/* Hand-drawn squiggly underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#1e1b18]"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5 Q 50 1, 100 5 T 200 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle / Bio Paragraph */}
            <p className="font-serif-vintage text-base sm:text-lg text-[#322c25] leading-relaxed mt-6 mb-7">
              Mohammed Irfan K is a Python / Django backend engineer building
              concurrency-safe architectures, high-throughput REST APIs, and
              resilient full-stack applications with React.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button
                onClick={() => scrollTo('#projects')}
                className="group px-6 py-3 bg-[#1e1b18] text-[#f6f1e7] rounded-sm font-typewriter text-xs sm:text-sm uppercase tracking-wider font-bold flex items-center gap-2 hover:bg-[#df6b5c] transition-colors shadow-md active:scale-95"
              >
                <span>Explore Work</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="font-typewriter text-xs sm:text-sm uppercase tracking-wider text-[#1e1b18] font-bold underline underline-offset-4 decoration-2 decoration-[#1e1b18]/50 hover:decoration-[#df6b5c] hover:text-[#df6b5c] transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 2. CENTER: 3D INTERACTIVE LANYARD BADGE (OVER EVERYTHING) */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-4 flex flex-col items-center justify-center relative my-4 lg:my-0 z-30 lg:-mx-8"
          >
            {/* Top Washi Tape pinned above the lanyard anchor */}
            <WashiTape
              className="w-40 h-8 -top-3 z-40"
              variant="cream"
              rotation="-rotate-1"
            />

            {/* Cool Sunglasses Smiley Sticker Overlap */}
            <div className="absolute -top-6 -left-3 sm:-left-4 z-50 pointer-events-none rotate-[-6deg]">
              <CoolSmileySticker className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>

            {/* 3D Lanyard Canvas Container */}
            <div className="w-full h-[520px] sm:h-[570px] max-w-[380px] relative flex flex-col items-center justify-center">
              <Lanyard
                frontImage="/images/irfan_portrait.jpg"
                backImage="/images/card_back.svg"
                cardColor="#f6f1e7"
                strapColor="#1e1b18"
                metal="silver"
                finish="glossy"
                size={0.62}
                strapLength={0.46}
                strapWidth={0.7}
                gravity={1.2}
                damping={0.55}
                elasticity={0.45}
                breeze={0.35}
                interactive={true}
                intro={true}
              />

              {/* Interaction Hint Pill */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1e1b18]/80 text-[#f6f1e7] text-[10px] font-mono-code tracking-wider uppercase backdrop-blur-sm pointer-events-none opacity-70 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#df6b5c] animate-pulse" />
                <span>Drag &amp; Click to Flip</span>
              </div>
            </div>

            {/* Handwritten Dossier Caption */}
            <div className="mt-1 px-3 py-1.5 flex items-center justify-between w-full max-w-[340px] bg-[#fffdfa]/90 border border-[#e8dfcf] rounded-sm shadow-sm">
              <div>
                <p className="font-handwritten text-lg font-bold text-[#1e1b18] leading-tight">
                  Mohammed Irfan K
                </p>
                <p className="font-typewriter text-[10px] text-[#5a5045] tracking-wide">
                  Python / Django Developer &bull; Verified ID
                </p>
              </div>
              <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 3. RIGHT CARD: NOTEBOOK PAPER CHECKLIST (TODAY / SKILLS) */}
          {/* Thrown onto the desk from top-right with staggered delay */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: 380, y: -200, rotate: 50, scale: 1.4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 2, scale: 1 }}
            transition={{ ...throwPhysics, delay: 0.15 }}
            className="lg:col-span-3 relative lined-notebook p-6 sm:p-7 rounded-sm shadow-[2px_5px_18px_rgba(40,30,15,0.14)] border border-[#e2d6c4]"
          >
            {/* Top Washi Tape */}
            <WashiTape
              className="w-24 h-6 -top-3 right-6"
              variant="sage"
              rotation="rotate-2"
            />

            {/* Checklist Header */}
            <div className="flex items-center justify-between border-b-2 border-[#1e1b18]/20 pb-2 mb-4">
              <h2 className="font-typewriter text-base font-bold uppercase tracking-widest text-[#1e1b18]">
                TODAY:
              </h2>
              <span className="font-handwritten text-xs text-[#5a5045]">Active Focus</span>
            </div>

            {/* Interactive Checklist Items */}
            <div className="space-y-3 font-handwritten text-lg sm:text-xl text-[#1e1b18]">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-2.5 cursor-pointer group select-none"
                >
                  <div
                    className={`w-5 h-5 rounded-[2px] border-2 border-[#1e1b18] flex items-center justify-center transition-all ${
                      task.done ? 'bg-[#1e1b18] text-[#f6f1e7]' : 'bg-[#fffdf9]'
                    }`}
                  >
                    {task.done && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span
                    className={`transition-all ${
                      task.done
                        ? 'line-through text-[#5a5045]'
                        : 'text-[#1e1b18] group-hover:text-[#df6b5c]'
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Doodle Arrow at bottom */}
            <div className="mt-6 pt-3 flex items-center justify-end text-[#1e1b18]">
              <DoodleArrow className="w-10 h-10 rotate-[-15deg] text-[#1e1b18]/70" />
            </div>

            {/* Ink Splatter at bottom corner */}
            <div className="absolute -bottom-4 -right-3 text-[#1e1b18] pointer-events-none">
              <InkSplatter className="w-11 h-11" />
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM CENTER: TAPED QUOTE STICKY NOTE (from reference) */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 120, rotate: 10, scale: 1.25 }}
          animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
          transition={{ ...throwPhysics, delay: 0.3 }}
          className="mt-8 sm:mt-10 max-w-md mx-auto relative bg-[#e7dfcf] border border-[#d2c5b0] p-4 sm:p-5 rounded-xs shadow-[2px_4px_12px_rgba(40,25,10,0.1)] rotate-[-1deg]"
        >
          {/* Top Tape */}
          <WashiTape
            className="w-28 h-6 -top-3 left-1/2 -translate-x-1/2"
            variant="pink"
            rotation="-rotate-1"
          />

          <p className="font-handwritten text-lg sm:text-xl text-[#221e1a] text-center leading-snug">
            &ldquo;The little details? The clean architecture? <br />
            They aren&apos;t little.&rdquo;
          </p>
          <p className="font-typewriter text-[11px] text-[#5a5045] text-right mt-1.5 uppercase tracking-wider">
            &mdash; Mohammed Irfan K.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
