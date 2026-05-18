'use client';

import { useInView } from './_hooks';
import { ArrowSmIcon, ICON_MAP, type IconKey } from './_icons';

type Service = {
  icon: IconKey;
  name: string;
  desc: string;
  price: string;
  unit: string;
};

const SERVICIOS: Service[] = [
  { icon: 'Sparkle', name: 'Botox & toxina',    desc: 'Relajación muscular precisa para líneas dinámicas y prevención del envejecimiento.', price: '$4,800',  unit: '/ zona' },
  { icon: 'Droplet', name: 'Ácido hialurónico', desc: 'Volumen, contorno y rehidratación con productos premium de origen suizo.',          price: '$8,900',  unit: '/ jeringa' },
  { icon: 'Sun',     name: 'Láser fraccionado', desc: 'Renovación celular profunda. Manchas, textura, cicatrices de acné en una sesión.',  price: '$6,500',  unit: '/ sesión' },
  { icon: 'Leaf',    name: 'Peeling médico',    desc: 'Exfoliación química graduada para luminosidad inmediata y piel uniforme.',          price: '$3,200',  unit: '/ sesión' },
  { icon: 'Heart',   name: 'Bioestimulación',   desc: 'Inducción natural de colágeno con polilácticos. Firmeza progresiva 6–12 meses.',     price: '$12,400', unit: '/ tratamiento' },
  { icon: 'Wave',    name: 'Radiofrecuencia',   desc: 'Lifting no quirúrgico. Tensado de óvalo facial, cuello y contorno mandibular.',      price: '$5,400',  unit: '/ sesión' },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const [ref, inView] = useInView<HTMLElement>(0.18);
  const Icon = ICON_MAP[s.icon];

  return (
    <article
      ref={ref}
      className={`service-card reveal-up${inView ? ' in' : ''}`}
      style={{ transitionDelay: `${i * 0.12}s` }}
    >
      <div className="service-icon">
        <Icon />
      </div>
      <h3 className="service-name">{s.name}</h3>
      <p className="service-desc">{s.desc}</p>
      <div className="service-foot">
        <div className="service-price">
          {s.price}
          <small>MXN {s.unit}</small>
        </div>
        <div className="service-arrow">
          <ArrowSmIcon />
        </div>
      </div>
    </article>
  );
}

export default function Servicios() {
  return (
    <section className="section servicios" id="servicios">
      <div className="section-head">
        <div>
          <div className="eyebrow">Nuestros tratamientos</div>
          <h2>
            Protocolos <em>quirúrgicamente</em>
            <br />
            diseñados para tu piel.
          </h2>
        </div>
        <p className="section-head-meta">
          Cada tratamiento parte de una valoración médica. Sin paquetes prearmados,
          sin promesas vacías — sólo lo que tu piel realmente necesita.
        </p>
      </div>

      <div className="servicios-grid">
        {SERVICIOS.map((s, i) => (
          <ServiceCard key={s.name} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}
