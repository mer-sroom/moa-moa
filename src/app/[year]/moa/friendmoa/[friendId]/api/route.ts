import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url; // 요청 URL 가져오기
  return NextResponse.json({ message: `Friend Moa API Route for URL: ${url}` });
}
