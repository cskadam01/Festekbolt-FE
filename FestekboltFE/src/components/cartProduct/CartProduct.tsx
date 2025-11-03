import type { CartItem } from "../../contexts/CartContext"
import { QuantityIndicators } from "../quantityButtons/QuantityButtons"
import { useCart } from "../../contexts/CartContext"
import styles from "./CartProduct.module.css"
import { IoTrashOutline } from "react-icons/io5";



export const CartProduct = ({item} : {item : CartItem}) => {
    const {itemDecrease, itemIncrease, deleteFromCart } = useCart()
    


    const itemOverall= item.product.ar * item.qty

    return(
        <>
            <div>
                <div className={styles.cartProductContainer}>
                    <div className={styles.cartProductImg}>
                        <img src={item.product.kep_url} alt="" />
                    </div>
                    <div className={styles.cartProductDetail}>
                            <h1>
                                {item.product.termek_nev}
                            </h1>
                            <h2>
                                {item.product.ar}
                            
                            </h2>
                            <div style={{display:"flex"}}>
                            <QuantityIndicators onIncrease={() => itemIncrease(item.product)}
                                                onDecrease={() => itemDecrease(item.product)}
                                                qty={item.qty} />

                            <IoTrashOutline className={styles.deleteButton} onClick={()=> deleteFromCart(item.product)}/>
                            </div>

                    </div>
                    <div className={styles.cartProductOverall}>
                        <p>{itemOverall} Ft</p>

                    </div>


                </div>
            </div>

        </>
        
    )


}   