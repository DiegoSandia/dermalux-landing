/* eslint-disable */
// DermaLux — components Part 1: Nav, Hero, Stats, Servicios

const { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } = React;

// ===== Hooks =====
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { setY(window.scrollY); raf = null; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// Ripple helper
function addRipple(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = size + 'px';
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  btn.appendChild(span);
  setTimeout(() => span.remove(), 700);
}

// ===== Icons (inline lucide-like) =====
const I = {
  Arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ArrowSm: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Sparkle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l1.8 5.5L19 10l-5.2 1.5L12 17l-1.8-5.5L5 10l5.2-1.5L12 3z" strokeLinejoin="round"/></svg>,
  Droplet: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2.5s-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13z" strokeLinejoin="round"/></svg>,
  Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round"/></svg>,
  Leaf: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 9-4 16-9 16zM2 22l8-8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinejoin="round"/></svg>,
  Wave: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 12c3 0 3-4 6-4s3 8 6 8 3-4 6-4 3 0 2 0" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9 7.4.6-5.6 4.9 1.7 7.2L12 17.8l-6.4 3.8 1.7-7.2L1.7 9.5l7.4-.6L12 2z"/></svg>,
  WA: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1c-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>,
  Drag: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l-4 6 4 6M15 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinejoin="round"/></svg>,
  IG: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>,
};

// ===== Nav =====
function Nav() {
  const y = useScrollY();
  const scrolled = y > 30;
  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
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
        <a href="#contacto" className="nav-cta" onClick={addRipple}>Agendar cita</a>
      </div>
      <div className="nav-underline"></div>
    </nav>
  );
}

// ===== Hero =====
function Hero() {
  const y = useScrollY();
  const parallax = Math.min(y * 0.35, 240);
  const headlineWords = useMemo(() => ([
    { text: 'Tu', italic: false, delay: 0.5 },
    { text: 'piel', italic: false, delay: 0.62 },
    { text: 'merece', italic: false, delay: 0.74 },
    { text: 'lo', italic: true, delay: 0.86 },
    { text: 'mejor.', italic: true, delay: 0.98 },
  ]), []);

  return (
    <header className="hero" id="top">
      <div
        className="hero-bg"
        style={{ transform: `translate3d(0, ${parallax}px, 0) scale(1.08)` }}
      >
        <div className="hero-bg-img"></div>
      </div>

      <div className="hero-overlay">
        <div className="hero-left">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Polanco · CDMX · agendando 2026
            </div>

            <h1 className="hero-headline">
              {headlineWords.map((w, i) => (
                <React.Fragment key={i}>
                  <span
                    className={'word' + (w.italic ? ' italic' : '')}
                    style={{ animationDelay: `${w.delay}s` }}
                  >
                    {w.text}
                  </span>
                  {i < headlineWords.length - 1 && ' '}
                </React.Fragment>
              ))}
            </h1>

            <span className="gold-divider" style={{ animationDelay: '1.15s' }}></span>

            <p className="hero-sub">
              Dermatología estética rigurosa, resultados sutiles. La Dra. Valentina Ríos
              acompaña tu piel con un protocolo personalizado y tecnología médica de
              precisión europea.
            </p>

            <div className="hero-actions">
              <a href="#contacto" className="btn btn-primary" onClick={addRipple}>
                Reservar valoración
                <I.Arrow />
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
          <div className="hero-portrait"></div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </header>
  );
}

// ===== Stats =====
function Stat({ end, suffix, label, decimals = 0 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    // cubic-bezier(0.16, 1, 0.3, 1) approx via easeOutExpo-like
    const ease = t => 1 - Math.pow(1 - t, 4);
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      setVal(end * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('es-MX');
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
function Stats() {
  return (
    <section className="stats">
      <div className="stats-grid">
        <Stat end={12}    suffix="+ años" label="Trayectoria clínica" />
        <Stat end={5000}  suffix="+"      label="Pacientes atendidas" />
        <Stat end={98}    suffix="%"      label="Satisfacción reportada" />
        <Stat end={15}    suffix="+"      label="Tratamientos premium" />
      </div>
    </section>
  );
}

// ===== Servicios =====
const SERVICIOS = [
  { icon: 'Sparkle', name: 'Botox & toxina',     desc: 'Relajación muscular precisa para líneas dinámicas y prevención del envejecimiento.', price: '$4,800', unit: '/ zona' },
  { icon: 'Droplet', name: 'Ácido hialurónico',  desc: 'Volumen, contorno y rehidratación con productos premium de origen suizo.',          price: '$8,900', unit: '/ jeringa' },
  { icon: 'Sun',     name: 'Láser fraccionado',  desc: 'Renovación celular profunda. Manchas, textura, cicatrices de acné en una sesión.',  price: '$6,500', unit: '/ sesión' },
  { icon: 'Leaf',    name: 'Peeling médico',     desc: 'Exfoliación química graduada para luminosidad inmediata y piel uniforme.',          price: '$3,200', unit: '/ sesión' },
  { icon: 'Heart',   name: 'Bioestimulación',    desc: 'Inducción natural de colágeno con polilácticos. Firmeza progresiva 6–12 meses.',     price: '$12,400', unit: '/ tratamiento' },
  { icon: 'Wave',    name: 'Radiofrecuencia',    desc: 'Lifting no quirúrgico. Tensado de óvalo facial, cuello y contorno mandibular.',      price: '$5,400', unit: '/ sesión' },
];

function ServiceCard({ s, i }) {
  const [ref, inView] = useInView(0.18);
  const Icon = I[s.icon];
  return (
    <article
      ref={ref}
      className={'service-card' + (inView ? ' in' : '')}
      style={{ animationDelay: `${i * 0.12}s` }}
    >
      <div className="service-icon"><Icon /></div>
      <h3 className="service-name">{s.name}</h3>
      <p className="service-desc">{s.desc}</p>
      <div className="service-foot">
        <div className="service-price">
          {s.price}<small>MXN {s.unit}</small>
        </div>
        <div className="service-arrow"><I.ArrowSm /></div>
      </div>
    </article>
  );
}

function Servicios() {
  return (
    <section className="section servicios" id="servicios">
      <div className="section-head">
        <div>
          <div className="eyebrow">Nuestros tratamientos</div>
          <h2>Protocolos <em>quirúrgicamente</em><br/> diseñados para tu piel.</h2>
        </div>
        <p className="section-head-meta">
          Cada tratamiento parte de una valoración médica. Sin paquetes prearmados,
          sin promesas vacías — sólo lo que tu piel realmente necesita.
        </p>
      </div>
      <div className="carousel-hint">Desliza horizontalmente</div>
      <div className="servicios-grid">
        {SERVICIOS.map((s, i) => <ServiceCard key={s.name} s={s} i={i} />)}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Stats, Servicios, useInView, useScrollY, addRipple, I });
