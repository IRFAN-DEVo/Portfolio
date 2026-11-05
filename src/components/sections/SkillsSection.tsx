import { useState, useEffect } from 'react';
import { Server, Layout, Database, Wrench } from 'lucide-react';
import { WashiTape, DoodleStar, StampBadge } from '@/components/ScrapbookDoodles';
import AnimatedContent from '@/components/AnimatedContent';
import { getStoredSkills, subscribeToSkillsUpdates } from '@/lib/portfolioStorage';
import type { SkillCategoryGroup } from '@/lib/types';

export default function SkillsSection() {
  const [categories, setCategories] = useState<SkillCategoryGroup[]>(getStoredSkills);

  useEffect(() => {
    const unsub = subscribeToSkillsUpdates((skills) => setCategories(skills));
    return () => unsub();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return Server;
      case 'Layout':
        return Layout;
      case 'Database':
        return Database;
      case 'Wrench':
      default:
        return Wrench;
    }
  };

  const getCardStyle = (variant: SkillCategoryGroup['variant']) => {
    switch (variant) {
      case 'kraft':
        return 'bg-[#cbb393] text-[#1e1b18] border border-[#b89e7a]';
      case 'lined':
        return 'lined-notebook border border-[#ded3be] text-[#1e1b18]';
      case 'grid':
        return 'grid-notebook border border-[#d2dfdd] text-[#1e1b18]';
      case 'parchment':
      default:
        return 'bg-[#fffdf9] border border-[#e2d8c3] text-[#1e1b18]';
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-24 px-3.5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedContent distance={40} direction="vertical" duration={0.8} ease="power3.out">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-14 border-b-2 border-[#1e1b18]/15 pb-4 sm:pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                  Section // 02
                </span>
                <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
              </div>
              <h2 className="font-handwritten text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b18]">
                Skills &amp; Technologies
              </h2>
              <p className="font-serif-vintage text-sm sm:text-base text-[#5a5045] mt-1">
                Categorized index of verified backend, frontend, database, and tooling capabilities.
              </p>
            </div>

            <StampBadge
              text="TECH INDEX"
              subtext="NO FAKE METRICS"
              color="#df6b5c"
              className="self-start sm:self-auto"
            />
          </div>
        </AnimatedContent>

        {/* 4 Scrapbook Category Note Cards with Staggered GSAP Entry */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          stagger={0.12}
          staggerFrom="start"
          duration={0.8}
          ease="power3.out"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {categories.map((group, idx) => {
            const Icon = getIcon(group.iconName);
            return (
              <div
                key={group.id || group.category}
                className={`relative p-5 sm:p-7 lg:p-8 rounded-sm shadow-[3px_6px_22px_rgba(45,30,15,0.12)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.01] ${group.rotation || ''} ${getCardStyle(
                  group.variant
                )}`}
              >
                {/* Washi Tape at Top */}
                <WashiTape
                  className="w-24 sm:w-28 h-6 sm:h-7 -top-3 sm:-top-3.5 left-6 sm:left-10"
                  variant={group.tapeVariant}
                  rotation={idx % 2 === 0 ? '-rotate-1' : 'rotate-2'}
                />

                {/* Card Title */}
                <div className="flex items-center justify-between border-b-2 border-[#1e1b18]/15 pb-3 mb-5 sm:mb-6">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/20 text-[#1e1b18] shadow-xs">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-handwritten text-xl sm:text-2xl font-bold text-[#1e1b18]">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-typewriter text-[10px] sm:text-[11px] text-[#5a5045] uppercase">
                    ({group.skills.length}) Items
                  </span>
                </div>

                {/* Skill Badges / Stamped Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col px-3.5 py-2 rounded-xs bg-[#f6f1e7]/85 border border-[#1e1b18]/20 hover:border-[#1e1b18] transition-all hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <span className="font-typewriter text-xs font-bold text-[#1e1b18]">
                        {skill.name}
                      </span>
                      <span className="font-handwritten text-[11px] text-[#df6b5c] font-medium leading-none mt-0.5">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
