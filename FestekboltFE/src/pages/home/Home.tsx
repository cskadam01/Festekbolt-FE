import { OrangeButton } from "../../components/orangeButton/OrangeButton"
import { useState,useEffect } from "react"
import { ProductCard } from "../../components/ProductCard/ProductCard"

export const Home = () =>{
    const [user, setUser] = useState<string>("")
    const [user2, setUser2] = useState<string>("")

        useEffect(() => {
            console.log("User state changed:", user);

        },[user] );
        
    const adatok = {
    gyumolcsok: ['alma', 'banán', 'narancs'],
    zoldsegek: ['répa', 'paradicsom', 'uborka'],
    italok: ['víz', 'kávé', 'tea']
    }


    return(
        <>
            <OrangeButton button_text = "kosár" />
            <input type="text"
                onChange={(e)=> setUser(e.target.value)} 
            />
             <input type="text"
                onChange={(e)=> setUser2(e.target.value)} 
            />
            <p>{user}</p>
            <ProductCard
                product_name = "Termék neve"
                product_image = "src\assets\pictures\festek.jpg"
                product_price = {23999}
                product_available = {true}
            />
        </>
    )


}