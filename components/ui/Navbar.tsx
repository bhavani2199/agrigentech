'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState('');
  const [mobileQuery, setMobileQuery] = useState('');
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 320);
    }
  }, [mobileSearchOpen]);

  function submitSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
    setMobileSearchOpen(false);
    setDrawerOpen(false);
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          backgroundColor: '#f5f0e8',
          borderBottom: '1.5px solid #b8860b',
          boxShadow: scrolled ? '0 2px 16px 0 rgba(26,58,34,0.10)' : 'none',
        }}
      >
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-5 md:px-10">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center select-none shrink-0">
            <Image
              src="/logo.png"
              alt="Agrigentech"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 justify-end">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link relative text-sm font-medium transition-colors duration-200 hover:text-[#b8860b]"
                style={{ color: '#1a3a22', fontFamily: 'var(--font-dm-sans), sans-serif' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search */}
          <div className="hidden md:flex items-center justify-center relative">
            <Search
              size={14}
              className="absolute left-3 pointer-events-none"
              style={{ color: '#4a5c4e' }}
            />
            <input
              type="text"
              value={desktopQuery}
              onChange={(e) => setDesktopQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitSearch(desktopQuery);
              }}
              placeholder="Search products..."
              style={{
                width: 200,
                paddingLeft: 30,
                paddingRight: 12,
                paddingTop: 7,
                paddingBottom: 7,
                borderRadius: 999,
                border: '1.5px solid #d4c9a8',
                backgroundColor: '#f5f0e8',
                color: '#1a3a22',
                fontSize: 13,
                fontFamily: 'var(--font-dm-sans), sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1a3a22')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d4c9a8')}
            />
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              className="flex items-center justify-center rounded p-1.5 transition-colors duration-200 hover:bg-[#e8e0d0]"
              style={{ color: '#1a3a22' }}
              onClick={() => {
                setMobileSearchOpen((v) => !v);
                setDrawerOpen(false);
              }}
              aria-label="Toggle search"
            >
              {mobileSearchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
            <button
              className="flex items-center justify-center rounded p-1.5 transition-colors duration-200 hover:bg-[#e8e0d0]"
              style={{ color: '#1a3a22' }}
              onClick={() => {
                setDrawerOpen(true);
                setMobileSearchOpen(false);
              }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile search bar — slides in below navbar */}
        <div
          className="md:hidden overflow-hidden"
          style={{
            maxHeight: mobileSearchOpen ? 64 : 0,
            transition: 'max-height 0.3s ease',
            borderTop: mobileSearchOpen ? '1px solid #d4c9a8' : '1px solid transparent',
          }}
        >
          <div className="flex items-center gap-2 px-5 py-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: '#4a5c4e' }}
              />
              <input
                ref={mobileInputRef}
                type="text"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch(mobileQuery);
                }}
                placeholder="Search products..."
                className="w-full rounded-full text-sm outline-none"
                style={{
                  paddingLeft: 34,
                  paddingRight: 12,
                  paddingTop: 8,
                  paddingBottom: 8,
                  border: '1.5px solid #d4c9a8',
                  backgroundColor: '#fff',
                  color: '#1a3a22',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#1a3a22')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#d4c9a8')}
              />
            </div>
            <button
              onClick={() => submitSearch(mobileQuery)}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-opacity duration-200 hover:opacity-80"
              style={{
                backgroundColor: '#1a3a22',
                color: '#f5f0e8',
                fontFamily: 'var(--font-dm-sans), sans-serif',
              }}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile nav drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#f5f0e8', borderLeft: '1.5px solid #b8860b' }}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #d4c9a8' }}>
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <Image src="/logo.png" alt="Agrigentech" width={120} height={40} style={{ objectFit: 'contain' }} />
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="rounded p-1.5 transition-colors hover:bg-[#e8e0d0]"
            style={{ color: '#1a3a22' }}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="rounded-md px-4 py-3 text-base font-medium transition-colors duration-150 hover:bg-[#e8e0d0] hover:text-[#b8860b]"
              style={{ color: '#1a3a22', fontFamily: 'var(--font-dm-sans), sans-serif' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
