import { useEffect, useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { colors } from '../theme/theme';

const NAV_LINKS = [
  { label: 'Funcionalidades', target: 'funcionalidades' },
  { label: 'Planes', target: 'planes' },
  { label: 'FAQ', target: 'faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      setDrawerOpen(false);
      if (location.pathname !== '/') {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [location.pathname, navigate],
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${colors.border}` : '1px solid transparent',
          transition: 'background-color 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease',
          zIndex: (t) => t.zIndex.drawer + 2,
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar
            sx={{
              minHeight: { xs: 64, md: 72 },
              px: { xs: 2.5, md: 4 },
              gap: 2,
            }}
          >
            <Logo />

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                ml: 4,
                flexGrow: 1,
              }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  sx={{
                    color: colors.textMuted,
                    fontWeight: 500,
                    px: 1.75,
                    '&:hover': { color: colors.text, backgroundColor: 'rgba(255,255,255,0.04)' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 'auto' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => scrollToSection('planes')}
              >
                Empezar gratis
              </Button>
            </Box>

            <IconButton
              aria-label="Abrir menú"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                ml: 'auto',
                color: colors.text,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '85vw', sm: 360 },
            backgroundColor: colors.bgElevated,
            borderLeft: `1px solid ${colors.border}`,
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo />
          <IconButton
            aria-label="Cerrar menú"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: colors.text }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: colors.border }} />
        <List sx={{ py: 1 }}>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.target} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(link.target)}
                sx={{ py: 2, px: 3 }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontSize: '1.05rem', fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2.5, mt: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => scrollToSection('planes')}
          >
            Empezar gratis
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
