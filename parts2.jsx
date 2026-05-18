/* eslint-disable */
// DermaLux — components Part 2: AntesDespues, Testimonios, CTAFinal, Footer, WhatsAppFAB, App

// ===== Antes / Después =====
function AntesDespues() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClient = useCallback((clientX) => {
    const r = wrapRef.current.getBoundingClientRect();
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(2, Math.min(98, p));
    setPos(p);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
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

  return (
    <section className="section antes-despues" id="resultados">
      <div className="section-head">
        <div>
          <div className="eyebrow">Resultados reales</div>
          <h2>Antes &amp; <em>después</em><br/>de un tratamiento.</h2>
        </div>
        <p className="section-head-meta">
          Imagen referencial de un protocolo de rejuvenecimiento de 3 sesiones.
          Los resultados varían según la piel de cada paciente.
        </p>
      </div>

      <div
        ref={wrapRef}
        className={'ad-wrap' + (nearAntes ? ' handle-near-antes' : '') + (nearDespues ? ' handle-near-despues' : '')}
        style={{ '--clip': pos + '%' }}
        onMouseDown={(e) => { setDragging(true); setFromClient(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); setFromClient(e.touches[0].clientX); }}
      >
        <div className="ad-img ad-antes"></div>
        <div className="ad-img ad-despues" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}></div>
        <span className="ad-label ad-label-antes">Antes</span>
        <span className="ad-label ad-label-despues">Después</span>
        <div className={'ad-handle' + (dragging ? ' dragging' : '')} style={{ left: pos + '%' }}>
          <div className="ad-handle-knob"><I.Drag /></div>
        </div>
      </div>
    </section>
  );
}

// ===== Testimonios =====
const TESTIMONIOS = [
  { name: 'María Fernanda C.', meta: 'Botox preventivo · 8 meses',  rating: 5, quote: 'La Dra. Valentina explica cada decisión con calma. Mi piel se ve descansada, no congelada — exactamente lo que pedí.' },
  { name: 'Alejandra R.',      meta: 'Láser + peeling · 6 meses',   rating: 5, quote: 'Después de 15 años con manchas solares, finalmente encontré un protocolo que funcionó. La clínica es impecable.' },
  { name: 'Sofía M.',          meta: 'Bioestimulación · 1 año',     rating: 5, quote: 'Resultados progresivos, naturales. Mis amigas notan que "algo cambió" sin saber qué. Esa es la magia.' },
  { name: 'Patricia L.',       meta: 'Hialurónico labial · 4 meses', rating: 5, quote: 'Sutil, simétrico, elegante. Sin el efecto "labio de pato" que tanto me preocupaba. Volvería sin pensarlo.' },
  { name: 'Carolina V.',       meta: 'Radiofrecuencia · 5 sesiones',rating: 5, quote: 'A los 52 buscaba algo más que cremas, sin pasar por quirófano. El óvalo facial se redefinió de manera espectacular.' },
  { name: 'Daniela H.',        meta: 'Acné adulto · 7 meses',       rating: 5, quote: 'Llegué con frustración tras años de tratamientos fallidos. Hoy mi piel está calmada y limpia por primera vez.' },
];

function TestimonialCard({ t, i }) {
  const [ref, inView] = useInView(0.15);
  return (
    <article
      ref={ref}
      className={'testimonial-card' + (inView ? ' in' : '')}
      style={{ animationDelay: `${(i % 3) * 0.12 + Math.floor(i/3) * 0.08}s` }}
    >
      <div className="testimonial-stars">
        {Array.from({ length: t.rating }).map((_, k) => <I.Star key={k} />)}
      </div>
      <p className="testimonial-quote">"{t.quote}"</p>
      <div className="testimonial-foot">
        <div className="testimonial-avatar">{t.name.charAt(0)}</div>
        <div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-meta">{t.meta}</div>
        </div>
      </div>
    </article>
  );
}

