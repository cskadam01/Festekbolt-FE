import { OrangeButton } from "../../components/orangeButton/OrangeButton"
import { useState,useEffect } from "react"

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
            
        </>
    )


}