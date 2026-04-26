import { Box, Typography } from '@mui/material';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', sx }) {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 5, md: 7 }, maxWidth: align === 'center' ? 720 : 'none', mx: align === 'center' ? 'auto' : 0, ...sx }}>
      {eyebrow && (
        <Reveal>
          <Typography
            variant="overline"
            sx={{
              display: 'inline-block',
              color: colors.accent,
              fontWeight: 600,
              letterSpacing: '0.15em',
              mb: 1.5,
            }}
          >
            {eyebrow}
          </Typography>
        </Reveal>
      )}
      <Reveal delay={60}>
        <Typography variant="h2" component="h2" sx={{ mb: subtitle ? 2 : 0 }}>
          {title}
        </Typography>
      </Reveal>
      {subtitle && (
        <Reveal delay={120}>
          <Typography variant="subtitle1" sx={{ color: colors.textMuted, maxWidth: 620, mx: align === 'center' ? 'auto' : 0 }}>
            {subtitle}
          </Typography>
        </Reveal>
      )}
    </Box>
  );
}
