import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { Login } from "../pages/login/Login";


interface loginData{
    username:string
    password:string
}

interface userDetails{
    userName: string
    fullName: string
    zipCode: number
    city: string
    street: string
    streetNumber: string
}

interface UserState{
    
    isLoggedIn: boolean

}

interface userContextValue{
    userDetails: userDetails | null,
    isLoggedIn: boolean;
    login: (loginData: loginData) => Promise<void>

}


type UserAction={
    type:"LOGIN";
    payload: userDetails



}

const initialState = {
    isLoggedIn: false,
    userDetails: null
}





const userContext = createContext<userContextValue | null>(null)

function UserAuthReducer(state: UserState, action: UserAction){
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                userDetails : action.payload,
                isLoggedIn : true


            }
        
            default: return state


    }

}

export function UserAuthProvider({children}: {children : React.ReactNode}){
    const [state, dispatch] = useReducer(UserAuthReducer, initialState)


    const login =async(userData : loginData)=>{
        const response = await axios.post("login link", userData)
        dispatch({
            type: "LOGIN",
            payload: response.data,
          });

    

        

    }


    const value: userContextValue = {
        userDetails: state.userDetails,
        isLoggedIn: state.isLoggedIn,
        login,
      };

    <userContext.Provider value={value}>
        {children}
    </userContext.Provider>
}
