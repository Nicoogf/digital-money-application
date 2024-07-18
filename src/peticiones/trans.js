import axios from "./axios"

export const sendMoneyRequest = ( trans ) => axios.post("/transaction" , trans)
export const depositMoneyRequest = ( trans ) => axios.post("/deposit" , trans) 