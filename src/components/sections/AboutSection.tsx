import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Compass, ShieldCheck, Check } from 'lucide-react';
import { SITE_CONFIG, EDUCATION_DATA } from '@/lib/constants';

export default function AboutSection() {
  const stats = [
    { value: '1+', label: 'Years Experience', sub: 'Backend & QA Testing' },
    { value: '4+', label: 'Projects Built', sub: 'Production-Minded Architectures' },
    { value: '100%', label: 'API Test Coverage', sub: 'Validated in Postman' },
    { value: '18+', label: 'Tech Stack Skills', sub: 'Django, React & PostgreSQL' },
  ];

  const highlights = [
    'Architecting concurrency-safe REST API backends with Django REST Framework and PostgreSQL.',
    'Cryptographic token signing and offline verification using ES256 elliptic curve.',
    'Designing relational database models with explicit constraints, indexing, and transactional isolation.',
    'Hardening backends with JWT authentication, custom role-based permissions (RBAC), and audit logging.',
    'Integrated multi-provider payments (Razorpay, Stripe, COD) in a unified checkout flow.',
    'Hands-on QA and API testing experience across client endpoints, status codes, and redirect chains.',
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative bg-[#050505]">
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
            <Compass size={14} />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Engineering with Reliability &amp; Precision
          </h2>
          <div className="w-12 h-[2px] bg-[#ff5c3d] mt-3" />
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Short First-Person Bio Text */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-7 sm:p-9 rounded-2xl portfolio-card">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4">
                Hi, I'm Mohammed Irfan K
              </h3>

              <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed mb-4 font-light">
                I'm a <strong className="text-white font-medium">Python/Django Backend Developer</strong> based in{' '}
                <span className="text-[#EDEDED]">{SITE_CONFIG.location}</span> who builds secure, production-minded REST APIs, licensing backends, and payment-integrated web applications with Django REST Framework and PostgreSQL.
              </p>

              <p className="text-sm text-[#999999] leading-relaxed mb-4 font-light">
                I also work comfortably with <strong className="text-white font-medium">React</strong> on the frontend to deliver unified full-stack experiences. My background includes hands-on QA testing and API validation (Amazon APIs, redirect mapping, crawl audit checks) that strongly drives my habit of writing reliable, well-documented, and concurrency-safe code.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono-code text-[#777777] pt-4 border-t border-white/[0.08]">
                <MapPin size={14} className="text-[#ff5c3d] shrink-0" />
                <span>Available for on-site &amp; remote positions</span>
              </div>
            </div>

            {/* Core Competencies Checklist */}
            <div className="p-7 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#ff5c3d]" />
                <span>Architectural Foundations</span>
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#AAAAAA]">
                    <div className="w-4 h-4 rounded-full bg-[#ff5c3d]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#ff5c3d]/30">
                      <Check size={11} className="text-[#ff5c3d]" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stats & Highlights Grid + Education */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 space-y-6"
          >
            {/* 2x2 Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-[#ff5c3d]/40 transition-colors"
                >
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#ff5c3d] mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs font-mono-code font-semibold text-white uppercase tracking-wider mb-1">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-[#777777] font-light leading-snug">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="p-7 rounded-2xl portfolio-card">
              <div className="flex items-center gap-2.5 text-base font-display font-bold text-white mb-5">
                <GraduationCap size={20} className="text-[#ff5c3d]" />
                <h3>Education &amp; Credentials</h3>
              </div>

              <div className="space-y-5">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5 border-l border-white/15 hover:border-[#ff5c3d] transition-colors"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#ff5c3d]" />
                    <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-[#A0A0A0] inline-block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#888888] mt-0.5">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
