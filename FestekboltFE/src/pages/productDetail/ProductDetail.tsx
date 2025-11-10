import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./ProductDetail.module.css"
import { ProductDetailView } from "../../components/productDetailView/PorductDetailView";
import { ProductFeedBack } from "../../components/porductFeedBack/ProductFeedBack";
import { Navbar } from "../../components/navbar/Navbar";
import { usePaints } from "../../contexts/GetBookContext";
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
    const {paints} = usePaints()


    console.log(takenId)
    const specificcard = paints.find((paint) => paint.id === lid)
    console.log("kártya " + specificcard)

    const longDisc = specificcard?.hosszu_leiras
 

return(<>
        <Navbar/>
        <div className={style.container}>
            
            <div className={style.productDetailContainer}>
                <ProductDetailView product={specificcard}/>            
            </div>
                <ProductFeedBack long_disc={longDisc}/>
           
        </div>
</>
)
}