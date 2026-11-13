'use client';

import { useTheme } from './ThemeProvider';
import { IconButton } from '@/components/backoffice/ui';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      icon={theme === 'dark' ? 'sun' : 'moon'}
      label={`Switch to ${next} theme`}
      onClick={toggleTheme}
      className={className}
    />
  );
}
