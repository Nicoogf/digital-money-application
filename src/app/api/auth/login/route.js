import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createAccesToken } from "@/libs/jwt";


export async function POST(request) {
  try {
    MongoDBConnection()
    const { email , password } = await request.json()

    
    const userFound = await User.findOne({email})

    if(!userFound){
        return NextResponse.json(["El usuario no existe"],{status:400})
    }
    const isMatch = await bcrypt.compare(password, userFound.password);


    if(!isMatch){
        return NextResponse.json(["Credenciales Invalidas"],{status:400})
    }

    const token = await createAccesToken({ id: userFound._id });

    // Establecer la cookie
    cookies().set("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'   
    });        

    // Datos que va a usar el Frontend
    return NextResponse.json({
      id: userFound._id,
      name: userFound.name,
      lastname : userFound.lastname,
      email: userFound.email,
      dni: userFound.dni,
      rol: userFound.rol,
      dinero: userFound.dinero,
      phone: userFound.phone,
      cbu: userFound.cbu,
      alias: userFound.alias,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    },{status:200})

  } catch (error) {
  return NextResponse.json({message : error},{status: 400 })
}}