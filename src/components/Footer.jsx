import { Box, Container, Typography, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Logo';
import { colors } from '../theme/theme';

const year = new Date().getFullYear();

const LINKS = [
  { label: 'Términos y condiciones', href: '/terminos', internal: true },
  { label: 'Política de privacidad', href: '/privacidad', internal: true },
  { label: 'Contacto', href: '/contacto', internal: true },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
        py: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
            mb: 4,
          }}
        >
          <Box>
            <Logo />
            <Typography variant="body2" sx={{ mt: 1.5, color: colors.textSubtle, maxWidth: 300 }}>
              Sistema de gestión y facturación para negocios argentinos.
            </Typography>
            <Link
              href="mailto:leandrodelosantos@gmail.com"
              sx={{ display: 'block', mt: 1, fontSize: '0.9rem', color: colors.textMuted }}
            >
              leandrodelosantos@gmail.com
            </Link>
          </Box>

          <Box
            component="nav"
            aria-label="Links del footer"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: 3 },
              flexWrap: 'wrap',
            }}
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.href}
                sx={{ fontSize: '0.9rem', color: colors.textMuted, whiteSpace: 'nowrap' }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: colors.border, mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: colors.textSubtle }}>
            © {year} Seu. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textSubtle }}>
            🇦🇷 Hecho en Argentina
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
