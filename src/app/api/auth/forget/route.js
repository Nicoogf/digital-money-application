import { createAccesToken } from "@/libs/jwt";
import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_4MANzBx1_2PGQRhctpm2g8gLHwv68p2mM")

export async function POST(request) {

    MongoDBConnection()
    try {
        const { email } = await request.json()
        const userFound = await User.findOne({email})

        console.log(userFound)

        if(!userFound) {
            return NextResponse.json(["El usuario no existe"],{status:400})
        }

        const tokenData = {
            email: userFound.email,
            userId : userFound._id
        }

        
      const token = await createAccesToken(tokenData);

      const forgetUrl = `http://localhost:3000/change-password?token=${token}`

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "nicolasgfalabella@gmail.com",
        subject: "Cambio de contraseña",
        html: `<a href=${forgetUrl}> Hola Mundo </a>`
      })

      return NextResponse.json({
        message : "Correo enviado correctamente"
      },{status: 200})

    } catch (error) {
        return NextResponse.json(error)
    }
}