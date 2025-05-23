import axios from 'axios';
import { getToken } from './auth';

const API_URL = '/api/';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para añadir el token JWT a cada petición
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptorde respuesta para refrescar el token si ha expirado
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await api.post('/token/refresh/', { refresh: refreshToken });
                const { access } = response.data;
                localStorage.setItem('access_token', access);
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                return api(originalRequest);
            } catch (err) {
                console.error('Error al refrescar el token:', err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
