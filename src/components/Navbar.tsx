import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Lock, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DoodleStar } from './ScrapbookDoodles';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Prevent scroll event during smooth scroll click from flipping active tab
      if (isClickingRef.current) return;

      // 1. If at the top of the page, strictly highlight 'home'
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // 2. If at the bottom of the page, strictly highlight 'contact'
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 3. Focal Line detection:
      // The section currently crossing the viewing line (160px from top, below navbar) is active.
      const focalY = 160;
      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalY && rect.bottom > focalY) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.substring(1);

    // Immediately highlight the clicked tab
    setActiveSection(targetId);

    // Lock scrollspy while smooth scrolling to target
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = window.setTimeout(() => {
      isClickingRef.current = false;
    }, 850);

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      // Offset for sticky navbar so section header is comfortably visible
      const navbarHeight = 75;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#f6f1e7]/90 backdrop-blur-md shadow-sm border-b border-[#2d251e]/15 py-3'
          : 'bg-transparent py-3.5 sm:py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand / Name - Handwritten Logo */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            scrollTo('#home');
          }}
          className="group flex items-center gap-2 text-decoration-none"
        >
          <div className="font-handwritten text-2xl sm:text-3xl font-bold tracking-tight text-[#1e1b18] group-hover:text-[#df6b5c] transition-colors flex items-center gap-1.5">
            <span>Mohammed Irfan</span>
            <DoodleStar className="w-4 h-4 text-[#df6b5c] group-hover:rotate-45 transition-transform" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navItems.map(item => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={`relative font-handwritten text-lg tracking-wide transition-colors duration-200 py-1 px-1.5 select-none ${
                  isActive
                    ? 'text-[#1e1b18] font-bold'
                    : 'text-[#5a5045] hover:text-[#1e1b18]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.svg
                    layoutId="activeNavCircle"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    viewBox="0 0 100 45"
                    preserveAspectRatio="none"
                    className="absolute -inset-x-3 -inset-y-1.5 w-[calc(100%+24px)] h-[calc(100%+12px)] pointer-events-none text-[#1e1b18] z-0"
                    fill="none"
                  >
                    {/* Secondary faint pencil trace */}
                    <path
                      d="M 15 23 C 13 11, 46 6, 83 9 C 95 10, 96 23, 85 34 C 71 42, 24 41, 10 30 C 5 24, 9 12, 27 7"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.3"
                      strokeLinecap="round"
                    />
                    {/* Primary hand-drawn ink loop circling the active item */}
                    <path
                      d="M 12 21 C 10 9, 44 4, 85 7 C 97 8, 98 25, 87 36 C 73 44, 22 43, 8 32 C 3 26, 7 14, 25 9 C 40 6, 68 7, 82 10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </a>
            );
          })}

          {/* Resume Download / Bag indicator */}
          <a
            href="/resume.pdf"
            download="Mohammed_Irfan_Resume.pdf"
            className="flex items-center gap-1.5 font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] hover:text-[#df6b5c] px-3 py-1.5 border border-[#221e1a]/30 rounded-full hover:border-[#221e1a] transition-all bg-[#fffdf9]/60 shadow-xs"
            title="Download CV"
          >
            <Download size={13} />
            <span>CV</span>
          </a>

          {/* Admin Lock Button */}
          <Link
            to="/admin/login"
            className="w-8 h-8 rounded-full border border-[#221e1a]/20 hover:border-[#221e1a] flex items-center justify-center text-[#5a5045] hover:text-[#1e1b18] transition-colors"
            title="Admin Console"
            aria-label="Admin Console"
          >
            <Lock size={13} />
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1e1b18] hover:text-[#df6b5c] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f6f1e7] border-b-2 border-[#221e1a]/20 px-8 py-7 shadow-lg transition-all">
          <div className="flex flex-col gap-4">
            {navItems.map(item => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={e => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={`relative font-handwritten text-2xl py-1 px-3 self-start border-b border-[#221e1a]/10 ${
                    isActive ? 'text-[#1e1b18] font-bold' : 'text-[#5a5045]'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <svg
                      viewBox="0 0 100 45"
                      preserveAspectRatio="none"
                      className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+24px)] h-[calc(100%+8px)] pointer-events-none text-[#df6b5c] z-0"
                      fill="none"
                    >
                      <path
                        d="M 12 21 C 10 9, 44 4, 85 7 C 97 8, 98 25, 87 36 C 73 44, 22 43, 8 32 C 3 26, 7 14, 25 9 C 40 6, 68 7, 82 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>
              );
            })}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#221e1a]/15">
              <a
                href="/resume.pdf"
                download="Mohammed_Irfan_Resume.pdf"
                className="flex items-center gap-2 font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] px-4 py-2 border border-[#221e1a]/40 rounded-full bg-[#fffdf9]"
              >
                <Download size={14} />
                <span>Download CV</span>
              </a>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 font-typewriter text-xs text-[#5a5045] px-3 py-2 border border-[#221e1a]/20 rounded-full"
              >
                <Lock size={13} />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
