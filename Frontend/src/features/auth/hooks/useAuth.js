import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setuser, loading, setloading } = context

    const handleLogin = async({email,password}) =>{
        setloading(true)
        try{

            const data = await login({email,password})
            setuser(data.user)
            setloading(false)
        }catch(err){

        }finally{
            setloading(false)
        }

    }
    const handleRegister = async({username,email,password}) =>{
        setloading(true)
        try{

            const data = await register({username,email,password})
            setuser(data.user)
            setloading(false)
        }catch(err){

        }finally{
            setloading(false)
        }

    }
    const handleLogout = async()=>{
        setloading(true)
        try{

            const data = await logout()
            setuser(null)
            setloading(false)
        }catch(err){

        }finally{
            setloading(false)
        }
    }
    return {user,loading,handleLogin,handleLogout,handleRegister}
}  