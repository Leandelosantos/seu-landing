import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  FormHelperText,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import { register, getPlans } from '../services/api';
import { colors } from '../theme/theme';

const INITIAL = {
  negocio: '',
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  confirmar: '',
  metodoPago: 'mobbex',
};

function validate(v) {
  const errs = {};
  if (!v.negocio.trim()) errs.negocio = 'El nombre del negocio es requerido.';
  if (!v.nombre.trim()) errs.nombre = 'Tu nombre es requerido.';
  if (!v.email.trim()) errs.email = 'El email es requerido.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Ingresá un email válido.';
  if (!v.telefono.trim()) errs.telefono = 'El teléfono es requerido.';
  if (!v.password) errs.password = 'La contraseña es requerida.';
  else if (v.password.length < 8) errs.password = 'Mínimo 8 caracteres.';
  if (!v.confirmar) errs.confirmar = 'Confirmá tu contraseña.';
  else if (v.confirmar !== v.password) errs.confirmar = 'Las contraseñas no coinciden.';
  if (!v.metodoPago) errs.metodoPago = 'Seleccioná un método de pago.';
  return errs;
}

function PlanSummary({ plan, ciclo, onCicloChange, loading }) {
  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="60%" height={32} sx={{ bgcolor: colors.bgSubtle, mb: 1 }} />
        <Skeleton variant="text" width="40%" height={48} sx={{ bgcolor: colors.bgSubtle, mb: 3 }} />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="text" width="80%" height={24} sx={{ bgcolor: colors.bgSubtle, mb: 1 }} />
        ))}
      </Box>
    );
  }

  if (!plan) return null;

  const precio = ciclo === 'yearly' ? plan.precio_anual : plan.precio_mensual;
  const formatARS = (n) =>
    n != null
      ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
      : null;

  return (
    <Box>
      <Typography variant="overline" sx={{ color: colors.accent, letterSpacing: '0.15em', fontWeight: 600 }}>
        Plan seleccionado
      </Typography>
      <Typography variant="h4" sx={{ mt: 0.5, mb: 0.5 }}>
        {plan.nombre}
      </Typography>

      {precio != null && (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
          <Typography sx={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {formatARS(precio)}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.textMuted }}>
            /{ciclo === 'yearly' ? 'año' : 'mes'}
          </Typography>
        </Box>
      )}

      <ToggleButtonGroup
        value={ciclo}
        exclusive
        onChange={(_, v) => v && onCicloChange(v)}
        size="small"
        sx={{ mb: 3 }}
        aria-label="Ciclo de facturación"
      >
        <ToggleButton value="monthly">Mensual</ToggleButton>
        <ToggleButton value="yearly">Anual (-25%)</ToggleButton>
      </ToggleButtonGroup>

      <Divider sx={{ borderColor: colors.border, mb: 2.5 }} />

      <Box>
        {plan.features
          ?.filter((f) => f.included)
          .map((f) => (
            <Box key={f.label} sx={{ display: 'flex', gap: 1.25, mb: 1.25, alignItems: 'flex-start' }}>
              <CheckRoundedIcon sx={{ color: colors.accent, fontSize: 17, mt: 0.15, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: colors.textMuted }}>
                {f.label}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default function FormularioRegistro({ planSlug, cicloInicial }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [ciclo, setCiclo] = useState(cicloInicial || 'monthly');

  useEffect(() => {
    getPlans()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data?.plans ?? data?.data ?? [];
        const found =
          arr.find((p) => p.slug === planSlug || p.tipo === planSlug) ?? arr[0] ?? null;
        setPlan(found);
      })
      .catch(() => {})
      .finally(() => setPlansLoading(false));
  }, [planSlug]);

  const set = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError(null);
    try {
      const res = await register({
        nombre_negocio: values.negocio.trim(),
        nombre: values.nombre.trim(),
        email: values.email.trim(),
        telefono: values.telefono.trim(),
        password: values.password,
        plan: planSlug,
        ciclo,
        metodo_pago: values.metodoPago,
      });
      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl;
      } else {
        // fallback: ir a registro exitoso
        window.location.href = '/registro-exitoso';
      }
    } catch (err) {
      setApiError(err.message || 'Ocurrió un error al registrarte. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'start',
      }}
    >
      {/* Resumen del plan */}
      <Box
        sx={{
          p: { xs: 3, sm: 3.5 },
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgCard,
          position: { md: 'sticky' },
          top: { md: 100 },
        }}
      >
        <PlanSummary
          plan={plan}
          ciclo={ciclo}
          onCicloChange={setCiclo}
          loading={plansLoading}
        />
      </Box>

      {/* Formulario */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {apiError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {apiError}
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            id="reg-negocio"
            label="Nombre del negocio"
            required
            fullWidth
            autoComplete="organization"
            value={values.negocio}
            onChange={set('negocio')}
            error={!!errors.negocio}
            helperText={errors.negocio}
            sx={{ gridColumn: { sm: '1 / -1' } }}
            inputProps={{ 'aria-required': true }}
          />
          <TextField
            id="reg-nombre"
            label="Tu nombre completo"
            required
            fullWidth
            autoComplete="name"
            value={values.nombre}
            onChange={set('nombre')}
            error={!!errors.nombre}
            helperText={errors.nombre}
            inputProps={{ 'aria-required': true }}
          />
          <TextField
            id="reg-email"
            label="Email"
            type="email"
            required
            fullWidth
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            error={!!errors.email}
            helperText={errors.email}
            inputProps={{ 'aria-required': true }}
          />
          <TextField
            id="reg-telefono"
            label="Teléfono / WhatsApp"
            type="tel"
            required
            fullWidth
            autoComplete="tel"
            value={values.telefono}
            onChange={set('telefono')}
            error={!!errors.telefono}
            helperText={errors.telefono}
            inputProps={{ 'aria-required': true }}
          />

          <Divider sx={{ borderColor: colors.border, gridColumn: { sm: '1 / -1' } }} />

          <TextField
            id="reg-password"
            label="Contraseña"
            type="password"
            required
            fullWidth
            autoComplete="new-password"
            value={values.password}
            onChange={set('password')}
            error={!!errors.password}
            helperText={errors.password || 'Mínimo 8 caracteres'}
            inputProps={{ 'aria-required': true, minLength: 8 }}
          />
          <TextField
            id="reg-confirmar"
            label="Confirmar contraseña"
            type="password"
            required
            fullWidth
            autoComplete="new-password"
            value={values.confirmar}
            onChange={set('confirmar')}
            error={!!errors.confirmar}
            helperText={errors.confirmar}
            inputProps={{ 'aria-required': true }}
          />

          <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
            <FormControl error={!!errors.metodoPago} component="fieldset">
              <FormLabel
                component="legend"
                sx={{ color: colors.textMuted, mb: 1.5, fontWeight: 600, '&.Mui-focused': { color: colors.textMuted } }}
              >
                Método de pago *
              </FormLabel>
              <RadioGroup
                row
                value={values.metodoPago}
                onChange={set('metodoPago')}
                aria-label="Método de pago"
              >
                <FormControlLabel
                  value="mobbex"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardRoundedIcon sx={{ fontSize: 18 }} />
                      Tarjeta de crédito
                    </Box>
                  }
                  sx={{ mr: 3 }}
                />
                <FormControlLabel
                  value="mercadopago"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccountBalanceWalletRoundedIcon sx={{ fontSize: 18 }} />
                      MercadoPago
                    </Box>
                  }
                />
              </RadioGroup>
              {errors.metodoPago && (
                <FormHelperText>{errors.metodoPago}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={loading}
          sx={{ mt: 3.5 }}
          endIcon={loading && <CircularProgress size={18} color="inherit" />}
        >
          {loading ? 'Procesando…' : 'Crear cuenta y continuar'}
        </Button>

        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: colors.textSubtle, textAlign: 'center' }}>
          Al continuar aceptás los términos y condiciones. Sin permanencia, cancelás cuando querés.
        </Typography>
      </Box>
    </Box>
  );
}
