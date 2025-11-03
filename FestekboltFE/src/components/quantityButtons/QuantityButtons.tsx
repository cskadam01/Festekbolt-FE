import style from "./QuantityButtons.module.css";

type QuantityModeProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

type ActionModeProps = {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export type QuantityProps = QuantityModeProps | ActionModeProps;

export const QuantityIndicators = (props: QuantityProps) => {
  //  quantity + setQuantity mód
  if ("quantity" in props && "setQuantity" in props) {
    const { quantity, setQuantity } = props;

    const handleDecrease = () => {
      if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };

    return (
      <div className={style.quantityContainer}>
        <button
          onClick={handleDecrease}
          className={style.counterButton}
          disabled={quantity <= 1}
        >
          -
        </button>

        <span className={style.quantity}>{quantity}</span>

        <button onClick={handleIncrease} className={style.counterButton}>
          +
        </button>
      </div>
    );
  }

  //  külső logikás mód (qty + onIncrease + onDecrease)
  if ("onIncrease" in props && "onDecrease" in props && "qty" in props) {
    const { onIncrease, onDecrease, qty } = props;

    return (
      <div className={style.quantityContainer}>
        <button onClick={onDecrease} className={style.counterButton}>
          -
        </button>

        <span className={style.quantity}>{qty}</span>

        <button onClick={onIncrease} className={style.counterButton}>
          +
        </button>
      </div>
    );
  }

  // ha rossz propot kap
  return null;
};
