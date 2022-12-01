import axios from "axios";

const axiosConfig = {
  baseURL: "http://localhost:5000/api",
  timeout: 30000,
};

const ApiMiddleware = axios.create(axiosConfig);

// ApiMiddleware.interceptors.request.use(
//   function (config) {
//     const { token } = JSON.parse(localStorage.getItem('cla_admin_token') ?? '{}');
//     if (!token) return config;
//     return { ...config, headers: { Authorization: `Bearer ${token}` } };
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

export default ApiMiddleware;
