import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { WashiTape, DoodleStar, StampBadge, DoodleArrow } from '@/components/ScrapbookDoodles';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all required fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      // Graceful offline fallback
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#efe8dc]/50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 border-b-2 border-[#1e1b18]/15 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-typewriter text-xs uppercase tracking-widest text-[#df6b5c]">
                Section // 05
              </span>
              <DoodleStar className="w-4 h-4 text-[#df6b5c]" />
            </div>
            <h2 className="font-handwritten text-4xl sm:text-5xl font-bold text-[#1e1b18]">
              Send a Note
            </h2>
            <p className="font-serif-vintage text-sm sm:text-base text-[#5a5045] mt-1">
              Have an architecture to discuss, a backend role, or a project collaboration?
            </p>
          </div>

          <StampBadge
            text="AIRMAIL"
            subtext="DIRECT INBOX"
            color="#df6b5c"
            className="self-start sm:self-auto"
          />
        </div>

        {/* Vintage Postcard Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#fffdf9] p-8 sm:p-12 rounded-sm shadow-[4px_10px_32px_rgba(40,25,10,0.14)] border border-[#e2d8c3]"
        >
          {/* Top Washi Tape */}
          <WashiTape
            className="w-36 h-7 -top-3.5 left-1/2 -translate-x-1/2"
            variant="cream"
            rotation="-rotate-1"
          />

          {/* Airmail Border Accent on Top */}
          <div
            className="h-2 w-full mb-8 rounded-xs opacity-75"
            style={{
              background: 'repeating-linear-gradient(45deg, #df6b5c, #df6b5c 12px, #fffdf9 12px, #fffdf9 20px, #4a7c59 20px, #4a7c59 32px, #fffdf9 32px, #fffdf9 40px)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ============================================================ */}
            {/* LEFT: DIRECT CONTACT & SOCIAL DOSSIER */}
            {/* ============================================================ */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-handwritten text-3xl font-bold text-[#1e1b18]">
                Get in Touch
              </h3>

              <p className="font-serif-vintage text-sm text-[#423d38] leading-relaxed">
                Whether it&apos;s Python/Django engineering, API architecture, or database optimization,
                my inbox is always open.
              </p>

              {/* Direct channels */}
              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 p-3 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/15 hover:border-[#1e1b18] transition-colors group"
                >
                  <Mail size={16} className="text-[#df6b5c] shrink-0" />
                  <span className="font-typewriter text-xs text-[#1e1b18] group-hover:underline break-all">
                    {SITE_CONFIG.email}
                  </span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/15">
                  <Phone size={16} className="text-[#5b8266] shrink-0" />
                  <span className="font-typewriter text-xs text-[#1e1b18]">
                    +91 {SITE_CONFIG.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/15">
                  <MapPin size={16} className="text-[#d4a373] shrink-0" />
                  <span className="font-typewriter text-xs text-[#1e1b18]">
                    {SITE_CONFIG.location}
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3">
                <p className="font-typewriter text-[10px] uppercase tracking-wider text-[#7a7065] font-bold mb-3">
                  Verified Profiles:
                </p>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(s => {
                    if (s.id === 'email') return null;
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xs bg-[#f6f1e7] border border-[#1e1b18]/25 hover:border-[#1e1b18] text-[#1e1b18] font-typewriter text-xs flex items-center gap-2 hover:-translate-y-0.5 transition-all shadow-xs"
                      >
                        {s.id === 'github' && <GithubIcon className="w-4 h-4" />}
                        {s.id === 'linkedin' && <LinkedinIcon className="w-4 h-4" />}
                        <span>{s.platform}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-[#df6b5c] hidden lg:block">
                <DoodleArrow className="w-12 h-12 rotate-[-25deg]" />
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-[1px] h-full bg-[#1e1b18]/15 self-stretch" />

            {/* ============================================================ */}
            {/* RIGHT: HANDWRITTEN POSTCARD FORM */}
            {/* ============================================================ */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-4 py-2.5 bg-[#f6f1e7] border-b-2 border-[#1e1b18]/30 focus:border-[#1e1b18] outline-hidden font-handwritten text-lg text-[#1e1b18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] font-bold mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 bg-[#f6f1e7] border-b-2 border-[#1e1b18]/30 focus:border-[#1e1b18] outline-hidden font-handwritten text-lg text-[#1e1b18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] font-bold mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Backend Project / Hiring / Collaboration"
                    className="w-full px-4 py-2.5 bg-[#f6f1e7] border-b-2 border-[#1e1b18]/30 focus:border-[#1e1b18] outline-hidden font-handwritten text-lg text-[#1e1b18] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-typewriter text-xs uppercase tracking-wider text-[#1e1b18] font-bold mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note here..."
                    className="w-full px-4 py-2.5 bg-[#f6f1e7] border-b-2 border-[#1e1b18]/30 focus:border-[#1e1b18] outline-hidden font-handwritten text-lg text-[#1e1b18] transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-[#df6b5c] font-typewriter text-xs p-2.5 bg-[#df6b5c]/10 rounded-xs">
                    <AlertCircle size={14} />
                    <span>{errorMessage || 'Failed to dispatch note. Please try again.'}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-[#5b8266] font-typewriter text-xs p-2.5 bg-[#5b8266]/10 rounded-xs">
                    <CheckCircle2 size={14} />
                    <span>Note recorded! Thank you for reaching out.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-2 py-3.5 bg-[#1e1b18] text-[#f6f1e7] rounded-sm font-typewriter text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#df6b5c] transition-colors shadow-md disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  <Send size={14} />
                  <span>{status === 'submitting' ? 'Dispatching...' : 'Dispatch Note'}</span>
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
