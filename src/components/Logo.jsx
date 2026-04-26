import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../theme/theme';

export default function Logo({ size = 'md', to = '/' }) {
  const dim = size === 'lg' ? 36 : size === 'sm' ? 24 : 28;
  const fontSize = size === 'lg' ? '1.6rem' : size === 'sm' ? '1.1rem' : '1.3rem';

  return (
    <Box
      component={RouterLink}
      to={to}
      aria-label="Seu — Ir al inicio"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
      }}
    >
      <Box
        aria-hidden
        sx={{
          width: dim,
          height: dim,
          borderRadius: '8px',
          background: `linear-gradient(135deg, ${colors.accent} 0%, #7C3AED 100%)`,
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: dim * 0.55,
          letterSpacing: '-0.05em',
          boxShadow: `0 4px 20px -6px ${colors.accentGlow}`,
        }}
      >
        S
      </Box>
      <Typography
        component="span"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.03em',
          fontSize,
          color: colors.text,
        }}
      >
        Seu
      </Typography>
    </Box>
  );
}
