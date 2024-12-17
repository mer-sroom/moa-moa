import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log("Middleware is running");
  return NextResponse.next();
}
