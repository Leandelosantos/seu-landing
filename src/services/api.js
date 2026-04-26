const API_URL = import.meta.env.VITE_API_URL;

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
  return request('/onboarding/plans');
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
