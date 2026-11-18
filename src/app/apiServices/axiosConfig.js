import axios from 'axios';
import { clearSession, getToken } from '../../lib/auth/session';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is not configured');
}

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Request-Source'] =
    config.headers['X-Request-Source'] || 'dashboard';
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error?.config?.url?.includes('auth/login');
    if (
      typeof window !== 'undefined' &&
      error?.response?.status === 401 &&
      !isLoginRequest
    ) {
      clearSession();
      if (window.location.pathname !== '/login') {
        const next = window.location.pathname.startsWith('/dashboard')
          ? `&next=${encodeURIComponent(window.location.pathname)}`
          : '';
        window.location.href = `/login?reason=expired${next}`;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
