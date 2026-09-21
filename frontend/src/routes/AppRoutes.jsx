import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import { Login } from '../presentation/web/auth/login';
import { Register } from '../presentation/web/auth/register'
import { Home } from '../presentation/web/home/home';
import { Admin } from '../presentation/web/admin/admin';
import { Forbidden } from '../presentation/web/errors/forbidden';
import { Products } from '../presentation/web/admin/products';
import { AddProduct } from '../presentation/web/admin/products/add/addProduct'

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
                <Route path="/admin/products" element={<Products/>}></Route>
                <Route path="/admin/products/add" element={<AddProduct/>}></Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;