import { Link } from "react-router-dom";
import { OrangeButton } from "../../components/orangeButton/OrangeButton";
import style from "./Login.module.css";
import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";

export const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className={style.loginPage}>
                <div className={style.loginFormContainer}>
                    <form onSubmit={handleLogin}>
                        <h1 className={style.title}>Belépés</h1>
                        
                        <div className={style.inputGroup}>
                            <label htmlFor="username">Felhasználónév</label>
                            <input
                                type="text"
                                id="username"
                                name="user"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className={style.inputGroup}>
                            <label htmlFor="password">Jelszó</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className={style.options}>
                            <Link to="#" className={style.loginLinks}>Elfelejtett jelszó</Link>
                        </div>

                        <OrangeButton
                            button_text="Belépés"
                            onClick={() => {}} // formban az onSubmit kezeli
                            className={style.loginButton}
                        />

                        <div className={style.createAccount}>
                            <span>Nincs még fiókod? </span>
                            <Link to="#" className={style.loginLinks}>Fiók létrehozása</Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};