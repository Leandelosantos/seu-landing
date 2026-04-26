import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Skeleton,
  Alert,
} from '@mui/material';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SectionHeader from './SectionHeader';
import PlanCard from './PlanCard';
import Reveal from './Reveal';
import { getPlans } from '../services/api';
import { colors } from '../theme/theme';

const PAYMENT_LOGOS = [
  { label: 'Visa', svg: <svg viewBox="0 0 48 48" width="38" height="24" aria-label="Visa"><rect width="48" height="30" rx="5" fill="#1A1F71"/><path d="M18.5 18h-3.1L13 30h3.1l2.4-12zm10.2 0h-2.9l-4.8 12H24l.8-2h4.2l.4 2H32l-3.3-12zm-2.9 7.5 1.7-4.5.9 4.5h-2.6zM10.5 18 7 26.5l-.4-2c-.7-2-2.7-4.2-5-5.3l2.8 10.8H7.5l4.5-12H10.5zm31 0h-3c-.7 0-1.3.5-1.5 1.2L32 30h3.3l.6-1.7h4l.4 1.7H43L40 18h-1.5zm-3.7 7.8 1.5-4.3.9 4.3h-2.4z" fill="white"/></svg> },
  { label: 'Mastercard', svg: <svg viewBox="0 0 48 48" width="38" height="24" aria-label="Mastercard"><rect width="48" height="30" rx="5" fill="#252525"/><circle cx="18" cy="15" r="10" fill="#EB001B"/><circle cx="30" cy="15" r="10" fill="#F79E1B"/><path d="M24 7.5a10 10 0 0 1 0 15 10 10 0 0 1 0-15z" fill="#FF5F00"/></svg> },
  { label: 'Amex', svg: <svg viewBox="0 0 48 48" width="38" height="24" aria-label="American Express"><rect width="48" height="30" rx="5" fill="#2E77BC"/><text x="8" y="20" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">AMEX</text></svg> },
  { label: 'MercadoPago', svg: <svg viewBox="0 0 48 48" width="38" height="24" aria-label="MercadoPago"><rect width="48" height="30" rx="5" fill="#009EE3"/><text x="5" y="20" fill="white" fontSize="7.5" fontWeight="bold" fontFamily="Arial">MP</text></svg> },
];

function PlanSkeleton() {
  return (
    <Box sx={{ p: 3.5, borderRadius: 3, border: `1px solid ${colors.border}`, backgroundColor: colors.bgCard }}>
      <Skeleton variant="text" width="60%" height={32} sx={{ bgcolor: colors.bgSubtle, mb: 1 }} />
      <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: colors.bgSubtle, mb: 2 }} />
      <Skeleton variant="text" width="50%" height={48} sx={{ bgcolor: colors.bgSubtle, mb: 3 }} />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} variant="text" width={`${60 + i * 5}%`} height={24} sx={{ bgcolor: colors.bgSubtle, mb: 1 }} />
      ))}
      <Skeleton variant="rectangular" height={50} sx={{ bgcolor: colors.bgSubtle, borderRadius: 2, mt: 3 }} />
    </Box>
  );
}

export default function Planes() {
  const [ciclo, setCiclo] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlans()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data?.plans ?? data?.data ?? [];
        setPlans(arr);
      })
      .catch((err) => setError(err.message || 'No se pudieron cargar los planes'))
      .finally(() => setLoading(false));
  }, []);

  const basicPlan = plans.find((p) => p.slug === 'basico' || p.tipo === 'basico') ?? plans[0];
  const proPlan = plans.find((p) => p.slug === 'profesional' || p.tipo === 'profesional') ?? plans[1];

  const customPlan = {
    nombre: 'A medida',
    slug: 'personalizado',
    descripcion: 'Todo el Plan Profesional más funcionalidades diseñadas específicamente para tu negocio.',
    precio_mensual: null,
    precio_anual: null,
    features: proPlan?.features ?? [],
  };

  return (
    <Box
      component="section"
      id="planes"
      sx={{
        py: { xs: 10, md: 14 },
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${colors.accentSoft} 0%, transparent 60%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Precios"
          title="Elegí el plan para tu negocio"
          subtitle="Empezá gratis el primer mes. Sin permanencia, cancelás cuando querés."
        />

        {/* Toggle mensual/anual */}
        <Reveal>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6, gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={ciclo}
              exclusive
              onChange={(_, v) => v && setCiclo(v)}
              aria-label="Ciclo de facturación"
              sx={{ borderRadius: 2 }}
            >
              <ToggleButton value="monthly" aria-label="Facturación mensual">
                Mensual
              </ToggleButton>
              <ToggleButton value="yearly" aria-label="Facturación anual">
                Anual
              </ToggleButton>
            </ToggleButtonGroup>
            {ciclo === 'yearly' && (
              <Box
                sx={{
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 999,
                  backgroundColor: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.3)',
                  color: colors.success,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Ahorrá 25%
              </Box>
            )}
          </Box>
        </Reveal>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} alignItems="stretch">
          {loading ? (
            [0, 1, 2].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <PlanSkeleton />
              </Grid>
            ))
          ) : (
            <>
              {basicPlan && (
                <Grid item xs={12} md={4}>
                  <Reveal delay={0}>
                    <PlanCard plan={basicPlan} ciclo={ciclo} />
                  </Reveal>
                </Grid>
              )}
              {proPlan && (
                <Grid item xs={12} md={4}>
                  <Reveal delay={80}>
                    <PlanCard plan={proPlan} ciclo={ciclo} featured />
                  </Reveal>
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <Reveal delay={160}>
                  <PlanCard plan={customPlan} ciclo={ciclo} custom />
                </Reveal>
              </Grid>
            </>
          )}
        </Grid>

        {/* Métodos de pago */}
        <Reveal delay={200}>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.75,
                borderRadius: 2.5,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bgCard,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <CreditCardRoundedIcon sx={{ color: colors.textSubtle, fontSize: 20 }} />
              {PAYMENT_LOGOS.map((logo) => (
                <Box key={logo.label} sx={{ opacity: 0.55, display: 'flex', alignItems: 'center' }}>
                  {logo.svg}
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: colors.textSubtle }}>
              Pagá con tarjeta de crédito o MercadoPago. Cobro automático, cancelás cuando querés.
            </Typography>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
