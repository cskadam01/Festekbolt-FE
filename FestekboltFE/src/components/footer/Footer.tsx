import styles from "./Footer.module.css";
import { OrangeButton } from "../orangeButton/OrangeButton";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
    function handleSub() {
        // Hírlevélre való feliratkozás
    }

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.footerColumn}>
                    <h2>Elérhetőségek</h2>
                    <p>+36 1 262 4715</p>
                    <p>
                        <a href="mailto:info@festekbolt.hu">info@festekbolt.hu</a>
                    </p>
                    <p>1106 Budapest, Tarkarét utca 2.</p>
                </div>

                <div className={styles.footerColumn}>
                    <h2>Információk</h2>
                    <p><a href="#">Kamerás Adatkezelési tájékoztató</a></p>
                    <p><a href="#">Szállítási információk</a></p>
                    <p><a href="#">Adatkezelési tájékoztató</a></p>
                    <p><a href="#">Cookie tájékoztató</a></p>
                    <p><a href="#">ÁSZF</a></p>
                    <p><a href="#">Rólunk</a></p>
                </div>

                <div className={styles.footerColumn}>
                    <h2>Hírlevél</h2>
                    <p>Iratkozzon fel, hogy értesüljön a legújabb akcióinkról!</p>
                    <div className={styles.newsletter}>
                        <input type="email" placeholder="Az Ön email címe" />
                        <OrangeButton button_text="Feliratkozás" onClick={handleSub} />
                    </div>
                    <div className={styles.socialIcons}>
                        <a href="#" aria-label="Facebook"><FaFacebook /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} FestékBolt. Minden jog fenntartva!</p>
            </div>
        </footer>
    );
};