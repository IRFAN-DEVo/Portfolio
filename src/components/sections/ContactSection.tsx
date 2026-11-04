import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import type { ContactFormData } from '@/lib/types';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phone = SITE_CONFIG.phone || '+91 8086175728';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    toast.success('Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please complete your name, email, and message.');
      return;
    }

    setSending(true);

    try {
      if (!isSupabaseConfigured) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        toast.success('Message captured! Connect Supabase to store directly in PostgreSQL.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject?.trim() || 'General Inquiry',
          message: formData.message.trim(),
        },
      ]);

      if (error) throw error;

      toast.success('Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to deliver message';
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const githubLink = SOCIAL_LINKS.find((s) => s.id === 'github')?.url || 'https://github.com/IRFAN-DEVo';
  const linkedinLink = SOCIAL_LINKS.find((s) => s.id === 'linkedin')?.url || 'https://linkedin.com/in/mohammed-irfan-a4b3153b3';

  return (
    <section id="contact" className="py-28 px-6 sm:px-10 lg:px-14 border-t border-white/[0.08] relative bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-gray-500 mb-4 block font-mono-code">
            05 // Get in touch
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-700">
            LET'S TALK
          </h2>
          <div className="w-16 h-[2px] bg-white mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Cards on Left */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email Card with Copy Button */}
            <div className="p-7 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-gray-500 block tracking-wider">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-sm font-mono-code text-white hover:underline transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Phone Card with Copy Button */}
            <div className="p-7 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-white/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-white">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono-code uppercase text-gray-500 block tracking-wider">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm font-mono-code text-white hover:underline transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-7 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#141414] border border-white/10 text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono-code uppercase text-gray-500 block tracking-wider">
                    Location
                  </span>
                  <span className="text-sm font-mono-code text-white">
                    {SITE_CONFIG.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-7 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono-code text-gray-400 uppercase tracking-wider">
                Follow On
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#161616] border border-white/10 text-gray-400 hover:text-white hover:border-white transition-all"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#161616] border border-white/10 text-gray-400 hover:text-white hover:border-white transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Interactive Form on Right */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/[0.08] space-y-5 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono-code text-gray-400 mb-2 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Hunter"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono-code text-gray-400 mb-2 uppercase tracking-wider">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono-code text-gray-400 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Backend Developer Role / Architectural Inquiry"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono-code text-gray-400 mb-2 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, team, or opportunity..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-white text-black font-mono-code font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50 cursor-pointer"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
