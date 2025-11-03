import { CartProduct } from "../../components/cartProduct/CartProduct"
import { Navbar } from "../../components/navbar/Navbar"
import { useCart } from "../../contexts/CartContext"



export const Cart = () => {

    const{items} = useCart()


    console.log("Jelenlegi tartalom kosár oldalon", items)

   
  return(
    
    <>
    <Navbar/>
       {items.map((item) =>(
        <div key={item.product.id}>
            <CartProduct item={item}/>

        </div>


       ))

       }
        

    </>

  )
}