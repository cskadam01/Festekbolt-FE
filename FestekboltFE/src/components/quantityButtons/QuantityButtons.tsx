
import style from"./QuantityButtons.module.css"
type QuantityProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};


export const QuantityIndicators = ({ quantity, setQuantity }: QuantityProps) => {
    
    
        const handleDecrease = () => {
            if (quantity > 1) setQuantity(quantity - 1);
        };
    
        const handleIncrease = () => {
            setQuantity(quantity + 1);
        };


return(<>
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
</>)
};


