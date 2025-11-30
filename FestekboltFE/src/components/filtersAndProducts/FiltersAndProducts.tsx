import styles from "./FiltersAndProducts.module.css"

import { NameFilter } from "./nameFilter/NameFilter";
import { useFilter } from "../../contexts/FilterContext";
import { TypeFilter } from "./typeFilter/TypeFilter";
import { AvailabilityFilter } from "./availabilityFilter/AvailabilityFilter";
import { PriceFilter } from "./priceFilter/PriceFilter";
import { ClearFiltersButton } from "./clearFiltersButton/ClearFiltersButton";
import { FilteredProducts } from "./filteredProducts/FilteredProducts";

export const FiltersAndProducts = () => {
    const { showClearButton } = useFilter();


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