'use client'
import { createContext, useContext, useState } from "react"

const CardContext = createContext()

export const useCard = () => {
const context = useContext(CardContext)
if(!context){
    throw new Error("useCard debe estar dentro de un CardProvider")
}   
    return context
} 

export function CardProvider ({ children }) {

const [ card , setCard ] = useState([])

const createCard = async (card ) => {
    console.log("Nueva tarea creada")
}

return(
    <CardContext.Provider value = {{card, createCard}}>
         { children }
    </CardContext.Provider>
)
}