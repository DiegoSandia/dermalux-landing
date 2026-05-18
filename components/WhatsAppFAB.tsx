'use client';

import { addRipple } from './_hooks';
import { WhatsAppIcon } from './_icons';

export default function WhatsAppFAB() {
  const phone = '5215512345678';
  const message = encodeURIComponent(
    'Hola, me gustaría agendar una valoración con la Dra. Valentina.',
  );
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fab"
      aria-label="Escribir por WhatsApp"
      onClick={addRipple}
    >
      <WhatsAppIcon />
    </a>
  );
}
