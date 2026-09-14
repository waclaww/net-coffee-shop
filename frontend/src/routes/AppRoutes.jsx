import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import { Login } from '../presentation/web/auth/login';
import { Register } from '../presentation/web/auth/register'
import { Home } from '../presentation/web/home/home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route element={<ProtectedRoute/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes;