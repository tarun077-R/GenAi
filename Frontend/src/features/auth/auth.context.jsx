import { useEffect } from "react";
import { createContext, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
     const [user,setuser] = useState(null)
     const [loading,setloading] = useState(false)
 useEffect(()=>{
const getandsetuser = async()=>{
    const data = await getMe()
    setuser(data.user)
    setloading(false)
}
 },[])
     return (
        <AuthContext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </AuthContext.Provider>
     )
}