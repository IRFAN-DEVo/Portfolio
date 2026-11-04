import { motion } from 'framer-motion';
import { Server, Layout, Database, Wrench, Cpu, CheckCircle } from 'lucide-react';
import { SKILLS_CATEGORIZED } from '@/lib/constants';

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Backend':
        return <Server size={18} className="text-white" />;
      case 'Frontend':
        return <Layout size={18} className="text-white" />;
      case 'Database':
        return <Database size={18} className="text-white" />;
      case 'Tools':
        return <Wrench size={18} className="text-white" />;
      default:
        return <Cpu size={18} className="text-white" />;
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="service" className="py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.08] relative bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 mb-4 block font-mono-code">
            02 // The Stack &amp; Capabilities
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
            WHAT I CAN DO
          </h2>
          <div className="w-16 h-[2px] bg-white mt-4" />
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {Object.entries(SKILLS_CATEGORIZED).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/30 transition-all group"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#141414] border border-white/10 group-hover:border-white/40 transition-colors">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white tracking-tight">
                      {category}
                    </h3>
                    <span className="text-[10px] font-mono-code text-gray-500 uppercase tracking-widest">
                      Engineering Domain
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono-code text-gray-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  {skills.length} core skills
                </span>
              </div>

              {/* Skill Badges */}
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#121212] text-gray-200 border border-white/[0.08] hover:border-white/40 hover:text-white transition-all text-xs font-mono-code cursor-default shadow-sm"
                  >
                    <CheckCircle size={13} className="text-gray-400" />
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
