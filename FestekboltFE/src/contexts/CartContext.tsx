import React, {createContext, useContext, useEffect, useMemo, useReducer} from "react";
import type { Paint } from "../pages/home/Home";



export interface CartItem{
    product:Paint
    qty: number
}

interface CartContextValue{
    items: CartItem[]
    addToCart: (product: Paint, qty?: number) => void;
    itemIncrease: (product: Paint, qty?: number) => void;
    itemDecrease: (product: Paint, qty?: number) => void;
    deleteFromCart: (product:Paint) => void
    
    
}
type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        product: Paint;
        qty: number;
      };
    }
  | {
      type: "INCREASE";
      payload: {
        product: Paint;
      };
    }
  | {
      type: "DECREASE";
      payload: {
        product: Paint;
      };
    }
    | {
        type: "DELETE_FROM_CART";
        payload: {
          product: Paint;
        };
      };




const CartContext = createContext<CartContextValue | null>(null)


//létrehozzuk a kosár tartalmát amiben a Paint és a mennyiség lesz
const initialState = {
    items: [] as CartItem[]
}


// Létrehozzuk a reducert
// a state ben lesz a jelenelgi állapota, az actionben a termék és mennyiség
function cartReducer(state: typeof initialState, actions: CartAction){

    //Eldöntjük hogy melyik parancsot akarjuk lefuttatni
    switch (actions.type){
        case "ADD_ITEM": {
            const{product, qty} = actions.payload
            

            //Végigmegyünk a már kosárban lévő elemeken, és megnézi hogy van e olyan mint amit most akarunk hozzáadni
            //Ha talál akkor megkapjuk hanyas indexen, ha nem talál akkor -1 lesz az értéke

            const existingIndex = state.items.findIndex((item) => item.product.id === product.id)

            //ha találtunk olyan elemet ami már benne volt a festékekben
            if(existingIndex !== -1){

                //lemásoljuk a kosarat
                const updated = [...state.items]
                //növeljük a bizonyos termék értékét
                updated[existingIndex].qty += qty 
                //visszaadjuk a frissített listát
                return {items : updated}
            }

            //ha nem volt benne alapból, akkor a meglévő listáhozz hozzá adjuk az új elemet 
            return {items: [...state.items, {product, qty}]}          
        }

        case "INCREASE": {
            const { product } = actions.payload;
          
            const existingIndex = state.items.findIndex(
              (item) => item.product.id === product.id
            );
          
            if (existingIndex === -1) {
              return state;
            }
          
            const updated = [...state.items];
            updated[existingIndex].qty += 1;   
            return { items: updated };
          }

        case "DECREASE": {
            const{product } = actions.payload

            const existingIndex = state.items.findIndex((items) => items.product.id === product.id)

            if (existingIndex === -1) {
                return state;
              }
              
              const updated = [...state.items];
              if (updated[existingIndex].qty > 1) {
                updated[existingIndex].qty -= 1;
              }
              return { items: updated };
        }

        case "DELETE_FROM_CART":{
            const{product } = actions.payload
            const itemToDelete = state.items.findIndex((items) => items.product.id === product.id)
            

            if (itemToDelete === -1) return state; 

            var updated = [...state.items];
            updated.splice(itemToDelete, 1)
            return {items: updated}

        }

        default:
            return state;


    }
   

} 


//kezdénél lekérjük a cartot 
function initCart() {
    if (typeof window === "undefined") {
      return initialState;
    }
  
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { items: CartItem[] };
        return { items: parsed.items || [] };
      } catch {
        return initialState;
      }
    }
  
    return initialState;
  }
  

//Komponens lesz, ez fogja kürülvenni az egész appot hogy bárhonnan eltudjuk érni a kosarat
export function CartProvider({children}: {children: React.ReactNode}){

        //hozzá adjuk a logikát a useReducerhez, a state lesz a kosár tartalma, a dispcathecl fogjuk tudni meghívni a parancsokat
        //cartReducer lesz amit fent megírtunk logika, az initialState pedig a kezdő kosár
        const[state, dispatch] = useReducer(cartReducer, initialState, initCart)

        useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(state));
          }, [state]);

        function addToCart(product: Paint, qty:number = 1){
            dispatch({
                type: "ADD_ITEM",
                payload: {product, qty}
                
            })

        

        }
        function itemIncrease(product:Paint){
            dispatch({
                type: "INCREASE",
                payload: {product}

            })
        }

        function itemDecrease(product:Paint){
            dispatch({
                type:"DECREASE",
                payload: {product}
            })
        

        }
        function deleteFromCart(product:Paint){
            dispatch({
                type:"DELETE_FROM_CART",
                payload: {product}
            })

        }

        // value lesz a context tartalma amit tovább adnunk a gyerek komponenseknek
        const value: CartContextValue = {
            //Kosár jelenlegi tartalma
            items: state.items,
            //Függvény amivel új elemet lehet hozzáadnu
            addToCart,
            //Függvény amivel növelni tudjuk az elemét
            itemIncrease,
            itemDecrease,
            deleteFromCart

        }

        return(

            //<CartContext.Provider> → ez a React beépített módja annak, hogy a context elérhető legyen az alatta lévő komponensekben.
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
            )

}

export function useCart():CartContextValue {
    const ctx = useContext(CartContext)
    if(!ctx){
        throw new Error ("useCart csak a CartProvideren belül használható")
    }
    return ctx
}