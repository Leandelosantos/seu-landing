import { Box, Container, Grid, Typography, Chip } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

const FEATURES = [
  {
    icon: <DashboardRoundedIcon />,
    title: 'Dashboard diario',
    desc: 'Ingresos, egresos y saldo neto del día de un vistazo.',
    pro: false,
  },
  {
    icon: <PointOfSaleRoundedIcon />,
    title: 'Registro de ventas',
    desc: 'Multi-ítem con múltiples métodos de pago simultáneos.',
    pro: false,
  },
  {
    icon: <Inventory2RoundedIcon />,
    title: 'Control de stock',
    desc: 'Se actualiza automáticamente al registrar cada venta.',
    pro: false,
  },
  {
    icon: <LocalShippingRoundedIcon />,
    title: 'Compras a proveedores',
    desc: 'Registrá compras y actualizá stock y precios en un paso.',
    pro: false,
  },
  {
    icon: <MailRoundedIcon />,
    title: 'Resumen diario por email',
    desc: 'Recibí el cierre del día sin tener que entrar al sistema.',
    pro: false,
  },
  {
    icon: <StoreRoundedIcon />,
    title: 'Multi-sucursal',
    desc: 'Gestioná todas tus sucursales desde una sola cuenta.',
    pro: true,
  },
  {
    icon: <BarChartRoundedIcon />,
    title: 'Métricas de negocio',
    desc: 'Top productos, rendimiento por empleado y por sucursal.',
    pro: true,
  },
  {
    icon: <PeopleRoundedIcon />,
    title: 'Módulo de clientes',
    desc: 'Cuenta corriente, historial y deudas de cada cliente.',
    pro: true,
  },
];

export default function Funcionalidades() {
  return (
    <Box component="section" id="funcionalidades" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Funcionalidades"
          title="Todo lo que necesitás, nada que no uses"
          subtitle="Diseñado para negocios reales: rápido de aprender, potente en el uso diario."
        />

        <Grid container spacing={2.5}>
          {FEATURES.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Reveal delay={i * 50}>
                <Box
                  sx={{
                    height: '100%',
                    p: 2.75,
                    borderRadius: 3,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgCard,
                    position: 'relative',
                    transition: 'border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease',
                    cursor: 'default',
                    '&:hover': {
                      borderColor: f.pro ? colors.accent : colors.borderStrong,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 40px -16px ${f.pro ? colors.accentGlow : 'rgba(0,0,0,0.4)'}`,
                    },
                  }}
                >
                  {f.pro && (
                    <Chip
                      label="Profesional"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        backgroundColor: colors.accentSoft,
                        color: colors.accent,
                        border: `1px solid ${colors.accent}`,
                        fontSize: 10,
                        height: 22,
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: f.pro ? colors.accentSoft : 'rgba(255,255,255,0.05)',
                      color: f.pro ? colors.accent : colors.textMuted,
                      mb: 2,
                    }}
                  >
                    {f.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontSize: '0.975rem', pr: f.pro ? 6 : 0 }}
                  >
                    {f.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: colors.textMuted, lineHeight: 1.55 }}>
                    {f.desc}
                  </Typography>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
