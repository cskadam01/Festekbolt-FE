import axios from "axios"
import { useState, useEffect, type FormEvent } from "react"
import styles from "./Register.module.css"
import { Navbar } from "../../components/navbar/Navbar"
import { Footer } from "../../components/footer/Footer"

export const Register = () => {
    const [userName, setUserName] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            setError(null)
        }, 3000)

        return () => clearTimeout(timer)
    }, [error])

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError(null)
        setSuccess(null)
        setIsLoading(true)

        try {
            const r = await axios.post(
                "registerLink",          // ezt cseréld le a saját endpintedre
                {
                    email: email,
                    password: password,
                    username: userName,
                    full_name: fullName,
                }
            )

            // ha eddig eljutottunk, sikeres volt a regisztráció
            setSuccess("Sikeres regisztráció")
            console.log(r.data)
        } catch (err: any) {
            // hibakezelés
            const msg =
                err?.response?.data?.detail ||
                err?.message ||
                "Ismeretlen hiba történt"
            setError(msg)
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <>
        <Navbar/>
        <div className={styles.registerPage}>
            <div className={styles.registerFormContainer}>
                <h2 className={styles.title}>Regisztráció</h2>

                <form onSubmit={handleRegister}>
                    <div className={styles.inputGroup}>
                        <label>Felhasználónév</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Teljes név</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Jelszó</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className={styles.registerButton}>
                        {isLoading ? "Folyamatban..." : "Regisztráció"}
                    </button>
                </form>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}
            {success && <p className={styles.successText}>{success}</p>}
        </div>

        <Footer/>
        </>
    )
}