import { Link } from "react-router-dom"
import { OrangeButton } from "../../components/orangeButton/OrangeButton"
import style from "./Login.module.css"
import { useState } from "react"
import { Navbar } from "../../components/navbar/Navbar"
import { Footer } from "../../components/footer/Footer"




export const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleLogin(){
        //Backendnek elküldeni a jelszót és a felhasználónevet
    }


  return(
    <>
    <Navbar/>
    <div className={style.container}>
        <div className={style.formCont}>
            <h1>Belépés</h1>
            <p>Felhasználónév</p>
            <input type="text" name="user" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <p>Jelszó</p>
            <input type="text" name="user" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br />


            <Link to={""} className={style.loginLinks}>
            Elfelejtett jelszó
            </Link>
            <div className={style.button}>
            <OrangeButton button_text="Belépés" onClick={handleLogin } className={style.logbutton}  />
            </div>
            <Link to={""} className={style.loginLinks}>
                Fiók létrehozása
            </Link>
        </div>

    </div>
    <Footer/>
    </>
  )
}