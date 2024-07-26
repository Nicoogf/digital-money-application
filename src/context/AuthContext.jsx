'use client'

import { changePasswordRequest, editUserRequest, forgetPasswordRequest, loguinRequest, registerRequest , verifyToken } from "@/peticiones/auth";
import { createContext , useState , useContext, useEffect} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
    const [ loading, setLoading ] = useState( true )

    const router = useRouter()

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
            console.log("valor de res.data" , res.data)
            setUser(res.data)
            setIsAuthenticated(true)
            return res.data
        } catch (error) {
            console.log(error.stack)
            console.log(error.response)
            setIsAuthenticated(false)
            setError(error.response.data)
        }
    }

    const logout = () =>{
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    const forgetPassword = async(email) => {
        try {
        const res = await forgetPasswordRequest(email)
        console.log(res)
        } catch (error) {
            console.log(error.response.data)
            setError(error.response.data)
        }
    }

    const changePass = async(pass) => {
        try {
            const res = await changePasswordRequest(pass)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const editUser = async (user) => {
        try {
            const res = await editUserRequest(user)
        } catch (error) {
            console.log(error)
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

  
    useEffect(() => {               
        async function CheckLogin() {
            const cookies = Cookies.get();

            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyToken(cookies.token)
                if(!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }       
        CheckLogin()
    }, []);
    

return(
    <AuthContext.Provider value={{signUp , user , isAuthenticated , errors , signIn , loading, logout , forgetPassword ,changePass , editUser}}>
        {children}
    </AuthContext.Provider>
)
}

//3:30