'use client';

import { useEffect, useState } from 'react';
import { useInView } from './_hooks';

type StatProps = {
  end: number;
  suffix?: string;
  label: string;
  decimals?: number;
};

function Stat({ end, suffix, label, decimals = 0 }: StatProps) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    // easeOutQuart — matches our --ease-luxury curve
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setVal(end * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  const display = decimals
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString('es-MX');

  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        <span>{display}</span>
        {suffix && <span className="stat-suffix">{suffix}</span>}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-grid">
        <Stat end={12}   suffix="+ años" label="Trayectoria clínica" />
        <Stat end={5000} suffix="+"      label="Pacientes atendidas" />
        <Stat end={98}   suffix="%"      label="Satisfacción reportada" />
        <Stat end={15}   suffix="+"      label="Tratamientos premium" />
      </div>
    </section>
  );
}
