'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" className="inline-flex items-center select-none">
            <Image
              src="/logo.png"
              alt="Agrigentech"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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
          
          <button
            className="flex md:hidden items-center justify-center rounded p-1.5 transition-colors duration-200 hover:bg-[#e8e0d0]"
            style={{ color: '#1a3a22' }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#f5f0e8', borderLeft: '1.5px solid #b8860b' }}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #d4c9a8' }}>
          <Link href="/" onClick={() => setDrawerOpen(false)}>
            <Image src="/logo.png" alt="Agrigentech" width={120} height={34} style={{ objectFit: 'contain' }} />
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

        <div className="mt-auto flex items-center gap-5 px-8 py-6" style={{ borderTop: '1px solid #d4c9a8' }}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors duration-200 hover:text-[#b8860b]"
            style={{ color: '#1a3a22' }}
          >
            <Instagram size={22} strokeWidth={1.75} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200 hover:text-[#b8860b]"
            style={{ color: '#1a3a22' }}
          >
            <Linkedin size={22} strokeWidth={1.75} />
          </a>
        </div>
      </aside>
    </>
  );
}
