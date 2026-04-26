import { createTheme, alpha } from '@mui/material/styles';

export const colors = {
  bg: '#0a0a0a',
  bgElevated: '#111113',
  bgCard: '#141417',
  bgSubtle: '#1a1a1f',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#f5f5f7',
  textMuted: '#a1a1aa',
  textSubtle: '#71717a',
  accent: '#4F8EF7',
  accentHover: '#6BA3FF',
  accentSoft: 'rgba(79, 142, 247, 0.12)',
  accentGlow: 'rgba(79, 142, 247, 0.35)',
  success: '#22c55e',
  danger: '#ef4444',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.accent,
      light: colors.accentHover,
      dark: '#3a6fd0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7C3AED',
    },
    background: {
      default: colors.bg,
      paper: colors.bgCard,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
      disabled: colors.textSubtle,
    },
    divider: colors.border,
    success: { main: colors.success },
    error: { main: colors.danger },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.05,
      fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.25,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.05rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.925rem',
      lineHeight: 1.6,
      color: colors.textMuted,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '-0.005em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.bg,
          scrollBehavior: 'smooth',
        },
        '::selection': {
          backgroundColor: alpha(colors.accent, 0.35),
          color: '#ffffff',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          '@media (min-width:900px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontSize: '0.95rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 220ms ease, transform 120ms ease',
          minHeight: 44,
        },
        sizeLarge: {
          padding: '13px 26px',
          fontSize: '1rem',
          minHeight: 50,
        },
        containedPrimary: {
          backgroundColor: colors.accent,
          color: '#ffffff',
          boxShadow: `0 0 0 1px ${alpha(colors.accent, 0.4)}, 0 8px 24px -8px ${colors.accentGlow}`,
          '&:hover': {
            backgroundColor: colors.accentHover,
            boxShadow: `0 0 0 1px ${alpha(colors.accentHover, 0.5)}, 0 12px 32px -8px ${colors.accentGlow}`,
          },
          '&:focus-visible': {
            outline: `2px solid ${colors.accentHover}`,
            outlineOffset: 2,
          },
        },
        outlined: {
          borderColor: colors.borderStrong,
          color: colors.text,
          '&:hover': {
            borderColor: colors.accent,
            backgroundColor: colors.accentSoft,
          },
        },
        text: {
          color: colors.textMuted,
          '&:hover': {
            backgroundColor: alpha('#ffffff', 0.04),
            color: colors.text,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.bgCard,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgElevated,
          borderRadius: 10,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.borderStrong,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.accent,
            borderWidth: 1,
          },
        },
        input: {
          padding: '14px 16px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.textMuted,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          backgroundImage: 'none',
          border: `1px solid ${colors.border}`,
          borderRadius: '12px !important',
          marginBottom: 10,
          '&:before': { display: 'none' },
          '&.Mui-expanded': {
            margin: '0 0 10px 0',
            borderColor: colors.borderStrong,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '4px 20px',
          minHeight: 64,
          '&.Mui-expanded': { minHeight: 64 },
        },
        content: {
          fontWeight: 600,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 20px 20px',
          color: colors.textMuted,
          lineHeight: 1.65,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: colors.textMuted,
          transition: 'color 150ms ease',
          '&:hover': { color: colors.text },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          color: colors.textMuted,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 18px',
          '&.Mui-selected': {
            backgroundColor: colors.accentSoft,
            borderColor: colors.accent,
            color: colors.text,
            '&:hover': { backgroundColor: colors.accentSoft },
          },
        },
      },
    },
  },
});

export default theme;
