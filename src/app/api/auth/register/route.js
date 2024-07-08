import User from "@/models/User";
import { palabras } from "@/utils/Diccionario";
import { MongoDBConnection } from "@/utils/mongobd";
import { GenerarAlias, GenerarCBU } from "@/utils/randomcbu";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    MongoDBConnection()
    const { name, lastname, email, dni, rol, dinero, phone, password } = await request.json()
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

    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          id: userSaved._id
        },
        "digital_money_app",
        {
          expiresIn: "1d"
        },
        (err, token) => {
          if (err) {
            reject(NextResponse.json({ err }));
          } else {
            cookies().set("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24, // 1 day
              path: '/'
            });

            resolve(NextResponse.json({ token }));
          }
        }
      );
    });

    //Datos que va a usar el Frontend
    // return NextResponse.json({
    //   id: userSaved._id,
    //   name: userSaved.name,
    //   email: userSaved.email,
    //   dni: userSaved.dni,
    //   rol: userSaved.rol,
    //   dinero: userSaved.dinero,
    //   phone: userSaved.phone,
    //   cbu: userSaved.cbu,
    //   alias: userSaved.alias,
    //   createdAt: userSaved.createdAt,
    //   updatedAt: userSaved.updatedAt
    // })

  } catch (error) {
    return NextResponse.json(error)
  }
}