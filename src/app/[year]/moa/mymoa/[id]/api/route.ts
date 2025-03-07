import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// 예시: 인증 미들웨어나 getSession 함수를 통해 사용자 정보를 가져오는 방식
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { Session } from "next-auth";

export async function GET(request: Request) {
  const headers = request.headers.get("authorization");
  return NextResponse.json({
    message: "My Moa API Route",
    authorization: headers || "No Authorization Header",
  });
}

export async function POST(request: Request) {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    const currentUserId = session.user.id;
    const { targetUserId } = await request.json();

    if (!targetUserId) {
      return NextResponse.json(
        { error: "타겟 유저 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 자기 자신에게 요청하지 못하도록 처리
    if (currentUserId === targetUserId) {
      return NextResponse.json(
        { error: "자기 자신에게 친구 요청을 보낼 수 없습니다." },
        { status: 400 }
      );
    }

    // 이미 존재하는 친구 관계나 요청이 있는지 확인
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userAId: currentUserId, userBId: targetUserId },
          { userAId: targetUserId, userBId: currentUserId },
        ],
      },
    });

    if (existingFriendship) {
      //앞선 요청이 있을 때
      if (existingFriendship.status === "PENDING") {
        return NextResponse.json(
          {
            error: "이미 친구 요청 전송됨. 앞선 요청 대기 중",
            code: "FRIEND_REQUEST_PENDING",
          },
          { status: 400 }
        );
      }
      if (existingFriendship.status === "ACCEPTED") {
        //이미 친구일 때
        return NextResponse.json(
          { error: "이미 친구로 등록되어 있습니다.", code: "ALREADY_FRIENDS" },
          { status: 400 }
        );
      }
    }

    // 친구 요청과 알림 동시 생성
    const [friendship, notification] = await prisma.$transaction(async tx => {
      // 친구 요청 생성
      const friendship = await tx.friendship.create({
        data: {
          userA: { connect: { id: currentUserId } },
          userB: { connect: { id: targetUserId } },
          status: "PENDING",
        },
      });

      // 알림 생성: payload에 friendshipId와 요청 보낸 사용자의 아이디 포함
      const notification = await tx.notification.create({
        data: {
          user: { connect: { id: targetUserId } },
          type: "FRIEND_REQUEST",
          message: `님이 친구 요청을 보냈습니다.`,
          payload: { friendshipId: friendship.id, senderId: currentUserId },
        },
      });

      return [friendship, notification];
    });

    return NextResponse.json({ success: true, friendship, notification });
  } catch (error: any) {
    console.error("Friend request API error:", error);
    return NextResponse.json(
      { error: "친구 요청 API 에러 발생." },
      { status: 500 }
    );
  }
}
