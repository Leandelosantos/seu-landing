import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Contacto from './pages/Contacto';
import RegistroExitoso from './pages/RegistroExitoso';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // pequeño delay para que React renderice la sección primero
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

const PAGES_WITH_FOOTER = ['/', '/contacto', '/registro', '/registro-exitoso'];

export default function App() {
  const location = useLocation();
  const showFooter = PAGES_WITH_FOOTER.some((p) =>
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p),
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToHash />
      <Navbar />
      <Box component="div" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro-exitoso" element={<RegistroExitoso />} />
          {/* placeholders para links del footer */}
          <Route path="/terminos" element={<PlaceholderPage title="Términos y condiciones" />} />
          <Route path="/privacidad" element={<PlaceholderPage title="Política de privacidad" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
}

function PlaceholderPage({ title }) {
  return (
    <Box sx={{ minHeight: '100vh', pt: 16, pb: 12, textAlign: 'center' }}>
      <Box sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>{title}</Box>
      <Box sx={{ color: '#71717a' }}>Contenido próximamente.</Box>
    </Box>
  );
}

function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', pt: 16, pb: 12, textAlign: 'center' }}>
      <Box sx={{ fontSize: '4rem', fontWeight: 800, mb: 2, color: '#4F8EF7' }}>404</Box>
      <Box sx={{ fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>Página no encontrada</Box>
      <Box sx={{ color: '#71717a' }}>La página que buscás no existe.</Box>
    </Box>
  );
}
