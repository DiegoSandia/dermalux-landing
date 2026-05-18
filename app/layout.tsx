import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'DermaLux — Dra. Valentina Ríos · Dermatología Premium',
  description:
    'Dermatología estética premium en Polanco, CDMX. Botox, ácido hialurónico, láser, bioestimulación y radiofrecuencia con la Dra. Valentina Ríos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
