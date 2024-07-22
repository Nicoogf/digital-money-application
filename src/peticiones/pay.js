import axios from "./axios"

export const payServicesRequest = (data) => axios.post("/pay" , data )