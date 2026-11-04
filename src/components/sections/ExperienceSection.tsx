import { motion } from 'framer-motion';
import { Calendar, MapPin, Activity, CheckCircle } from 'lucide-react';
import { EXPERIENCE_DATA } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold uppercase tracking-widest text-[#ff5c3d] mb-3">
            <Activity size={14} />
            <span>04 // WORK EXPERIENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Professional Trajectory
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5c3d] mt-3" />
        </motion.div>

        {/* Timeline Container with animated line */}
        <div className="relative">
          {/* Animated vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff5c3d] via-white/20 to-transparent -translate-x-1/2" />

          {EXPERIENCE_DATA.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center justify-between mb-12 last:mb-0 w-full"
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-[#ff5c3d] ring-4 ring-[#050505] shadow-[0_0_15px_rgba(255,92,61,0.8)]" />

                {/* Card placement: Alternating on desktop, offset on mobile */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className={`pl-12 md:pl-0 w-full md:w-[45%] ${
                    isEven ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                  }`}
                >
                  <div className="p-7 rounded-2xl portfolio-card hover:border-[#ff5c3d]/40 transition-all">
                    {/* Period badge & type */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#ff5c3d] bg-[#ff5c3d]/10 px-2.5 py-1 rounded-full border border-[#ff5c3d]/30">
                        Internship &bull; {exp.duration}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#777777]">
                        <Calendar size={13} className="text-[#ff5c3d]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#A0A0A0] mb-5">
                      <span className="text-white font-medium">{exp.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[#777777]">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Bullet Points of Impact */}
                    <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                      {exp.responsibilities.map((resp: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                          <CheckCircle size={14} className="text-[#ff5c3d] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
