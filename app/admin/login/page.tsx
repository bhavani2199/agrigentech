'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Eye, EyeOff, Leaf } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        router.push('/admin/dashboard');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#1a3a22' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 md:p-10"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center rounded-xl mb-4"
            style={{ width: 56, height: 56, backgroundColor: 'rgba(184,134,11,0.15)', border: '1px solid rgba(184,134,11,0.3)' }}
          >
            <Leaf size={26} strokeWidth={1.75} color="#b8860b" />
          </div>
          <h1
            className="text-3xl font-bold tracking-wide"
            style={{ fontFamily: 'var(--font-playfair), serif', color: '#b8860b', letterSpacing: '0.15em' }}
          >
            AGRIGENTECH
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em' }}
          >
            ADMIN PORTAL
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.6)' }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-150 placeholder:text-[rgba(245,240,232,0.3)]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f5f0e8',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
              onFocus={e => { e.currentTarget.style.border = '1px solid rgba(184,134,11,0.6)'; }}
              onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'; }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-[0.12em]"
              style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: 'rgba(245,240,232,0.6)' }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-3 pr-11 text-sm outline-none transition-all duration-150 placeholder:text-[rgba(245,240,232,0.3)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#f5f0e8',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
                onFocus={e => { e.currentTarget.style.border = '1px solid rgba(184,134,11,0.6)'; }}
                onBlur={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition-opacity"
                tabIndex={-1}
              >
                {showPassword
                  ? <EyeOff size={16} color="#f5f0e8" />
                  : <Eye size={16} color="#f5f0e8" />}
              </button>
            </div>
          </div>

          {error && (
            <p
              className="text-sm rounded-lg px-4 py-2.5"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                color: '#f87171',
                backgroundColor: 'rgba(248,113,113,0.1)',
                border: '1px solid rgba(248,113,113,0.25)',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg px-4 py-3.5 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#b8860b',
              color: '#fff',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              letterSpacing: '0.06em',
              boxShadow: '0 4px 20px rgba(184,134,11,0.3)',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
