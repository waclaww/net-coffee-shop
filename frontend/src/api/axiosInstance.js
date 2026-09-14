import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && token !== undefined && token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || '';
        const isAuthRequest =
            requestUrl.includes('/api/auth/login') ||
            requestUrl.includes('/api/auth/register');

        if (status === 401 && !isAuthRequest) {
            localStorage.removeItem("token");
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default api;