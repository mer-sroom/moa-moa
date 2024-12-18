import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;
  return NextResponse.json({ message: `Friend Moa API Route for URL: ${url}` });
}
