import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isVisible?: boolean;
}

export default function Navbar({ isVisible = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'service', 'project', 'experience', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
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

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICE', href: '#service', id: 'service' },
    { label: 'PROJECT', href: '#project', id: 'project' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

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
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#000000]/80 backdrop-blur-xl border-b border-white/[0.08] py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Brand Name on left */}
          <button
            onClick={() => scrollTo('#home')}
            className="text-left focus:outline-none flex items-center gap-2 group"
          >
            <span className="font-display font-black text-lg sm:text-xl tracking-[0.18em] uppercase text-white group-hover:text-gray-300 transition-colors">
              MOHAMMED IRFAN
            </span>
          </button>

          {/* Desktop Links on right */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  className="relative text-xs font-semibold tracking-[0.18em] uppercase transition-colors py-1 focus:outline-none group text-gray-300 hover:text-white"
                >
                  <span className={isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Admin Console Pill */}
            <Link
              to="/admin"
              className="text-[11px] font-mono-code uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white transition-all backdrop-blur-md"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              to="/admin"
              className="text-[11px] font-mono-code text-gray-400 hover:text-white px-2 py-1"
            >
              Admin
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-gray-300 transition-colors focus:outline-none"
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
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-30 bg-[#080808]/95 backdrop-blur-2xl border-b border-white/[0.08] p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left text-sm font-semibold tracking-widest uppercase py-2.5 px-3 rounded-xl transition-colors ${
                      isActive
                        ? 'text-white bg-white/[0.06]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
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
