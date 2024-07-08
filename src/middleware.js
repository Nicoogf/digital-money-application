import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { TOKEN_SECRET } from './libs/config'

export async function middleware(request) {

  const token = request.cookies.get("token")

  if (!token) {
    return NextResponse.json({ message: "No autorizado" })
  }
  try {

    const secret = new TextEncoder().encode(TOKEN_SECRET);

    const { payload } = await jwtVerify(token.value, secret);
    console.log(payload);

    // Agrega el usuario verificado al request si es necesario
    request.user = payload;

  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: '/dashboard/:path*',
}