import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const headers = request.headers.get("authorization");
  return NextResponse.json({
    message: "My Moa API Route",
    authorization: headers || "No Authorization Header",
  });
}
//친구 요청 추가 로직
export async function POST(request: Request) {
  try {
    const { currentUserId, targetUserId } = await request.json();
    //필요한 데이터가 없을 때
    if (!currentUserId || !targetUserId) {
      return NextResponse.json(
        { error: "유저 정보가 누락 되었습니다!" },
        { status: 400 }
      );
    }

    // friendship 테이블에 친구 요청 생성(pending상태로)
    const friendship = await prisma.friendship.create({
      data: {
        userA: { connect: { id: currentUserId } },
        userB: { connect: { id: targetUserId } },
        status: "PENDING",
      },
    });

    // notification 테이블에 알림 생성
    const notification = await prisma.notification.create({
      data: {
        user: { connect: { id: targetUserId } },
        type: "FRIEND_REQUEST",
        message: `새로운 친구 요청이 도착했습니다. (${currentUserId}님)`,
        payload: { friendshipId: friendship.id, from: currentUserId },
      },
    });

    return NextResponse.json({ success: true, friendship, notification });
  } catch (error) {
    console.error("친구 요청 중 API 에러 발생 :", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
