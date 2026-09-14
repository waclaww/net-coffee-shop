import styles from'./navbar.module.css'
import {ShoppingCart, Person, Sun} from '@gravity-ui/icons';

export function Navbar () {
    return (
        <div className={styles.navbar}>
            <div className={styles.sections}>
                <div className={styles.element}>
                    <h4>Подборка</h4>
                </div>
                <div className={styles.element}>
                    <h4>Категории</h4>
                </div>
                <div className={styles.element}>
                    <h4>О нас</h4>
                </div>
            </div>
            <div className={styles.search}>
                <input></input>
            </div>
            <div className={styles.tools}>
                <ShoppingCart
                    width={22}
                    height={22}
                ></ShoppingCart>
                <Person
                    width={22}
                    height={22}
                ></Person>
                <Sun
                    width={22}
                    height={22}
                ></Sun>
            </div>
        </div>
    );
}