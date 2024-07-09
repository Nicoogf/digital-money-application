import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { TOKEN_SECRET } from './libs/config'

export async function middleware(request) {
  console.log("Pasa por middleware")
  const token = request.cookies.get("token")

  if (!token) {
    return NextResponse.json({ message: "No autorizado" },{status:400})
  }
  // try {

  //   const secret = new TextEncoder().encode(TOKEN_SECRET);

  //   const { payload } = await jwtVerify(token.value, secret);
  //   console.log("hasta aca llega el payload : " , payload);

  //   // Agrega el usuario verificado al request si es necesario
  //   request.user = payload;
  //   console.log("hasta aca llega el request payload  : " , request.user);


  //   const response = NextResponse.next();
  //   response.cookies.set('user', payload);
  //   return response;
   
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // return NextResponse.next();


  try {
    const secret = new TextEncoder().encode(TOKEN_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    console.log("hasta aca llega el payload: ", payload);

    const response = NextResponse.next();
    response.cookies.set('user', JSON.stringify(payload), { httpOnly: true });
    return response;
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }



}
export const config = {
  matcher: ['/dashboard/:path*', '/api/cards/:path*']
}