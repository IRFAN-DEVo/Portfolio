import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit3, Trash2, Star, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SEED_PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setProjects(SEED_PROJECTS);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data && data.length > 0 ? data : SEED_PROJECTS);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch projects';
      toast.error(msg);
      setProjects(SEED_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Permanently delete project "${title}"?`)) return;

    if (!isSupabaseConfigured) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success('Project deleted from local state.');
      return;
    }

    setDeletingId(id);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setProjects((prev) => prev.filter((p) => p.id !== id));
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

    if (!isSupabaseConfigured) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: updatedStatus } : p))
      );
      toast.success(`Updated "${project.title}" visibility.`);
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: updatedStatus })
        .eq('id', project.id);

      if (error) throw error;
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: updatedStatus } : p))
      );
      toast.success(`Updated "${project.title}" visibility.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to toggle status';
      toast.error(msg);
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
            Create, update, reorder, and publish portfolio works
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
                    <td className="py-4 px-2 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/admin/projects/${p.id}/edit`}
                          className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white transition-colors"
                          title="Edit Project"
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

