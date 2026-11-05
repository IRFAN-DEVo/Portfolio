import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Save, 
  Upload, 
  ExternalLink, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getStoredProfile, saveStoredProfile } from '@/lib/portfolioStorage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { WebsiteSettings } from '@/lib/types';

export default function AdminProfile() {
  const [profile, setProfile] = useState<WebsiteSettings>(getStoredProfile);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function loadRemoteProfile() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase.from('settings').select('*').limit(1).single();
        if (!error && data) {
          const merged = { ...getStoredProfile(), ...data };
          setProfile(merged);
          saveStoredProfile(merged);
        }
      } catch {
        // Fallback to local stored profile
      }
    }
    loadRemoteProfile();
  }, []);

  const handleChange = (field: keyof WebsiteSettings, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      toast.error('File size exceeds 8MB. Please select a smaller PDF or use an external URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProfile((prev) => ({ ...prev, resume_url: result }));
      toast.success(`CV file "${file.name}" attached successfully.`);
    };
    reader.onerror = () => {
      toast.error('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Save to local persistent storage immediately
      saveStoredProfile(profile);

      // 2. Sync to Supabase if configured
      if (isSupabaseConfigured) {
        try {
          await supabase.from('settings').upsert({
            id: 'site_settings',
            ...profile,
            updated_at: new Date().toISOString(),
          });
        } catch (err) {
          console.warn('Supabase profile sync warning:', err);
        }
      }

      toast.success('Profile and CV settings saved successfully!');
    } catch {
      toast.error('Failed to save profile settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Profile &amp; CV Management
        </h1>
        <p className="text-xs font-mono-code text-[#777777] mt-1">
          Update your CV/Resume link, contact email, phone number, and architectural bio
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ============================================================ */}
        {/* 1. CV / RESUME CONFIGURATION */}
        {/* ============================================================ */}
        <div className="p-6 rounded-2xl portfolio-card space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3 text-[#ff5c3d]">
            <FileText size={18} />
            <h2 className="font-mono-code text-sm font-bold uppercase tracking-wider text-white">
              Curriculum Vitae (CV / Resume)
            </h2>
          </div>

          <p className="text-xs font-mono-code text-[#888888]">
            This controls what visitors download when clicking the &quot;CV&quot; button in the navbar and mobile menu.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                CV / Resume URL or Cloud Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={profile.resume_url || ''}
                  onChange={(e) => handleChange('resume_url', e.target.value)}
                  placeholder="https://drive.google.com/... or /resume.pdf"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
                />

                {profile.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code transition-colors shrink-0"
                    title="Test Open CV"
                  >
                    <span>Test CV</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>

            {/* Direct File Upload Option */}
            <div className="pt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-xs font-mono-code transition-colors"
                >
                  <Upload size={14} className="text-[#ff5c3d]" />
                  <span>Upload Local PDF/DOC File</span>
                </button>

                {profile.resume_url?.startsWith('data:') && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono-code text-green-400">
                    <CheckCircle2 size={13} />
                    <span>Local file embedded as data URL</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DIRECT CONTACT INFO (EMAIL, PHONE, LOCATION) */}
        {/* ============================================================ */}
        <div className="p-6 rounded-2xl portfolio-card space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3 text-[#ff5c3d]">
            <Mail size={18} />
            <h2 className="font-mono-code text-sm font-bold uppercase tracking-wider text-white">
              Contact Channels (Email &amp; Phone)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3.5 text-[#666666]" />
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="irfanneerolpalam12@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
                />
              </div>
              <p className="text-[10px] font-mono-code text-[#666666] mt-1">
                Used in Contact Section &quot;Send a Note&quot; and mailto buttons.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Phone Number *
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-3.5 text-[#666666]" />
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="8086175728"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
                />
              </div>
              <p className="text-[10px] font-mono-code text-[#666666] mt-1">
                Rendered with country code in contact cards.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Physical Location / City
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-3.5 text-[#666666]" />
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Calicut, Kerala, India"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. PROFILE & ARCHITECTURAL BIO */}
        {/* ============================================================ */}
        <div className="p-6 rounded-2xl portfolio-card space-y-4">
          <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3 text-[#ff5c3d]">
            <User size={18} />
            <h2 className="font-mono-code text-sm font-bold uppercase tracking-wider text-white">
              Identity &amp; Bio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Full Display Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Mohammed Irfan K"
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Professional Title
              </label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Python / Django Developer"
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Primary Engineering Focus
            </label>
            <input
              type="text"
              value={profile.focus}
              onChange={(e) => handleChange('focus', e.target.value)}
              placeholder="Backend Development &amp; Full-Stack Development"
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Bio / Architectural Summary
            </label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Engineering background and specializations..."
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors font-mono-code text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,92,61,0.25)] disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Save Profile &amp; CV Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}

