import styles from "./AvailabilityFilter.module.css";
import { useFilter } from "../../../contexts/FilterContext";
import { usePaints } from "../../../contexts/GetPaintContext";

export const AvailabilityFilter = () => {
    const { filters, setAvailability } = useFilter();
    const { paints } = usePaints();

    const inStockCount = paints.filter(p => p.raktaron === true).length;
    const outOfStockCount = paints.filter(p => p.raktaron === false).length;

    return (
        <div className={styles.filtersDivided}>
            <h4>Elérhetőség</h4>
                <div className={styles.availabilityCheckbox}>
                    <input
                        type="checkbox"
                        id="availability-in-stock"
                        checked={filters.byAvailability.has(true)}
                        onChange={(e) => {
                            const newAvailability = new Set(filters.byAvailability);
                            if (e.target.checked) {
                                newAvailability.add(true);
                            } else {
                                newAvailability.delete(true);
                            }
                            setAvailability(newAvailability);
                        }}
                    />
                    <label htmlFor="availability-in-stock">
                        Raktáron
                        <span className={styles.availabilityCount}>({inStockCount})</span>
                    </label>
                </div>
                <div className={styles.availabilityCheckbox}>
                    <input
                        type="checkbox"
                        id="availability-out-of-stock"
                        checked={filters.byAvailability.has(false)}
                        onChange={(e) => {
                            const newAvailability = new Set(filters.byAvailability);
                            if (e.target.checked) {
                                newAvailability.add(false);
                            } else {
                                newAvailability.delete(false);
                            }
                            setAvailability(newAvailability);
                        }}
                    />
                    <label htmlFor="availability-out-of-stock">
                        Nincs raktáron
                        <span className={styles.availabilityCount}>({outOfStockCount})</span>
                    </label>
            </div>
        </div>
    )
}
