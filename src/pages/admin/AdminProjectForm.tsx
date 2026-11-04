import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEED_PROJECTS } from '@/lib/constants';

export default function AdminProjectForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing || !id) return;

    async function loadProject() {
      setLoading(true);
      if (!isSupabaseConfigured) {
        const found = SEED_PROJECTS.find((p) => p.id === id);
        if (found) {
          setTitle(found.title);
          setShortDescription(found.short_description);
          setLongDescription(found.long_description);
          setTechStack(found.tech_stack);
          setGithubUrl(found.github_url || '');
          setLiveUrl(found.live_url || '');
          setFeatured(found.featured);
          setPublished(found.published);
          setDisplayOrder(found.display_order);
          setImageUrl(found.image_url || '');
        }
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setShortDescription(data.short_description);
          setLongDescription(data.long_description);
          setTechStack(data.tech_stack || []);
          setGithubUrl(data.github_url || '');
          setLiveUrl(data.live_url || '');
          setFeatured(data.featured);
          setPublished(data.published);
          setDisplayOrder(data.display_order);
          setImageUrl(data.image_url || '');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error fetching project';
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, isEditing]);

  const handleAddTag = () => {
    if (!currentTag.trim()) return;
    if (!techStack.includes(currentTag.trim())) {
      setTechStack([...techStack, currentTag.trim()]);
    }
    setCurrentTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setTechStack(techStack.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      toast.error('Title and short description are required.');
      return;
    }

    setSaving(true);
    const payload = {
      title: title.trim(),
      short_description: shortDescription.trim(),
      long_description: longDescription.trim(),
      tech_stack: techStack,
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      featured,
      published,
      display_order: Number(displayOrder) || 1,
      image_url: imageUrl.trim() || null,
    };

    try {
      if (!isSupabaseConfigured) {
        toast.success(isEditing ? 'Project updated in local state.' : 'Project created in local state.');
        navigate('/admin/projects');
        return;
      }

      if (isEditing && id) {
        const { error } = await supabase.from('projects').update(payload).eq('id', id);
        if (error) throw error;
        toast.success('Project updated successfully.');
      } else {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
        toast.success('Project published successfully.');
      }
      navigate('/admin/projects');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save operation failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/projects"
          className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            {isEditing ? `Edit: ${title || 'Project'}` : 'Create New Project'}
          </h1>
          <span className="text-xs font-mono-code text-[#777777]">
            Configure tech stack, architectural highlights, and live links
          </span>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-white">
          <Loader2 size={24} className="animate-spin text-[#ff5c3d]" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl portfolio-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. LicenseGuard"
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Short Description *
            </label>
            <input
              type="text"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="High-level overview (1-2 sentences)"
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Long Description &amp; Architecture Notes
            </label>
            <textarea
              rows={5}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Deep architectural highlights, DB transaction guarantees, endpoints..."
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors font-mono-code text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Technologies / Stack Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="e.g. Django REST Framework"
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-white text-xs font-mono-code focus:outline-none focus:border-[#ff5c3d]"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#161616] border border-white/10 text-xs font-mono-code text-white"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/IRFAN-DEVo/..."
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                Live Demo URL (optional)
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.08]">
            <label className="flex items-center gap-2 cursor-pointer font-mono-code text-xs text-white">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded accent-[#ff5c3d]"
              />
              <span>Feature on Hero / Showcase</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-mono-code text-xs text-white">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded accent-[#ff5c3d]"
              />
              <span>Published &amp; Live</span>
            </label>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex justify-end gap-3">
            <Link
              to="/admin/projects"
              className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 text-xs font-mono-code text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>Save Project</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
