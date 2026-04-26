import { Box, Container, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FormularioRegistro from '../components/FormularioRegistro';
import { colors } from '../theme/theme';

export default function Registro() {
  const [params] = useSearchParams();
  const plan = params.get('plan') || 'basico';
  const ciclo = params.get('ciclo') || 'monthly';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 12, md: 14 },
        pb: { xs: 8, md: 12 },
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${colors.accentSoft} 0%, transparent 55%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: colors.accent, fontWeight: 600, letterSpacing: '0.15em' }}>
            Registro
          </Typography>
          <Typography variant="h2" component="h1" sx={{ mt: 1, mb: 1.5 }}>
            Creá tu cuenta
          </Typography>
          <Typography variant="subtitle1" sx={{ color: colors.textMuted, maxWidth: 480, mx: 'auto' }}>
            Completá tus datos y elegí cómo pagar. En minutos tenés tu negocio en Seu.
          </Typography>
        </Box>

        <FormularioRegistro planSlug={plan} cicloInicial={ciclo} />
      </Container>
    </Box>
  );
}
