import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import styles from "./Connect.module.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export const Connect = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Köszönjük az üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.");
        //Sohase vesszük fel velük a kapcsolalatot valójában
        e.target.reset();
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar />
            <div className={styles.contentWrap}>
                <div className={styles.connectContainer}>
                    <div className={styles.header}>
                        <h1>Lépjen velünk kapcsolatba</h1>
                        <p>Kérdése van? Írjon nekünk, vagy látogasson el hozzánk!</p>
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.contactInfo}>
                            <h2>Elérhetőségeink</h2>
                            <div className={styles.infoItem}>
                                <FaMapMarkerAlt className={styles.infoIcon} />
                                <div>
                                    <strong>Cím:</strong>
                                    <p>1119 Budapest, Fejér Lipót u. 70.</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FaPhone className={styles.infoIcon} />
                                <div>
                                    <strong>Telefon:</strong>
                                    <p>+36 30 123 4567</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FaEnvelope className={styles.infoIcon} />
                                <div>
                                    <strong>Email:</strong>
                                    <p>info@festekbolt.hu</p>
                                </div>
                            </div>
                            <div className={styles.mapContainer}>
                                <iframe
                                    src="https://maps.google.com/maps?q=Budapest%2C%20Fejér%20Lipót%20u.%2070&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Térkép"
                                ></iframe>
                            </div>
                        </div>

                        <div className={styles.contactForm}>
                            <h2>Írjon nekünk üzenetet</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Név</label>
                                    <input type="text" id="name" name="name" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email cím</label>
                                    <input type="email" id="email" name="email" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Üzenet</label>
                                    <textarea id="message" name="message" rows="6" required></textarea>
                                </div>
                                <button type="submit" className={styles.submitButton}>Üzenet küldése</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
