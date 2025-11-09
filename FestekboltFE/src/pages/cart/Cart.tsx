import { CartOverall } from "../../components/cartOverall/CartOverall"
import { CartProduct } from "../../components/cartProduct/CartProduct"
import { Navbar } from "../../components/navbar/Navbar"
import { useCart } from "../../contexts/CartContext"

import style from "./Cart.module.css"



export const Cart = () => {

    const{items, total} = useCart()


    console.log("Jelenlegi tartalom kosár oldalon", items)

   
  return(
    
    <>
    <Navbar/>


    {items.length > 0 ? (
  <>
    {items.map((item) => (
      <div key={item.product.id}>
        <CartProduct item={item} />
      </div>
    ))}

    <CartOverall total={total} />
  </>
) : (
  <h1 className={style.emptyCart}>A kosarad jelenleg üres</h1>
)}

       
       <p>{total}</p>
       

       
        

    </>

  )
}