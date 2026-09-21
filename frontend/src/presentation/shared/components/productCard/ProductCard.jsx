import React from 'react';
import styles from './product.module.css'
import { TypesOfProducts } from '../../../../data/types'
import { ReactComponent as BynIcon } from '../../../../assets/icons/byn-ico.svg'

export function ProductCard({product}) {

    const name = product.name;
    const type = TypesOfProducts[product.type];
    const price = product.price;
    const preview = product.preview;

    const link = "/";


    return (
        <a href={link} className={styles.link}><div className={styles.card}>
            <img src={preview} className={styles.preview}></img>
            <p className={styles.title}>{name}</p>
            <div className={styles.priceContainer}>
                <p className={styles.price}>{price}</p><BynIcon width={15} height={15} stroke-></BynIcon>
            </div>
            <button className={styles.inBasket}>В корзину</button>
        </div></a>
    )
}