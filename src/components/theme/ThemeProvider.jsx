'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { resolveTheme, THEME_STORAGE_KEY } from '@/lib/theme';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

function applyTheme(theme) {
  if (typeof document === 'undefined') {
    return;
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');

  useEffect(() => {
    const initial = resolveTheme();
    applyTheme(initial);
    setThemeState(initial);

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMedia = () => {
      if (!window.localStorage.getItem(THEME_STORAGE_KEY)) {
        const next = media.matches ? 'dark' : 'light';
        applyTheme(next);
        setThemeState(next);
      }
    };
    media.addEventListener?.('change', handleMedia);
    return () => media.removeEventListener?.('change', handleMedia);
  }, []);

  const setTheme = useCallback((next) => {
    const resolved = next === 'dark' ? 'dark' : 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, resolved);
    applyTheme(resolved);
    setThemeState(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
