import { MainScreen } from '../../../shared/components/screen/screen.component'
import styles from '../auth.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../../hooks/useAuth'
import { useState } from 'react';

export function Login() {
    const { login } = useAuth();
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
            await login({ name: username, password: password });
            navigate(fromPage, { replace: true });
        } catch (error) {
            const serverMessage = error.response?.data?.message;

            if (serverMessage === 'Invalid credentials' || error.response?.status === 401) {
                setError('Неверное имя пользователя или пароль')
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
                        <h3 className={styles.h3}>Вход в аккаунт</h3>

                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <div className={styles.textField}>
                            <label className={styles.textLabel}>Логин</label>
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
                            <label className={styles.textLabel}>Пароль</label>
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
                        >{isSubmiting ? 'Вход' : 'Войти'}</button>
                        <p>Нет акканта? <a href='/register'>Зарегестрируйтесь!</a></p>
                    </div>
                    </form>
                </div>
            </div>
        </MainScreen>
    )
}