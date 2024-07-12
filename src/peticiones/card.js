import axios from "axios" ;

export const getCardsRequest = () => axios.get("/cards")

export const getCardsRequests = ( id ) => axios.get(`/cards/${id}`)

export const createCardRequest = ( card ) => axios.post("/cards" , card )

export const updateCardRequest = ( card ) => axios.put("/cards" , card )

export const deleteCardRequest = ( id ) => axios.put(`/card/${id}` , card )
