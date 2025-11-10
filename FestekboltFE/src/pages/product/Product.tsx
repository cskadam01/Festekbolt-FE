import { useEffect } from "react";
import { ProductDetailView } from "../../components/productDetailView/PorductDetailView"

import styles from './Product.module.css'
export const Product = () =>{

    


    return(
        <>
            <div className={styles.productDetailContainer}>
                <div className={styles.content}>
                    <h1> Termékek</h1>

                    <ProductDetailView/>


                </div>
            </div>
        </>
    )


}