import { Box, Typography, Button, Divider, Chip } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import { colors } from '../theme/theme';

function PriceDisplay({ plan, ciclo }) {
  const precio = ciclo === 'yearly' ? plan.precio_anual : plan.precio_mensual;
  const ahorro = ciclo === 'yearly' && plan.precio_mensual && plan.precio_anual
    ? Math.round((1 - plan.precio_anual / (plan.precio_mensual * 12)) * 100)
    : null;

  const formatARS = (n) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);

  return (
    <Box sx={{ mb: 3 }}>
      {precio != null ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
            <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {formatARS(precio)}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.textMuted }}>
              /{ciclo === 'yearly' ? 'año' : 'mes'}
            </Typography>
          </Box>
          {ciclo === 'yearly' && ahorro > 0 && (
            <Typography variant="caption" sx={{ color: colors.success, fontWeight: 600, mt: 0.5, display: 'block' }}>
              Ahorrás {ahorro}% vs. mensual
            </Typography>
          )}
        </>
      ) : (
        <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          A coordinar
        </Typography>
      )}
    </Box>
  );
}

function FeatureItem({ label, included }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, py: 0.75 }}>
      <Box sx={{ mt: 0.15, flexShrink: 0 }}>
        {included ? (
          <CheckRoundedIcon sx={{ fontSize: 17, color: colors.accent }} />
        ) : (
          <CloseRoundedIcon sx={{ fontSize: 17, color: colors.textSubtle }} />
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{ color: included ? colors.text : colors.textSubtle, lineHeight: 1.45 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function PlanCard({ plan, ciclo, featured = false, custom = false }) {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (custom) {
      navigate('/contacto');
    } else {
      navigate(`/registro?plan=${plan.slug}&ciclo=${ciclo}`);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 3, sm: 3.5 },
        borderRadius: 3,
        border: featured
          ? '1.5px solid transparent'
          : `1px solid ${colors.border}`,
        background: featured
          ? `linear-gradient(${colors.bgCard}, ${colors.bgCard}) padding-box,
             linear-gradient(135deg, ${colors.accent}, #7C3AED) border-box`
          : colors.bgCard,
        backgroundColor: colors.bgCard,
        position: 'relative',
        transition: 'box-shadow 220ms ease, transform 220ms ease',
        cursor: 'default',
        '&:hover': {
          boxShadow: featured
            ? `0 20px 60px -20px ${colors.accentGlow}`
            : `0 12px 40px -16px rgba(0,0,0,0.5)`,
          transform: 'translateY(-2px)',
        },
        ...(featured && {
          boxShadow: `0 12px 48px -16px ${colors.accentGlow}`,
        }),
      }}
    >
      {featured && (
        <Chip
          label="Más popular"
          size="small"
          sx={{
            position: 'absolute',
            top: -14,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: colors.accent,
            color: '#fff',
            fontWeight: 700,
            fontSize: 12,
            height: 28,
            px: 0.5,
          }}
        />
      )}

      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
          {plan.nombre || (custom ? 'A medida' : plan.slug)}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.textMuted, lineHeight: 1.5 }}>
          {custom
            ? 'Todo el Plan Profesional más funcionalidades diseñadas específicamente para tu negocio.'
            : plan.descripcion}
        </Typography>
      </Box>

      <PriceDisplay plan={plan} ciclo={ciclo} />

      <Divider sx={{ borderColor: colors.border, mb: 2.5 }} />

      <Box sx={{ flex: 1, mb: 3 }}>
        {plan.features?.map((f) => (
          <FeatureItem key={f.label} label={f.label} included={f.included} />
        ))}
        {custom && (
          <FeatureItem label="Desarrollo personalizado" included={true} />
        )}
      </Box>

      <Button
        fullWidth
        size="large"
        variant={featured ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleCTA}
        sx={{
          mt: 'auto',
          ...(custom && {
            borderColor: colors.borderStrong,
            color: colors.text,
            '&:hover': { borderColor: colors.accent, backgroundColor: colors.accentSoft },
          }),
        }}
      >
        {custom ? 'Consultanos' : 'Comenzar ahora'}
      </Button>
    </Box>
  );
}
