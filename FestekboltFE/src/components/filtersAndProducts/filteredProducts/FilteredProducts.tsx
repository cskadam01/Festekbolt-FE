import { usePaints } from "../../../contexts/GetPaintContext";
import { ProductCard } from "../../productCard/ProductCard";

export const FilteredProducts = () => {
    const {isLoading, visiblePaints} = usePaints();

    return (
            isLoading ? (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', gridColumn: '1 / -1'}}>
                    <img src="/loadingGif.gif" alt="loading" style={{width: 120, height: 120}} />
                </div>
            ) : visiblePaints.length > 0 ? (
                visiblePaints.map((paintItem) => (
                    <ProductCard
                        key={paintItem.id}
                        id={paintItem.id}
                        product_name={paintItem.termek_nev}
                        product_image={paintItem.kep_url}
                        product_price={paintItem.ar}
                        product_available={paintItem.raktaron}
                    />
                ))
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', gridColumn: '1 / -1'}}>
                    <p style={{fontSize: '1.1rem', color: '#999'}}>Nem található a szűrésnek megfelelő termék</p>
                </div>
            )
    )
}
