import { MongoDBConnection } from "@/utils/mongobd";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "@/libs/config";
import User from "@/models/User";
import bcrypt from "bcryptjs"

export async function POST(request) {
    MongoDBConnection()
    try {
        const {newPassword , confirmPassword , token} = await request.json()

        console.log(newPassword , confirmPassword , token)

        if( !newPassword || !confirmPassword){
            return NextResponse.json({
                message : "Falto ingresar al menos una contraseña"
            },{status : 400})
        }

      
        // const headerList = headers()
        // const token = headerList.get("token")
        // console.log(token)

        if(!token){
            return NextResponse.json({
                message : "Usuario no autorizado"
            },{status : 400})
        }

        try {
            const isTokenValid = jwt.verify(token , TOKEN_SECRET)
           
            const data = isTokenValid
          
            console.log(data)
            const userFound = await User.findById(data.userId)
            if(!userFound){
                return NextResponse.json({message: "No se encontro el usuario"})
            }

            if( newPassword !== confirmPassword){
                return NextResponse.json({
                    message : "Las contraseñas no coinciden"
                },{status : 400})
            }

            const newPassHashed = await bcrypt.hash(newPassword,10)

            userFound.password = newPassHashed
            await userFound.save()

            return NextResponse.json({message : "Contraseña modificada exitosamente"})
    
        } catch (error) {
            return NextResponse.json({message :"Token no valido"} ,{status:400})
        }

    } catch (error) {
        return NextResponse.json(error)
    }
}