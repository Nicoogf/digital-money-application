import axios from "./axios"

const API = "http://localhost:3000/api"

export const registerRequest = (user) =>  axios.post(`/auth/register` , user)
export const loguinRequest = (user) => axios.post(`/auth/login` , user)
export const verifyToken = () => axios.get("/auth/verify")
export const verifyUserRequest = (data) => axios.post("/auth/user" , data )