import { NextRequest, NextResponse } from "next/server";
import { getById } from "@/lib/db";

export async function GET(request: NextRequest,{params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const data = await getById(id);
    return NextResponse.json(data);
}