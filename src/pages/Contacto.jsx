import { Box, Container, Typography } from '@mui/material';
import FormularioContacto from '../components/FormularioContacto';
import { colors } from '../theme/theme';

export default function Contacto() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 12, md: 14 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: colors.accent, fontWeight: 600, letterSpacing: '0.15em' }}>
            Contacto
          </Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 1.5 }}>
            Hablemos
          </Typography>
          <Typography variant="subtitle1" sx={{ color: colors.textMuted, maxWidth: 480, mx: 'auto' }}>
            Contanos qué necesitás para tu negocio y te armamos una propuesta a medida.
          </Typography>
        </Box>

        <FormularioContacto />
      </Container>
    </Box>
  );
}
