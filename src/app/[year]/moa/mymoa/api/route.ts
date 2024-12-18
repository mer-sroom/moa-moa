import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const headers = request.headers.get("authorization");
  return NextResponse.json({
    message: "My Moa API Route",
    authorization: headers || "No Authorization Header",
  });
}
