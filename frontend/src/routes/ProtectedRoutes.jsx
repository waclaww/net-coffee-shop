import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();
    const location = useLocation()

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        );
    }

    return user ? <Outlet /> : <Navigate to='/login' state = {{ from: location}} replace/>
}

export default ProtectedRoute;