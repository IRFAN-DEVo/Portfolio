import Navbar from '@/components/Navbar';
import ScrapbookCanvas from '@/components/ScrapbookCanvas';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#1e1b18] font-serif-vintage antialiased selection:bg-[#df6b5c]/25 selection:text-[#1e1b18] relative">
      {/* Interactive Paper Dust & Ambient Ink Canvas */}
      <ScrapbookCanvas />

      {/* Sticky Handcrafted Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Core Single-Page Sections */}
      <main className="relative z-10">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Handcrafted Vintage Footer */}
      <Footer />
    </div>
  );
}
