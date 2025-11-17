import { Footer } from "../../components/footer/Footer"
import { ProductCard } from "../../components/productCard/ProductCard"
import { Slider } from "../../components/slider/Slider"
import style from "./Home.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { Navbar } from "../../components/navbar/Navbar"

export type Paint = {
  id: number;
  termek_nev: string;
  ar: number;
  raktaron: boolean;
  rovid_leiras: string;
  hosszu_leiras: string;
  kep_url: string;
  tipus: string;
};

export const Home = () =>{
    const [paint, setPaint] = useState<Paint[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const GetPaints = async() => {
            try{
            const url = "https://raw.githubusercontent.com/cskadam01/festek-api/refs/heads/main/festek.json";
            const response = await axios.get(url, {
            transformResponse: [(data) => JSON.parse(data)]
            });
            setPaint(response.data);

            if (response.status === 200){ 
                
            setPaint(response.data);
            console.log(response.data);
        }}
            catch(error : any){
                setError(error.message)

            }
        };

        GetPaints();
    }, []);

    const images = paint.map((paintItem) => paintItem.kep_url)
  


    

    return(
        <>
        <div>
            <Navbar/>
            <div className={style.sliderHomeContainer}>
            <Slider images={images}/>
            </div>

            <div className={style.productHome}>
                {paint.length > 0 ? (
                <div className={style.productListContainer}>
                {paint.map((paintItem) => (
                <ProductCard
                    
                    key={paintItem.id}
                    id={paintItem.id}
                    product_name={paintItem.termek_nev}
                    product_image={paintItem.kep_url}
                    product_price={paintItem.ar}
                    product_available={paintItem.raktaron}
                    
                />))}</div>) : 
                (<p>Loading</p>)}
            </div>
            
         <Footer/>
        </div>
         
        </>
    )


}