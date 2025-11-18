import { useEffect, useState } from "react";
import type { Paint } from "../../pages/home/Home";
import styles from "./FiltersAndProducts.module.css"
import { NameFilter } from "./nameFilter/NameFilter";
import { useFilter } from "../../contexts/FilterContext";
import { TypeFilter } from "./typeFilter/TypeFilter";
import { AvailabilityFilter } from "./availabilityFilter/AvailabilityFilter";
import { PriceFilter } from "./priceFilter/PriceFilter";
import { usePaints } from "../../contexts/GetPaintContext";
import { ClearFiltersButton } from "./clearFiltersButton/ClearFiltersButton";
import { FilteredProducts } from "./filteredProducts/FilteredProducts";

export const FiltersAndProducts = () => {
    const [lastFilteredList, setLastFilteredList] = useState<Paint[]>([]);
    const [showClearButton, setShowClearButton] = useState(false);

    const { filters} = useFilter();
    const { paints, minPrice, maxPrice, setVisiblePaints } = usePaints();

    // Festékek szűrése a minimum és maximum ár, típus, elérhetőség és terméknév alapján
    const filteredPaints = paints.filter(p => {
        const price = Number(p.ar);
        if (filters.min == null || filters.max == null) return true;
        
        // ár szűrő
        const passesPrice = price >= filters.min && price <= filters.max;
        
        // típus szűrő - ha nincs típus kiválasztva, akkor mindet mutatja; különben csak a kiválasztott típusokat
        const passesType = filters.byType.size === 0 || filters.byType.has(p.tipus);
        
        // elérhetőség szűrő - ha nincs elérhetőség kiválasztva, akkor mindet mutatja; különben csak a kiválasztott elérhetőségeket
        const passesAvailability = filters.byAvailability.size === 0 || filters.byAvailability.has(p.raktaron);
        
        // terméknév szűrő - ha nincs név beírva, akkor mindet mutatja; különben csak a név alapján szűr
        const passesName = filters.byName === "" || p.termek_nev.toLowerCase().includes(filters.byName.toLowerCase());
        
        return passesPrice && passesType && passesAvailability && passesName;
    });

    // Ez azért kell, hogy ne ugráljon a lista mikor húzod a csúszkát (Nem tetszett hogy ugrál egyfolytában)
    useEffect(() => {
        const filteredPaints = paints.filter(p => {
            const price = Number(p.ar);
            if (filters.min == null || filters.max == null) return true;
            
            // ár szűrő
            const passesPrice = price >= filters.min && price <= filters.max;
            
            // típus szűrő - ha nincs típus kiválasztva, akkor mindet mutatja; különben csak a kiválasztott típusokat
            const passesType = filters.byType.size === 0 || filters.byType.has(p.tipus);
            
            // elérhetőség szűrő - ha nincs elérhetőség kiválasztva, akkor mindet mutatja; különben csak a kiválasztott elérhetőségeket
            const passesAvailability = filters.byAvailability.size === 0 || filters.byAvailability.has(p.raktaron);
            
            // terméknév szűrő - ha nincs név beírva, akkor mindet mutatja; különben csak a név alapján szűr
            const passesName = filters.byName === "" || p.termek_nev.toLowerCase().includes(filters.byName.toLowerCase());
            
            return passesPrice && passesType && passesAvailability && passesName;
        });

        const isMinPriceActive = filters.min > minPrice;
        const isMaxPriceActive = filters.max < maxPrice;
        const isTypeActive = filters.byType.size > 0;
        const isAvailabilityActive = filters.byAvailability.size > 0;
        const isNameActive = filters.byName !== "";

        if (!filters.isDragging) {
            setLastFilteredList(filteredPaints);

            if (isMinPriceActive || isMaxPriceActive || isTypeActive || isAvailabilityActive || isNameActive) {
                setShowClearButton(true);
            } else {
                setShowClearButton(false);
            }
        }
    }, [filters.min, filters.max, filters.isDragging, paints, filters.byType, filters.byAvailability, filters.byName]);

    useEffect(() => {
        setVisiblePaints(filteredPaints);
    }, [filters.isDragging, paints, filters.byType, filters.byAvailability, filters.byName]);

    return (
        <div className={styles.searchAndProductsContainer}>
                <div className={styles.sideSearchContainer}>

                    {/* Termék név szűrő */}
                    <NameFilter/>
                    
                    {/* Ár szűrő */}
                    <PriceFilter/>

                    {/* Típus szűrő */}
                    <TypeFilter/>
                    
                    {/* Elérhetőség szűrő */}
                    <AvailabilityFilter/>

                    {/* Szűrők törlése gomb */}
                    {showClearButton && (
                        <ClearFiltersButton />
                    )}
                </div>


                {/* Termékek listázása */}
                <div className={styles.productListContainer}>
                    <FilteredProducts />
                </div>
            </div>
    );
};