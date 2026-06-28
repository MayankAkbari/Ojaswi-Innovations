'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (email: string, role?: AuthUser['role']) => void;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
  isLoading: boolean;
}

const DEMO_ADMIN: AuthUser = {
  id: 'admin-1',
  fullName: 'Respected Administrative Head',
  email: 'admin@ojaswi.com',
  phone: '+91 70694 24393',
  role: 'ADMIN',
  city: 'Ahmedabad',
  state: 'Gujarat'
};

const DEMO_CUSTOMER: AuthUser = {
  id: 'cust-1',
  fullName: 'Rajesh Bhai Patel',
  email: 'customer@ojaswi.com',
  phone: '+91 98765 43210',
  role: 'CUSTOMER',
  addressLine1: '402, Tejomay Tower, S.G. Highway',
  city: 'Ahmedabad',
  state: 'Gujarat',
  pincode: '380015'
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
    setIsLoading(false);
  }, []);

  const login = (emailInput: string, explicitRole?: AuthUser['role']) => {
    let sessionUser: AuthUser;
    if (emailInput.toLowerCase().includes('admin') || explicitRole === 'ADMIN') {
      sessionUser = DEMO_ADMIN;
    } else if (emailInput.toLowerCase().includes('customer') || explicitRole === 'CUSTOMER') {
      sessionUser = DEMO_CUSTOMER;
    } else {
      sessionUser = {
        id: `user-${Date.now()}`,
        fullName: emailInput.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Valued Client',
        email: emailInput,
        phone: '+91 98000 00000',
        role: explicitRole || 'CUSTOMER',
        city: 'Ahmedabad',
        state: 'Gujarat'
      };
    }
    setUser(sessionUser);
    localStorage.setItem('ojaswi_session', JSON.stringify(sessionUser));
  };

  const logout = () => {
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
