import { createContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { User } from '../dto'

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token || token === 'undefined' || token === 'null') {
                setIsLoading(false);
                return;
            }
            try {
                const response = await api.get('/api/auth/me');
                setUser(User.fromDto(response.data.user));
            } catch (error) {
                console.log("Токен невалиден, очищаем сессию:", error.message);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setIsLoading(false)
            }
        };
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', credentials);
            const { token, user: userData,  } = response.data;

            localStorage.setItem('token', token);
            setUser(new User(response.data.user));
            return true;
        } catch (error) {
            console.log("Ошибка входа:", error);
            throw error;
        }
    }

    const register = async (credentials) => {
        try {
            await api.post('/api/auth/register', credentials);
            return login(credentials);
        } catch (error) {
            console.log("Ошибка регистрации:", error);
            throw error;
        }
    }

    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, isLoading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}