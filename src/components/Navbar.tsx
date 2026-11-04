import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

interface NavbarProps {
  isVisible?: boolean;
}

export default function Navbar({ isVisible = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo('#home')}
            className="group text-left focus:outline-none flex items-center gap-2.5"
          >
            <span className="font-mono-code font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-[#ff5c3d] transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[#888888]">
              Dev
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-mono-code text-xs uppercase tracking-widest transition-colors py-1 focus:outline-none ${
                    isActive ? 'text-[#ff5c3d] font-semibold' : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#ff5c3d] rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Admin Access Pill */}
            <Link
              to="/admin"
              className="text-[11px] font-mono-code px-3 py-1 rounded-full border border-white/15 text-[#888888] hover:text-white hover:border-[#ff5c3d] transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/admin"
              className="text-[11px] font-mono-code text-[#888888] hover:text-white px-2 py-1"
            >
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-[#ff5c3d] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3 font-mono-code">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left text-sm font-medium py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? 'text-[#ff5c3d] bg-white/[0.04] font-semibold'
                        : 'text-[#AAAAAA] hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
