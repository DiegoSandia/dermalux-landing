import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Servicios from '@/components/Servicios';
import AntesDespues from '@/components/AntesDespues';
import Testimonios from '@/components/Testimonios';
import CTAFinal from '@/components/CTAFinal';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default function Home() {
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
