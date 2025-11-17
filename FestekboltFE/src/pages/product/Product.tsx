import { Navbar } from "../../components/navbar/Navbar"
import { Footer } from "../../components/footer/Footer";
import { FiltersAndProducts } from "../../components/filtersAndProducts/FiltersAndProducts";



export const Product = () =>{

    return(
        <>
            <Navbar/>
            
            <FiltersAndProducts />

            <Footer/>

        </>
    )


}