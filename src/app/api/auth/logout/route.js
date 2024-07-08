import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function POST (request) {
    cookies().set('token', '')
    return NextResponse.json({message: "Usuario desloguead"})
}