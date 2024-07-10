import axios from "axios";

const API = "http://localhost:3000/api"

export const registerRequest = (user) =>  axios.post(`${API}/auth/register` , user)
export const loguinRequest = (user) => axios.post(`${API}/auth/login` , user)