// const API_URL = import.meta.env.VITE_API_URL;

// async function request(path, options = {}) {
//   const res = await fetch(`${API_URL}${path}`, {
//     headers: { 'Content-Type': 'application/json' },
//     ...options,
//   });

//   let payload = null;
//   try {
//     payload = await res.json();
//   } catch {
//     payload = null;
//   }

//   if (!res.ok) {
//     const message =
//       (payload && (payload.message || payload.error)) ||
//       `Error ${res.status}: no se pudo completar la solicitud`;
//     const err = new Error(message);
//     err.status = res.status;
//     err.data = payload;
//     throw err;
//   }

//   return payload;
// }

// export function getPlans() {
//   return request('/onboarding/plans');
// }

// export function register(data) {
//   return request('/onboarding/register', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
// }

// export function sendContactForm(data) {
//   return request('/onboarding/contact', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
// }

const API_URL = import.meta.env.VITE_API_URL;

const FEATURE_LABELS = {
  ventas: 'Gestión de ventas',
  egresos: 'Registro de egresos',
  stock: 'Control de stock',
  compras_basico: 'Compras básico',
  compras_avanzado: 'Compras avanzado',
  dashboard: 'Dashboard diario',
  email_diario: 'Resumen diario por email',
  clientes: 'Gestión de clientes',
  auditoria: 'Auditoría de cambios',
  exportacion_excel: 'Exportación a Excel',
  mp_point: 'MercadoPago Point',
  metricas_avanzadas: 'Métricas avanzadas',
  descuentos_item: 'Descuentos por ítem',
  desarrollo_a_medida: 'Desarrollo personalizado',
};

function mapPlan(p) {
  const featuresObj = p.features ?? {};
  return {
    id: p.id,
    slug: p.name,
    nombre: p.display_name,
    descripcion: p.description,
    precio_mensual: parseFloat(p.price_monthly),
    precio_anual: parseFloat(p.price_yearly),
    features: Object.entries(FEATURE_LABELS).map(([key, label]) => ({
      label,
      included: !!featuresObj[key],
    })),
    isContactPlan: p.isContactPlan,
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    const message =
      (payload && (payload.message || payload.error)) ||
      `Error ${res.status}: no se pudo completar la solicitud`;
    const err = new Error(message);
    err.status = res.status;
    err.data = payload;
    throw err;
  }

  return payload;
}

export function getPlans() {
  return request('/onboarding/plans').then((payload) =>
    (payload?.data ?? []).map(mapPlan)
  );
}

export function register(data) {
  return request('/onboarding/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function sendContactForm(data) {
  return request('/onboarding/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
