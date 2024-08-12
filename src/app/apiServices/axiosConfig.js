import axios from 'axios';
// const baseURL = 'https://api.airlipay.com';
const baseURL = 'http://localhost:8004';
console.log('base URL', process.env.NEXT_PUBLIC_BASE_URL || baseURL);
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL || baseURL;

if (typeof window !== 'undefined' && window.localStorage) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
