import Hero from '../components/Hero';
import ProblemasSoluciones from '../components/ProblemasSoluciones';
import Funcionalidades from '../components/Funcionalidades';
import ComoFunciona from '../components/ComoFunciona';
import Planes from '../components/Planes';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemasSoluciones />
      <Funcionalidades />
      <ComoFunciona />
      <Planes />
      <SocialProof />
      <FAQ />
    </main>
  );
}
