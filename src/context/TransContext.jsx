'use client'
import { getBusinessRequest } from "@/peticiones/business"
import { getMovesRequest } from "@/peticiones/moves"
import { depositMoneyRequest, sendMoneyRequest } from "@/peticiones/trans"
import { createContext ,useContext ,useState } from "react"

const TransactionContext = createContext()

export const useTransaction = () => {
    const context = useContext(TransactionContext) 
    if(!context) {
        throw new Error ("useTransaction debe estar dentro de un provider")
    }
    return context
}

export function TransactionProvider ({children}) {

    const [moves , setMoves] = useState([])
    const [ business , setBussines ] = useState([])

    const sendMoney = async( trans ) =>{
        try {
            const res = await sendMoneyRequest(trans)
            console.log("El res del transition es : " , res)
        } catch (error) {
            console.log(error)
        }
    } 

    const depositMoney = async(trans ) => {
        try {
            const res = await depositMoneyRequest(trans)
            console.log("El res del transition es : " , res)
        } catch (error) {
            console.log(error)
        }
    }

    const getMoves = async() => {
        try {
            const res = await getMovesRequest()
            console.log(res)
            setMoves(res.data)
        } catch (error) {
            
        }
    }

    const getBusiness = async () => {
        try {
            const res = await getBusinessRequest()
            setBussines(res.data)
            console.log(res)      
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <TransactionContext.Provider value={{getMoves, sendMoney , depositMoney,moves, getBusiness , business}}>
            {children}
        </TransactionContext.Provider>
    )
}