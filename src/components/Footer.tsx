import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const githubLink = SOCIAL_LINKS.find((s) => s.id === 'github')?.url || 'https://github.com/IRFAN-DEVo';
  const linkedinLink = SOCIAL_LINKS.find((s) => s.id === 'linkedin')?.url || 'https://linkedin.com/in/mohammed-irfan-a4b3153b3';

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <button
            onClick={scrollToTop}
            className="font-mono-code font-bold text-base sm:text-lg tracking-wider text-white hover:text-[#ff5c3d] transition-colors"
          >
            {SITE_CONFIG.name}
          </button>
          <p className="text-xs font-mono-code text-[#666666] mt-1">
            &copy; {currentYear} Mohammed Irfan K. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d] transition-colors"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d] transition-colors"
          >
            <LinkedinIcon size={15} />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            aria-label="Send Email"
            className="p-2.5 rounded-full bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-[#ff5c3d] transition-colors"
          >
            <Mail size={15} />
          </a>
        </div>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/10 hover:border-white/30 text-xs font-mono-code text-[#A0A0A0] hover:text-white transition-all group"
        >
          <span>Back to Top</span>
          <ArrowUp size={13} className="text-[#ff5c3d] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
