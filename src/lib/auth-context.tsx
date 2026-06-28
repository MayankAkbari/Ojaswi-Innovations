'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SALES' | 'SUPPORT' | 'SUPER_ADMIN';
  addressLine1?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, role?: AuthUser['role'], customData?: Partial<AuthUser>) => void;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
  isLoading: boolean;
}

const ADMIN_USER: AuthUser = {
  id: 'admin-mayank',
  fullName: 'Mayank Akbari',
  email: 'm.akbari2808@gmail.com',
  phone: '+91 70694 24393',
  role: 'ADMIN',
  city: 'Ahmedabad',
  state: 'Gujarat'
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ojaswi_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ojaswi_session');
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const meta = u.user_metadata || {};
        setUser((prev) => prev || {
          id: u.id,
          fullName: meta.full_name || u.email?.split('@')[0] || 'Valued Client',
          email: u.email || '',
          phone: meta.phone || '+91 98000 00000',
          role: (meta.role as AuthUser['role']) || 'CUSTOMER',
          city: 'Ahmedabad',
          state: 'Gujarat'
        });
      }
      setIsLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('ojaswi_session');
      } else if (session?.user && event === 'SIGNED_IN') {
        const u = session.user;
        const meta = u.user_metadata || {};
        const newUser: AuthUser = {
          id: u.id,
          fullName: meta.full_name || u.email?.split('@')[0] || 'Valued Client',
          email: u.email || '',
          phone: meta.phone || '+91 98000 00000',
          role: (meta.role as AuthUser['role']) || 'CUSTOMER',
          city: 'Ahmedabad',
          state: 'Gujarat'
        };
        setUser(newUser);
        localStorage.setItem('ojaswi_session', JSON.stringify(newUser));
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = (emailInput: string, explicitRole?: AuthUser['role'], customData?: Partial<AuthUser>) => {
    let sessionUser: AuthUser;
    if (emailInput.trim().toLowerCase() === 'm.akbari2808@gmail.com' || explicitRole === 'ADMIN') {
      sessionUser = { ...ADMIN_USER, ...customData };
    } else {
      sessionUser = {
        id: customData?.id || `user-${Date.now()}`,
        fullName: customData?.fullName || emailInput.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Valued Client',
        email: emailInput,
        phone: customData?.phone || '+91 98000 00000',
        role: explicitRole || customData?.role || 'CUSTOMER',
        city: customData?.city || 'Ahmedabad',
        state: customData?.state || 'Gujarat'
      };
    }
    setUser(sessionUser);
    localStorage.setItem('ojaswi_session', JSON.stringify(sessionUser));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('ojaswi_session');
  };

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('ojaswi_session', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
