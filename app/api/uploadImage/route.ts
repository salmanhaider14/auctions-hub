import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename: any = searchParams.get("filename");

  const body: any = request.body;
  console.log(body);
  const blob = await put(filename, body, {
    access: "public",
  });

  return NextResponse.json(blob);
}
