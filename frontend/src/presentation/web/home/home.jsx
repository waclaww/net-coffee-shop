import { MainScreen } from "../../shared/components/screen/screen.component";
import { Navbar } from "../../shared/components/navbar";
import { getProducts } from "../../../api/products";
import { useEffect, useState } from "react";
import { ProductCard }  from '../../shared/components/productCard/ProductCard';
import  styles  from './home.module.css'

export function Home () {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true); 
                setError(null);

                const data = await getProducts();
                setProducts(data);
            } catch (err) {
               
                console.error("Ошибка при загрузке данных в компоненте Home:", err);
                setError(err.response?.data?.message || 'Не удалось загрузить товары');
            } finally {
                setIsLoading(false);
            }
        };

        loadData(); 
    }, []); 
    if (isLoading) return <div>Загрузка товаров...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <MainScreen className={styles.main}>
            <Navbar className={styles.navbar}/>
            {products.length === 0 ? (
                <p>Товаров пока нет</p>
            ) : (
                <div className={styles.products}>
                    
                    {products.map((item) => {
                        return <ProductCard key={item.id} product={item}/>;
                    })}
                </div>
            )}
        </MainScreen>
    );
}
