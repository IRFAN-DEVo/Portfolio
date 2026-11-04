import { motion } from 'framer-motion';
import { Server, Layout, Database, Wrench, Cpu, CheckCircle } from 'lucide-react';
import { SKILLS_CATEGORIZED } from '@/lib/constants';

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backend':
        return <Server size={18} className="text-[#ff5c3d]" />;
      case 'Frontend':
        return <Layout size={18} className="text-[#ff5c3d]" />;
      case 'Database':
        return <Database size={18} className="text-[#ff5c3d]" />;
      case 'Tools':
        return <Wrench size={18} className="text-[#ff5c3d]" />;
      default:
        return <Cpu size={18} className="text-[#ff5c3d]" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold uppercase tracking-widest text-[#ff5c3d] mb-3">
            <Cpu size={14} />
            <span>02 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Core Technologies &amp; Tools
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5c3d] mt-3" />
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(SKILLS_CATEGORIZED).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="p-7 rounded-2xl portfolio-card group hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#141414] border border-white/10 group-hover:border-[#ff5c3d]/50 transition-colors">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-white transition-colors">
                      {category}
                    </h3>
                    <span className="text-[10px] font-mono-code text-[#777777] uppercase tracking-wider">
                      Specialized Stack
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono-code text-[#888888] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  {skills.length} skills
                </span>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e0e0e] text-[#D0D0D0] border border-white/[0.08] hover:border-[#ff5c3d]/50 hover:text-white hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all text-xs font-mono-code cursor-default"
                  >
                    <CheckCircle size={12} className="text-[#ff5c3d]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
