import { Box, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { colors } from '../theme/theme';

const BAR_DATA = [38, 54, 42, 68, 55, 72, 88, 64, 80, 92, 70, 96];
const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const SPARK = [12, 18, 15, 22, 19, 26, 31, 28, 34, 30, 38, 44];

function MetricCard({ icon, label, value, delta, deltaPositive = true }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.5,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bgCard,
        flex: 1,
        minWidth: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: 1.5,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: colors.accentSoft,
            color: colors.accent,
          }}
        >
          {icon}
        </Box>
        <Typography variant="caption" sx={{ color: colors.textMuted, fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: '1.35rem', fontWeight: 700, letterSpacing: '-0.02em', mb: 0.25 }}>
        {value}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: deltaPositive ? colors.success : colors.danger,
          fontWeight: 600,
        }}
      >
        {delta}
      </Typography>
    </Box>
  );
}

export default function DashboardMockup() {
  return (
    <Box
      role="img"
      aria-label="Vista previa del dashboard de Seu mostrando ingresos, ventas, stock y métricas del día"
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 620,
        mx: 'auto',
        aspectRatio: { xs: '4/5', md: '5/6' },
        borderRadius: 4,
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.bgElevated,
        overflow: 'hidden',
        boxShadow: `0 40px 120px -40px ${colors.accentGlow}, 0 20px 60px -20px rgba(0,0,0,0.6)`,
        backgroundImage: `radial-gradient(ellipse at top right, ${colors.accentSoft} 0%, transparent 55%)`,
      }}
    >
      <Box
        aria-hidden
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2,
          py: 1.25,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: 'rgba(0,0,0,0.25)',
        }}
      >
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#eab308' }} />
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
        <Box sx={{ ml: 2, fontSize: 12, color: colors.textSubtle, fontFamily: 'ui-monospace, monospace' }}>
          seu · dashboard
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: 14, sm: 15 }, fontWeight: 700 }}>
              Resumen de hoy
            </Typography>
            <Typography variant="caption" sx={{ color: colors.textSubtle }}>
              Actualizado hace 2 min
            </Typography>
          </Box>
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 1,
              fontSize: 11,
              fontWeight: 600,
              color: colors.success,
              backgroundColor: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.25)',
            }}
          >
            En vivo
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ mb: 2 }}>
          <MetricCard
            icon={<AccountBalanceWalletRoundedIcon sx={{ fontSize: 16 }} />}
            label="Ingresos"
            value="$284.500"
            delta="+18% vs ayer"
          />
          <MetricCard
            icon={<ShoppingCartRoundedIcon sx={{ fontSize: 16 }} />}
            label="Ventas"
            value="47"
            delta="+12% vs ayer"
          />
          <MetricCard
            icon={<Inventory2RoundedIcon sx={{ fontSize: 16 }} />}
            label="Stock bajo"
            value="8"
            delta="3 críticos"
            deltaPositive={false}
          />
        </Stack>

        <Box
          sx={{
            p: 2,
            borderRadius: 2.5,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgCard,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpRoundedIcon sx={{ fontSize: 16, color: colors.accent }} />
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Ventas por hora</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: colors.textSubtle }}>
              Últimas 12 hs
            </Typography>
          </Box>

          <Box
            aria-hidden
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 0.75,
              height: { xs: 90, sm: 110 },
            }}
          >
            {BAR_DATA.map((h, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: '4px 4px 2px 2px',
                  background: `linear-gradient(180deg, ${colors.accent} 0%, ${colors.accentSoft} 100%)`,
                  border: `1px solid ${colors.accent}`,
                  opacity: 0.3 + (h / 100) * 0.7,
                }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${colors.border}` }}>
            <Box
              aria-hidden
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: colors.textSubtle, minWidth: 58 }}>
                Semana
              </Typography>
              <Box sx={{ flex: 1, position: 'relative', height: 28 }}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 40"
                  preserveAspectRatio="none"
                  style={{ display: 'block' }}
                >
                  <defs>
                    <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={colors.accent} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={colors.accent} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M0,${40 - SPARK[0]} ${SPARK.map(
                      (v, i) => `L${(i / (SPARK.length - 1)) * 300},${40 - v}`,
                    ).join(' ')} L300,40 L0,40 Z`}
                    fill="url(#sparkFill)"
                  />
                  <path
                    d={`M0,${40 - SPARK[0]} ${SPARK.map(
                      (v, i) => `L${(i / (SPARK.length - 1)) * 300},${40 - v}`,
                    ).join(' ')}`}
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, pl: '66px' }}>
              {DAYS.map((d) => (
                <Typography key={d} variant="caption" sx={{ color: colors.textSubtle, fontSize: 10 }}>
                  {d}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: 1.75,
            borderRadius: 2,
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.bgCard,
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
          }}
        >
          <CheckCircleRoundedIcon sx={{ color: colors.success, fontSize: 20 }} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Cierre del día enviado</Typography>
            <Typography variant="caption" sx={{ color: colors.textSubtle }}>
              Resumen enviado a tu email · 23:00 hs
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
