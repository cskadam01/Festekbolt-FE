import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import { GrCart } from "react-icons/gr";
import { FaRegUser, FaSearch } from "react-icons/fa";
export const Navbar = () => {
return(
    <>
        <div className={styles.largeNav}>
        <div className={styles.largeNavTop}>
            <div className={styles.brand}>
            <h1 style={{ color: "#ff9e49ff", marginRight: 6 }}>Festék</h1>
            <h1>Bolt</h1>
            </div>

            <input type="text" placeholder="Keresés..." className={styles.search} />
            <FaSearch />

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

            <div className={styles.largeNavLinks}> 
                <Link to={"/"}>
                    <a >Főoldal</a>
                        
                 </Link>
                <Link to={"/products"}>
                        <a >Termékek</a>
                 </Link>
                 <Link to={"/about"}>
                        <a >Rólunk</a>
                 </Link>
                 <Link to={"/connect"}>
                       <a >Kapcsolat</a> 
                 </Link>
                 <Link to={"/faq"}>
                       <a>FAQ</a> 
                 </Link>
            </div>
        </div>
    </>
)


 }