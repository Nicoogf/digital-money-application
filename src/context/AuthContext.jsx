'use client'
import { registerRequest } from "@/peticiones/auth";
import { createContext , useState , useContext} from "react";

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

    const signUp = async( user ) => {

        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
            return res.data
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
        }
    }


return(
    <AuthContext.Provider value={{signUp , user , isAuthenticated}}>
        {children}
    </AuthContext.Provider>
)
}