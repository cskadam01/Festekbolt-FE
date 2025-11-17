import styles from './ProductDetailView.module.css'
import { OrangeButton } from '../orangeButton/OrangeButton';
import { QuantityIndicators } from '../quantityButtons/QuantityButtons';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';


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
  product?: Paint; 
};


export const ProductDetailView = ({product} : ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, items } = useCart();




    console.log("KOSÁR JELENLEGI TARTALMA:", items);


return(<>
    <div className={styles.oneProductContainer}>
        <div className={styles.productPicture}>
            <img src={product?.kep_url} alt="Product Image" />
        </div>


        <div className={styles.productDetails}>
            <h2>{product?.termek_nev}</h2>
            <p>{product?.rovid_leiras}</p>
            <h3>Ár: {product?.ar} Ft</h3>
            <div className={styles.ProductButtons}>
                 <QuantityIndicators  quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div>
                <OrangeButton
                    button_text="Kosárba"
                    onClick={() => product && addToCart(product, quantity)}
                    disabled={!product?.raktaron}
                    />
            </div>
            <div className={styles.isOnStock}>
            {product?.raktaron ? (
                <p style={{ color: "green" }}>Raktáron</p>
                ) : (
                <p style={{ color: "red" }}>Nincs készleten</p>
                )}
            
            </div>

        </div>


    </div>

</>)
};