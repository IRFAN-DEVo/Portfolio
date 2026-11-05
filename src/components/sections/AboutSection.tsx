import { Terminal, Database, Cpu, Layers, GitBranch, ShieldCheck } from 'lucide-react';
import { WashiTape, DoodleStar, StampBadge } from '@/components/ScrapbookDoodles';
import AnimatedContent from '@/components/AnimatedContent';

export default function AboutSection() {
  const highlights = [
    {
      icon: Terminal,
      title: 'Python & Django Core',
      desc: 'Building robust, maintainable backend applications with Django and Django REST Framework.',
    },
    {
      icon: Cpu,
      title: 'Concurrency & Scalability',
      desc: 'Designing race-condition-free endpoints, atomic transactions, and background queues.',
    },
    {
      icon: Database,
      title: 'PostgreSQL & Databases',
      desc: 'Optimized schema design, indexed queries, normalization, and reliable state persistence.',
    },
    {
      icon: Layers,
      title: 'React & Frontend Cohesion',
      desc: 'Bridging backend APIs with modern, responsive, animated React and Tailwind UIs.',
    },
  ];

  const stats = [
    { label: 'Primary Focus', value: 'Python / Django' },
    { label: 'Internship', value: 'Febno Technologies' },
    { label: 'APIs Built', value: 'REST & WebSockets' },
    { label: 'Architecture', value: 'Clean & Modular' },
  ];

  return (
    <section id="about" className="relative py-16 sm:py-24 px-3.5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Stamp & Tape */}
        <AnimatedContent distance={40} direction="vertical" duration={0.8} ease="power3.out">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-16 border-b-2 border-[#1e1b18]/15 pb-4 sm:pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                  Section // 01
                </span>
                <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
              </div>
              <h2 className="font-handwritten text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b18]">
                About the Developer
              </h2>
            </div>

            <StampBadge
              text="IRFAN • ARCHITECT"
              subtext="BACKEND FOCUSED"
              color="#5b8266"
              className="self-start sm:self-auto"
            />
          </div>
        </AnimatedContent>

        {/* Dual-Page Open Journal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* ============================================================ */}
          {/* LEFT PAGE: JOURNAL NARRATIVE ON LINED PAPER */}
          {/* ============================================================ */}
          <div className="lg:col-span-7">
            <AnimatedContent distance={40} direction="vertical" duration={0.85} ease="power3.out">
              <div className="relative lined-notebook p-5 sm:p-8 lg:p-10 rounded-sm shadow-[2px_6px_22px_rgba(40,30,15,0.12)] border border-[#ded3be] rotate-[-0.5deg]">
                {/* Top Washi Tape */}
                <WashiTape
                  className="w-28 sm:w-32 h-6 sm:h-7 -top-3 sm:-top-3.5 left-6 sm:left-10"
                  variant="cream"
                  rotation="rotate-1"
                />

                <div className="pl-3.5 sm:pl-8 border-l border-dashed border-[#df6b5c]/30">
                  <h3 className="font-typewriter text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-[#1e1b18] mb-3 sm:mb-4">
                    Field Journal Entry: The Philosophy
                  </h3>

                  <div className="space-y-3 sm:space-y-4 font-serif-vintage text-sm sm:text-base lg:text-lg text-[#2d261e] leading-relaxed">
                    <p>
                      I am <strong className="text-[#1e1b18] font-bold">Mohammed Irfan K</strong>, a backend-focused
                      software engineer with an unyielding passion for constructing reliable, clean, and scalable web architectures.
                    </p>

                    <p>
                      My engineering journey centers around <strong className="text-[#1e1b18]">Python</strong> and{' '}
                      <strong className="text-[#1e1b18]">Django</strong>. I believe true engineering elegance lies not in
                      superficial complexity, but in crafting database transactions that never fail silently, endpoints that
                      handle concurrency gracefully, and API contracts that provide seamless developer experiences.
                    </p>

                    <p>
                      During my internship at <strong className="text-[#1e1b18]">Febno Technologies</strong> and across my
                      production-grade projects, I have implemented cryptographic licensing backends, high-concurrency e-commerce systems,
                      and low-latency WebSocket bridges.
                    </p>

                    <p>
                      When bridging to the client, I utilize <strong className="text-[#1e1b18]">React</strong> and{' '}
                      <strong className="text-[#1e1b18]">Tailwind CSS</strong> to craft tactile, responsive, and animated user experiences.
                    </p>
                  </div>

                  {/* Handwritten Sign-off */}
                  <div className="mt-8 pt-4 border-t border-[#1e1b18]/15 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-script text-2xl sm:text-3xl font-bold text-[#1e1b18]">
                        Mohammed Irfan K.
                      </p>
                      <p className="font-typewriter text-[10px] sm:text-[11px] text-[#7a7065] uppercase tracking-wider">
                        Backend &amp; Full-Stack Engineer
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#5b8266]">
                      <ShieldCheck size={18} />
                      <span className="font-typewriter text-[11px] sm:text-xs font-bold uppercase">Verified Code</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* ============================================================ */}
          {/* RIGHT PAGE: PINNED HIGHLIGHTS & STATS CARDS */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stats Card */}
            <AnimatedContent distance={50} direction="horizontal" duration={0.8} delay={0.1} ease="power3.out">
              <div className="relative bg-[#cbb393] text-[#1e1b18] p-6 rounded-sm shadow-[2px_5px_18px_rgba(45,30,15,0.15)] rotate-[1deg]">
                <WashiTape
                  className="w-24 h-6 -top-3 right-8"
                  variant="sage"
                  rotation="-rotate-2"
                />

                <h4 className="font-typewriter text-xs uppercase tracking-widest font-bold text-[#1e1b18] mb-4 pb-2 border-b border-[#1e1b18]/20 flex items-center gap-2">
                  <GitBranch size={14} />
                  <span>Developer Dossier</span>
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s, idx) => (
                    <div key={idx} className="bg-[#f6f1e7]/70 p-3 rounded-xs border border-[#1e1b18]/10">
                      <p className="font-typewriter text-[10px] uppercase text-[#7a7065] tracking-wider">
                        {s.label}
                      </p>
                      <p className="font-handwritten text-lg font-bold text-[#1e1b18] mt-0.5">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContent>

            {/* Core Architectural Pillars */}
            <AnimatedContent distance={50} direction="vertical" duration={0.8} delay={0.15} ease="power3.out">
              <div className="relative bg-[#fffdf9] p-6 rounded-sm shadow-[2px_6px_20px_rgba(40,30,15,0.1)] border border-[#e2d8c3] rotate-[-0.8deg]">
                <WashiTape
                  className="w-28 h-6 -top-3 left-10"
                  variant="pink"
                  rotation="rotate-2"
                />

                <h4 className="font-typewriter text-xs uppercase tracking-widest font-bold text-[#1e1b18] mb-4 pb-2 border-b border-[#1e1b18]/15">
                  Core Architectural Pillars
                </h4>

                <div className="space-y-3.5">
                  {highlights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 group">
                        <div className="p-2 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/15 text-[#1e1b18] group-hover:bg-[#df6b5c] group-hover:text-[#f6f1e7] transition-colors shrink-0">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h5 className="font-handwritten text-lg font-bold text-[#1e1b18] leading-tight">
                            {item.title}
                          </h5>
                          <p className="font-serif-vintage text-xs text-[#5a5045] mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
}
