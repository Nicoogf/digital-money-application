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


export async function PUT(request) {
    try {
        MongoDBConnection();

        const body = await request.json();
        const { email, name, lastname, dni, phone, alias, cbu } = body;
        console.log(cbu)

        // Buscar al usuario en la base de datos por su email
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return NextResponse.json({ message: "El usuario no existe" }, { status: 404 });
        }

        // Actualizar los campos del usuario solo si son diferentes y no están vacíos
        if (name && name !== userFound.name) userFound.name = name;
        if (lastname && lastname !== userFound.lastname) userFound.lastname = lastname;
        if (dni && dni !== userFound.dni) userFound.dni = dni;
        if (phone && phone !== userFound.phone) userFound.phone = phone;
        if (alias && alias !== userFound.alias) userFound.alias = alias;
        if (cbu && cbu !== userFound.cbu) userFound.cbu = cbu;

        // Guardar los cambios en la base de datos
        await userFound.save();

        return NextResponse.json({ message: "Información actualizada correctamente" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}