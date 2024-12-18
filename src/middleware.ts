import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const userAgent = request.headers.get("user-agent");
  console.log(`Middleware is running for User-Agent: ${userAgent}`);
  return NextResponse.next();
}
