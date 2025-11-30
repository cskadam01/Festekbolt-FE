import { Footer } from "../../components/footer/Footer";
import { ProductCard } from "../../components/productCard/ProductCard";
import { Slider } from "../../components/slider/Slider";
import style from "./Home.module.css";
import { Navbar } from "../../components/navbar/Navbar";
import { usePaints } from "../../contexts/GetPaintContext";
import { BarLoader } from "react-spinners";

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

export const Home = () => {
    const { paints, isLoading } = usePaints();
    const images = paints.map((paint) => paint.kep_url);

    return (
        <div className={style.pageContainer}>
            <Navbar />
            <div className={style.contentWrap}>
                {images.length > 0 && (
                    <div className={style.sliderHomeContainer}>
                        <Slider images={images} />
                    </div>
                )}

                <div className={style.productHome}>
                    <h2 className={style.sectionTitle}>Kiemelt termékeink</h2>
                    {isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                            <BarLoader color="#ff7a00" />
                        </div>
                    ) : paints.length > 0 ? (
                        <div className={style.productListContainer}>
                            {paints.map((paintItem) => (
                                <ProductCard
                                    key={paintItem.id}
                                    id={paintItem.id}
                                    product_name={paintItem.termek_nev}
                                    product_image={paintItem.kep_url}
                                    product_price={paintItem.ar}
                                    product_available={paintItem.raktaron}
                                />
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center' }}>Nem találhatóak termékek.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};