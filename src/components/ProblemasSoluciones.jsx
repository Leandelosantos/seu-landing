import { Box, Container, Grid, Typography } from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

const ITEMS = [
  {
    icon: <AccessTimeRoundedIcon />,
    problema: 'Llevar el control en papel o Excel te hace perder tiempo y cometer errores.',
    solucion: 'Dashboard en tiempo real. Sabés cuánto vendiste hoy sin calcular nada.',
  },
  {
    icon: <InventoryRoundedIcon />,
    problema: 'No sabés si hay pérdidas de stock hasta que ya es tarde.',
    solucion: 'El stock se actualiza solo con cada venta. Alertas de bajo stock automáticas.',
  },
  {
    icon: <LocationOnRoundedIcon />,
    problema: 'Tenés que estar en el local para saber cómo va el negocio.',
    solucion: 'Recibí el resumen del día por email. Controlá todo desde donde estés.',
  },
];

export default function ProblemasSoluciones() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.bgElevated,
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${colors.accentSoft} 0%, transparent 65%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Por qué Seu"
          title="El control que tu negocio necesitaba"
          subtitle="Dejá de apagar incendios. Empezá a tomar decisiones con información real."
        />

        <Grid container spacing={3}>
          {ITEMS.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Reveal delay={i * 80}>
                <Box
                  sx={{
                    height: '100%',
                    p: { xs: 3, sm: 3.5 },
                    borderRadius: 3,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgCard,
                    transition: 'border-color 220ms ease, box-shadow 220ms ease',
                    cursor: 'default',
                    '&:hover': {
                      borderColor: colors.borderStrong,
                      boxShadow: `0 8px 40px -16px ${colors.accentGlow}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: colors.accentSoft,
                      color: colors.accent,
                      mb: 2.5,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textSubtle,
                      mb: 2.5,
                      pb: 2.5,
                      borderBottom: `1px solid ${colors.border}`,
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                    }}
                  >
                    "{item.problema}"
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <ArrowForwardRoundedIcon
                      sx={{ color: colors.accent, fontSize: 18, mt: 0.25, flexShrink: 0 }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: colors.text, fontWeight: 600, lineHeight: 1.5 }}
                    >
                      {item.solucion}
                    </Typography>
                  </Box>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
