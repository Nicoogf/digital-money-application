import User from "@/models/User";
import { palabras } from "@/utils/Diccionario";
import { MongoDBConnection } from "@/utils/mongobd";
import { GenerarAlias, GenerarCBU } from "@/utils/randomcbu";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { createAccesToken } from "@/libs/jwt";

export async function POST(request) {
  try {
    MongoDBConnection()
    const { name, lastname, email, dni, rol, dinero, phone, password } = await request.json()

    const userFound = await User.findOne({email})

    if(userFound) return NextResponse.json( ["El usuario ya existe"],{status : 400})

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      lastname,
      email,
      dni,
      rol,
      dinero,
      phone,
      password: passwordHash,
      cbu: GenerarCBU(),
      alias: GenerarAlias(palabras)
    })

    const userSaved = await newUser.save()

    const token = await createAccesToken({ id: userSaved._id });

    // Establecer la cookie
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });        

    // Datos que va a usar el Frontend
    return NextResponse.json({
      id: userSaved._id,
      name: userSaved.name,
      lastname: userSaved.lastname,
      email: userSaved.email,
      dni: userSaved.dni,
      rol: userSaved.rol,
      dinero: userSaved.dinero,
      phone: userSaved.phone,
      cbu: userSaved.cbu,
      alias: userSaved.alias,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    },{status:200})

  } catch (error) {
  return NextResponse.json({message : error},{status: 400 })
}}