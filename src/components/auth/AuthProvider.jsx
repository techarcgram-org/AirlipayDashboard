'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearSession,
  readSession,
  subscribeToSession,
  writeSession,
} from '@/lib/auth/session';

const AuthContext = createContext({
  session: null,
  ready: false,
  signIn: () => {},
  signOut: () => {},
  refresh: () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setSession(readSession());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
    return subscribeToSession(refresh);
  }, [refresh]);

  const signIn = useCallback((nextSession) => {
    writeSession(nextSession);
    setSession(readSession());
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(readSession());
  }, []);

  const value = useMemo(
    () => ({ session, ready, signIn, signOut, refresh }),
    [session, ready, signIn, signOut, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function roleLabel(role) {
  if (role === 'ADMIN') return 'Admin';
  if (role === 'CLIENT') return 'Client';
  if (role === 'USER') return 'Employee';
  return role || 'Member';
}

export function isAdmin(role) {
  return String(role || '').toUpperCase() === 'ADMIN';
}
