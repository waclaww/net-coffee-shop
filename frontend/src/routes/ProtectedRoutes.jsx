import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation()

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        );
    }
    if (!user) {
        return <Navigate to='/login' state = {{ from: location }}/>
    }

    if ( !allowedRoles.includes(user.role)) {
        return <Navigate to='/forbidden' state={{ from: location }}/>
    }

    return <Outlet />
}


export default ProtectedRoute;