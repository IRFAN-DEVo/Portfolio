import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Edit3, 
  X 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  getStoredExperience, 
  saveStoredExperience, 
  getStoredEducation, 
  saveStoredEducation 
} from '@/lib/portfolioStorage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ExperienceItem, EducationItem } from '@/lib/types';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(getStoredExperience);
  const [educations, setEducations] = useState<EducationItem[]>(getStoredEducation);

  // Experience modal/inline form state
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [currentExpId, setCurrentExpId] = useState<string | null>(null);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [currentBullet, setCurrentBullet] = useState('');

  // Education simple form
  const [newDegree, setNewDegree] = useState('');
  const [newInstitution, setNewInstitution] = useState('');
  const [newEduPeriod, setNewEduPeriod] = useState('');

  useEffect(() => {
    async function loadRemoteData() {
      if (!isSupabaseConfigured) return;
      try {
        const [expRes, eduRes] = await Promise.all([
          supabase.from('experience').select('*').order('created_at', { ascending: false }),
          supabase.from('education').select('*').order('created_at', { ascending: false }),
        ]);

        if (expRes.data && expRes.data.length > 0) {
          setExperiences(expRes.data);
          saveStoredExperience(expRes.data);
        }
        if (eduRes.data && eduRes.data.length > 0) {
          setEducations(eduRes.data);
          saveStoredEducation(eduRes.data);
        }
      } catch {
        // Fallback to local
      }
    }
    loadRemoteData();
  }, []);

  const openCreateExperience = () => {
    setCurrentExpId(null);
    setRole('');
    setCompany('');
    setPeriod('');
    setDuration('');
    setLocation('');
    setResponsibilities([]);
    setCurrentBullet('');
    setIsEditingExp(true);
  };

  const openEditExperience = (exp: ExperienceItem) => {
    setCurrentExpId(exp.id);
    setRole(exp.role);
    setCompany(exp.company);
    setPeriod(exp.period);
    setDuration(exp.duration || '');
    setLocation(exp.location);
    setResponsibilities(exp.responsibilities || []);
    setCurrentBullet('');
    setIsEditingExp(true);
  };

  const handleAddBullet = () => {
    if (!currentBullet.trim()) return;
    setResponsibilities([...responsibilities, currentBullet.trim()]);
    setCurrentBullet('');
  };

  const handleRemoveBullet = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) {
      toast.error('Role and company are required.');
      return;
    }

    const item: ExperienceItem = {
      id: currentExpId || `exp-${Date.now()}`,
      role: role.trim(),
      company: company.trim(),
      period: period.trim() || '2026',
      duration: duration.trim() || '',
      location: location.trim() || 'Kerala, India',
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Executed core engineering tasks.'],
    };

    let updated: ExperienceItem[];
    if (currentExpId) {
      updated = experiences.map((exp) => (exp.id === currentExpId ? item : exp));
      toast.success(`Updated experience at "${item.company}".`);
    } else {
      updated = [item, ...experiences];
      toast.success(`Added experience at "${item.company}".`);
    }

    setExperiences(updated);
    saveStoredExperience(updated);
    setIsEditingExp(false);
  };

  const handleDeleteExperience = (id: string, title: string) => {
    if (!confirm(`Delete experience "${title}"?`)) return;
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    saveStoredExperience(updated);
    toast.success('Experience removed.');
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.trim() || !newInstitution.trim()) {
      toast.error('Degree and institution are required.');
      return;
    }

    const item: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: newDegree.trim(),
      institution: newInstitution.trim(),
      period: newEduPeriod.trim() || '2022 – 2026',
    };

    const updated = [...educations, item];
    setEducations(updated);
    saveStoredEducation(updated);

    setNewDegree('');
    setNewInstitution('');
    setNewEduPeriod('');
    toast.success(`Added education: ${item.degree}`);
  };

  const handleDeleteEducation = (id: string) => {
    const updated = educations.filter((edu) => edu.id !== id);
    setEducations(updated);
    saveStoredEducation(updated);
    toast.success('Education record removed.');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Briefcase size={26} className="text-[#ff5c3d]" />
          <span>Industrial Experience &amp; Education</span>
        </h1>
        <p className="text-xs font-mono-code text-[#777777] mt-1">
          Manage your career timeline, internship history, achievements, and educational qualifications
        </p>
      </div>

      {/* ============================================================ */}
      {/* 1. PROFESSIONAL EXPERIENCE SECTION */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono-code text-sm font-bold uppercase tracking-wider text-white">
              Work &amp; Internship Experience
            </h2>
            <span className="text-xs font-mono-code text-[#777777]">
              ({experiences.length} positions)
            </span>
          </div>

          {!isEditingExp && (
            <button
              onClick={openCreateExperience}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all self-start sm:self-auto"
            >
              <Plus size={15} />
              <span>Add Experience</span>
            </button>
          )}
        </div>

        {/* Experience Editor Form */}
        {isEditingExp && (
          <form
            onSubmit={handleSaveExperience}
            className="p-6 rounded-2xl portfolio-card space-y-4 border border-[#ff5c3d]/30"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="font-mono-code text-sm font-bold text-white">
                {currentExpId ? 'Edit Experience Position' : 'New Experience Position'}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingExp(false)}
                className="text-[#888888] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Role / Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Python Developer Intern"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Febno Technologies"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Time Period
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g. Sep 2026 – Oct 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 1 Month"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Malappuram, Kerala"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
              </div>
            </div>

            {/* Responsibilities list */}
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Key Responsibilities &amp; Architectural Accomplishments
              </label>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentBullet}
                  onChange={(e) => setCurrentBullet(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddBullet();
                    }
                  }}
                  placeholder="Add bullet point (press Enter)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
                />
                <button
                  type="button"
                  onClick={handleAddBullet}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code"
                >
                  Add Bullet
                </button>
              </div>

              <div className="space-y-2">
                {responsibilities.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-[#0e0e0e] border border-white/[0.06]"
                  >
                    <CheckCircle2 size={14} className="text-[#5b8266] shrink-0 mt-0.5" />
                    <span className="flex-1 text-xs font-mono-code text-[#EDEDED]">{bullet}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBullet(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setIsEditingExp(false)}
                className="px-5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono-code text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256]"
              >
                Save Position
              </button>
            </div>
          </form>
        )}

        {/* Existing Experiences List */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-2xl portfolio-card space-y-3 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{exp.role}</h3>
                  <span className="font-mono-code text-xs text-[#ff5c3d]">
                    {exp.company} &bull; {exp.location}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono-code text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] text-[#A0A0A0] border border-white/10">
                    {exp.period}
                  </span>

                  <button
                    onClick={() => openEditExperience(exp)}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
                    title="Edit Experience"
                  >
                    <Edit3 size={14} />
                  </button>

                  <button
                    onClick={() => handleDeleteExperience(exp.id, `${exp.role} at ${exp.company}`)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Experience"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <ul className="space-y-1.5 pl-2">
                {exp.responsibilities.map((r, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2 text-xs font-mono-code text-[#A0A0A0]">
                    <span className="text-[#ff5c3d]">&bull;</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. EDUCATION & ACADEMIC QUALIFICATIONS */}
      {/* ============================================================ */}
      <div className="space-y-4 pt-6 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} className="text-[#df6b5c]" />
          <h2 className="font-mono-code text-sm font-bold uppercase tracking-wider text-white">
            Education &amp; Academic Degrees
          </h2>
        </div>

        {/* Add Education Form */}
        <form
          onSubmit={handleAddEducation}
          className="p-5 rounded-2xl portfolio-card grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-mono-code text-[#A0A0A0] mb-1 uppercase">
              Degree / Program *
            </label>
            <input
              type="text"
              required
              value={newDegree}
              onChange={(e) => setNewDegree(e.target.value)}
              placeholder="e.g. Python Django Full Stack Development"
              className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono-code text-[#A0A0A0] mb-1 uppercase">
              Institution *
            </label>
            <input
              type="text"
              required
              value={newInstitution}
              onChange={(e) => setNewInstitution(e.target.value)}
              placeholder="e.g. TechnoDot Academy"
              className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-[10px] font-mono-code text-[#A0A0A0] mb-1 uppercase">
                Period
              </label>
              <input
                type="text"
                value={newEduPeriod}
                onChange={(e) => setNewEduPeriod(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code font-bold transition-colors shrink-0 self-end"
            >
              <Plus size={14} />
            </button>
          </div>
        </form>

        {/* Existing Education Records */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] flex items-center justify-between gap-3"
            >
              <div>
                <h4 className="font-mono-code text-xs font-bold text-white">{edu.degree}</h4>
                <p className="font-mono-code text-[11px] text-[#ff5c3d] mt-0.5">
                  {edu.institution} &bull; {edu.period}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteEducation(edu.id)}
                className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors shrink-0"
                title="Delete education record"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
