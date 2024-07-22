'use client'
import { verifyUserRequest } from "@/peticiones/auth"
import { getBusinessRequest } from "@/peticiones/business"
import { getMovesRequest } from "@/peticiones/moves"
import { payServicesRequest } from "@/peticiones/pay"
import { depositMoneyRequest, sendMoneyRequest } from "@/peticiones/trans"
import { createContext, useContext, useState } from "react"

const TransactionContext = createContext()

export const useTransaction = () => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error("useTransaction debe estar dentro de un provider")
    }
    return context
}

export function TransactionProvider({ children }) {

    const [moves, setMoves] = useState([])
    const [business, setBussines] = useState([])

    const sendMoney = async (trans) => {
        try {
            const res = await sendMoneyRequest(trans)
            console.log("El res del transition es : ", res)
        } catch (error) {
            console.log(error)
        }
    }

    const depositMoney = async (trans) => {
        try {
            const res = await depositMoneyRequest(trans)
            console.log("El res del transition es : ", res)
        } catch (error) {
            console.log(error)
        }
    }

    const getMoves = async () => {
        try {
            const res = await getMovesRequest()
       
            setMoves(res.data)
        } catch (error) {

        }
    }

    const getBusiness = async () => {
        try {
            const res = await getBusinessRequest()
            setBussines(res.data)
           
        } catch (error) {
            console.log(error)
        }
    }

    const VerifyUser = async (info_pago) => {
        try {
            const res = await verifyUserRequest(info_pago)
        } catch (error) {
            console.log(error)
        }
    }

    const payServices = async ( data ) => {
        try {
            const res = await payServicesRequest(data)
            console.log("El valor del pago de servicio :" , res)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <TransactionContext.Provider value={{ getMoves, sendMoney, depositMoney, moves, getBusiness, business , VerifyUser , payServices}}>
            {children}
        </TransactionContext.Provider>
    )
}