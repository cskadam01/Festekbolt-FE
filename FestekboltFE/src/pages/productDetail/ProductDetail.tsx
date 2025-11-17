import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./ProductDetail.module.css"
import { ProductDetailView } from "../../components/productDetailView/PorductDetailView";
import { ProductFeedBack } from "../../components/porductFeedBack/ProductFeedBack";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
type Paint = {
  id: number;
  termek_nev: string;
  ar: number;
  raktaron: boolean;
  rovid_leiras: string;
  hosszu_leiras: string;
  kep_url: string;
  tipus: string;
};


export const ProductDetail = () => {
    const {takenId} = useParams()
    const lid = Number(takenId)
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
            
        }}
            catch(error : any){
                setError(error.message)

            }
           
        


        };
        GetPaints();
    }, []);
    console.log(takenId)
    const specificcard = paint.find((paint) => paint.id === lid)
    console.log("kártya " + specificcard)

    const longDisc = specificcard?.hosszu_leiras
 

return(<>
        <Navbar/>

        <div className={style.container}>
            
            <div className={style.productDetailContainer}>
                <ProductDetailView product={specificcard}/>            
            </div>
            <div className={style.description}>
                <ProductFeedBack long_disc={longDisc}/>
            </div>
        </div>

        <Footer/>
</>
)
}