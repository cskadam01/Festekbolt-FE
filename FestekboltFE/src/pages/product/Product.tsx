import { useParams } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar"
import styles from './Product.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../../components/footer/Footer";
import { ProductCard } from "../../components/productCard/ProductCard";
import { FiltersAndProducts } from "../../components/filtersAndProducts/FiltersAndProducts";

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

export const Product = () =>{

    return(
        <>
            <Navbar/>
            
            <FiltersAndProducts />

            <Footer/>
        </>
    )


}