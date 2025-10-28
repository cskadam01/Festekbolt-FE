import { Footer } from "../../components/footer/Footer"
import { ProductCard } from "../../components/ProductCard/ProductCard"
import { Slider } from "../../components/slider/Slider"
import style from "./Home.module.css"

export const Home = () =>{
    

    const images:string[] = [
        "https://picsum.photos/id/237/200/300", "https://picsum.photos/id/236/200/300", "https://picsum.photos/id/235/200/300"
    ]


    

    return(
        <>
        <div>
            <div className={style.sliderHomeContainer}>
            <Slider images={images}/>
            </div>
            <ProductCard product_name= "asd"
                         product_image= "public\festek.jpg"
                         product_price= {5000}
                         product_available= {true}/>
         <Footer/>
        </div>
         
        </>
    )


}