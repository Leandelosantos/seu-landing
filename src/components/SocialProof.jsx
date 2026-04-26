import { Box, Container, Typography } from '@mui/material';
import { colors } from '../theme/theme';

const ITEMS = [
  { value: 'Desde 2025', label: 'Sistema en producción' },
  { value: 'Uso diario', label: 'En negocios reales' },
  { value: 'Argentina', label: 'Soporte en español' },
];

export default function SocialProof() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 6 },
        backgroundColor: colors.bgElevated,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          }}
        >
          {ITEMS.map((item, i) => (
            <Box
              key={item.label}
              sx={{
                textAlign: 'center',
                py: { xs: 3, md: 2 },
                px: 3,
                borderRight: {
                  xs: 'none',
                  sm: i < ITEMS.length - 1 ? `1px solid ${colors.border}` : 'none',
                },
                borderBottom: {
                  xs: i < ITEMS.length - 1 ? `1px solid ${colors.border}` : 'none',
                  sm: 'none',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: colors.accent,
                  mb: 0.5,
                }}
              >
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textMuted }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
