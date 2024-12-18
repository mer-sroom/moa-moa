import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headers = request.headers.get("authorization"); // 헤더 가져오기
  return NextResponse.json({
    message: "My Moa API Route",
    authorization: headers || "No Authorization Header",
  });
}
