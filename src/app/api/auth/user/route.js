import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        MongoDBConnection();

        const body = await request.text(); // Obtiene el cuerpo de la solicitud como texto

        if (!body) {
            throw new Error("El cuerpo de la solicitud está vacío");
        }
        console.log(body)
        const usuarioJson = JSON.parse(body)
        console.log(usuarioJson)
        const { user_id } = usuarioJson
        console.log(user_id)
        const userFound = await User.findById(user_id)
        console.log(userFound)
        if(!userFound){
            return NextResponse.json("ID de usuario incorrecto")
        }

        return NextResponse.json({message:"ID Correcto"},{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message : "Error se va por el catch"},{status:400})
    }
}