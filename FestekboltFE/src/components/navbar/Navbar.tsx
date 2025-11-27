import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { SearchBar } from "../searchBar/SearchBar";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className={styles.largeNav}>
                <div className={styles.navLeft}>
                    <div className={styles.brand}>
                        <Link to="/" style={{ color: "inherit", textDecoration: "none", display: 'flex' }}>
                            <h1 style={{ color: "#ff7a00", marginRight: 6 }}>Festék</h1>
                            <h1>Bolt</h1>
                        </Link>
                    </div>
                    <div className={styles.largeNavLinks}>
                        <Link to="/">Főoldal</Link>
                        <Link to="/products">Termékek</Link>
                        <Link to="/about">Rólunk</Link>
                        <Link to="/connect">Kapcsolat</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>

                <div className={styles.navCenter}>
                    <SearchBar />
                </div>

                <div className={styles.navRight}>
                    <div className={styles.actions}>
                        <Link to="/login" className={styles.navLink}>
                            <FaRegUser />
                            Bejelentkezés
                        </Link>
                        <Link to="/cart" className={styles.navLink}>
                            <GrCart />
                            Kosár
                        </Link>
                    </div>
                </div>

                <button className={styles.menuToggle} onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Navigation */}
                <div className={`${styles.navMobile} ${isMenuOpen ? styles.active : ""}`}>
                    <div className={styles.largeNavLinks}>
                        <Link to="/">Főoldal</Link>
                        <Link to="/products">Termékek</Link>
                        <Link to="/about">Rólunk</Link>
                        <Link to="/connect">Kapcsolat</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                    <div className={styles.navCenter}>
                        <SearchBar />
                    </div>
                    <div className={styles.navRight}>
                        <div className={styles.actions}>
                            <Link to="/login" className={styles.navLink}>
                                <FaRegUser />
                                Bejelentkezés
                            </Link>
                            <Link to="/cart" className={styles.navLink}>
                                <GrCart />
                                Kosár
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {isMenuOpen && <div className={styles.backdrop} onClick={toggleMenu}></div>}
        </>
    );
};