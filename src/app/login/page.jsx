'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { login } from '@/app/apiServices/authService';
import { identityFromLoginPayload } from '@/lib/auth/session';
import {
  BrandMark,
  Button,
  Checkbox,
  Field,
  Icon,
  InlineNotice,
  TextInput,
} from '@/components/backoffice';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

function BrandArtwork() {
  return (
    <svg viewBox="0 0 820 420" className="pointer-events-none absolute -bottom-24 left-0 w-full max-w-[820px] opacity-55" fill="none" aria-hidden="true">
      <circle cx="470" cy="260" r="180" fill="#245BFF" opacity="0.09" />
      <path d="M12 310c120-192 330-256 600-160 110 39 170 45 208 10" stroke="#245BFF" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M44 348c96-144 246-194 426-142 118 34 210 20 250-24" stroke="#6FE7C8" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 13" />
      <circle cx="154" cy="246" r="14" fill="#6FE7C8" />
      <circle cx="154" cy="246" r="5" fill="#0A2540" />
      <circle cx="402" cy="166" r="8" fill="#F5F7FA" />
      <circle cx="402" cy="166" r="3" fill="#0A2540" />
      <circle cx="602" cy="180" r="18" fill="#6FE7C8" />
      <path d="m593 180 6 6 11-12" stroke="#0A2540" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="724" cy="106" r="5" fill="#8EA5BC" />
    </svg>
  );
}

function TrustItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-white/55">
        <Icon name={icon} size={15} />
      </span>
      <div>
        <p className="text-[12px] font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-[11px] leading-5 text-white/70">{description}</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { session, ready, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && session?.token) {
      router.replace('/dashboard');
    }
  }, [ready, router, session?.token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await login({
        username: username.trim(),
        password,
        remember,
      });
      const payload = response?.data;
      const token = payload?.access_token;
      if (!token) {
        throw new Error('The sign-in response did not include an access token.');
      }
      const identity = identityFromLoginPayload(payload);
      signIn({
        token,
        role: identity.role,
        userId: identity.userId,
        profile: identity.profile,
        remember,
      });
      router.replace('/dashboard');
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        requestError?.message ||
        'Sign-in failed. Check your credentials and try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[minmax(0,1.25fr)_minmax(420px,0.75fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-brand-surface px-14 pb-10 pt-10 lg:flex lg:flex-col xl:px-16">
        <BrandArtwork />
        <div className="relative z-10 flex items-center gap-2.5">
          <BrandMark size={30} />
          <span className="text-[23px] font-extrabold tracking-[-0.04em] text-white">AirliPay</span>
          <span className="ml-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50">Operations</span>
        </div>

        <div className="relative z-10 mt-[20vh] max-w-[560px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mint">The money desk</p>
          <h1 className="mt-4 text-[46px] font-extrabold leading-[1.08] tracking-[-0.045em] text-white">
            Payroll, clearly.
            <br />
            From funding to final payout.
          </h1>
          <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-white/65">
            One calm place to manage employers, move money and keep every payout accountable — built on the same language as the AirliPay app.
          </p>

          <div className="mt-10 grid max-w-[500px] grid-cols-2 gap-x-8 gap-y-5">
            <TrustItem icon="shieldCheck" title="Role-based access" description="Console visibility follows your account role." />
            <TrustItem icon="transactions" title="Live ledger" description="Funding and payout totals come from the ledger." />
            <TrustItem icon="globe" title="Cameroon focus" description="Payroll operations in XAF for local employers." />
            <TrustItem icon="lock" title="Session controls" description="Choose whether this device remembers you." />
          </div>
        </div>

        <div className="relative z-10 mt-auto flex items-center gap-2 text-[10px] text-white/40">
          <Icon name="shieldCheck" size={13} />
          <span>Protected operations console</span>
          <span className="ml-auto">Yaoundé · Douala</span>
        </div>
      </section>

      <section className="relative flex min-h-screen flex-col px-5 py-8 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <BrandMark size={26} />
            <span className="text-lg font-extrabold tracking-[-0.04em] text-ink">AirliPay</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">Operations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] font-medium text-muted sm:inline">Appearance</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-8 flex flex-col gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cobalt-text">Welcome back</p>
              <h2 className="text-[30px] font-bold leading-tight tracking-[-0.035em] text-ink">Sign in to operations</h2>
              <p className="text-[13px] leading-6 text-muted">Use the username issued by your AirliPay administrator.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error ? <InlineNotice tone="error" title="Unable to sign in">{error}</InlineNotice> : null}
              <Field label="Username" htmlFor="username" required>
                <TextInput
                  id="username"
                  name="username"
                  icon="profile"
                  autoComplete="username"
                  placeholder="e.g. nadege.mballa"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </Field>
              <Field label="Password" htmlFor="password" required>
                <div className="relative">
                  <TextInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    icon="lock"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="[&_input]:pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-xs text-muted transition hover:bg-surface-sunken hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showPassword ? 'eyeOff' : 'eye'} size={16} />
                  </button>
                </div>
              </Field>

              <div className="flex items-center justify-between gap-3 pt-0.5">
                <Checkbox
                  label="Remember this device"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <a href="mailto:support@airlipay.cm" className="text-[11px] font-semibold text-cobalt-text hover:underline">
                  Need help?
                </a>
              </div>

              <Button type="submit" fullWidth size="lg" loading={submitting} trailingIcon="arrowRight">
                Sign in
              </Button>

              <div className="flex items-start gap-2 rounded-sm bg-surface-sunken px-3 py-2.5 text-[11px] leading-5 text-muted">
                <Icon name="lock" size={14} className="mt-0.5 shrink-0" />
                <span>
                  Access is managed by your administrator. Contact{' '}
                  <a className="font-medium text-ink-soft hover:underline" href="mailto:support@airlipay.cm">
                    support@airlipay.cm
                  </a>{' '}
                  if you cannot sign in.
                </span>
              </div>
            </form>

            <p className="mt-10 text-center text-[10px] text-muted-light">
              AirliPay Operations · Secure staff access
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-light">
          <span>© {new Date().getFullYear()} AirliPay</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="globe" size={12} />
            Cameroon · XAF
          </span>
        </div>
      </section>
    </div>
  );
}
