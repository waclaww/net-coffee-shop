import styles from './screen.module.css'

export function MainScreen ({ children }) {
    return (
        <div className={styles.screen}>
            {children}
        </div>
    )
}