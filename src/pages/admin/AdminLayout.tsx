import { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  LogOut, 
  ExternalLink,
  Shield,
  Loader2,
  FileText,
  Cpu,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && !sessionStorage.getItem('mock_admin_session')) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <Loader2 size={24} className="animate-spin text-[#ff5c3d]" />
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Profile & CV', path: '/admin/profile', icon: FileText },
    { label: 'Skills', path: '/admin/skills', icon: Cpu },
    { label: 'Experience', path: '/admin/experience', icon: Briefcase },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Messages', path: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#0a0a0a] border-b border-white/[0.08] px-4 py-3 shrink-0 sticky top-0 z-40">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#141414] border border-white/10 text-[#ff5c3d]">
              <Shield size={16} />
            </div>
            <div>
              <span className="font-mono-code font-bold text-xs tracking-wider text-white block">
                IRFAN ADMIN
              </span>
              <span className="text-[9px] font-mono-code text-[#777777] uppercase">
                Console &bull; RLS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#888888] hover:text-white transition-colors"
              title="Open Live Portfolio"
            >
              <ExternalLink size={14} />
            </Link>
            <button
              onClick={() => signOut().then(() => navigate('/admin/login'))}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable nav pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar font-mono-code text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 text-xs ${
                  isActive
                    ? 'bg-[#ff5c3d]/15 text-[#ff5c3d] font-semibold border border-[#ff5c3d]/30'
                    : 'text-[#888888] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0a0a0a] border-r border-white/[0.08] p-6 flex-col justify-between shrink-0 h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-[#141414] border border-white/10 text-[#ff5c3d]">
              <Shield size={20} />
            </div>
            <div>
              <span className="font-mono-code font-bold text-sm tracking-wider text-white block">
                IRFAN ADMIN
              </span>
              <span className="text-[10px] font-mono-code text-[#777777] uppercase">
                Console &bull; Supabase RLS
              </span>
            </div>
          </div>

          <nav className="space-y-1.5 font-mono-code text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#ff5c3d]/10 text-[#ff5c3d] font-semibold border border-[#ff5c3d]/25'
                      : 'text-[#888888] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/[0.08] space-y-2 font-mono-code text-xs">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-[#888888] hover:text-white hover:bg-white/[0.03] transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink size={14} />
          </Link>

          <button
            onClick={() => signOut().then(() => navigate('/admin/login'))}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

