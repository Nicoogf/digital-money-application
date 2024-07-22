import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        //Muestra todas las tarjetas
    MongoDBConnection()
    // const userCookie = request.cookies.get('token');
    // if (!userCookie) {
    //     return NextResponse.json({ message: "El usuario no esta AUTENTICADO" }, { status: 401 });
    // }
    
    const listado = await User.find({rol: "Empresa"})
    return NextResponse.json( listado )   
    } catch (error) {
     console.log(error)   
     return NextResponse.json( error )   
    }
    
}