import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Check, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, EDUCATION_DATA } from '@/lib/constants';

export default function AboutSection() {
  const stats = [
    { value: '1+', label: 'Years Experience', sub: 'Backend & QA Testing' },
    { value: '4+', label: 'Production Projects', sub: 'Concurrency-Safe Architectures' },
    { value: '100%', label: 'API Test Coverage', sub: 'Verified Endpoints in Postman' },
    { value: '18+', label: 'Core Technologies', sub: 'Django, React & PostgreSQL' },
  ];

  const corePrinciples = [
    'Architecting concurrency-safe REST API backends using Django REST Framework and PostgreSQL.',
    'Designing relational database schemas with explicit constraints, indexing, and transactional isolation.',
    'Cryptographic token signing and offline verification using ES256 elliptic curve.',
    'Hardening systems with JWT authentication, custom role-based permissions (RBAC), and audit logging.',
    'Automating multi-provider payment flows (Razorpay, Stripe, Cash on Delivery) in unified checkouts.',
    'Execution of rigorous API validation and website audits with Postman (Amazon APIs, redirect mapping).',
  ];

  return (
    <section id="about" className="py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.08] relative bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Tracker & Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 mb-4 block font-mono-code">
            01 // About me
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
            ENGINEERING WITH DISCIPLINE
          </h2>
          <div className="w-16 h-[2px] bg-white mt-4" />
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative on Left */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] backdrop-blur-xl">
              <h3 className="font-display text-2xl font-bold text-white mb-5 tracking-tight">
                Hi, I'm Mohammed Irfan K
              </h3>

              <p className="text-base text-gray-300 leading-relaxed mb-5 font-light">
                I'm a <strong className="text-white font-semibold">Python/Django Backend Developer</strong> based in{' '}
                <span className="text-white">{SITE_CONFIG.location}</span> who builds secure, production-minded REST APIs, licensing backends, and payment-integrated web applications with Django REST Framework and PostgreSQL.
              </p>

              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 font-light">
                I also build with <strong className="text-white font-semibold">React</strong> on the frontend to deliver responsive, seamless full-stack applications. Backed by hands-on QA testing and API validation (Amazon APIs, redirect mapping, crawl audits), I prioritize writing reliable, well-documented, and concurrency-safe code that withstands real-world traffic spikes.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono-code text-gray-400 pt-5 border-t border-white/[0.08]">
                <MapPin size={15} className="text-white shrink-0" />
                <span>Available for on-site &amp; remote developer roles</span>
              </div>
            </div>

            {/* Architectural Highlights Checklist */}
            <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <ArrowRight size={14} className="text-white" />
                <span>Core Architectural Principles</span>
              </h4>
              <div className="grid grid-cols-1 gap-3.5">
                {corePrinciples.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                      <Check size={11} className="text-white" />
                    </div>
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats & Education on Right */}
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
                  className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/30 transition-all"
                >
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-1.5">
                    {s.value}
                  </div>
                  <div className="text-xs font-mono-code font-bold text-gray-300 uppercase tracking-wider mb-1">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-gray-500 font-light leading-snug">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Credentials */}
            <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
              <div className="flex items-center gap-2.5 text-base font-display font-bold text-white mb-6">
                <GraduationCap size={20} className="text-white" />
                <h3>Education &amp; Credentials</h3>
              </div>

              <div className="space-y-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5 border-l border-white/20 hover:border-white transition-colors"
                  >
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/[0.06] text-gray-400 inline-block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
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
