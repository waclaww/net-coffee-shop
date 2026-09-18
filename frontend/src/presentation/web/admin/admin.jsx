import { MainScreen } from "../../shared/components/screen/screen.component"
import styles from './admin.module.css'

export function Admin() {
    return (
        <MainScreen>
            <div className={styles.header}>
                <p>Панель администратора</p>
                <a  href="/"className={styles.goToSite}>Вернуться на сайт</a>
            </div>
        </MainScreen>
    )
}