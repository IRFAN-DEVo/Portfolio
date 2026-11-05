import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Star, Eye, EyeOff, Loader2, Globe, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  getStoredProjects, 
  saveStoredProjects, 
  deleteProjectFromStorage, 
  toggleLiveDomainInStorage,
  subscribeToProjectUpdates 
} from '@/lib/projectStorage';
import type { Project } from '@/lib/types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setProjects(getStoredProjects());
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setProjects(data);
        saveStoredProjects(data);
      } else {
        setProjects(getStoredProjects());
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch projects from Supabase';
      console.warn(msg);
      setProjects(getStoredProjects());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToProjectUpdates((updated) => {
      setProjects(updated);
    });
    fetchProjects();
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Permanently delete project "${title}"?`)) return;

    deleteProjectFromStorage(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));

    if (!isSupabaseConfigured) {
      toast.success('Project deleted from local state.');
      return;
    }

    setDeletingId(id);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      toast.success(`Deleted "${title}" successfully.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    const updatedStatus = !project.published;

    const nextProjects = projects.map((p) =>
      p.id === project.id ? { ...p, published: updatedStatus } : p
    );
    setProjects(nextProjects);
    saveStoredProjects(nextProjects);
    toast.success(`Updated "${project.title}" visibility.`);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ published: updatedStatus })
          .eq('id', project.id);
        if (error) console.warn('Supabase publish update warning:', error);
      } catch (err) {
        console.warn('Failed to sync publish status with Supabase:', err);
      }
    }
  };

  const handleToggleLiveDomain = async (project: Project) => {
    const nextStatus = project.is_live_enabled === false;
    const updated = toggleLiveDomainInStorage(project.id, nextStatus);
    setProjects(updated);

    toast.success(
      nextStatus
        ? `Live domain enabled for "${project.title}".`
        : `Live domain disabled for "${project.title}" (shows "Backend Verified").`
    );

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ is_live_enabled: nextStatus })
          .eq('id', project.id);
        if (error && !error.message?.includes('is_live_enabled')) {
          console.warn('Supabase toggle error:', error);
        }
      } catch (err) {
        console.warn('Supabase toggle warning:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Project Management
          </h1>
          <p className="text-xs font-mono-code text-[#777777] mt-1">
            Configure domains, live links, technical dossiers, and showcase visibility
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-white">
          <Loader2 size={24} className="animate-spin text-[#ff5c3d]" />
        </div>
      ) : (
        <div className="p-6 rounded-2xl portfolio-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-code text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-[#777777] uppercase text-[10px]">
                  <th className="pb-3 px-2">Project</th>
                  <th className="pb-3 px-2">Technologies</th>
                  <th className="pb-3 px-2">Order</th>
                  <th className="pb-3 px-2">Project Domain</th>
                  <th className="pb-3 px-2">Status</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-sm">{p.title}</span>
                        {p.featured && (
                          <Star size={12} fill="#ff5c3d" className="text-[#ff5c3d]" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#777777] line-clamp-1 mt-0.5">
                        {p.short_description}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.tech_stack.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-[#888888]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-[#777777]">#{p.display_order}</td>

                    {/* Project Domain / Live URL column with quick toggle */}
                    <td className="py-4 px-2">
                      {p.live_url ? (
                        <div className="flex flex-col gap-1.5 max-w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <a
                              href={p.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#b5b5b5] hover:text-[#ff5c3d] truncate transition-colors max-w-[150px]"
                              title={`Open domain: ${p.live_url}`}
                            >
                              <Globe size={11} className="shrink-0 text-[#ff5c3d]" />
                              <span className="truncate">{p.live_url.replace(/^https?:\/\//, '')}</span>
                              <ExternalLink size={10} className="shrink-0" />
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleLiveDomain(p)}
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all w-fit cursor-pointer ${
                              p.is_live_enabled !== false
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200 hover:border-zinc-500'
                            }`}
                            title={
                              p.is_live_enabled !== false
                                ? 'Click to disable domain link (will show Backend Verified badge)'
                                : 'Click to enable live domain link on portfolio card'
                            }
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                p.is_live_enabled !== false ? 'bg-emerald-400' : 'bg-zinc-500'
                              }`}
                            />
                            <span>{p.is_live_enabled !== false ? 'Live Active' : 'Disabled'}</span>
                          </button>
                        </div>
                      ) : (
                        <Link
                          to={`/admin/projects/${p.id}/edit`}
                          className="inline-flex items-center gap-1 text-[11px] text-[#666666] hover:text-[#ff5c3d] transition-colors"
                          title="Add domain URL in edit form"
                        >
                          <Plus size={11} />
                          <span>Add Domain</span>
                        </Link>
                      )}
                    </td>

                    {/* Published status */}
                    <td className="py-4 px-2">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          p.published !== false
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {p.published !== false ? <Eye size={11} /> : <EyeOff size={11} />}
                        <span>{p.published !== false ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-2 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/admin/projects/${p.id}/edit`}
                          className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
                          title="Edit Project & Domain Link"
                        >
                          <Edit3 size={14} />
                        </Link>
                        <button
                          disabled={deletingId === p.id}
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50"
                          title="Delete Project"
                        >
                          {deletingId === p.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
