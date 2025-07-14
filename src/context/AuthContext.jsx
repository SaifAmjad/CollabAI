import { createContext, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const[isAuthenticated,setIsAuthenticad]=useState(localStorage.getItem('user'));

    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticad}}>
            {children}
        </AuthContext.Provider>
    );
}