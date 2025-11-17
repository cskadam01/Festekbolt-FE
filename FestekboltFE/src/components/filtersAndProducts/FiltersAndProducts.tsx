import { useEffect, useState } from "react";
import type { Paint } from "../../pages/home/Home";
import styles from "./FiltersAndProducts.module.css"
import axios from "axios";
import { ProductCard } from "../productCard/ProductCard";
import { FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

/* Nem tudtam szétszedni a kettőt külön, mert a kettő függ egymástól.
Ha nem tetszik legyszi csináld meg de sztem nem éri meg xd */

export const FiltersAndProducts = () => {
    const [paint, setPaint] = useState<Paint[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
    const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);
    const [minInput, setMinInput] = useState<string>("");
    const [maxInput, setMaxInput] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);
    const [lastFilteredList, setLastFilteredList] = useState<Paint[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
    const [selectedAvailability, setSelectedAvailability] = useState<Set<boolean>>(new Set());
    const [productNameInput, setProductNameInput] = useState<string>("");
    const [selectedProductName, setSelectedProductName] = useState<string>("");
    const [showClearButton, setShowClearButton] = useState(false);

    useEffect(() => {
        const GetPaints = async () => {
            try {
                const url = "https://raw.githubusercontent.com/cskadam01/festek-api/refs/heads/main/festek.json";
                const response = await axios.get(url, {
                    transformResponse: [(data) => JSON.parse(data)]
                });

                const data: Paint[] = response.data;
                setPaint(data);

                // minimum és maximum ár kiszámítása az adatokból
                const prices = data.map(p => Number(p.ar)).filter(n => !Number.isNaN(n));
                if (prices.length > 0) {
                    const min = Math.min(...prices);
                    const max = Math.max(...prices);
                    setMinPrice(min);
                    setMaxPrice(max);
                    setSelectedMinPrice(min);
                    setSelectedMaxPrice(max);
                    setMinInput(String(min));
                    setMaxInput(String(max));
                }
                setIsLoading(false);
            } catch (error: any) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        GetPaints();
    }, []);

    // Festékek szűrése a minimum és maximum ár, típus, elérhetőség és terméknév alapján
    const filteredPaints = paint.filter(p => {
        const price = Number(p.ar);
        if (selectedMinPrice == null || selectedMaxPrice == null) return true;
        
        // ár szűrő
        const passesPrice = price >= selectedMinPrice && price <= selectedMaxPrice;
        
        // típus szűrő - ha nincs típus kiválasztva, akkor mindet mutatja; különben csak a kiválasztott típusokat
        const passesType = selectedTypes.size === 0 || selectedTypes.has(p.tipus);
        
        // elérhetőség szűrő - ha nincs elérhetőség kiválasztva, akkor mindet mutatja; különben csak a kiválasztott elérhetőségeket
        const passesAvailability = selectedAvailability.size === 0 || selectedAvailability.has(p.raktaron);
        
        // terméknév szűrő - ha nincs név beírva, akkor mindet mutatja; különben csak a név alapján szűr
        const passesName = selectedProductName === "" || p.termek_nev.toLowerCase().includes(selectedProductName.toLowerCase());
        
        return passesPrice && passesType && passesAvailability && passesName;
    });

    // Ez azért kell, hogy ne ugráljon a lista mikor húzod a csúszkát (Nem tetszett hogy ugrál egyfolytában)
    useEffect(() => {
        const filteredPaints = paint.filter(p => {
            const price = Number(p.ar);
            if (selectedMinPrice == null || selectedMaxPrice == null) return true;
            
            // ár szűrő
            const passesPrice = price >= selectedMinPrice && price <= selectedMaxPrice;
            
            // típus szűrő - ha nincs típus kiválasztva, akkor mindet mutatja; különben csak a kiválasztott típusokat
            const passesType = selectedTypes.size === 0 || selectedTypes.has(p.tipus);
            
            // elérhetőség szűrő - ha nincs elérhetőség kiválasztva, akkor mindet mutatja; különben csak a kiválasztott elérhetőségeket
            const passesAvailability = selectedAvailability.size === 0 || selectedAvailability.has(p.raktaron);
            
            // terméknév szűrő - ha nincs név beírva, akkor mindet mutatja; különben csak a név alapján szűr
            const passesName = selectedProductName === "" || p.termek_nev.toLowerCase().includes(selectedProductName.toLowerCase());
            
            return passesPrice && passesType && passesAvailability && passesName;
        });

        const isMinPriceActive = selectedMinPrice > minPrice;
        const isMaxPriceActive = selectedMaxPrice < maxPrice;
        const isTypeActive = selectedTypes.size > 0;
        const isAvailabilityActive = selectedAvailability.size > 0;
        const isNameActive = selectedProductName !== "";

        if (!isDragging) {
            setLastFilteredList(filteredPaints);

            if (isMinPriceActive || isMaxPriceActive || isTypeActive || isAvailabilityActive || isNameActive) {
                setShowClearButton(true);
            } else {
                setShowClearButton(false);
            }
        }
    }, [selectedMinPrice, selectedMaxPrice, isDragging, paint, selectedTypes, selectedAvailability, selectedProductName]);

    // Az összes típus kigyűjtése a festékekből
    const uniqueTypes = Array.from(new Set(paint.map(p => p.tipus))).sort();

    // Hány darab van típusonként
    const typeCountMap = new Map<string, number>();
    paint.forEach(p => {
        typeCountMap.set(p.tipus, (typeCountMap.get(p.tipus) || 0) + 1);
    });

    // Hány darab van raktáron és nincs raktáron
    const inStockCount = paint.filter(p => p.raktaron).length;
    const outOfStockCount = paint.filter(p => !p.raktaron).length;

    const visiblePaints = isDragging ? lastFilteredList : filteredPaints;

    return (
        <div className={styles.searchAndProductsContainer}>
                <div className={styles.sideSearchContainer}>

                    {/* Termék név szűrő */}
                    <div className={styles.filtersDivided}>
                        <h4>Termék neve:</h4>
                        <input
                            type="text"
                            placeholder="Termék keresése..."
                            value={productNameInput}
                            onChange={(e) => setProductNameInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSelectedProductName(productNameInput);
                                }
                            }}
                            className={styles.productNameInput}
                        />
                    </div>
                    
                    {/* Ár szűrő (Ezzel annyit baszakodtam hiába az AI) */}
                    <div className={styles.filtersDivided}>
                        <h4>Ár szerint:</h4>
                        {minPrice !== null && maxPrice !== null && selectedMinPrice !== null && selectedMaxPrice !== null ? (
                            <div>
                                <div style={{marginBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div className={styles.priceInputs}>
                                        <div className={styles.priceInputWrapper}>
                                            <input
                                                type="number"
                                                min={minPrice}
                                                max={maxPrice}
                                                step={100}
                                                value={minInput}
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
                                                            setSelectedMinPrice(fallback);
                                                            setMinInput(String(fallback));
                                                            return;
                                                        }
                                                        const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                                        if (selectedMaxPrice !== null && clamped > selectedMaxPrice) setSelectedMaxPrice(clamped);
                                                        setSelectedMinPrice(clamped);
                                                        setMinInput(String(clamped));
                                                    }
                                                }}
                                                    onBlur={() => {
                                                        const raw = minInput;
                                                        const val = raw === '' ? null : Number(raw);
                                                        if (val === null || Number.isNaN(val)) {
                                                            const fallback = minPrice!;
                                                            setSelectedMinPrice(fallback);
                                                            setMinInput(String(fallback));
                                                            return;
                                                        }
                                                        const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                                        if (selectedMaxPrice !== null && clamped > selectedMaxPrice) setSelectedMaxPrice(clamped);
                                                        setSelectedMinPrice(clamped);
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
                                                value={maxInput}
                                                onChange={(e) => setMaxInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const raw = maxInput;
                                                        const val = raw === '' ? null : Number(raw);
                                                        if (val === null || Number.isNaN(val)) {
                                                            const fallback = maxPrice!;
                                                            setSelectedMaxPrice(fallback);
                                                            setMaxInput(String(fallback));
                                                            return;
                                                        }
                                                        const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                                        if (selectedMinPrice !== null && clamped < selectedMinPrice) setSelectedMinPrice(clamped);
                                                        setSelectedMaxPrice(clamped);
                                                        setMaxInput(String(clamped));
                                                    }
                                                }}
                                                onBlur={() => {
                                                    const raw = maxInput;
                                                    const val = raw === '' ? null : Number(raw);
                                                    if (val === null || Number.isNaN(val)) {
                                                        const fallback = maxPrice!;
                                                        setSelectedMaxPrice(fallback);
                                                        setMaxInput(String(fallback));
                                                        return;
                                                    }
                                                    const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                                    if (selectedMinPrice !== null && clamped < selectedMinPrice) setSelectedMinPrice(clamped);
                                                    setSelectedMaxPrice(clamped);
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
                                            left: minPrice !== null && maxPrice !== null && selectedMinPrice !== null 
                                                ? `calc(${((selectedMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%)`
                                                : '0%',
                                            right: minPrice !== null && maxPrice !== null && selectedMaxPrice !== null
                                                ? `calc(${100 - ((selectedMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%)`
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
                                        value={selectedMinPrice!}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                            if (selectedMaxPrice !== null && clamped > selectedMaxPrice) {
                                                setSelectedMaxPrice(clamped);
                                                setMaxInput(String(clamped));
                                            }
                                            setSelectedMinPrice(clamped);
                                            setMinInput(String(clamped));
                                        }}
                                        onMouseDown={() => setIsDragging(true)}
                                        onMouseUp={() => setIsDragging(false)}
                                        onTouchStart={() => setIsDragging(true)}
                                        onTouchEnd={() => setIsDragging(false)}
                                        style={{zIndex: selectedMinPrice! > selectedMaxPrice! ? 5 : 3}}
                                    />

                                    {/* Maximum foggantyú */}
                                    <input
                                        className={styles.rangeInput}
                                        type="range"
                                        min={minPrice!}
                                        max={maxPrice!}
                                        step={100}
                                        value={selectedMaxPrice!}
                                        onChange={(e) => {
                                            const val = Number(e.target.value);
                                            const clamped = Math.max(minPrice!, Math.min(val, maxPrice!));
                                            if (selectedMinPrice !== null && clamped < selectedMinPrice) {
                                                setSelectedMinPrice(clamped);
                                                setMinInput(String(clamped));
                                            }
                                            setSelectedMaxPrice(clamped);
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

                    {/* Típus szűrő */}
                    <div className={styles.filtersDivided}>
                        <h4>Típus alapján:</h4>
                            {uniqueTypes.map((type) => (
                                <div key={type} className={styles.typeCheckbox}>
                                    <input
                                        type="checkbox"
                                        id={`type-${type}`}
                                        checked={selectedTypes.has(type)}
                                        onChange={(e) => {
                                            const newTypes = new Set(selectedTypes);
                                            if (e.target.checked) {
                                                newTypes.add(type);
                                            } else {
                                                newTypes.delete(type);
                                            }
                                            setSelectedTypes(newTypes);
                                        }}
                                    />
                                    <label htmlFor={`type-${type}`}>
                                        {type}
                                        <span className={styles.typeCount}>({typeCountMap.get(type) || 0})</span>
                                    </label>
                                </div>
                            ))}
                    </div>
                    
                    {/* Elérhetőség szűrő */}
                    <div className={styles.filtersDivided}>
                        <h4>Elérhetőség</h4>
                            <div className={styles.availabilityCheckbox}>
                                <input
                                    type="checkbox"
                                    id="availability-in-stock"
                                    checked={selectedAvailability.has(true)}
                                    onChange={(e) => {
                                        const newAvailability = new Set(selectedAvailability);
                                        if (e.target.checked) {
                                            newAvailability.add(true);
                                        } else {
                                            newAvailability.delete(true);
                                        }
                                        setSelectedAvailability(newAvailability);
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
                                    checked={selectedAvailability.has(false)}
                                    onChange={(e) => {
                                        const newAvailability = new Set(selectedAvailability);
                                        if (e.target.checked) {
                                            newAvailability.add(false);
                                        } else {
                                            newAvailability.delete(false);
                                        }
                                        setSelectedAvailability(newAvailability);
                                    }}
                                />
                                <label htmlFor="availability-out-of-stock">
                                    Nincs raktáron
                                    <span className={styles.availabilityCount}>({outOfStockCount})</span>
                                </label>
                        </div>
                    </div>

                    {/* Szűrők törlése gomb */}
                    {/* Mire rájöttem hogy ezt hogy kéne geci az agyam lesorvadt, pedig visszagondolva tök egyszerű */}
                    {showClearButton && (
                            <button
                                className={styles.clearFiltersButton}
                                id="clearFiltersButton"
                                onClick={() => {
                                    setSelectedMinPrice(minPrice);
                                    setSelectedMaxPrice(maxPrice);
                                    setSelectedTypes(new Set());
                                    setSelectedAvailability(new Set());
                                    setSelectedProductName("");
                                    setProductNameInput("");
                                    setMinInput(String(minPrice));
                                    setMaxInput(String(maxPrice));
                                }}
                            >
                                Szűrők törlése <FaTrash />
                        </button>
                        )}
                </div>


                {/* Termékek listázása */}
                <div className={styles.productListContainer}>
                    {isLoading ? (
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
                    )}
                </div>
            </div>
    );
};