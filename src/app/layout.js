import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import { THEME_SCRIPT } from '@/lib/theme';

const inter = localFont({
  src: [
    { path: './fonts/Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Inter-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Inter-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/Inter-Bold.ttf', weight: '700', style: 'normal' },
    { path: './fonts/Inter-ExtraBold.ttf', weight: '800', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

export const metadata = {
  title: {
    default: 'AirliPay Operations',
    template: '%s · AirliPay Operations',
  },
  description: 'AirliPay back-office operations console',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
