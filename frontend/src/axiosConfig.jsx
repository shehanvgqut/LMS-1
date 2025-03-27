import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  baseURL: 'http://http://3.26.213.214/:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
