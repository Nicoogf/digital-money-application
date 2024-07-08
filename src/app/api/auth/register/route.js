import { MongoDBConnection } from "@/utils/mongobd";
import { NextResponse } from "next/server";

export async function POST ( request ) {
    MongoDBConnection()
    const data = await request.json()
    return NextResponse.json({data})
}