import User from "@/models/User";
import { palabras } from "@/utils/Diccionario";
import { MongoDBConnection } from "@/utils/mongobd";
import { GenerarAlias, GenerarCBU } from "@/utils/randomcbu";
import { NextResponse } from "next/server";

export async function POST ( request ) {
    MongoDBConnection()
    const {name,lastname,email,dni,rol,dinero,phone,password,cbu,alias} = await request.json()

    const newUser = new User({
        name,
        lastname,
        email,
        dni,
        rol,
        dinero,
        phone,
        password,
        cbu: GenerarCBU(),
        alias: GenerarAlias(palabras)
    }
)

    return NextResponse.json({})
}