import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  X, 
  Star, 
  Terminal, 
  ShieldAlert, 
  Bot, 
  Smartphone, 
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEED_PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      if (!isSupabaseConfigured) {
        setProjects(SEED_PROJECTS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false })
          .order('display_order', { ascending: true });

        if (error) {
          console.warn('Could not fetch from Supabase, using seed projects:', error.message);
          setProjects(SEED_PROJECTS);
        } else if (data && data.length > 0) {
          const visible = data.filter((p) => p.published !== false);
          setProjects(visible.length > 0 ? visible : SEED_PROJECTS);
        } else {
          setProjects(SEED_PROJECTS);
        }
      } catch (err) {
        console.warn('Error loading projects:', err);
        setProjects(SEED_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const categories = ['All', 'Backend & APIs', 'Full-Stack'];

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Backend & APIs') {
      const title = project.title.toLowerCase();
      const tech = project.tech_stack.map((t) => t.toLowerCase());
      return title.includes('license') || title.includes('ecommerce') || title.includes('link') || tech.includes('django rest framework');
    }
    if (selectedCategory === 'Full-Stack') {
      const title = project.title.toLowerCase();
      const tech = project.tech_stack.map((t) => t.toLowerCase());
      return title.includes('ai') || title.includes('study') || tech.includes('react');
    }
    return true;
  });

  const getProjectIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('mart') || t.includes('commerce')) return <ShoppingBag size={24} className="text-white" />;
    if (t.includes('license') || t.includes('guard')) return <ShieldAlert size={24} className="text-white" />;
    if (t.includes('ai') || t.includes('assistant')) return <Bot size={24} className="text-white" />;
    if (t.includes('link') || t.includes('pad')) return <Smartphone size={24} className="text-white" />;
    return <Terminal size={24} className="text-white" />;
  };

  return (
    <section id="project" className="py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.08] relative bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 mb-4 block font-mono-code">
            03 // Selected work
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
            PRODUCTION ARCHITECTURES
          </h2>
          <div className="w-16 h-[2px] bg-white mt-4" />
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-mono-code uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-[#111111] text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid: 2 columns desktop, 1 on mobile */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: '-50px' }}
                className="group rounded-2xl bg-[#0c0c0c] border border-white/[0.08] overflow-hidden hover:border-white/30 hover:-translate-y-1.5 flex flex-col justify-between transition-all shadow-xl"
              >
                <div>
                  {/* Top Card Header */}
                  <div className="p-7 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.02] to-transparent flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#141414] border border-white/10 group-hover:border-white/40 transition-colors">
                        {getProjectIcon(project.title)}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-mono-code text-gray-400 uppercase tracking-widest">
                          {project.featured ? 'Core Architecture' : 'Backend System'}
                        </span>
                      </div>
                    </div>

                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
                        <Star size={11} fill="#FFFFFF" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Body description */}
                  <div className="p-7">
                    <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
                      {project.short_description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-[#141414] border border-white/[0.08] text-gray-300 text-xs font-mono-code"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-7 py-4 bg-[#080808] border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code text-gray-400 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={14} />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono-code text-white hover:underline transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono-code text-white hover:text-gray-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Inspect Specs</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Deep Specs Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-white"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-xl bg-[#141414] border border-white/10">
                    {getProjectIcon(selectedProject.title)}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <span className="text-xs font-mono-code text-gray-400 uppercase tracking-widest">
                      Deep Technical Architecture Specification
                    </span>
                  </div>
                </div>

                <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed my-6">
                  <div>
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-white mb-2">
                      Overview
                    </h4>
                    <p>{selectedProject.short_description}</p>
                  </div>

                  {selectedProject.long_description && (
                    <div>
                      <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-white mb-2">
                        Engineering Highlights &amp; Guarantees
                      </h4>
                      <div className="p-4 rounded-xl bg-[#080808] border border-white/10 font-mono-code text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                        {selectedProject.long_description}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-white mb-2">
                      Full Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-md bg-[#161616] border border-white/10 text-xs font-mono-code text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#181818] border border-white/20 text-white hover:border-white text-xs font-mono-code transition-all flex items-center gap-2"
                    >
                      <GithubIcon size={14} />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white text-black font-mono-code font-bold text-xs hover:bg-gray-200 transition-all flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      <span>Launch Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
