import axios from 'axios';

console.log(
  'base URL',
  process.env.NEXT_PUBLIC_BASE_URL || 'http://195.154.118.26:3000'
);
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://195.154.118.26:3000';

if (typeof window !== 'undefined' && window.localStorage) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
