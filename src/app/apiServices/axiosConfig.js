import axios from 'axios';

console.log(
  'base URL',
  process.env.NEXT_PUBLIC_BASE_URL || 'https://api.airlipay.com'
);
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://api.airlipay.com';

if (typeof window !== 'undefined' && window.localStorage) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
