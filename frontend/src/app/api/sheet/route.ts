import { getAll } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getAll();
    return NextResponse.json(data);
}