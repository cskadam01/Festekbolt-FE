import { useState } from 'react';
import { OrangeButton } from "../orangeButton/OrangeButton";
import style from "./ProductCrad.module.css"
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';


type ProductCardProps = {
    id:number,
    product_name: string;
    product_image: string;
    product_price: number;
    product_available: boolean;
};

export const ProductCard = ({ id, product_name, product_image, product_price, product_available }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useCart();

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className={style.card}>
            <Link to={`/products/${id}`} style={{color:"#222"}}>
            <img
                src={product_image}
                alt={product_name}
                className={style.image}
            />
            
            
            <h2 className={style.name}>{product_name}</h2>
            <h4 className={style.price}>
                {product_price.toLocaleString('hu-HU')} Ft
            </h4></Link>

            {product_available ? (
                <h5 className={style.available}>Raktáron</h5>
            ) : (
                <h5 className={style.unavailable}>Nincs raktáron</h5>
            )}

            <div className={style.quantityContainer}>
                <button
                    onClick={handleDecrease}
                    className={style.counterButton}
                    disabled={quantity <= 1}
                >
                    -
                </button>

                <span className={style.quantity}>{quantity}</span>

                <button
                    onClick={handleIncrease}
                    className={style.counterButton}
                >
                    +
                </button>
            </div>

            <div className={style.buttonContainer}>
                <OrangeButton button_text="Kosárba" onClick={
                    ()=> addToCart(
                        {id, termek_nev:product_name, ar:product_price, raktaron: product_available, rovid_leiras: "", hosszu_leiras:"", kep_url:product_image, tipus:""},
                        quantity
                    )
                } disabled={!product_available}/>
            </div>
        </div>
    );
};
