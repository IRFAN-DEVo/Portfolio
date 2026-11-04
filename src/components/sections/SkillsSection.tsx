import { motion } from 'framer-motion';
import { Server, Layout, Database, Wrench } from 'lucide-react';
import { WashiTape, DoodleStar, StampBadge } from '@/components/ScrapbookDoodles';

interface SkillGroup {
  category: string;
  icon: typeof Server;
  variant: 'kraft' | 'lined' | 'grid' | 'parchment';
  tapeVariant: 'cream' | 'pink' | 'sage';
  rotation: string;
  skills: { name: string; tag: string }[];
}

const skillCategories: SkillGroup[] = [
  {
    category: 'Backend Architecture',
    icon: Server,
    variant: 'kraft',
    tapeVariant: 'cream',
    rotation: '-rotate-1',
    skills: [
      { name: 'Python', tag: 'Core Language' },
      { name: 'Django', tag: 'Web Framework' },
      { name: 'Django REST Framework', tag: 'API Engine' },
      { name: 'RESTful API Design', tag: 'Contract-First' },
      { name: 'Concurrency Safety', tag: 'Transactions' },
      { name: 'Authentication & JWT', tag: 'Security' },
    ],
  },
  {
    category: 'Frontend Engineering',
    icon: Layout,
    variant: 'lined',
    tapeVariant: 'pink',
    rotation: 'rotate-1',
    skills: [
      { name: 'JavaScript (ES6+)', tag: 'Client Logic' },
      { name: 'React', tag: 'Component UI' },
      { name: 'Tailwind CSS', tag: 'Utility Styling' },
      { name: 'HTML5 & CSS3', tag: 'Semantic Layout' },
      { name: 'Framer Motion', tag: 'Micro-Interactions' },
      { name: 'Vite', tag: 'Bundler' },
    ],
  },
  {
    category: 'Databases & Storage',
    icon: Database,
    variant: 'grid',
    tapeVariant: 'sage',
    rotation: '-rotate-1.5',
    skills: [
      { name: 'PostgreSQL', tag: 'Production RDBMS' },
      { name: 'SQLite', tag: 'Local & Prototyping' },
      { name: 'Supabase', tag: 'Postgres & Auth' },
      { name: 'Schema Normalization', tag: 'Data Integrity' },
      { name: 'Query Optimization', tag: 'Indexing' },
    ],
  },
  {
    category: 'Developer Tools',
    icon: Wrench,
    variant: 'parchment',
    tapeVariant: 'cream',
    rotation: 'rotate-1.5',
    skills: [
      { name: 'Git & GitHub', tag: 'Version Control' },
      { name: 'Docker', tag: 'Containerization' },
      { name: 'Postman', tag: 'API Testing' },
      { name: 'Linux / Bash', tag: 'Environment' },
      { name: 'Vercel', tag: 'CI/CD Deployment' },
    ],
  },
];

export default function SkillsSection() {
  const getCardStyle = (variant: SkillGroup['variant']) => {
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
    <section id="skills" className="relative py-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 border-b-2 border-[#1e1b18]/15 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                Section // 02
              </span>
              <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
            </div>
            <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#1e1b18]">
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

        {/* 4 Scrapbook Category Note Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {skillCategories.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative p-7 sm:p-8 rounded-sm shadow-[3px_6px_22px_rgba(45,30,15,0.12)] transition-transform duration-300 hover:rotate-0 hover:scale-[1.01] ${group.rotation} ${getCardStyle(
                  group.variant
                )}`}
              >
                {/* Washi Tape at Top */}
                <WashiTape
                  className="w-28 h-7 -top-3.5 left-10"
                  variant={group.tapeVariant}
                  rotation={idx % 2 === 0 ? '-rotate-1' : 'rotate-2'}
                />

                {/* Card Title */}
                <div className="flex items-center justify-between border-b-2 border-[#1e1b18]/15 pb-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/20 text-[#1e1b18] shadow-xs">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-handwritten text-2xl font-bold text-[#1e1b18]">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-typewriter text-[11px] text-[#5a5045] uppercase">
                    ({group.skills.length}) Items
                  </span>
                </div>

                {/* Skill Badges / Stamped Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map(skill => (
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
