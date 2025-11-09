
import { Navigate } from "react-router-dom";
import { OrangeButton } from "../orangeButton/OrangeButton";
import style from "./CartOverall.module.css"


interface CartOverallProps {
    total: number;
  }
  
  export const CartOverall = ({ total }: CartOverallProps) => {

    const shipping:  string = total >= 20000 ? "Ingyenes" : "1500 Ft";
    const overall = shipping === "1500 Ft" ? total + 1500 : total;

    function toPaymnet(){

    }




    return (
      <>
       <div className={style.container}>
        <div  className={style.content}>
            <h1>
                Rendelés összesítő
            </h1>
            <div className={style.details}>
               <p>Részösszeg</p>
               <p>{total} Ft</p>
               <p>Szállítás</p>
               <p>{shipping}</p>
               
               <h2>Végösszeg</h2>
               <h2>{overall} Ft</h2>


            </div>
           
                <OrangeButton className={style.sendButton} onClick={toPaymnet} button_text="Pénztárhoz"/>
            
            


        </div>
       </div>
      </>
    );
  };
  