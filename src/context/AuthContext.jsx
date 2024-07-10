'use client'
import { loguinRequest, registerRequest , } from "@/peticiones/auth";
import { createContext , useState , useContext, useEffect} from "react";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error ("UseAuth debe ser utilizado dentro de un AuthProvider")
    }
    return context
}

export const AuthProvider = ({children})=> {

    const [ user , setUser ] = useState(null)
    const [ isAuthenticated , setIsAuthenticated ] = useState(false)
    const [ errors , setError ] = useState([])

    const signUp = async( user ) => {

        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
            return res.data
        } catch (error) {
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    const signIn = async(user) => {
        try {
            const res = await loguinRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            return res.data
        } catch (error) {
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    useEffect(()=> {
        if(errors.length > 0 ){
           const timer = setTimeout( () => {
            setError([])
           },3000)
           return () => clearTimeout(timer)
        }
    },[errors])


return(
    <AuthContext.Provider value={{signUp , user , isAuthenticated , errors , signIn}}>
        {children}
    </AuthContext.Provider>
)
}