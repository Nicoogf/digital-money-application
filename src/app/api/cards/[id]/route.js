import Card from "@/models/Cards";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server"

export async function GET(request , { params }) {
    MongoDBConnection()
    const id = params.id
    console.log("El id de la tarjeta es : " , id)

    try {
        const CardFound = await Card.findById(id)
        if(!CardFound){
            return NextResponse.json({message: "Tarjeta no encontrada"})
        }
        return NextResponse.json(CardFound)
    } catch (error) {
        return NextResponse.json({error } , {status : 400})
    }
}

export async function DELETE() {
    MongoDBConnection()
    const id = params.id

    const CardDelete = await Card.findByIdAndDelete({id})
    if(CardDelete){
        return NextResponse.json({
            message : "No se encontro la tarjeta para eliminarla"
        })
    }

    return NextResponse.json({message : "Tarjeta eliminada"})
}

export async function UPDATE ( request ){
    MongoDBConnection()
    const id = params.id
    const body = await request.json()

    const CardUpdate  = await Card.findByIdAndUpdate({id}, body , {new : true})
    if(!CardUpdate){
        return NextResponse.json({message : "No se encontro ninguna Tarjeta"})
    }

    return NextResponse.json(CardUpdate)
}