'use client';

import { useEffect } from 'react';

/**
 * Lenis smooth scroll provider — lerp 0.08.
 * Drop this once at the top of app/layout.tsx body, before {children}.
 *
 * Install: pnpm add lenis
 */
export default function LenisProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: any;
    let rafId = 0;

    (async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Intercept in-page anchor clicks
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute('href');
        if (!id || id.length < 2) return;
        const el = document.querySelector(id) as HTMLElement | null;
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -64, duration: 1.4 });
      };
      document.addEventListener('click', onClick);
      (lenis as any).__cleanupClick = () => document.removeEventListener('click', onClick);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.__cleanupClick?.();
      lenis?.destroy?.();
    };
  }, []);

  return null;
}