function Testimonios() {
  return (
    <section className="section testimonios" id="testimonios">
      <div className="section-head">
        <div>
          <div className="eyebrow">Pacientes que confían</div>
          <h2>Voces que prefieren <em>resultados</em><br/>sobre exageraciones.</h2>
        </div>
        <p className="section-head-meta">
          Una selección curada de pacientes que decidieron compartir su experiencia.
          Todos los testimonios son verificados y autorizados.
        </p>
      </div>
      <div className="carousel-hint">Desliza para más historias</div>
      <div className="testimonios-grid">
        {TESTIMONIOS.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
      </div>
    </section>
  );
}

// ===== CTA Final =====
function CTAFinal() {
  const [textRef, textIn] = useInView(0.2);
  const [imgRef, imgIn]   = useInView(0.2);

  const particles = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    top: 5 + Math.random() * 90,
    left: 3 + Math.random() * 94,
    size: 4 + Math.random() * 22,
    dur: 12 + Math.random() * 14,
    delay: -Math.random() * 12,
    twinkleDelay: -Math.random() * 4,
  })), []);

  return (
    <section className="cta-final" id="contacto">
      <div className="cta-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="cta-particle"
            style={{
              top: p.top + '%',
              left: p.left + '%',
              width: p.size + 'px',
              height: p.size + 'px',
              '--dur': p.dur + 's',
              animationDelay: `${p.delay}s, ${p.twinkleDelay}s`,
            }}
          />
        ))}
      </div>

      <div className="cta-inner">
        <div ref={textRef} className={'cta-text' + (textIn ? ' in' : '')}>
          <div className="cta-eyebrow">Tu primera consulta</div>
          <h2 className="cta-headline">
            La piel que <em>siempre</em><br/>
            quisiste — empieza<br/>
            con una conversación.
          </h2>
          <p className="cta-sub">
            Agenda una valoración personalizada con la Dra. Valentina Ríos.
            45 minutos de diagnóstico, plan a tu medida y cero compromiso.
          </p>
          <div className="cta-actions">
            <a href="#" className="cta-btn" onClick={addRipple}>
              <I.WA /> Escribir por WhatsApp
            </a>
            <a href="#" className="cta-secondary">o llamar al consultorio</a>
          </div>
        </div>

        <div ref={imgRef} className={'cta-image' + (imgIn ? ' in' : '')}></div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo">
            <span className="nav-logo-mark">D</span>
            <span>DermaLux</span>
          </div>
          <p className="footer-tag">
            Dermatología estética premium en Polanco.
            Dirigida por la Dra. Valentina Ríos, miembro
            de la Sociedad Mexicana de Dermatología.
          </p>
        </div>
        <div>
          <h4>Tratamientos</h4>
          <ul>
            <li><a href="#">Botox &amp; toxina</a></li>
            <li><a href="#">Ácido hialurónico</a></li>
            <li><a href="#">Láser fraccionado</a></li>
            <li><a href="#">Bioestimulación</a></li>
            <li><a href="#">Radiofrecuencia</a></li>
          </ul>
        </div>
        <div>
          <h4>Clínica</h4>
          <ul>
            <li><a href="#doctora">La doctora</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
            <li><a href="#resultados">Resultados</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Aviso legal</a></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li><a href="#">Av. Presidente Masaryk 123<br/>Polanco, CDMX</a></li>
            <li><a href="#">+52 55 1234 5678</a></li>
            <li><a href="#">hola@dermalux.mx</a></li>
            <li><a href="#">Lun – Sáb · 9:00 – 19:00</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 DermaLux · Dra. Valentina Ríos. Cédula 1234567</span>
        <span>Diseño DermaLux Studio</span>
      </div>
    </footer>
  );
}

// ===== WhatsApp FAB =====
function WhatsAppFAB() {
  return (
    <a href="#" className="fab" aria-label="WhatsApp" onClick={addRipple}>
      <I.WA />
    </a>
  );
}

// ===== App =====
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Servicios />
      <AntesDespues />
      <Testimonios />
      <CTAFinal />
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
