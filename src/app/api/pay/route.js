import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { lastFourNumbers } from "@/utils/tacharNumero";
import User from "@/models/User";
import Card from "@/models/Cards";
import Movement from "@/models/Movement";
import { TransactionType } from "@/utils/enum";



export async function POST(request) {
    MongoDBConnection()
   try {
        const { empresa_id , card , email , amount , userlastname , username ,user_id} = await request.json()
         console.log( user_id )
        // Conexión a la base de datos
        MongoDBConnection();

        // Buscar el usuario y la tarjeta
        const userFound = await User.findById(empresa_id);
        const cardFound = await Card.findById(card);

        console.log( userFound.companyName  )

        if (!userFound) {
            return NextResponse.json({ message: "El usuario no está registrado" }, { status: 404 });
        }

        if (!cardFound) {
            return NextResponse.json({ message: "No se encontró la tarjeta" }, { status: 404 });
        }

        console.log(amount)
        const transValue = parseFloat(amount);
        console.log(transValue)
        if (cardFound.mount < transValue) {
            return NextResponse.json({ message: "No tienes suficiente dinero en la tarjeta" }, { status: 400 });
        }

        // Descontar el monto de la tarjeta
        cardFound.mount -= transValue;
        await cardFound.save();

        // Sumar el monto a la cuenta del usuario
        userFound.dinero += transValue;
        await userFound.save();

        // Crear y guardar los movimientos
        const depositMovement = new Movement({
            userId: userFound._id,
            amount: transValue,
            type: TransactionType.PAYMENT_RECEIVED ,
            details: `Pago recibido del cliente ${username} ${userlastname}`
        });
        await depositMovement.save();
     

        const paymentMovement = new Movement({
            userId: user_id,
            amount: transValue,
            type: TransactionType.PAYMENT_SENT,
            details: `Pago de Servicio ${userFound.companyName}`
        });
        await paymentMovement.save();

        console.log(paymentMovement.details)

        return NextResponse.json({ message: "Pago exitoso" }, { status: 200 });
       

    } catch (error) {
        console.error("Error en el proceso de pago:", error);
        return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
    }

}














    //     console.log(typeof(empresa_id) , empresa_id )
    //     // Conexión a la base de datos
    //     MongoDBConnection();

    //     // Buscar el usuario y la tarjeta
    //     const userFound = await User.findById(empresa_id);
    //     const cardFound = await Card.findById(card);

    //     console.log( userFound?.name  )

    //     if (!userFound) {
    //         return NextResponse.json({ message: "El usuario no está registrado" }, { status: 404 });
    //     }

    //     if (!cardFound) {
    //         return NextResponse.json({ message: "No se encontró la tarjeta" }, { status: 404 });
    //     }

    //     const transValue = parseFloat(amount);

    //     if (cardFound.mount < transValue) {
    //         return NextResponse.json({ message: "No tienes suficiente dinero en la tarjeta" }, { status: 400 });
    //     }

    //     // Descontar el monto de la tarjeta
    //     cardFound.mount -= transValue;
    //     await cardFound.save();

    //     // Sumar el monto a la cuenta del usuario
    //     userFound.dinero += transValue;
    //     await userFound.save();

    //     // Crear y guardar los movimientos
    //     const depositMovement = new Movement({
    //         userId: userFound._id,
    //         amount: transValue,
    //         type: "deposit",
    //         details: `Depósito desde tarjeta ${lastFourNumbers(cardFound.serial)}`
    //     });
    //     await depositMovement.save();

    //     const paymentMovement = new Movement({
    //         userId: cardFound._id,
    //         amount: transValue,
    //         type: "transfer",
    //         details: `Pago recibido del usuario ${lastFourNumbers(cardFound.serial)}`
    //     });
    //     await paymentMovement.save();

    //     return NextResponse.json({ message: "Pago exitoso" }, { status: 200 });
       

    // } catch (error) {
    //     console.error("Error en el proceso de pago:", error);
    //     return NextResponse.json({ error: "Error al procesar el pago" }, { status: 500 });
    // }
