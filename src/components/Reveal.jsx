import { Box } from '@mui/material';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

export default function Reveal({ children, delay = 0, y = 24, sx, ...props }) {
  const [ref, visible] = useRevealOnScroll();

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
