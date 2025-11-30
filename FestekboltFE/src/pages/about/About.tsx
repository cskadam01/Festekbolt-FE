import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import styles from "./About.module.css";
import festek from "../../../public/festek.jpg"

export const About = () => {
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentWrap}>
                <div className={styles.hero}>
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroText}>
                        <h1>Rólunk - A FestékBolt Szakértői</h1>
                        <p>Több mint festék - otthonokat teremtünk színekkel.</p>
                    </div>
                </div>

                <div className={styles.aboutContent}>
                    <div className={styles.aboutSection}>
                        <h2>A Mi Történetünk</h2>
                        <p>
                            A FestékBolt több évtizedes múltra tekint vissza. Családi vállalkozásként indultunk, azzal a céllal, hogy a legjobb minőségű festékeket és a legprofesszionálisabb tanácsadást nyújtsuk vásárlóinknak. Az évek során folyamatosan bővítettük kínálatunkat, de egy dolog változatlan maradt: a minőség és a vevői elégedettség iránti elkötelezettségünk.
                        </p>
                    </div>

                    <div className={styles.aboutSection}>
                        <img src={festek} alt="Festékbolt" className={styles.aboutImage} />
                    </div>

                    <div className={styles.aboutSection}>
                        <h2>Küldetésünk</h2>
                        <p>
                            Hiszünk abban, hogy a színek erejével otthonosabbá, szebbé tehetjük a környezetünket. Küldetésünk, hogy mindenki számára elérhetővé tegyük a professzionális minőségű festékeket és eszközöket, és hogy szakértő tanácsainkkal segítsünk megvalósítani álmaik otthonát. Legyen szó egy egyszerű tisztasági festésről vagy egy teljes lakásfelújításról, mi itt vagyunk, hogy segítsünk.
                        </p>
                    </div>

                    <div className={styles.aboutSection}>
                        <h2>Ismerje meg Csapatunkat</h2>
                        <p>
                            Csapatunk tagjai mind képzett szakemberek, akik szenvedélyesen szeretik a munkájukat. Évtizedes tapasztalattal a hátuk mögött készen állnak, hogy megválaszolják minden kérdését, és segítsenek kiválasztani az Önnek legmegfelelőbb termékeket. Számunkra a legfontosabb az Ön elégedettsége.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
