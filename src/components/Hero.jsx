import { Box, Container, Typography, Button, Stack } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import DashboardMockup from './DashboardMockup';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

export default function Hero() {
  const scrollTo = (id) => () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      component="section"
      id="inicio"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '100vh' },
        pt: { xs: 14, md: 16 },
        pb: { xs: 10, md: 12 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 80% 10%, ${colors.accentSoft} 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(124, 58, 237, 0.08) 0%, transparent 45%)
          `,
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${colors.border} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.border} 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, #000 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 0%, transparent 70%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Reveal>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.625,
                  mb: 3,
                  borderRadius: 999,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.bgCard,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.success }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: colors.textMuted }}>
                  Ya disponible en Argentina
                </Typography>
              </Box>
            </Reveal>

            <Reveal delay={80}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  background: `linear-gradient(180deg, ${colors.text} 0%, ${colors.textMuted} 130%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }}
              >
                Gestioná tu negocio.
                <br />
                <Box component="span" sx={{ color: colors.accent, WebkitTextFillColor: colors.accent }}>
                  Sin papeles, sin excusas.
                </Box>
              </Typography>
            </Reveal>

            <Reveal delay={160}>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  mb: 4,
                  maxWidth: 560,
                  color: colors.textMuted,
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                }}
              >
                Seu es el sistema de gestión y facturación que se adapta a tu negocio.
                Ventas, stock, sucursales, auditorías, métricas y más — todo desde el
                celular, tu tablet o tu computadora.
              </Typography>
            </Reveal>

            <Reveal delay={220}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={scrollTo('planes')}
                >
                  Comenzar ahora
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowRoundedIcon />}
                  onClick={scrollTo('como-funciona')}
                >
                  Ver cómo funciona
                </Button>
              </Stack>
            </Reveal>

            <Reveal delay={300}>
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 3, color: colors.textSubtle }}>
                {['Sin instalación', 'Sin permanencia', 'Soporte en español'].map((item) => (
                  <Typography key={item} variant="caption" sx={{ fontSize: '0.85rem' }}>
                    ✓ {item}
                  </Typography>
                ))}
              </Box>
            </Reveal>
          </Box>

          <Reveal delay={200} y={40}>
            <DashboardMockup />
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
