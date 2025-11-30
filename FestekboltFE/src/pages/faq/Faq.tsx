import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import styles from "./Faq.module.css";

const faqData = [
    {
        question: "Hogyan válasszak megfelelő festéket a falamra?",
        answer: "A megfelelő festék kiválasztása több tényezőtől függ, mint például a felület típusa (beton, gipszkarton), a helyiség funkciója (pl. fürdőszobába páraálló festék ajánlott), és a kívánt esztétikai hatás (matt, selyemfényű). Látogasson el üzletünkbe, ahol szakértő kollégáink segítenek a választásban!",
    },
    {
        question: "Mennyi festékre lesz szükségem?",
        answer: "A szükséges festékmennyiség a festendő felület nagyságától és a festék fedőképességétől függ. Általános szabály, hogy egy liter festék kb. 8-10 négyzetméter felületre elegendő egy rétegben. A termék adatlapján pontosabb információt talál a kiadósságról.",
    },
    {
        question: "Szükséges alapozót használnom festés előtt?",
        answer: "Igen, az alapozás elengedhetetlen a tartós és egyenletes eredmény érdekében. Az alapozó javítja a festék tapadását, csökkenti a fogyasztását és egységesíti a felület szívóképességét.",
    },
    {
        question: "Milyen eszközökre lesz szükségem a festéshez?",
        answer: "A festéshez szüksége lesz ecsetekre a sarkokhoz és élekhez, egy hengerre a nagyobb felületekhez, festőtálcára, takarófóliára a bútorok és a padló védelméhez, valamint maszkolószalagra a precíz élek kialakításához.",
    },
    {
        question: "Hogyan készítsem elő a falat festés előtt?",
        answer: "A fal legyen tiszta, pormentes és száraz. Az esetleges repedéseket, lyukakat gletteléssel javítsa ki, majd csiszolja simára a felületet. Portalanítás után jöhet az alapozás.",
    },
    {
        question: "Van lehetőség online rendelésre és házhozszállításra?",
        answer: "Igen, webshopunkban kényelmesen megrendelheti a kiválasztott termékeket. Országos házhozszállítást biztosítunk, melynek részleteiről a 'Szállítási Információk' menüpontban tájékozódhat.",
    },
    {
        question: "Mennyi idő a szállítási idő?",
        answer: "A raktáron lévő termékeket általában 2-4 munkanapon belül szállítjuk. A pontos szállítási idő a termék elérhetőségétől és a szállítási címtől függően változhat.",
    },
    {
        question: "Milyen fizetési módok érhetőek el?",
        answer: "Webshopunkban lehetősége van bankkártyás fizetésre, banki átutalásra, valamint utánvétes fizetésre a csomag átvételekor.",
    },
    {
        question: "Mit tegyek, ha nem vagyok elégedett a termékkel?",
        answer: "Amennyiben a termékkel kapcsolatban minőségi kifogása van, vagy nem azt kapta, amit rendelt, kérjük, vegye fel velünk a kapcsolatot 14 napon belül. A 'Vásárlási Feltételek' oldalon bővebb információt talál a visszaküldés folyamatáról.",
    },
    {
        question: "Hol találom az üzletüket?",
        answer: "Üzletünk pontos címe és nyitvatartási ideje a 'Kapcsolat' oldalon található. Várjuk szeretettel!",
    },
];

const FaqItem = ({ faq, isOpen, onClick }) => {
    return (
        <div className={styles.faqItem}>
            <div className={styles.faqQuestion} onClick={onClick}>
                <span>{faq.question}</span>
                <span className={`${styles.faqIcon} ${isOpen ? styles.open : ""}`}>+</span>
            </div>
            <div className={`${styles.faqAnswer} ${isOpen ? styles.open : ""}`}>
                <p>{faq.answer}</p>
            </div>
        </div>
    );
};

export const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentWrap}>
                <div className={styles.faqContainer}>
                    <h1 className={styles.title}>Gyakran Ismételt Kérdések</h1>
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};
