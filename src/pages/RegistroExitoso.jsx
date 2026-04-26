import { Box, Container, Typography, Button } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { colors } from '../theme/theme';

const APP_URL = import.meta.env.VITE_APP_LOGIN_URL || 'https://app.seu.com.ar/login';

export default function RegistroExitoso() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        backgroundImage: `radial-gradient(ellipse at 50% 40%, ${colors.accentSoft} 0%, transparent 60%)`,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgCard,
            boxShadow: `0 32px 80px -32px ${colors.accentGlow}`,
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: 'rgba(34,197,94,0.12)',
              border: '1.5px solid rgba(34,197,94,0.4)',
              display: 'grid',
              placeItems: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <CheckCircleRoundedIcon sx={{ fontSize: 36, color: colors.success }} />
          </Box>

          <Typography variant="h3" sx={{ mb: 2 }}>
            ¡Registro completado!
          </Typography>

          <Typography variant="body1" sx={{ color: colors.textMuted, mb: 1.5 }}>
            Estamos activando tu cuenta.
          </Typography>
          <Typography variant="body1" sx={{ color: colors.textMuted, mb: 4 }}>
            En unos instantes vas a recibir un email con tus credenciales de acceso.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            href={APP_URL}
            rel="noopener noreferrer"
            endIcon={<OpenInNewRoundedIcon />}
            sx={{ minWidth: 200 }}
          >
            Ir al sistema
          </Button>

          <Typography variant="caption" sx={{ display: 'block', mt: 3, color: colors.textSubtle }}>
            Si no recibís el email en los próximos minutos, revisá la carpeta de spam.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
