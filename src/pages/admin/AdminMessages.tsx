import { useState, useEffect } from 'react';
import { 
  Trash2, 
  CheckCheck, 
  Loader2,
  Inbox,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Message } from '@/lib/types';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const fetchMessages = async () => {
    setLoading(true);
    if (!isSupabaseConfigured) {
      setMessages([
        {
          id: 'demo-1',
          name: 'Sarah Jenkins',
          email: 'sarah.j@techrecruits.io',
          subject: 'Senior Python / Django Backend Role',
          message:
            'Hi Irfan, I reviewed your DRF licensing backend and ES256 verification architecture. We have an open Senior Python Backend role that directly aligns with your concurrency & PostgreSQL background. Would you be open to an introductory call this week?',
          is_read: false,
          created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
        },
        {
          id: 'demo-2',
          name: 'Vikram Menon',
          email: 'vikram@fintechventures.in',
          subject: 'Multi-Gateway Checkout Architecture',
          message:
            'Impressive work on the multi-gateway payment checkout and concurrency-safe transactions. What was your approach to handling idempotency on webhook retries under network partitions?',
          is_read: true,
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch messages';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, current: boolean) => {
    if (!isSupabaseConfigured) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !current } : m))
      );
      toast.success(current ? 'Marked as unread' : 'Marked as read');
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: !current })
        .eq('id', id);
      if (error) throw error;
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !current } : m))
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Update failed';
      toast.error(msg);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this inquiry?')) return;

    if (!isSupabaseConfigured) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted.');
      return;
    }

    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed';
      toast.error(msg);
    }
  };

  const filteredMessages = messages.filter((m) => (filter === 'unread' ? !m.is_read : true));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Inquiry Inbox
          </h1>
          <p className="text-xs font-mono-code text-[#777777] mt-1">
            Incoming transmissions from portfolio contact form
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-colors ${
              filter === 'all'
                ? 'bg-[#ff5c3d] text-[#111111] font-bold'
                : 'bg-[#111111] text-[#888888] hover:text-white'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-colors ${
              filter === 'unread'
                ? 'bg-[#ff5c3d] text-[#111111] font-bold'
                : 'bg-[#111111] text-[#888888] hover:text-white'
            }`}
          >
            Unread ({messages.filter((m) => !m.is_read).length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center text-white">
          <Loader2 size={24} className="animate-spin text-[#ff5c3d]" />
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 rounded-2xl portfolio-card text-center text-xs font-mono-code text-[#666666]">
          <Inbox size={28} className="mx-auto mb-3 text-[#ff5c3d] opacity-50" />
          <span>No inquiries matching your filter.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-2xl border transition-all ${
                !m.is_read
                  ? 'bg-[#111111] border-[#ff5c3d]/40 shadow-[0_0_20px_rgba(255,92,61,0.08)]'
                  : 'portfolio-card'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-display font-bold text-white text-base">{m.name}</span>
                    {!m.is_read && (
                      <span className="w-2 h-2 rounded-full bg-[#ff5c3d] animate-ping" />
                    )}
                  </div>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-xs font-mono-code text-[#ff5c3d] hover:underline"
                  >
                    {m.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#777777]">
                    <Clock size={13} />
                    <span>{new Date(m.created_at).toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleToggleRead(m.id, m.is_read)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[#A0A0A0] hover:text-white transition-colors"
                    title={m.is_read ? 'Mark as Unread' : 'Mark as Read'}
                  >
                    <CheckCheck size={14} className={m.is_read ? 'text-[#ff5c3d]' : ''} />
                  </button>

                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {m.subject && (
                <div className="text-xs font-mono-code text-white font-semibold mb-2">
                  Subject: {m.subject}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-light whitespace-pre-wrap">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
