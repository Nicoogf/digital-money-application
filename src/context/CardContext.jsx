'use client'
import { createContext, useContext, useState } from "react"
import { createCardRequest , getCardsRequest } from "@/peticiones/card"
const CardContext = createContext()

export const useCard = () => {
const context = useContext(CardContext)
if(!context){
    throw new Error("useCard debe estar dentro de un CardProvider")
}   
    return context
} 

export function CardProvider ({ children }) {

const [ cards , setCard ] = useState([])

const createCard = async ( card ) => {
    try {
        const res = await createCardRequest(card)
        console.log( "el res data del context : " , res )    
    } catch (error) {
        console.log(error)
    }
   
}

const getCards = async()=> {
    try {
        const res = await getCardsRequest()
        setCard(res.data)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 
}

return(
    <CardContext.Provider value = {{cards, createCard, getCards}}>
         { children }
    </CardContext.Provider>
)
}