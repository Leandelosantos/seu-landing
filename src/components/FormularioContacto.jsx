import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { sendContactForm } from '../services/api';
import { colors } from '../theme/theme';

const INITIAL = { nombre: '', email: '', telefono: '', negocio: '', mensaje: '' };

function validate(v) {
  const errs = {};
  if (!v.nombre.trim()) errs.nombre = 'Tu nombre es requerido.';
  if (!v.email.trim()) errs.email = 'El email es requerido.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Ingresá un email válido.';
  if (!v.mensaje.trim()) errs.mensaje = 'Contanos qué necesitás.';
  return errs;
}

export default function FormularioContacto() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      await sendContactForm({
        nombre: values.nombre.trim(),
        email: values.email.trim(),
        telefono: values.telefono.trim() || undefined,
        negocio: values.negocio.trim() || undefined,
        mensaje: values.mensaje.trim(),
      });
      setSuccess(true);
      setValues(INITIAL);
    } catch (err) {
      setApiError(err.message || 'Ocurrió un error al enviar. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          px: 3,
          borderRadius: 3,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bgCard,
        }}
      >
        <CheckCircleRoundedIcon sx={{ fontSize: 48, color: colors.success, mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 1.5 }}>¡Mensaje enviado!</Typography>
        <Typography variant="body2" sx={{ color: colors.textMuted }}>
          Te vamos a responder a la brevedad con una propuesta para tu negocio.
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {apiError && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {apiError}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
        <TextField
          id="contacto-nombre"
          label="Tu nombre"
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
          id="contacto-email"
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
          id="contacto-telefono"
          label="Teléfono (opcional)"
          type="tel"
          fullWidth
          autoComplete="tel"
          value={values.telefono}
          onChange={set('telefono')}
        />
        <TextField
          id="contacto-negocio"
          label="Nombre del negocio (opcional)"
          fullWidth
          value={values.negocio}
          onChange={set('negocio')}
        />
      </Box>

      <TextField
        id="contacto-mensaje"
        label="¿Qué necesitás?"
        required
        fullWidth
        multiline
        rows={5}
        value={values.mensaje}
        onChange={set('mensaje')}
        error={!!errors.mensaje}
        helperText={errors.mensaje}
        sx={{ mb: 3 }}
        inputProps={{ 'aria-required': true }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={loading}
        endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
      >
        {loading ? 'Enviando…' : 'Enviar consulta'}
      </Button>
    </Box>
  );
}
