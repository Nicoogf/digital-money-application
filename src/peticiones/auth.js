import axios from "./axios"

const API = "http://localhost:3000/api"

export const registerRequest = (user) =>  axios.post(`/auth/register` , user)
export const loguinRequest = (user) => axios.post(`/auth/login` , user)
export const verifyToken = () => axios.get("/auth/verify")
export const verifyUserRequest = (data) => axios.post("/auth/user" , data )
export const forgetPasswordRequest = (email) => axios.post("/auth/forget" , email )
export const changePasswordRequest = (pass) => axios.post("/auth/change-pass" , pass)
export const editUserRequest =( user ) => axios.put("/auth/user" , user )