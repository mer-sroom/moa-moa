import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
// authOptions = NextAuth config
import prisma from "@/lib/prisma";

export async function GET() {
  // 세션 가져오기
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ connected: false });
  }

  // DB에서 Account 검색
  const account = await prisma.account.findFirst({
    where: {
      userId: Number(session.user.id),
      provider: "spotify",
    },
  });

  // 존재하면 connected: true
  const connected = Boolean(account);
  return NextResponse.json({ connected });
}
