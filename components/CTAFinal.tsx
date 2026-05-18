'use client';

import { useMemo, type CSSProperties } from 'react';
import { useInView, addRipple } from './_hooks';
import { WhatsAppIcon } from './_icons';

type Particle = {
  top: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
};

export default function CTAFinal() {
  const [textRef, textIn] = useInView<HTMLDivElement>(0.2);
  const [imgRef, imgIn] = useInView<HTMLDivElement>(0.2);

  // Deterministic-ish particle layout (computed once on mount, client-only).
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 7 }, () => ({
        top: 10 + Math.random() * 80,
        left: 5 + Math.random() * 90,
        size: 6 + Math.random() * 18,
        dur: 14 + Math.random() * 10,
        delay: -Math.random() * 10,
      })),
    [],
  );

  return (
    <section className="cta-final" id="contacto">
      <div className="cta-particles">
        {particles.map((p, i) => {
          const style = {
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            ['--dur' as string]: `${p.dur}s`,
          } as CSSProperties;
          return <span key={i} className="cta-particle" style={style} />;
        })}
      </div>

      <div className="cta-inner">
        <div ref={textRef} className={`reveal-zoom${textIn ? ' in' : ''}`}>
          <div className="cta-eyebrow">Tu primera consulta</div>
          <h2 className="cta-headline">
            La piel que <em>siempre</em>
            <br />
            quisiste — empieza
            <br />
            con una conversación.
          </h2>
          <p className="cta-sub">
            Agenda una valoración personalizada con la Dra. Valentina Ríos.
            45 minutos de diagnóstico, plan a tu medida y cero compromiso.
          </p>
          <div className="cta-actions">
            <a href="#" className="cta-btn" onClick={addRipple}>
              <WhatsAppIcon /> Escribir por WhatsApp
            </a>
            <a href="#" className="cta-secondary">
              o llamar al consultorio
            </a>
          </div>
        </div>

        <div ref={imgRef} className={`cta-image reveal-up${imgIn ? ' in' : ''}`} />
      </div>
    </section>
  );
}
