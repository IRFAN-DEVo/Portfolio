import { useState, useEffect } from 'react';
import { ExternalLink, FolderGit2, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStoredProjects, saveStoredProjects, subscribeToProjectUpdates } from '@/lib/projectStorage';
import type { Project } from '@/lib/types';
import { WashiTape, DoodleStar, StampBadge } from '@/components/ScrapbookDoodles';
import AnimatedContent from '@/components/AnimatedContent';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);

  useEffect(() => {
    // Subscribe to immediate cross-tab / local storage updates
    const unsubscribe = subscribeToProjectUpdates((updated) => {
      setProjects(updated);
    });

    async function loadProjects() {
      if (!isSupabaseConfigured) {
        setProjects(getStoredProjects());
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          setProjects(data);
          saveStoredProjects(data);
        }
      } catch {
        // Fallback to verified local SEED_PROJECTS
        setProjects(getStoredProjects());
      }
    }

    loadProjects();
    return () => unsubscribe();
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#efe8dc]/40">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimatedContent distance={40} direction="vertical" duration={0.8} ease="power3.out">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 border-b-2 border-[#1e1b18]/15 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                  Section // 03
                </span>
                <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
              </div>
              <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#1e1b18]">
                Featured Projects
              </h2>
              <p className="font-serif-vintage text-sm sm:text-base text-[#5a5045] mt-1">
                Production backends, cryptographic licensing engines, and full-stack systems.
              </p>
            </div>

            <StampBadge
              text="ARCHIVE"
              subtext="VERIFIED REPOS"
              color="#5b8266"
              className="self-start sm:self-auto"
            />
          </div>
        </AnimatedContent>

        {/* Project Archival Dossiers Grid with Staggered GSAP */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          stagger={0.14}
          staggerFrom="start"
          duration={0.85}
          ease="power3.out"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className={`relative bg-[#fffdf9] p-7 sm:p-8 rounded-sm shadow-[3px_6px_24px_rgba(45,30,15,0.12)] border border-[#e2d8c3] transition-all duration-300 hover:scale-[1.015] hover:shadow-[5px_12px_32px_rgba(45,30,15,0.18)] ${
                idx % 2 === 0 ? 'rotate-[-0.8deg]' : 'rotate-[0.8deg]'
              }`}
            >
              {/* Washi Tape Strip */}
              <WashiTape
                className="w-28 h-7 -top-3.5 right-10"
                variant={idx % 3 === 0 ? 'cream' : idx % 3 === 1 ? 'pink' : 'sage'}
                rotation={idx % 2 === 0 ? 'rotate-2' : '-rotate-2'}
              />

              {/* Top Dossier Index Header */}
              <div className="flex items-center justify-between border-b border-[#1e1b18]/15 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <FolderGit2 size={16} className="text-[#df6b5c]" />
                  <span className="font-typewriter text-[11px] uppercase tracking-widest text-[#7a7065] font-bold">
                    Dossier // 0{idx + 1}
                  </span>
                </div>

                {proj.featured && (
                  <span className="font-handwritten text-xs font-bold text-[#df6b5c] px-2 py-0.5 rounded-full border border-[#df6b5c]/30 bg-[#df6b5c]/5">
                    ★ Key Architecture
                  </span>
                )}
              </div>

              {/* Project Title */}
              <h3 className="font-handwritten text-3xl font-bold text-[#1e1b18] mb-2 leading-tight">
                {proj.title}
              </h3>

              {/* Short Description */}
              <p className="font-serif-vintage text-sm sm:text-base text-[#423d38] leading-relaxed mb-5">
                {proj.short_description}
              </p>

              {/* Tech Stack Stamped Tags */}
              <div className="mb-6">
                <p className="font-typewriter text-[10px] uppercase text-[#7a7065] tracking-wider mb-2 font-bold">
                  Technologies Applied:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech_stack.map(tech => (
                    <span
                      key={tech}
                      className="font-typewriter text-[11px] px-2.5 py-1 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/20 text-[#1e1b18]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1e1b18]/15 flex items-center justify-between">
                <a
                  href={proj.github_url || 'https://github.com/IRFAN-DEVo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-wider font-bold text-[#1e1b18] hover:text-[#df6b5c] transition-colors py-1.5 px-3 rounded-xs border border-[#1e1b18]/30 hover:border-[#df6b5c] bg-[#f6f1e7]/60"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                {proj.is_live_enabled !== false && proj.live_url ? (
                  <a
                    href={proj.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-typewriter text-xs uppercase tracking-wider font-bold text-[#df6b5c] hover:text-[#b84a3c] bg-[#df6b5c]/10 hover:bg-[#df6b5c]/20 border border-[#df6b5c]/40 py-1.5 px-3 rounded-xs transition-all shadow-2xs group"
                    title={`Visit live domain: ${proj.live_url}`}
                  >
                    <span>Live Domain</span>
                    <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="font-handwritten text-xs text-[#7a7065] flex items-center gap-1.5 py-1.5 px-2.5 border border-dashed border-[#1e1b18]/15 rounded-xs bg-[#fbf9f4]">
                    <CheckCircle2 size={13} className="text-[#5b8266]" />
                    Backend Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
