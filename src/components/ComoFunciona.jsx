import { Box, Container, Typography } from '@mui/material';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

const STEPS = [
  {
    n: '01',
    title: 'Elegí tu plan',
    desc: 'Básico para empezar o Profesional para crecer. Sin compromiso ni permanencia.',
  },
  {
    n: '02',
    title: 'Configurá tu negocio',
    desc: 'Cargá tus productos y sucursales en minutos. Sin manuales, sin capacitación.',
  },
  {
    n: '03',
    title: 'Empezá a gestionar',
    desc: 'Registrá ventas, controlá stock y recibí el resumen del día en tu email.',
  },
];

export default function ComoFunciona() {
  return (
    <Box
      component="section"
      id="como-funciona"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: colors.bgElevated,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="Tres pasos para tener tu negocio bajo control"
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 0, md: 0 },
            position: 'relative',
          }}
        >
          {/* línea conectora — solo desktop */}
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 36,
              left: '16.66%',
              right: '16.66%',
              height: 1,
              borderTop: `2px dashed ${colors.border}`,
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  px: { xs: 2, md: 4 },
                  py: { xs: 4, md: 0 },
                  borderBottom: {
                    xs: i < STEPS.length - 1 ? `1px solid ${colors.border}` : 'none',
                    md: 'none',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: `2px solid ${colors.accent}`,
                    backgroundColor: colors.bg,
                    display: 'grid',
                    placeItems: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: `0 0 32px -8px ${colors.accentGlow}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: colors.accent,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {step.n}
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ mb: 1.5 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.textMuted, maxWidth: 280, mx: 'auto', lineHeight: 1.65 }}>
                  {step.desc}
                </Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
