import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  MessageSquare, 
  Plus, 
  ArrowRight, 
  CheckCircle2,
  Inbox,
  Loader2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStoredProjects } from '@/lib/projectStorage';
import type { Message, Project } from '@/lib/types';

export default function AdminDashboard() {
  const [totalProjects, setTotalProjects] = useState<number>(() => getStoredProjects().length);
  const [publishedProjects, setPublishedProjects] = useState<number>(
    () => getStoredProjects().filter((p) => p.published !== false).length
  );
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>(getStoredProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!isSupabaseConfigured) {
        const stored = getStoredProjects();
        setProjects(stored);
        setTotalProjects(stored.length);
        setPublishedProjects(stored.filter((p) => p.published !== false).length);
        setLoading(false);
        return;
      }

      try {
        const [projRes, msgRes, unreadRes] = await Promise.all([
          supabase.from('projects').select('*').order('display_order', { ascending: true }),
          supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
        ]);

        if (projRes.data && projRes.data.length > 0) {
          setProjects(projRes.data);
          setTotalProjects(projRes.data.length);
          setPublishedProjects(projRes.data.filter((p) => p.published !== false).length);
        }

        if (msgRes.data) {
          setRecentMessages(msgRes.data);
          setTotalMessages(msgRes.data.length);
        }

        if (unreadRes.count !== null && unreadRes.count !== undefined) {
          setUnreadMessages(unreadRes.count);
        }
      } catch (err) {
        console.error('Failed to load metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center text-white">
        <Loader2 size={24} className="animate-spin text-[#ff5c3d]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            System Metrics &amp; Administration
          </h1>
          <p className="text-xs font-mono-code text-[#777777] mt-1">
            Real-time synchronization with Supabase PostgreSQL
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>New Project</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs font-mono-code uppercase">Total Projects</span>
            <FolderKanban size={18} className="text-[#ff5c3d]" />
          </div>
          <div className="font-display text-3xl font-black text-white">{totalProjects}</div>
          <span className="text-[11px] font-mono-code text-[#666666] mt-1 block">
            {publishedProjects} active in catalog
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs font-mono-code uppercase">Published</span>
            <CheckCircle2 size={18} className="text-[#ff5c3d]" />
          </div>
          <div className="font-display text-3xl font-black text-white">{publishedProjects}</div>
          <span className="text-[11px] font-mono-code text-[#666666] mt-1 block">
            Visible on public website
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs font-mono-code uppercase">Unread Inquiries</span>
            <Inbox size={18} className="text-[#ff5c3d]" />
          </div>
          <div className="font-display text-3xl font-black text-white">{unreadMessages}</div>
          <span className="text-[11px] font-mono-code text-[#666666] mt-1 block">
            Awaiting response
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/[0.08]">
          <div className="flex items-center justify-between text-[#888888] mb-3">
            <span className="text-xs font-mono-code uppercase">Total Inquiries</span>
            <MessageSquare size={18} className="text-[#ff5c3d]" />
          </div>
          <div className="font-display text-3xl font-black text-white">{totalMessages}</div>
          <span className="text-[11px] font-mono-code text-[#666666] mt-1 block">
            Through contact channel
          </span>
        </div>
      </div>

      {/* Quick Sections: Projects & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Projects */}
        <div className="p-6 sm:p-8 rounded-2xl portfolio-card">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
            <h2 className="font-display text-lg font-bold text-white">Current Projects</h2>
            <Link
              to="/admin/projects"
              className="text-xs font-mono-code text-[#ff5c3d] hover:text-[#ff7256] flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {p.tech_stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-white/[0.04] text-[#888888]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/admin/projects/${p.id}/edit`}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-xs font-mono-code text-white transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="p-6 sm:p-8 rounded-2xl portfolio-card">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
            <h2 className="font-display text-lg font-bold text-white">Recent Inquiries</h2>
            <Link
              to="/admin/messages"
              className="text-xs font-mono-code text-[#ff5c3d] hover:text-[#ff7256] flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono-code text-[#666666]">
              No messages received yet. Messages sent through the contact form appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{m.name}</span>
                    <span className="text-[10px] font-mono-code text-[#666666]">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#888888] line-clamp-1 mt-1 font-light">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
