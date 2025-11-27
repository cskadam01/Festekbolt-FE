import { CartOverall } from "../../components/cartOverall/CartOverall"
import { CartProduct } from "../../components/cartProduct/CartProduct"
import { Navbar } from "../../components/navbar/Navbar"
import { useCart } from "../../contexts/CartContext"

import style from "./Cart.module.css"



export const Cart = () => {

    const{items, total} = useCart()
   
  return(
    
    <>
    <Navbar/>


    {items.length > 0 ? (
 <div className={style.cartContainer}>
        <div className={style.productsContainer}>
          {items.map((item) => (
            <div key={item.product.id}>
              <CartProduct item={item} />
            </div>
          ))}
        </div>
        <div className={style.overallContainer}>
          <CartOverall total={total} />
        </div>
      </div>
) : (
  <h1 className={style.emptyCart}>A kosarad jelenleg üres</h1>
)}
    </>
  )
}