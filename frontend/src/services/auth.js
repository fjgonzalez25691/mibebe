import { Navigate } from 'react-router-dom';
import api from './api';
import { getUser } from './api'; // Asegúrate de que la ruta sea correcta   

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const USER_KEY = 'user_data';


export const authService = {
    login: async (username, password) => {
        try {
            const response = await api.post('token/', {
                username,
                password,
            });
            const { access, refresh } = response.data;
            // Guardamos el usuario y el token en localStorage
    
            localStorage.setItem(TOKEN_KEY, access);
            localStorage.setItem(REFRESH_KEY, refresh);
            return access;
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(USER_KEY);
    },

    register: async (userData) => {
        try {
            const response = await api.post('users/register/', {
                ...userData
            });
            return response.data;
        } catch (error) {
            console.error('Error durante el registro:', error);
            throw error;
        }
    },

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    getRefreshToken: () => {
        return localStorage.getItem(REFRESH_KEY);
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    },

    getCurrentUser: async () => {
        return await getUser();
    },

    refreshToken: async () => {
        try {
            const refreshToken = authService.getRefreshToken();
            const response = await api.post('token/refresh/', {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem(TOKEN_KEY, access);
            return access;
        } catch (error) {
            console.error('Error al refrescar el token:', error);
            throw error;
        }
    },

    
};