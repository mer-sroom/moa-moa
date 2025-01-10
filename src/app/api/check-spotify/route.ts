import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const accounts = await prisma.account.findMany({
      where: {
        userId: parseInt(userId, 10),
        provider: "spotify",
      },
    });

    const connected = accounts.length > 0;

    return NextResponse.json({ connected });
  } catch (error) {
    console.error("Error checking Spotify connection:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
