import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, X, Loader2, Globe, ExternalLink, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStoredProjects, updateProjectInStorage } from '@/lib/projectStorage';
import type { Project } from '@/lib/types';

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
  const [isLiveEnabled, setIsLiveEnabled] = useState(true);
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

      // First check local/stored projects
      const stored = getStoredProjects();
      const found = stored.find((p) => p.id === id);
      if (found) {
        setTitle(found.title);
        setShortDescription(found.short_description);
        setLongDescription(found.long_description);
        setTechStack(found.tech_stack || []);
        setGithubUrl(found.github_url || '');
        setLiveUrl(found.live_url || '');
        setIsLiveEnabled(found.is_live_enabled !== false);
        setFeatured(found.featured);
        setPublished(found.published !== false);
        setDisplayOrder(found.display_order || 1);
        setImageUrl(found.image_url || '');
      }

      if (!isSupabaseConfigured) {
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
          setIsLiveEnabled(data.is_live_enabled !== false);
          setFeatured(data.featured);
          setPublished(data.published !== false);
          setDisplayOrder(data.display_order || 1);
          setImageUrl(data.image_url || '');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error fetching project from Supabase';
        console.warn(msg);
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
    const cleanedLiveUrl = liveUrl.trim() || null;
    const projectPayload: Project = {
      id: id || `proj-${Date.now()}`,
      title: title.trim(),
      short_description: shortDescription.trim(),
      long_description: longDescription.trim(),
      tech_stack: techStack,
      github_url: githubUrl.trim() || null,
      live_url: cleanedLiveUrl,
      is_live_enabled: isLiveEnabled,
      featured,
      published,
      display_order: Number(displayOrder) || 1,
      image_url: imageUrl.trim() || null,
    };

    // Update in local persistent storage immediately
    updateProjectInStorage(projectPayload);

    if (isSupabaseConfigured) {
      try {
        const remotePayload: Record<string, unknown> = {
          title: projectPayload.title,
          short_description: projectPayload.short_description,
          long_description: projectPayload.long_description,
          tech_stack: projectPayload.tech_stack,
          github_url: projectPayload.github_url,
          live_url: projectPayload.live_url,
          is_live_enabled: projectPayload.is_live_enabled,
          featured: projectPayload.featured,
          published: projectPayload.published,
          display_order: projectPayload.display_order,
          image_url: projectPayload.image_url,
        };

        if (isEditing && id) {
          const { error } = await supabase.from('projects').update(remotePayload).eq('id', id);
          if (error) {
            // Graceful fallback if is_live_enabled column hasn't been added to remote SQL schema
            if (error.message?.includes('is_live_enabled')) {
              delete remotePayload.is_live_enabled;
              await supabase.from('projects').update(remotePayload).eq('id', id);
            } else {
              throw error;
            }
          }
        } else {
          const { error } = await supabase.from('projects').insert([remotePayload]);
          if (error) {
            if (error.message?.includes('is_live_enabled')) {
              delete remotePayload.is_live_enabled;
              await supabase.from('projects').insert([remotePayload]);
            } else {
              throw error;
            }
          }
        }
      } catch (err: unknown) {
        console.warn('Supabase remote sync warning:', err);
      }
    }

    setSaving(false);
    toast.success(isEditing ? 'Project updated successfully.' : 'Project published successfully.');
    navigate('/admin/projects');
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
            Configure tech stack, project domain link, and live demonstration options
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
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
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
                className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code transition-colors shrink-0"
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

          {/* Repository & Domain Links */}
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
                Project Image / Asset URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/portfolio/assets/... or https://..."
                className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
              />
            </div>
          </div>

          {/* Project Domain / Live URL Section with Enable/Disable Option */}
          <div className="p-5 rounded-xl bg-[#151515] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-[#ff5c3d]" />
                <span className="font-mono-code text-xs uppercase font-bold text-white tracking-wider">
                  Project Domain / Live URL Configuration
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {isLiveEnabled && liveUrl.trim() ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                    <CheckCircle2 size={12} />
                    Live Domain Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    Option Disabled (Shows Backend Verified)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
                  Project Domain URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://yourproject.com"
                    className="flex-1 px-4 py-3 rounded-xl bg-[#0e0e0e] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
                  />
                  {liveUrl.trim() && (
                    <a
                      href={liveUrl.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-code transition-colors shrink-0"
                      title="Test open domain in new tab"
                    >
                      <span>Test Link</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <p className="text-[11px] font-mono-code text-[#777777] mt-1.5">
                  The domain URL visitors will be redirected to when clicking the project link.
                </p>
              </div>

              {/* Toggle switch for enabling / disabling the live domain link */}
              <div className="pt-2">
                <label className="flex items-start sm:items-center gap-3 cursor-pointer p-3 rounded-lg bg-[#0e0e0e] border border-white/[0.06] hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={isLiveEnabled}
                    onChange={(e) => setIsLiveEnabled(e.target.checked)}
                    className="w-4 h-4 mt-0.5 sm:mt-0 rounded accent-[#ff5c3d] cursor-pointer"
                  />
                  <div className="flex-1 text-xs font-mono-code">
                    <span className="font-bold text-white block">
                      Enable Live Domain Option on Portfolio Card
                    </span>
                    <span className="text-[#888888] text-[11px] block mt-0.5">
                      {isLiveEnabled
                        ? 'Visitors can click "Live Domain" to visit the site directly.'
                        : 'Link is disabled and hidden from the card. The card will display "Backend Verified" instead.'}
                    </span>
                  </div>
                </label>
              </div>
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
