'use client';

import { useScrollY, addRipple } from './_hooks';

export default function Nav() {
  const y = useScrollY();
  const scrolled = y > 30;

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          <span className="nav-logo-mark">D</span>
          <span>DermaLux</span>
        </a>

        <div className="nav-links">
          <a href="#servicios">Tratamientos</a>
          <a href="#resultados">Resultados</a>
          <a href="#testimonios">Pacientes</a>
          <a href="#doctora">La doctora</a>
          <a href="#contacto">Contacto</a>
        </div>

        <a href="#contacto" className="nav-cta" onClick={addRipple}>
          Agendar cita
        </a>
      </div>
      <div className="nav-underline" />
    </nav>
  );
}
