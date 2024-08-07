import Movement from "@/models/Movement";
import User from "@/models/User";
import { TransactionType } from "@/utils/enum";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { PDFDocument, rgb } from 'pdf-lib';


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
      type: TransactionType.TRANSFER_SENT,
      amount: trans_value,
      details: `Transferencia a ${userReceiver.name}`
    });

    console.log("EL MOVIMIENTO DEL QUE ENVIA El dinero" , {senderMovement})
    await senderMovement.save();


    const id_user_reciber = userReceiver._id.toString()
    
    console.log({ userId: id_user_reciber,
      type: 'receive',
      amount: trans_value,
      envia: senderMovement.name})

    const receiverMovement = new Movement({
      userId: id_user_reciber,
      type: TransactionType.TRANSFER_RECEIVED,
      amount: trans_value,
      details: `Recepción de ${userSender.name}`
    });
    await receiverMovement.save();


    console.log("EL MOVIMIENTO DEL QUE RECIBE " , receiverMovement)

     // Crear el documento PDF
     const pdfDoc = await PDFDocument.create();
     const page = pdfDoc.addPage([600, 400]);
     const { height } = page.getSize();
     const fontSize = 12;
 
     page.drawText(`Detalles de la Transacción:`, { x: 50, y: height - 4 * fontSize, size: fontSize + 4, color: rgb(0, 0, 0) });
     page.drawText(`De: ${userSender.name} (${userSender.email})`, { x: 50, y: height - 6 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
     page.drawText(`A: ${userReceiver.name} (${userReceiver.alias})`, { x: 50, y: height - 8 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
     page.drawText(`Monto: ${trans_value}`, { x: 50, y: height - 10 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
     page.drawText(`Fecha: ${new Date().toLocaleString()}`, { x: 50, y: height - 12 * fontSize, size: fontSize, color: rgb(0, 0, 0) });
 

     const pdfBytes = await pdfDoc.save();

     return new NextResponse(new Blob([pdfBytes], { type: 'application/pdf' }), {
       status: 200,
       headers: {
         'Content-Disposition': 'attachment; filename="transaction.pdf"'
       }
     });


    // return NextResponse.json({message: "Envio de dinero Satisfactorio "});
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

  