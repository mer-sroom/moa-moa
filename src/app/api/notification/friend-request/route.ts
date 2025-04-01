import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { Session } from "next-auth"; // Session 타입 임포트
import { NextResponse } from "next/server";
import { error } from "console";

//친구 요청 수락
export async function PATCH(request: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  //notificationId값 받아오기
  const { notificationId } = await request.json();
  if (!notificationId) {
    return NextResponse.json(
      { error: "notification ID값이 필요합니다" },
      { status: 400 }
    );
  }

  //해당 알림에서 payload값 받아오기기
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { payload: true },
  });
  if (!notification || !notification.payload) {
    return NextResponse.json(
      { error: "해당하는 알림이 없습니다(payload)" },
      { status: 400 }
    );
  }

  // payload값에서 friendshipId와 senderId 추출
  const { friendshipId, senderId } = notification.payload as {
    friendshipId: number;
    senderId: number;
  };

  // 두 값이 모두 존재하는지 확인
  if (friendshipId == null || senderId == null) {
    return NextResponse.json(
      { error: "payload에 friendshipId와 senderId가 모두 필요합니다." },
      { status: 400 }
    );
  }
  try {
    //friendList 테이블에서 Pending 상태 Accepted로 전환
    await prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: "ACCEPTED" },
    });

    //notification에서 해당 알림 삭제
    await prisma.notification.delete({ where: { id: notificationId } });

    //moaNotification으로 @@님과 친구가 되었습니다 read true상태로 추가하기
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "FROM_MOA",
        message: "님과 친구가 되었습니다.",
        read: true,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("친구 요청 수락 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "친구 요청 수락 처리 중 오류 발생" },
      { status: 500 }
    );
  }
}

//친구 요청 거절
export async function DELETE(request: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  //notificationId값 받아오기
  const { notificationId } = await request.json();
  if (!notificationId) {
    return NextResponse.json(
      { error: "notification ID값이 필요합니다" },
      { status: 400 }
    );
  }

  //해당 알림 payload값 받아오기
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
    select: { payload: true },
  });
  if (!notification || !notification.payload) {
    return NextResponse.json(
      { error: "해당하는 알림이 없습니다(payload)" },
      { status: 400 }
    );
  }

  // payload값을 통해 friendshipId 추출
  const { friendshipId } = notification.payload as { friendshipId: number };
  if (!friendshipId || friendshipId == null) {
    return NextResponse.json(
      { error: "payload에 friendshipId가 존재하지 않습니다" },
      { status: 400 }
    );
  }

  try {
    //notification에서 해당 알림 삭제
    await prisma.notification.delete({ where: { id: notificationId } });

    //friendShip 테이블에서 해당 알림 삭제
    await prisma.friendship.delete({ where: { id: friendshipId } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("친구 요청 거절 중 오류 발생:", error);
    return NextResponse.json(
      { error: "친구 요청 거절 중 오류 발생" },
      { status: 500 }
    );
  }
}
