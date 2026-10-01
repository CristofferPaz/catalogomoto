import type { ApiError, ListResponse } from '../../types/api.types';
import type { Moto, MotoPayload } from '../../types/moto.types';
import { clearAuth, getToken } from '../auth/storage';

// Production is served together with the API through Vercel Services, so use
// the current origin unless an explicit API origin is configured.
const API_URL = (import.meta.env.PUBLIC_API_URL ?? (import.meta.env.PROD ? '' : 'http://localhost:3000')).replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const body = await response.json().catch(() => null) as T & ApiError | null;
  if (response.status === 401) clearAuth();
  if (!response.ok) throw new Error(body?.error?.mensaje ?? 'No se pudo completar la solicitud');
  return body as T;
}

export const api = {
  login: (data: { usuario: string; contrasena: string }) => request<{ mensaje: string; usuario: string; token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => request<{ mensaje: string }>('/api/auth/logout', { method: 'POST' }),
  listMotos: (params = '') => request<ListResponse<Moto>>(`/api/motos${params}`),
  createMoto: (data: MotoPayload) => request<{ data: Moto }>('/api/motos', { method: 'POST', body: JSON.stringify(data) }),
  updateMoto: (id: number, data: Partial<MotoPayload>) => request<{ data: Moto }>(`/api/motos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
