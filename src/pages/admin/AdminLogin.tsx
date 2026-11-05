import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowLeft, Loader2, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || sessionStorage.getItem('mock_admin_session')) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please enter administrator credentials.');
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      toast.success('Administrator authenticated.');
      navigate('/admin');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] flex flex-col justify-center items-center px-4 py-16 relative">
      <Link
        to="/"
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-xs font-mono-code text-[#888888] hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Return to Portfolio</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-[#111111] border border-white/10 text-[#ff5c3d] mb-4 shadow-xl">
            <Shield size={28} />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Admin Authentication
          </h1>
          <p className="text-xs font-mono-code text-[#777777] mt-2">
            Restricted gateway guarded by Supabase Auth &amp; RLS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl portfolio-card space-y-4">
          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@irfan.dev"
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder-[#555555] text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-[#A0A0A0] mb-1.5 uppercase">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder-[#555555] text-sm focus:outline-none focus:border-[#ff5c3d] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-[#ff5c3d] text-[#111111] font-mono-code font-bold text-xs uppercase tracking-wider hover:bg-[#ff7256] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,92,61,0.25)] disabled:opacity-50 mt-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In to Admin</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

