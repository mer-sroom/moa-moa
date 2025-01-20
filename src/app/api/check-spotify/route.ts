import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/authoptions"; // 상대 경로 수정
import prisma from "@/lib/prisma"; // 절대 경로 사용
import { Session } from "next-auth"; // Session 타입 임포트

export async function GET(request: Request) {
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  console.log("check-spotify session:", session);

  if (!session || !session.user) {
    return NextResponse.json({ connected: false }, { status: 401 });
  }

  // 사용자의 Spotify 계정 정보 가져오기
  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "spotify",
    },
  });

  console.log("check-spotify account:", account);

  if (account && account.access_token) {
    return NextResponse.json({ connected: true });
  }

  return NextResponse.json({ connected: false });
}
