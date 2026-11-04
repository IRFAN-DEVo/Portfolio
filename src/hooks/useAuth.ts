import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      // Local dev mock authentication when Supabase is pending setup
      if (email === 'admin@irfan.dev' && password === 'admin123') {
        const mockUser = {
          id: 'mock-admin-id',
          email: 'admin@irfan.dev',
          app_metadata: {},
          user_metadata: { role: 'admin' },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User;
        setUser(mockUser);
        sessionStorage.setItem('mock_admin_session', 'true');
        return { user: mockUser, error: null };
      }
      throw new Error('Supabase credentials not configured. Use demo login: admin@irfan.dev / admin123');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    sessionStorage.removeItem('mock_admin_session');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  return {
    user,
    session,
    loading,
    signIn,
    signOut,
    isConfigured: isSupabaseConfigured,
  };
}

