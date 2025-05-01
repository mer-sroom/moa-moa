import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { Session } from "next-auth"; // Session 타입 임포트
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  // console.log("노티 콘솔 확인:", session);
  try {
    // 모든 알림 최근 순으로 조회
    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    //보낸 사람의 정보가 필요한 알림 타입
    const senderTypes = ["INVITE_GROUP_MOA", "FRIEND_REQUEST"];
    // 일반 알림 (모아 소식) 타입
    const moaTypes = ["LETTER_RECEIVED", "FROM_MOA"];

    // 알림 분리
    const myNotifications = notifications.filter(n =>
      senderTypes.includes(n.type)
    );
    const moaNotifications = notifications.filter(n =>
      moaTypes.includes(n.type)
    );

    // senderId를 추출
    const senderIds = notifications.reduce(
      (senderNotifications, notification) => {
        if (
          senderTypes.includes(notification.type) && //senderTypes에 해당하는지
          notification.payload && //payload가 있는지
          (notification.payload as { senderId: string }).senderId //from필드가 존재한다면
        ) {
          senderNotifications.add(
            (notification.payload as { senderId: string }).senderId
          );
        }
        return senderNotifications;
      },
      new Set<string>()
    ); //senderId : string

    // senderIds 유저의 id, nickname, profileImage 조회
    const senders = await prisma.user.findMany({
      where: { id: { in: Array.from(senderIds) } },
      select: { id: true, nickname: true, image: true },
    });

    const senderMap = {}; // 빈 객체 생성

    //id를 키로, 조회한 값을 맵핑
    senders.forEach(sender => {
      senderMap[sender.id] = sender;
    });

    //sender 정보가 필요한 알림에 sender 정보를 병합
    const notificationsWithSender = myNotifications.map(notification => {
      if (
        notification.payload && //payload 있는 지 재차 확인
        (notification.payload as { senderId?: string }).senderId
      ) {
        const senderId = (notification.payload as { senderId: string })
          .senderId;
        return { ...notification, sender: senderMap[senderId] };
      }
      return notification;
    });

    return NextResponse.json({
      myNotifications: notificationsWithSender,
      moaNotifications,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "알림함 정보 불러오는 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}

//모아 소식 읽음 처리 로직
export async function PATCH(request: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  try {
    //요청에서 읽지 않은 모아 소식 id값과 read값 받아오기
    const { ids, read } = await request.json();

    //검증

    await prisma.notification.updateMany({
      where: {
        id: { in: ids },
        userId: session.user.id,
      },
      data: { read },
    });
  } catch (error) {
    console.error("모아 소식 읽음 처리 중 문제 발생:", error);
    return NextResponse.json(
      { error: "모아 소식 읽음 처리 중 문제 발생" },
      { status: 500 }
    );
  }
}
