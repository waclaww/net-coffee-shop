import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import { Login } from '../presentation/web/auth/login';
import { Register } from '../presentation/web/auth/register'
import { Home } from '../presentation/web/home/home';
import { Admin } from '../presentation/web/admin';
import { Forbidden } from '../presentation/web/errors/forbidden';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/forbidden' element={<Forbidden />}/>

            <Route element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<Admin />}/> 
            </Route>
        </Routes>
    )
}

export default AppRoutes;