import Movement from "@/models/Movement";
import User from "@/models/User";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    MongoDBConnection();
    const { alias, amount, email } = await request.json();
    const trans_value = parseInt(amount)
    console.log(email)

    const userSender = await User.findOne({ email }); 
    console.log(userSender)

    if (!userSender) {
      return NextResponse.json({ message: "No hay cliente registrado" }, { status: 400 });
    }

    const userReceiver = await User.findOne({ alias });

    if (!userReceiver) {
      return NextResponse.json({ message: "No se encontró destinatario" }, { status: 400 });
    }

    if(userSender.dinero < amount ){
      return NextResponse.json({message: "No tienes suficiente Dinero"},{status:400})
    }

   
    userSender.dinero -= trans_value
    console.log("Resultado de Actividad" , (userSender.dinero -= trans_value))

    userReceiver.dinero += trans_value
    await userSender.save();
    await userReceiver.save();

   

    const senderMovement = new Movement({
      userId: userSender._id,
      type: 'transfer',
      amount: trans_value,
      details: `Transferencia a ${userReceiver.name}`
    });
    await senderMovement.save();


    const receiverMovement = new Movement({
      userId: userReceiver._id,
      type: 'receive',
      amount: amount,
      details: `Recepción de ${userSender.email}`
    });
    await receiverMovement.save();



    return NextResponse.json({message: "Envio de dinero Satisfactorio "});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

  