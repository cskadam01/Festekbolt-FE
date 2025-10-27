import styles from "./Footer.module.css"
import { OrangeButton } from "../orangeButton/OrangeButton"

export const Footer = () => {
  return(
    <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
            <div>
                <h2>Elérhetőségek:</h2>
                <p>+3612624715</p>
                <p>info@festekbolt.hu</p>
                <p>1106 Bp., Tarkarét utca 2.</p>
            </div>
            <div>
                <h2>Hírlevél:</h2>
                <div className={styles.newsletter}>
                    <input type="text" name="" id="" style={{padding:"10px 20px", outline:"none",border:"none"}}/>
                    <OrangeButton button_text="Feliratkozás"/>
                </div>
            </div>
            <div>
                <h2>Információk:</h2>
                <p>Kamerés Adatkezelési tájékoztató</p>
                <p>Festékbolt</p>
                <p>Szállítási információk</p>
                <p>Adatkezelési tájékoztató</p>
                <p>Cookie tájékoztató</p>
                <p>ÁSZF</p>
                <p>Rólunk</p>
                <p>Személyes adatok kezelése</p>
            </div>

        </div>
            <p>minden jog fenttartva!</p>
    </div>


  )
}