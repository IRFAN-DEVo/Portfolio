import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import { WashiTape, DoodleStar, StampBadge } from '@/components/ScrapbookDoodles';
import AnimatedContent from '@/components/AnimatedContent';
import { 
  getStoredExperience, 
  subscribeToExperienceUpdates, 
  getStoredEducation, 
  subscribeToEducationUpdates 
} from '@/lib/portfolioStorage';
import type { ExperienceItem, EducationItem } from '@/lib/types';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(getStoredExperience);
  const [educations, setEducations] = useState<EducationItem[]>(getStoredEducation);

  useEffect(() => {
    const unsubExp = subscribeToExperienceUpdates((exp) => setExperiences(exp));
    const unsubEdu = subscribeToEducationUpdates((edu) => setEducations(edu));
    return () => {
      unsubExp();
      unsubEdu();
    };
  }, []);

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <AnimatedContent distance={40} direction="vertical" duration={0.8} ease="power3.out">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 border-b-2 border-[#1e1b18]/15 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                  Section // 04
                </span>
                <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
              </div>
              <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#1e1b18]">
                Experience &amp; Education
              </h2>
              <p className="font-serif-vintage text-sm sm:text-base text-[#5a5045] mt-1">
                Chronological log of industrial internship experience and academic development.
              </p>
            </div>

            <StampBadge
              text="TIMELINE"
              subtext="VERIFIED HISTORY"
              color="#d4a373"
              className="self-start sm:self-auto"
            />
          </div>
        </AnimatedContent>

        {/* Timeline Content */}
        <div className="space-y-12">
          {/* ============================================================ */}
          {/* 1. PROFESSIONAL EXPERIENCE */}
          {/* ============================================================ */}
          <div>
            <AnimatedContent distance={30} direction="vertical" duration={0.6} ease="power3.out">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xs bg-[#cbb393] text-[#1e1b18] shadow-xs">
                  <Briefcase size={18} />
                </div>
                <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                  Professional Internship &amp; Experience
                </h3>
              </div>
            </AnimatedContent>

            {experiences.map((exp, idx) => (
              <AnimatedContent key={exp.id || idx} distance={50} direction="vertical" duration={0.85} ease="power3.out">
                <div className="relative bg-[#fffdf9] p-7 sm:p-9 rounded-sm shadow-[3px_6px_22px_rgba(45,30,15,0.12)] border border-[#e2d8c3] rotate-[-0.5deg] mb-6">
                  <WashiTape
                    className="w-28 h-6 -top-3 left-8"
                    variant="cream"
                    rotation="rotate-2"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1e1b18]/15 pb-4 mb-5">
                    <div>
                      <h4 className="font-handwritten text-3xl font-bold text-[#1e1b18]">
                        {exp.role}
                      </h4>
                      <p className="font-typewriter text-sm font-bold text-[#df6b5c] mt-0.5">
                        {exp.company} &bull; {exp.location}
                      </p>
                    </div>

                    <span className="font-typewriter text-xs font-bold px-3 py-1 bg-[#f6f1e7] rounded-full border border-[#1e1b18]/20 text-[#1e1b18] self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  {/* Responsibilities with hand-drawn checkmarks */}
                  <ul className="space-y-3 font-serif-vintage text-sm sm:text-base text-[#3d362e] leading-relaxed">
                    {exp.responsibilities.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={16}
                          className="text-[#5b8266] shrink-0 mt-1"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContent>
            ))}
          </div>

          {/* ============================================================ */}
          {/* 2. EDUCATION & ACADEMY */}
          {/* ============================================================ */}
          <div>
            <AnimatedContent distance={30} direction="vertical" duration={0.6} ease="power3.out">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xs bg-[#cbb393] text-[#1e1b18] shadow-xs">
                  <GraduationCap size={18} />
                </div>
                <h3 className="font-handwritten text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                  Education &amp; Academic Training
                </h3>
              </div>
            </AnimatedContent>

            <AnimatedContent
              distance={50}
              direction="vertical"
              stagger={0.12}
              duration={0.8}
              ease="power3.out"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {educations.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className={`relative lined-notebook p-6 sm:p-7 rounded-sm shadow-[2px_5px_18px_rgba(40,30,15,0.1)] border border-[#ded3be] ${
                    idx === 0 ? 'rotate-[0.8deg]' : 'rotate-[-0.8deg]'
                  }`}
                >
                  <WashiTape
                    className="w-24 h-6 -top-3 right-6"
                    variant={idx === 0 ? 'sage' : 'pink'}
                    rotation={idx === 0 ? '-rotate-1' : 'rotate-2'}
                  />

                  <div className="pl-4 border-l border-dashed border-[#df6b5c]/40">
                    <span className="font-typewriter text-[11px] font-bold text-[#df6b5c] uppercase tracking-wider">
                      {edu.period}
                    </span>
                    <h4 className="font-handwritten text-2xl font-bold text-[#1e1b18] mt-1 leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="font-serif-vintage text-sm text-[#5a5045] mt-1">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
}
