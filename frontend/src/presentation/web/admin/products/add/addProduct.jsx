import React, { useState } from 'react'
import { MainScreen } from "../../../../shared/components/screen/screen.component";
import { FileUploader } from "react-drag-drop-files";
import { addProduct } from '../../../../../api/products';
import styles from './add_product.module.css'

export function AddProduct () {

    const fileTypes = ['PNG'];
    const [preview, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    }

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(1);
    const [price, setPrice] = useState(0.0);
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmiting(true);

        try {
            await addProduct({
                name,
                description,
                type,
                price,
                preview,
            })
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmiting(false);
        }
    }

    return (
        <MainScreen>            
            <div  className={styles.centeredLayout}>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <p className={styles.title}>Добавить товар</p>
                    <div className={styles.textField}>
                        <p>Имя товара</p>
                        <input 
                        className={styles.textInput} 
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmiting}></input>
                    </div>
                    <div className={styles.textField}>
                        <p>Описание</p>
                        <input 
                        className={styles.textInput} 
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmiting}></input>
                    </div>
                    <div className={styles.textField}>
                        <p>Тип</p>
                        <input className={styles.textInput} onChange={(e) => setType(Number(e.target.value))}
                        disabled={isSubmiting}></input>
                    </div>
                    <div className={styles.textField}>
                        <p>Цена</p>
                        <input 
                        className={styles.textInput} 
                        onChange={(e) => setPrice(Number(e.target.value))}
                        disabled={isSubmiting}></input>
                    </div>
                    <div className={styles.textField}>
                        <FileUploader  
                        handleChange={handleChange} 
                        types={fileTypes}
                        disabled={isSubmiting}></FileUploader>
                    </div>
                    <button className={styles.button} type='submit'>Добавить товар</button>
                </form>
            </div>
        </MainScreen>

    )
}