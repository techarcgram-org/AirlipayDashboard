import axios from './axiosConfig';

export async function login(data) {
  return await axios.post(`auth/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Revokes the current token server-side (token version is bumped). The
 * dashboard calls this on manual sign-out and on the inactivity timeout.
 */
export async function logout({ source = 'dashboard' } = {}) {
  return await axios.post(`auth/logout`, {}, {
    headers: {
      'Content-Type': 'application/json',
      'X-Request-Source': source,
    },
  });
}
