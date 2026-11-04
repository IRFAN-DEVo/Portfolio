import { useState } from 'react';
import IntroSequenceOverlay from '@/components/IntroSequenceOverlay';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [introDone, setIntroDone] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('irfan_intro_viewed') === 'true') {
      return true;
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans antialiased selection:bg-[#ff5c3d]/20 selection:text-[#ff5c3d]">
      {/* 
        Intro Animation Sequence (Stages 1 - 5):
        Black Screen -> Glowing Dot -> Exclamation (!) -> IRFAN -> PORTFOLIO -> Horizontal Split
      */}
      {!introDone && (
        <IntroSequenceOverlay
          wordmark="IRFAN"
          onComplete={() => setIntroDone(true)}
        />
      )}

      {/* Sticky Monospace Navigation with ScrollSpy & Mobile Drawer */}
      <Navbar isVisible={true} />

      {/* Hero Section with Focal Stippled Particle Portrait Canvas */}
      <HeroSection />

      {/* Core Single-Page Sections */}
      <main className="relative z-10">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Minimal Monospace Footer */}
      <Footer />
    </div>
  );
}
