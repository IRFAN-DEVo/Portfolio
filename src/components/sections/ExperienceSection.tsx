import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCE_DATA } from '@/lib/constants';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.08] relative bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 mb-4 block font-mono-code">
            04 // Professional trajectory
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
            CAREER EXPERIENCE
          </h2>
          <div className="w-16 h-[2px] bg-white mt-4" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated vertical timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/80 via-white/20 to-transparent -translate-x-1/2" />

          {EXPERIENCE_DATA.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center justify-between mb-12 last:mb-0 w-full"
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-white ring-4 ring-[#050505] shadow-[0_0_15px_rgba(255,255,255,0.9)]" />

                {/* Card placement */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className={`pl-12 md:pl-0 w-full md:w-[46%] ${
                    isEven ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'
                  }`}
                >
                  <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/30 transition-all shadow-xl">
                    {/* Period badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        Internship &bull; {exp.duration}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono-code text-gray-400">
                        <Calendar size={13} className="text-white" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-display text-2xl font-bold text-white mb-1.5 tracking-tight">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400 mb-6">
                      <span className="text-white font-medium">{exp.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-3.5 pt-5 border-t border-white/[0.08]">
                      {exp.responsibilities.map((resp: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                          <CheckCircle size={15} className="text-white shrink-0 mt-0.5" />
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
