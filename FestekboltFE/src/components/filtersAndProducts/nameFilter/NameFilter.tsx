import styles from "./NameFilter.module.css";
import { useFilter } from "../../../contexts/FilterContext";

export const NameFilter = () => {
    const { filters, setNameInput, commitName } = useFilter();

    return (
        <div className={styles.filtersDivided}>
            <h4>Termék neve:</h4>
            <input
                type="text"
                placeholder="Termék keresése..."
                value={filters.nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        commitName();
                    }
                }}
                className={styles.productNameInput}
            />
        </div>
    )
}
