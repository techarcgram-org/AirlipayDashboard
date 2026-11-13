export const SESSION_KEYS = {
  token: 'token',
  role: 'airlypayUserRole',
  userId: 'airlipayUserId',
  profile: 'airlipayProfile',
  remember: 'airlipayRemember',
};

export const SESSION_EVENT = 'airlipay:session';

function stores() {
  if (typeof window === 'undefined') {
    return [];
  }
  return [window.localStorage, window.sessionStorage];
}

export function readSession() {
  if (typeof window === 'undefined') {
    return {
      token: null,
      role: null,
      userId: null,
      profile: null,
      remember: false,
    };
  }
  for (const store of stores()) {
    const token = store.getItem(SESSION_KEYS.token);
    if (!token) {
      continue;
    }
    let profile = null;
    try {
      const raw = store.getItem(SESSION_KEYS.profile);
      profile = raw ? JSON.parse(raw) : null;
    } catch {
      profile = null;
    }
    return {
      token,
      role: (store.getItem(SESSION_KEYS.role) || '').toUpperCase() || null,
      userId: store.getItem(SESSION_KEYS.userId) || null,
      profile,
      remember: store === window.localStorage,
    };
  }
  return {
    token: null,
    role: null,
    userId: null,
    profile: null,
    remember: false,
  };
}

export function getToken() {
  return readSession().token;
}

export function clearSession() {
  if (typeof window === 'undefined') {
    return;
  }
  stores().forEach((store) => {
    Object.values(SESSION_KEYS).forEach((key) => store.removeItem(key));
  });
}

export function writeSession({ token, role, userId, profile, remember = true, eventName = SESSION_EVENT }) {
  if (typeof window === 'undefined') {
    return;
  }
  clearSession();
  const store = remember ? window.localStorage : window.sessionStorage;
  store.setItem(SESSION_KEYS.token, token);
  store.setItem(SESSION_KEYS.role, (role || '').toUpperCase());
  if (userId !== undefined && userId !== null) {
    store.setItem(SESSION_KEYS.userId, String(userId));
  }
  if (profile) {
    store.setItem(SESSION_KEYS.profile, JSON.stringify(profile));
  }
  store.setItem(SESSION_KEYS.remember, remember ? '1' : '0');
  window.dispatchEvent(new Event(eventName));
}

export function subscribeToSession(listener) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const onLocal = (event) => {
    if (!event || !event.key || Object.values(SESSION_KEYS).includes(event.key)) {
      listener();
    }
  };
  window.addEventListener('storage', onLocal);
  window.addEventListener(SESSION_EVENT, listener);
  return () => {
    window.removeEventListener('storage', onLocal);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}

export function profileFromLoginPayload(payload) {
  const data = payload?.data || {};
  const person =
    (Array.isArray(data.admins) && data.admins[0]) ||
    (Array.isArray(data.clients) && data.clients[0]) ||
    (Array.isArray(data.users) && data.users[0]) ||
    data;
  const name =
    person?.name ||
    data?.name ||
    [person?.first_name, person?.last_name].filter(Boolean).join(' ') ||
    data?.username ||
    '';
  const email =
    person?.email ||
    person?.accounts?.email ||
    data?.email ||
    data?.accounts?.email ||
    '';
  const accounts = person?.accounts || data?.accounts || {};
  const addresses = person?.addresses || data?.addresses || {};
  return {
    name: name || '',
    email: email || '',
    phone: addresses?.primary_phone_number || person?.phone_number || '',
    status: accounts?.account_status || '',
  };
}

export function identityFromLoginPayload(payload) {
  const data = payload?.data || {};
  const users = Array.isArray(data.users) ? data.users : [];
  const clients = Array.isArray(data.clients) ? data.clients : [];
  const admins = Array.isArray(data.admins) ? data.admins : [];
  let userId = null;
  if (users.length) {
    userId = users[0].id;
  }
  if (clients.length) {
    userId = clients[0].id;
  }
  if (admins.length) {
    userId = admins[0].id;
  }
  return {
    role: (Array.isArray(data.roles) ? data.roles[0] : data.role || '').toUpperCase(),
    userId,
    profile: profileFromLoginPayload(payload),
  };
}
