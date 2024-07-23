import { NextResponse } from "next/server";
import { MongoDBConnection } from "@/utils/mongobd";
import User from "@/models/User";
import Card from "@/models/Cards";
import Movement from "@/models/Movement";
import { lastFourNumbers } from "@/utils/tacharNumero";
import { TransactionType } from "@/utils/enum";



export async function POST(request) {
    try {
    const { email, amount, card } = await request.json()

    const trans_value = parseInt(amount)

    MongoDBConnection()
    const userFound = await User.findOne({ email })

    if (!userFound) {
        return NextResponse.json({ message: "El usuario no esta registrado" })
    }

    const cardFound = await Card.findById(card)

    if (!cardFound) {
        return NextResponse.json({ message: "No se encontro la tarjeta" })
    }

    if (cardFound.mount < amount) {
        return NextResponse.json({ message: "No tienes suficiente dinero en la tarjeta" })
    }

    cardFound.mount -= trans_value
    userFound.dinero += trans_value

    await cardFound.save();
    await userFound.save();

    console.log("llego a guardar cambios")

    const depositMovement = new Movement({
        userId: userFound._id,
        amount: trans_value,
        type: TransactionType.DEPOSIT_COMPLETED,
        details: `Depósito desde tarjeta ${lastFourNumbers(cardFound.serial)}`        
      })

    console.log(depositMovement)
    const movementSaved =  await depositMovement.save()   
    console.log(movementSaved)

    return NextResponse.json({message:"Deposito Exitoso"})
    } catch (error) {
        return NextResponse.json({error})
    }
    
}