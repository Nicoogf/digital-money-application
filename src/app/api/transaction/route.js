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
    console.log(userSender.name)

    if (!userSender) {
      return NextResponse.json({ message: "No hay cliente registrado" }, { status: 400 });
    }

    const userReceiver = await User.findOne({ alias });

    console.log(userReceiver.name)

    if (!userReceiver) {
      return NextResponse.json({ message: "No se encontró destinatario" }, { status: 400 });
    }

    if(userSender.dinero < amount ){
      return NextResponse.json({message: "No tienes suficiente Dinero"},{status:400})
    }

   
    userSender.dinero -= trans_value
    userReceiver.dinero += trans_value

    
    await userSender.save();
    await userReceiver.save();




   const id_user_sender = userSender._id.toString()

   console.log({ userId: id_user_sender,
    type: 'transferir',
    amount: trans_value,
    recibe: userReceiver.name})

    const senderMovement = new Movement({
      userId: id_user_sender,
      type: 'transferir',
      amount: trans_value,
      details: `Transferencia a ${userReceiver.name}`
    });

    console.log("EL MOVIMIENTO DEL QUE ENVIAR" , senderMovement)
    await senderMovement.save();


    const receiverMovement = new Movement({
      userId: userReceiver._id,
      type: 'receive',
      amount: trans_value,
      details: `Recepción de ${userSender.name}`
    });
    await receiverMovement.save();


    console.log("EL MOVIMIENTO DEL QUE RECIBE " , receiverMovement)


    return NextResponse.json({message: "Envio de dinero Satisfactorio "});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

  