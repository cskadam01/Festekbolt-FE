import { useState } from "react";
import { usePaints } from "../../contexts/GetPaintContext";
import styles from "./SearchBar.module.css";
import type { Paint } from "../../pages/home/Home";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export const SearchBar = () => {
    const { paints } = usePaints();
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Paint[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
        setResults([]);
        } else {
        const filtered = paints.filter((p) =>
            p.termek_nev.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const next = e.relatedTarget as HTMLElement | null;
        if (next && next.closest(`.${styles.resultsList}`)) {
            return; // a felhasználó a dropdownba kattintott/ fókuszál
        }
        // kismértékű késleltetés, hogy a kattintás esemény lefusson (Lehet nem kéne, de biztos ami biztos)
        setTimeout(() => {
            setResults([]);
        }, 200);
    };

    return (
        <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
            <input
            type="text"
            placeholder="Keresés festék név szerint..."
            value={searchTerm}
            onChange={handleChange}
            onBlur={handleBlur}
            className={styles.searchInput}
            />
            <Link to="/products" state={{ searchTerm }} className={styles.searchButtonLink}>
            <button className={styles.searchButton} type="button">
                <FaSearch />
            </button>
            </Link>
        </div>

        {results.length > 0 && (
            <ul className={styles.resultsList}>
            {results.map((paint) => (
                <li key={paint.id} className={styles.resultItem}>
                <Link
                    to={`/products/${paint.id}`}
                    className={styles.resultLink}
                    tabIndex={0}
                >
                    <img
                    src={paint.kep_url}
                    alt={paint.termek_nev}
                    className={styles.resultImage}
                    />
                    <span className={styles.resultName}>{paint.termek_nev}</span>
                </Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};
