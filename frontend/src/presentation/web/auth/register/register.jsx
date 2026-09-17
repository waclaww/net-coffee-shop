import { MainScreen } from '../../../shared/components/screen/screen.component'
import styles from '../auth.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'
import { useState } from 'react';

export function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ isSubmiting, setIsSubmiting ] = useState(false);
    const [ error, setError ] = useState('');

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmiting(true);

        try {
            await register({ username, password });
            navigate(fromPage, { replace: true });
        } catch (error) {
            const serverMessage = error.response?.data?.message;

            if (serverMessage === 'User already exists' || error.response?.status === 400) {
                setError('Пользователь с таким именем уже существует')
            } else {
                setError('Ошибка соединения с сервером. Попробуйте позже.')
            }
        } finally{
            setIsSubmiting(false)
        }
    }

    return (
            <MainScreen>
                <div className={styles.centeredLayout}>
                    <div className={styles.container}>
                        <form onSubmit={handleSubmit}>
                            <h3 className={styles.h3}>Регистрация в магазине</h3>
        
                            {error && <div className={styles.errorMessage}>{error}</div>}
        
                            <div className={styles.textField}>
                                <label className={styles.textLabel}>Придумайте логин</label>
                                <input
                                className={styles.textInput}
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                disabled={isSubmiting}
        
                                ></input>
                            </div>
                            <div className={styles.textField}>
                                <label className={styles.textLabel}>Придумайте пароль</label>
                                <input className={styles.textInput}
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmiting}
                                ></input>
                            <button
                                type="submit"
                                disabled={isSubmiting}
                                className={styles.button}
                            >{isSubmiting ? 'Регистрация' : 'Зарегестрироваться'}</button>
                            <p>Есть аккаунт? <a href='/login'>Войдите!</a></p>
                        </div>
                        </form>
                    </div>
                </div>
            </MainScreen>
        )
}