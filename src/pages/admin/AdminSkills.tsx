import { useState, useEffect } from 'react';
import { 
  Server, 
  Layout, 
  Database, 
  Wrench, 
  Plus, 
  Trash2, 
  Save, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getStoredSkills, saveStoredSkills } from '@/lib/portfolioStorage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { SkillCategoryGroup, SkillEntry } from '@/lib/types';

export default function AdminSkills() {
  const [categories, setCategories] = useState<SkillCategoryGroup[]>(getStoredSkills);
  const [saving, setSaving] = useState(false);

  // New skill input states keyed by category id
  const [newSkillNames, setNewSkillNames] = useState<Record<string, string>>({});
  const [newSkillTags, setNewSkillTags] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadRemoteSkills() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase.from('skills_grouped').select('*').limit(1).single();
        if (!error && data && data.categories) {
          setCategories(data.categories);
          saveStoredSkills(data.categories);
        }
      } catch {
        // Fallback to local
      }
    }
    loadRemoteSkills();
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return <Server size={18} className="text-[#ff5c3d]" />;
      case 'Layout':
        return <Layout size={18} className="text-[#df6b5c]" />;
      case 'Database':
        return <Database size={18} className="text-[#5b8266]" />;
      case 'Wrench':
      default:
        return <Wrench size={18} className="text-[#d4a373]" />;
    }
  };

  const handleAddSkill = (catId: string) => {
    const name = (newSkillNames[catId] || '').trim();
    const tag = (newSkillTags[catId] || '').trim();

    if (!name) {
      toast.error('Skill name is required.');
      return;
    }

    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          skills: [...cat.skills, { name, tag: tag || 'Applied' }],
        };
      }
      return cat;
    });

    setCategories(updated);
    saveStoredSkills(updated);

    // Reset input
    setNewSkillNames((prev) => ({ ...prev, [catId]: '' }));
    setNewSkillTags((prev) => ({ ...prev, [catId]: '' }));
    toast.success(`Added "${name}" to ${catId}.`);
  };

  const handleRemoveSkill = (catId: string, skillIdx: number) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        const nextSkills = cat.skills.filter((_, idx) => idx !== skillIdx);
        return { ...cat, skills: nextSkills };
      }
      return cat;
    });

    setCategories(updated);
    saveStoredSkills(updated);
    toast.success('Skill removed.');
  };

  const handleUpdateSkill = (catId: string, skillIdx: number, field: keyof SkillEntry, val: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId) {
        const nextSkills = [...cat.skills];
        nextSkills[skillIdx] = { ...nextSkills[skillIdx], [field]: val };
        return { ...cat, skills: nextSkills };
      }
      return cat;
    });

    setCategories(updated);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      saveStoredSkills(categories);

      if (isSupabaseConfigured) {
        try {
          await supabase.from('skills_grouped').upsert({
            id: 'skills_root',
            categories,
            updated_at: new Date().toISOString(),
          });
        } catch (err) {
          console.warn('Supabase skills sync warning:', err);
        }
      }

      toast.success('All skills saved and published!');
    } catch {
      toast.error('Failed to save skills.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>Skills &amp; Architecture Matrix</span>
            <Sparkles size={20} className="text-[#ff5c3d]" />
          </h1>
          <p className="text-xs font-mono-code text-[#777777] mt-1">
            Add, update, or remove engineering competencies across all categories
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 rounded-2xl portfolio-card flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#141414] border border-white/10">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <div>
                    <h2 className="font-mono-code text-sm font-bold text-white uppercase tracking-wider">
                      {cat.category}
                    </h2>
                    <span className="text-[10px] font-mono-code text-[#777777]">
                      {cat.skills.length} competencies registered
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill List */}
              <div className="space-y-2 mb-4 max-h-72 overflow-y-auto pr-1">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111111] border border-white/[0.06] hover:border-white/20 transition-colors"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(cat.id, sIdx, 'name', e.target.value)}
                      placeholder="Skill name"
                      className="flex-1 bg-transparent text-white font-mono-code text-xs px-2 py-1 rounded focus:outline-none focus:bg-white/[0.05]"
                    />

                    <input
                      type="text"
                      value={skill.tag}
                      onChange={(e) => handleUpdateSkill(cat.id, sIdx, 'tag', e.target.value)}
                      placeholder="Tag / Subtitle"
                      className="w-24 sm:w-32 bg-transparent text-[#888888] font-mono-code text-[11px] px-2 py-1 rounded focus:outline-none focus:bg-white/[0.05]"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cat.id, sIdx)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors shrink-0"
                      title="Delete Skill"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Skill to this category */}
            <div className="pt-3 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono-code uppercase text-[#777777] block mb-2">
                + Add new competency
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newSkillNames[cat.id] || ''}
                  onChange={(e) =>
                    setNewSkillNames((prev) => ({ ...prev, [cat.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(cat.id);
                    }
                  }}
                  placeholder="e.g. FastAPI"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0e0e0e] border border-white/10 text-white font-mono-code text-xs focus:outline-none focus:border-[#ff5c3d]"
                />

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkillTags[cat.id] || ''}
                    onChange={(e) =>
                      setNewSkillTags((prev) => ({ ...prev, [cat.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(cat.id);
                      }
                    }}
                    placeholder="e.g. Async APIs"
                    className="flex-1 sm:w-28 px-3 py-2 rounded-xl bg-[#0e0e0e] border border-white/10 text-[#888888] font-mono-code text-xs focus:outline-none focus:border-[#ff5c3d]"
                  />

                  <button
                    type="button"
                    onClick={() => handleAddSkill(cat.id)}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono-code text-xs font-bold transition-colors shrink-0"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
