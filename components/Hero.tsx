'use client';

import { Fragment } from 'react';
import { useScrollY, addRipple } from './_hooks';
import { ArrowIcon } from './_icons';

const HEADLINE_WORDS: { text: string; italic: boolean; delay: number }[] = [
  { text: 'Tu',     italic: false, delay: 0.50 },
  { text: 'piel',   italic: false, delay: 0.62 },
  { text: 'merece', italic: false, delay: 0.74 },
  { text: 'lo',     italic: true,  delay: 0.86 },
  { text: 'mejor.', italic: true,  delay: 0.98 },
];

export default function Hero() {
  const y = useScrollY();
  const parallax = Math.min(y * 0.35, 240);

  return (
    <header className="hero" id="top">
      <div
        className="hero-bg"
        style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.08)` }}
      >
        {/* Replace with <Image src="/hero-clinic.jpg" ... fill /> in production */}
        <div className="hero-bg-img" />
      </div>

      <div className="hero-overlay">
        <div className="hero-left">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Polanco · CDMX · agendando 2026
            </div>

            <h1 className="hero-headline">
              {HEADLINE_WORDS.map((w, i) => (
                <Fragment key={i}>
                  <span
                    className={`word${w.italic ? ' italic' : ''}`}
                    style={{ animationDelay: `${w.delay}s` }}
                  >
                    {w.text}
                  </span>
                  {i < HEADLINE_WORDS.length - 1 && ' '}
                </Fragment>
              ))}
            </h1>

            <span className="gold-divider" style={{ animationDelay: '1.15s' }} />

            <p className="hero-sub">
              Dermatología estética rigurosa, resultados sutiles. La Dra. Valentina Ríos
              acompaña tu piel con un protocolo personalizado y tecnología médica de
              precisión europea.
            </p>

            <div className="hero-actions">
              <a href="#contacto" className="btn btn-primary" onClick={addRipple}>
                Reservar valoración
                <ArrowIcon />
              </a>
              <a href="#servicios" className="btn btn-outline" onClick={addRipple}>
                Ver tratamientos
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="hero-meta-num">12+</span> años de experiencia
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-num">5,000+</span> pacientes
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* Replace with <Image src="/doctora-portrait.jpg" fill style={{ objectFit: 'cover' }} /> */}
          <div className="hero-portrait" />
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </header>
  );
}
