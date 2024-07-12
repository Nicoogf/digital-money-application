import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { TOKEN_SECRET } from './libs/config'

export async function middleware(request) {

  const token = request.cookies.get("token")

  if (request.nextUrl.pathname.includes("/dashboard")) {
    if( token === undefined){
      console.log("No hay token fue redireccionado al loguin")
      return NextResponse.redirect(new URL("/login", request.url))
    }
    
    try {      
      const { payload } = await jwtVerify(token.value , new TextEncoder().encode(TOKEN_SECRET))
      console.log("Viene de middleware.js" , payload)
      return NextResponse.next()
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/login", request.url))
    }
  
  }
  return NextResponse.next()
}





// if (!token) {
//   return NextResponse.json({ message: "No autorizado" },{status:400})
// }


// try {
//   const secret = new TextEncoder().encode(TOKEN_SECRET);
//   const { payload } = await jwtVerify(token.value, secret);
//   console.log("hasta aca llega el payload: ", payload);

//   const response = NextResponse.next();
//   response.cookies.set('user', JSON.stringify(payload), { httpOnly: false })
//   return response;
// } catch (err) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }
