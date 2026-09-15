import styles from'./navbar.module.css'
import {ShoppingCart, Person, Sun, Magnifier} from '@gravity-ui/icons';

export function Navbar () {
    return (
        <nav className={styles.navbar}>
        <div class="nav-logo">
            <a href="/" className={styles.title}>Net Coffee Shop</a>
        </div>
        <div className={styles.sections}>
            <a href="#home" className={styles.element}>КОФЕ</a>
            <a href="#about" className={styles.element}>ЧАЙ</a>
            <a href="#services" className={styles.element}>ДЕСЕРТЫ</a>
            <a href="#contact" className={styles.element}>О НАС</a>
            <div className={styles.search}>
                <input className={styles.input}></input>
                <Magnifier
                    className={styles.magnifier}
                    width={22}
                    height={22}
                ></Magnifier>
            </div>
            <div className={styles.tools}>
                <a className={styles.tool}>
                    <Person
                        width={22}
                        height={22}
                    ></Person></a>
                <a className={styles.tool}>
                    <ShoppingCart
                        width={22}
                        height={22}
                    ></ShoppingCart></a>
                <a className={styles.tool}>
                    <Sun
                        width={22}
                        height={22}
                    ></Sun></a>
            </div>
        </div>
        </nav>
        // <nav className={styles.navbar}>
        //     <div className={styles.titleContainer}>
        //         <a className={styles.title} href='/'>
        //             Net Coffee shop
        //         </a>
        //     </div>
        //     <div className={styles.sections}>
        //         <div className={styles.element}>
        //             <h4>Подборка</h4>
        //         </div>
        //         <div className={styles.element}>
        //             <h4>Категории</h4>
        //         </div>
        //         <div className={styles.element}>
        //             <h4>О нас</h4>
        //         </div>
        //     </div>
        //     <div className={styles.search}>
        //         <input></input>
        //     </div>
        //     <div className={styles.tools}>
        //         <ShoppingCart
        //             width={22}
        //             height={22}
        //         ></ShoppingCart>
        //         <Person
        //             width={22}
        //             height={22}
        //         ></Person>
        //         <Sun
        //             width={22}
        //             height={22}
        //         ></Sun>
        //     </div>
        // </nav>
    );
}