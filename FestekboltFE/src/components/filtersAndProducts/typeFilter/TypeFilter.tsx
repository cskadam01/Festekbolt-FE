import styles from "./TypeFilter.module.css";
import { useFilter } from "../../../contexts/FilterContext";
import { usePaints } from "../../../contexts/GetPaintContext";

export const TypeFilter = () => {
    const { filters, setTypes } = useFilter();
    const { paints } = usePaints();
    const uniqueTypes = Array.from(new Set(paints.map((paint) => paint.tipus)));

    const typeCountMap = new Map<string, number>();
    paints.forEach(p => {
        typeCountMap.set(p.tipus, (typeCountMap.get(p.tipus) || 0) + 1);
    });

    return (
        <div className={styles.filtersDivided}>
            <h4>Típus alapján:</h4>
                {uniqueTypes.map((type) => (
                    <div key={type} className={styles.typeCheckbox}>
                        <input
                            type="checkbox"
                            id={`type-${type}`}
                            checked={filters.byType.has(type)}
                            onChange={(e) => {
                                const newTypes = new Set(filters.byType);
                                if (e.target.checked) {
                                    newTypes.add(type);
                                } else {
                                    newTypes.delete(type);
                                }
                                setTypes(newTypes);
                            }}
                        />
                        <label htmlFor={`type-${type}`}>
                            {type}
                            <span className={styles.typeCount}>({typeCountMap.get(type) || 0})</span>
                        </label>
                    </div>
                ))}
        </div>
    )
}
