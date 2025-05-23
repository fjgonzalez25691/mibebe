import api from './api';

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
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
            return access;
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    register: async (username, email, password) => {
        try {
            const response = await api.post('users/register/', {
                username,
                email,
                password,
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

    getCurrentUser: () => {
        const userData = localStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },
};