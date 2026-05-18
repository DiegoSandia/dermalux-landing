'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { DragIcon } from './_icons';

export default function AntesDespues() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClient = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(2, Math.min(98, p));
    setPos(p);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const move = (e: MouseEvent | TouchEvent) => {
      const x =
        'touches' in e && e.touches[0]
          ? e.touches[0].clientX
          : (e as MouseEvent).clientX;
      setFromClient(x);
    };
    const up = () => setDragging(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', up);
    document.body.style.cursor = 'grabbing';

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
      document.body.style.cursor = '';
    };
  }, [dragging, setFromClient]);

  const nearAntes = pos < 18;
  const nearDespues = pos > 82;
  const cssVars = { ['--clip' as string]: `${pos}%` } as CSSProperties;

  return (
    <section className="section antes-despues" id="resultados">
      <div className="section-head">
        <div>
          <div className="eyebrow">Resultados reales</div>
          <h2>
            Antes &amp; <em>después</em>
            <br />
            de un tratamiento.
          </h2>
        </div>
        <p className="section-head-meta">
          Imagen referencial de un protocolo de rejuvenecimiento de 3 sesiones.
          Los resultados varían según la piel de cada paciente.
        </p>
      </div>

      <div
        ref={wrapRef}
        className={
          'ad-wrap' +
          (nearAntes ? ' handle-near-antes' : '') +
          (nearDespues ? ' handle-near-despues' : '')
        }
        style={cssVars}
        onMouseDown={(e) => {
          setDragging(true);
          setFromClient(e.clientX);
        }}
        onTouchStart={(e) => {
          setDragging(true);
          setFromClient(e.touches[0].clientX);
        }}
      >
        {/* Swap with <Image fill src="/before.jpg" /> in production */}
        <div className="ad-img ad-antes" />
        <div
          className="ad-img ad-despues"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <span className="ad-label ad-label-antes">Antes</span>
        <span className="ad-label ad-label-despues">Después</span>

        <div
          className={`ad-handle${dragging ? ' dragging' : ''}`}
          style={{ left: `${pos}%` }}
        >
          <div className="ad-handle-knob">
            <DragIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
