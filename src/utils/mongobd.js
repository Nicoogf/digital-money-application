import mongoose from "mongoose";

export const MongoDBConnection = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/desafio-front")
        console.log("Conexion a la base de datos exitosa")
    } catch (error) {
        console.log("Ocurrio un error : " ,  error)    
    }
}