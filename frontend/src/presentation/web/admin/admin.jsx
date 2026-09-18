import { MainScreen } from "../../shared/components/screen/screen.component"
import { FileUploader } from "react-drag-drop-files"
import styles from './admin.module.css'
import { useState } from "react"

export function Admin() {
    const fileTypes = ['PNG'];
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    }

    return (
        <MainScreen>
            <div className={styles.header}>
                <p>Панель администратора</p>
                <a  href="/"className={styles.goToSite}>Вернуться на сайт</a>
            </div>
            {console.log(file)}
            <FileUploader handleChange={handleChange}  types={fileTypes}></FileUploader>
        </MainScreen>
    )
}