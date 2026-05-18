'use client';

import { useInView } from './_hooks';
import { StarIcon } from './_icons';

type Testimonial = {
  name: string;
  meta: string;
  rating: number;
  quote: string;
};

const TESTIMONIOS: Testimonial[] = [
  { name: 'María Fernanda C.', meta: 'Botox preventivo · 8 meses',   rating: 5, quote: 'La Dra. Valentina explica cada decisión con calma. Mi piel se ve descansada, no congelada — exactamente lo que pedí.' },
  { name: 'Alejandra R.',      meta: 'Láser + peeling · 6 meses',    rating: 5, quote: 'Después de 15 años con manchas solares, finalmente encontré un protocolo que funcionó. La clínica es impecable.' },
  { name: 'Sofía M.',          meta: 'Bioestimulación · 1 año',      rating: 5, quote: 'Resultados progresivos, naturales. Mis amigas notan que "algo cambió" sin saber qué. Esa es la magia.' },
  { name: 'Patricia L.',       meta: 'Hialurónico labial · 4 meses', rating: 5, quote: 'Sutil, simétrico, elegante. Sin el efecto "labio de pato" que tanto me preocupaba. Volvería sin pensarlo.' },
  { name: 'Carolina V.',       meta: 'Radiofrecuencia · 5 sesiones', rating: 5, quote: 'A los 52 buscaba algo más que cremas, sin pasar por quirófano. El óvalo facial se redefinió de manera espectacular.' },
  { name: 'Daniela H.',        meta: 'Acné adulto · 7 meses',        rating: 5, quote: 'Llegué con frustración tras años de tratamientos fallidos. Hoy mi piel está calmada y limpia por primera vez.' },
];

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const delay = (i % 3) * 0.12 + Math.floor(i / 3) * 0.08;

  return (
    <article
      ref={ref}
      className={`testimonial-card reveal-up${inView ? ' in' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="testimonial-stars">
        {Array.from({ length: t.rating }).map((_, k) => (
          <StarIcon key={k} />
        ))}
      </div>
      <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
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

export default function Testimonios() {
  return (
    <section className="section testimonios" id="testimonios">
      <div className="section-head">
        <div>
          <div className="eyebrow">Pacientes que confían</div>
          <h2>
            Voces que prefieren <em>resultados</em>
            <br />
            sobre exageraciones.
          </h2>
        </div>
        <p className="section-head-meta">
          Una selección curada de pacientes que decidieron compartir su experiencia.
          Todos los testimonios son verificados y autorizados.
        </p>
      </div>

      <div className="testimonios-grid">
        {TESTIMONIOS.map((t, i) => (
          <TestimonialCard key={t.name} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
