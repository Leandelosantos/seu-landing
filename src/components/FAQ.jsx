import { Box, Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { colors } from '../theme/theme';

const FAQS = [
  {
    q: '¿Cómo funciona el cobro?',
    a: 'Se debita automáticamente cada mes o año según el plan elegido. Podés pagar con tarjeta de crédito o MercadoPago.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin permanencia. Cancelás cuando querés y seguís teniendo acceso hasta el fin del período pagado.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Sí. Cada negocio tiene sus datos completamente aislados. Usamos encriptación y servidores de alta disponibilidad.',
  },
  {
    q: '¿Funciona en celular?',
    a: 'Sí, es 100% responsive. Funciona desde cualquier navegador en celular, tablet o computadora, sin instalar nada.',
  },
  {
    q: '¿Para qué tipo de negocios sirve?',
    a: 'Para cualquier negocio que venda productos y necesite controlar stock, ventas y caja. Distribuidoras, almacenes, mayoristas, comercios minoristas y más.',
  },
  {
    q: '¿Puedo tener varias sucursales?',
    a: 'Sí, con el Plan Profesional gestionás hasta 5 sucursales desde una sola cuenta.',
  },
  {
    q: '¿Qué incluye el plan Personalizado?',
    a: 'Todo el Plan Profesional más funcionalidades a medida para tu negocio. Contactanos y te armamos una propuesta.',
  },
];

export default function FAQ() {
  return (
    <Box
      component="section"
      id="faq"
      sx={{
        py: { xs: 10, md: 14 },
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.bgElevated,
      }}
    >
      <Container maxWidth="md">
        <SectionHeader
          eyebrow="FAQ"
          title="Preguntas frecuentes"
          subtitle="Todo lo que necesitás saber antes de empezar."
        />

        <Box>
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <Accordion
                disableGutters
                elevation={0}
                sx={{ mb: 1.25 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon sx={{ color: colors.textMuted }} />}
                  aria-controls={`faq-${i}-content`}
                  id={`faq-${i}-header`}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '1rem', pr: 2 }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: colors.textMuted, lineHeight: 1.7 }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
