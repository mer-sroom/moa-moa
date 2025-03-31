import { getFriendship } from "@/lib/friendship";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authoptions"; // 상대 경로 수정
import { Session } from "next-auth"; // Session 타입 임포트

export async function GET(request: Request) {
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  try {
    const friends = await getFriendship(session.user.id);
    return NextResponse.json({ friends });
  } catch (error) {
    console.error("친구 리스트 API 요청 중 문제 발생", error);
    return NextResponse.json(
      { error: "친구 목록 불러오는 중 문제 발생" },
      { status: 500 }
    );
  }
}
