import styles from './ProductDetailView.module.css'
import { OrangeButton } from '../orangeButton/OrangeButton';
import { QuantityIndicators } from '../quantityButtons/QuantityButtons';
import { useState } from 'react';

type Paint = {
  id: number;
  termek_nev: string;
  ar: number;
  raktaron: boolean;
  rovid_leiras: string;
  hosszu_leiras: string;
  kep_url: string;
  tipus: string;
};

type ProductDetailProps = {
  product?: Paint; // opcionális, mert betöltés alatt még nincs meg
};


export const ProductDetailView = ({product} : ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);


console.log("hello" + product)

return(<>
    <div className={styles.oneProductContainer}>
        <div className={styles.productPicture}>
            <img src={product?.kep_url} alt="Product Image" />


        </div>


        <div className={styles.productDetails}>
            <h2>{product?.termek_nev}</h2>
            <h3>Ár: {product?.ar} Ft</h3>
            <div className={styles.ProductButtons}>
                 <QuantityIndicators  quantity={quantity} setQuantity={setQuantity} />
                 <OrangeButton button_text='Kosárba'/>

            </div>
            <div className={styles.isOnStock}>
            {product?.raktaron ? (
                <p style={{ color: "green" }}>Raktáron</p>
                ) : (
                <p style={{ color: "red" }}>Nincs készleten</p>
                )}
            
            </div>
            <p>{product?.rovid_leiras}</p>

        </div>


    </div>

</>)
};