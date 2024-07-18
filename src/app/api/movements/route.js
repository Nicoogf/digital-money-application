import Movement from "@/models/Movement";
import { jwtVerify } from "jose";

import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { TOKEN_SECRET } from "@/libs/config";

export async function GET(request) {
    MongoDBConnection()
    const userCookie = request.cookies.get('token');
    if (!userCookie) {
        return NextResponse.json({ message: "El usuario no esta AUTENTICADO" }, { status: 401 });
    }
    const { value } = userCookie;
    console.log("El valor de value" , value)

    const { payload } = await jwtVerify(value , new TextEncoder().encode(TOKEN_SECRET))
    console.log("Viene de backend" , payload)

    const { id } = payload;
    console.log(id)
    const movimientos = await Movement.find({userId: id})
    console.log(movimientos)
    return NextResponse.json( movimientos ) 
}