const TOKEN_KEY = 'auth_token';
const USER_KEY = 'admin_user';

export function saveAuth(token: string, usuario: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, usuario);
}

export function getToken() {
  return typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY);
}

export function getAdminUser() {
  return typeof window === 'undefined' ? null : localStorage.getItem(USER_KEY);
}

export function isAuthenticated() { return Boolean(getToken()); }

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
