import Card from "@/models/Cards";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { TOKEN_SECRET } from "@/libs/config";


export async function GET(request) {
    //Muestra todas las tarjetas
    MongoDBConnection()
    const userCookie = request.cookies.get('user');
    const { value } = userCookie   
        const newValue = JSON.parse(value) 
        const {id} = newValue
        console.log(id)
    const cards = await Card.find({user: id}).populate("user")
    return NextResponse.json( cards )   
}

// export async function POST (request ){
//     //crear una tarjeta 
//     MongoDBConnection()
//     const { name , codeSegurity , serial , vto , mount , user } = await request.json()
    
//     try {
     
//     const userCookie = request.cookies.get('user');
//         console.log("Cookie user:", userCookie);
//         const { value } = userCookie
//         console.log("el value es : " , value )
//         const newValue = JSON.parse(value)
//         console.log(newValue)
//         const {id} = newValue
//         console.log(id)
       
       
//         const newCard = new Card({
//             name ,
//             codeSegurity ,
//             serial , 
//             vto,
//             mount,
//             user: id   
//         })
    
//         const savedCard = await newCard.save() 
//         return NextResponse.json(savedCard)
//     } catch (error) {
//         return NextResponse.json({error})
//     }
   
// }
export async function POST(request) {
    try {
      MongoDBConnection();
  
      // Obtener datos de la solicitud
      const { name, codeSegurity, serial, vto, mount } = await request.json();
  
      // Verificar si la cookie de usuario está presente
      const userCookie = request.cookies.get('token');
      if (!userCookie) {
        return NextResponse.json({ message: "El usuario no esta AUTENTICADO" }, { status: 401 });
      }
  
      // Extraer el valor de la cookie y parsearlo
      const { value } = userCookie;
      console.log("El valor de value" , value)

      const { payload } = await jwtVerify(value , new TextEncoder().encode(TOKEN_SECRET))
      console.log("Viene de backend" , payload)

      const { id } = payload;
  
      // Crear una nueva tarjeta utilizando el ID del usuario
      const newCard = new Card({
        name,
        codeSegurity,
        serial,
        vto,
        mount,
        user: id   
      });
  
      // Guardar la tarjeta en la base de datos
      const savedCard = await newCard.save();
  
      // Devolver la tarjeta guardada como respuesta
      return NextResponse.json(savedCard);
    } catch (error) {
      // Manejar errores y devolver una respuesta de error adecuada
      console.error("Error al crear la tarjeta:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  