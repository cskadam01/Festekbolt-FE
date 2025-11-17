import { Footer } from "../../components/footer/Footer"
import { ProductCard } from "../../components/productCard/ProductCard"
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


            <div className={style.productHome}>
                {paints.length > 0 ? (
                <div className={style.productListContainer}>
                {paints.map((paintItem) => (
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