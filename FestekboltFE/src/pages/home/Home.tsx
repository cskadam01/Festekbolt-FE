import { Footer } from "../../components/footer/Footer"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import { Slider } from "../../components/slider/Slider"
import style from "./Home.module.css"


import { Navbar } from "../../components/navbar/Navbar"
import { usePaints } from "../../contexts/GetPaintContext"
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

    const{paints} = usePaints()


    const images = paints.map((paint) => paint.kep_url)
  


    

    return(
        <>
        <div>
            <Navbar/>
            <div className={style.sliderHomeContainer}>
            <Slider images={images}/>
            </div>
            
            {paints.length > 0 ? (
            <div className={style.productItems}>
            {paints.map((paint) => (
            <ProductCard
                
                key={paint.id}
                id={paint.id}
                product_name={paint.termek_nev}
                product_image={paint.kep_url}
                product_price={paint.ar}
                product_available={paint.raktaron}
                
            />))}</div>) : 
            (<p>Loading</p>)}
            
            
         <Footer/>
        </div>
         
        </>
    )


}