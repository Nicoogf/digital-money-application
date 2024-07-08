
import { NextResponse } from "next/server";

export async function POST(request) {
const { email } = await request.json()
return NextResponse.json( email )
}