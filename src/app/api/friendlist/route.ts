import { getFriendship } from "@/lib/friendship";
import { mockUser } from "@/app/[year]/moa/mockData"; //목업 유저
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/authoptions"; // 상대 경로 수정
import { Session } from "next-auth"; // Session 타입 임포트

export async function GET(request: Request) {
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;
  console.log("session in API:", session); // 세션 확인 로그 추가
  console.log("check-friendlist session:", session);
  console.log("mockUser:", mockUser);

  if (!session || !session.user) {
    return NextResponse.json({ connected: false }, { status: 401 });
  }

  try {
    const friends = await getFriendship(mockUser.id); //나중에 userId로 교체
    return NextResponse.json({ friends });
  } catch (error) {
    console.error("친구 리스트 API 요청 중 문제 발생", error);
    return NextResponse.json({ error });
  }
}
