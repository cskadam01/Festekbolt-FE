import { useState } from "react";
import styles from "./PriceFilter.module.css";
import { useFilter } from "../../../contexts/FilterContext";
import { usePaints } from "../../../contexts/GetPaintContext";

export const PriceFilter = () => {
    const { filters, setMin, setMax, setIsDragging } = useFilter();
    const { maxPrice, minPrice } = usePaints();

    const [minInput, setMinInput] = useState<string>("");
    const [maxInput, setMaxInput] = useState<string>("");

    return (
        <div className={styles.filtersDivided}>
            <h4>Ár szerint:</h4>
            {minPrice !== null && maxPrice !== null && filters.min !== null && filters.max !== null ? (
                <div>
                    <div style={{marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className={styles.priceInputs}>
                            <div className={styles.priceInputWrapper}>
                                <input
                                    type="number"
                                    min={minPrice}
                                    max={maxPrice}
                                    step={100}
                                    value={filters.min !== null ? filters.min : ''}
                                    onChange={(e) => {
                                        // szabad gépelés engedélyezése, megerősítés elhagyáskor vagy enter lenyomásakor
                                        setMinInput(e.target.value)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const raw = minInput;
                                            const val = raw === '' ? null : Number(raw);
                                            if (val === null || Number.isNaN(val)) {
                                                const fallback = minPrice!;
                                                setMin(fallback);
                                                setMinInput(String(fallback));
                                                return;
                                            }
                                            const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                            if (filters.max !== null && clamped > filters.max) setMax(clamped);
                                            setMin(clamped);
                                            setMinInput(String(clamped));
                                        }
                                    }}
                                    onBlur={() => {
                                        const raw = minInput;
                                        const val = raw === '' ? null : Number(raw);
                                        if (val === null || Number.isNaN(val)) {
                                            const fallback = minPrice!;
                                            setMin(fallback);
                                            setMinInput(String(fallback));
                                            return;
                                        }
                                        const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                        if (filters.max !== null && clamped > filters.max) setMax(clamped);
                                            setMin(clamped);
                                            setMinInput(String(clamped));
                                        }}
                                    />
                                <span className={styles.priceInputSuffix}>Ft</span>
                            </div>

                            <div className={styles.priceInputWrapper}>
                               <input
                                    type="number"
                                    min={minPrice}
                                    max={maxPrice}
                                    step={100}
                                    value={filters.max !== null ? filters.max : ''}
                                    onChange={(e) => setMaxInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const raw = maxInput;
                                            const val = raw === '' ? null : Number(raw);
                                            if (val === null || Number.isNaN(val)) {
                                                const fallback = maxPrice!;
                                                setMax(fallback);
                                                setMaxInput(String(fallback));
                                                return;
                                            }
                                            const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                            if (filters.min !== null && clamped < filters.min) setMin(clamped);
                                            setMax(clamped);
                                            setMaxInput(String(clamped));
                                        }
                                    }}
                                    onBlur={() => {
                                        const raw = maxInput;
                                        const val = raw === '' ? null : Number(raw);
                                        if (val === null || Number.isNaN(val)) {
                                            const fallback = maxPrice!;
                                            setMax(fallback);
                                            setMaxInput(String(fallback));
                                            return;
                                        }
                                        const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                        if (filters.min !== null && clamped < filters.min) setMin(clamped);
                                        setMax(clamped);
                                        setMaxInput(String(clamped));
                                    }}
                                 />
                                <span className={styles.priceInputSuffix}>Ft</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rangeWrapper}>
                        {/* Szürke háttér a csúszkának */}
                        <div className={styles.rangeTrackFallback} />

                        {/* Narancssárga csíkocska a két fogantyú között */}
                        <div 
                            className={styles.rangeProgress}
                            style={{
                                left: minPrice !== null && maxPrice !== null && filters.min !== null 
                                    ? `calc(${((filters.min - minPrice) / (maxPrice - minPrice)) * 100}%)`
                                    : '0%',
                                right: minPrice !== null && maxPrice !== null && filters.max !== null
                                    ? `calc(${100 - ((filters.max - minPrice) / (maxPrice - minPrice)) * 100}%)`
                                    : '0%'
                            }}
                        />

                        {/* Minimum foggantyú */}
                        <input
                            className={styles.rangeInput}
                            type="range"
                            min={minPrice!}
                            max={maxPrice!}
                            step={100}
                            value={filters.min!}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                if (filters.max !== null && clamped > filters.max) {
                                    setMax(clamped);
                                    setMaxInput(String(clamped));
                                }
                                setMin(clamped);
                                setMinInput(String(clamped));
                            }}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={() => setIsDragging(false)}
                            style={{zIndex: filters.min! > filters.max! ? 5 : 3}}
                        />

                        {/* Maximum foggantyú */}
                        <input
                            className={styles.rangeInput}
                            type="range"
                            min={minPrice!}
                            max={maxPrice!}
                            step={100}
                            value={filters.max!}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                if (filters.min !== null && clamped < filters.min) {
                                    setMin(clamped);
                                    setMinInput(String(clamped));
                                }
                                setMax(clamped);
                                setMaxInput(String(clamped));
                            }}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={() => setIsDragging(false)}
                            style={{zIndex: 4}}
                        />
                    </div>
                </div>
            ) : (
                <div>Betöltés...</div>
            )}
        </div>
    )
}
