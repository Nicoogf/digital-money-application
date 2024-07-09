import Card from "@/models/Cards";
import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";


export async function GET() {
    //Muestra todas las tarjetas
    MongoDBConnection()
    const cards = await Card.find()
    return NextResponse.json( cards )   
}

export async function POST (request ){
    //crear una tarjeta 
    MongoDBConnection()
    const { name , codeSegurity , serial , vto , mount , user } = await request.json()
    
    try {
     
    const userCookie = request.cookies.get('user');
        console.log("Cookie user:", userCookie);
        const { value } = userCookie
        console.log("el value es : " , value )
        const newValue = JSON.parse(value)
        console.log(newValue)
        const {id} = newValue
        console.log(id)
       
       
      
    
        const newCard = new Card({
            name ,
            codeSegurity ,
            serial , 
            vto,
            mount,
            user: id   
        })
    
        const savedCard = await newCard.save() 
        return NextResponse.json(savedCard)
    } catch (error) {
        return NextResponse.json({error})
    }
   
}