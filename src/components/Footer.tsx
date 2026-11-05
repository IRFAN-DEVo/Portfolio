import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { SOCIAL_LINKS } from '@/lib/constants';
import { getStoredProfile, subscribeToProfileUpdates } from '@/lib/portfolioStorage';
import { DoodleStar, BotanicalFlower } from './ScrapbookDoodles';

export default function Footer() {
  const [profile, setProfile] = useState(getStoredProfile);

  useEffect(() => {
    const unsub = subscribeToProfileUpdates((p) => setProfile(p));
    return () => unsub();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#f4efe5] border-t-2 border-[#1e1b18]/15 py-12 px-6 sm:px-10 lg:px-14 overflow-hidden">
      {/* Decorative botanical sprig in background */}
      <div className="absolute right-6 -bottom-10 opacity-15 pointer-events-none select-none">
        <BotanicalFlower className="w-24 h-48" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left: Branding & Tagline */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 font-handwritten text-2xl font-bold text-[#1e1b18]">
            <span>{profile.name}</span>
            <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
          </div>
          <p className="font-typewriter text-xs text-[#7a7065] mt-1 tracking-wide">
            {profile.title} &bull; {profile.location}
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(s => {
            if (s.id === 'email') return null;
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="w-9 h-9 rounded-full border border-[#1e1b18]/25 hover:border-[#1e1b18] bg-[#fffdf9] flex items-center justify-center text-[#1e1b18] hover:text-[#df6b5c] transition-all hover:-translate-y-0.5 shadow-xs"
              >
                {s.id === 'github' && <GithubIcon className="w-4 h-4" />}
                {s.id === 'linkedin' && <LinkedinIcon className="w-4 h-4" />}
              </a>
            );
          })}
        </div>

        {/* Right: Scroll to top */}
        <div className="flex flex-col items-center sm:items-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] hover:text-[#df6b5c] transition-colors py-1 px-3 rounded-full border border-[#1e1b18]/20 bg-[#fffdf9]/70 hover:border-[#1e1b18]"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
          <span className="font-typewriter text-[10px] text-[#7a7065] mt-1.5">
            &copy; {new Date().getFullYear()} Field Journal Edition
          </span>
        </div>
      </div>
    </footer>
  );
}
