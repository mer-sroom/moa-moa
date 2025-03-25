import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma";
import { Session } from "next-auth"; // Session 타입 임포트

//편지 정보 받아오는용
export async function GET(
  request: Request,
  { params }: { params: Promise<{ letterId: string }> }
) {
  const { letterId } = await params;
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  //편지 아이디
  const letterIdNumber = Number(letterId);
  if (!letterIdNumber) {
    return NextResponse.json(
      { error: "편지 아이디를 찾을 수 없습니다." },
      { status: 400 }
    );
  }

  try {
    const letter = await prisma.letter.findUnique({
      where: { id: letterIdNumber },
      select: {
        title: true,
        content: true,
        trackId: true,
        // 편지가 속한 MoaBox의 ownerId 확인
        moaBox: {
          select: {
            ownerId: true,
          },
        },
        letterPaperDesign: {
          select: {
            imageURL: true,
          },
        },
      },
    });

    if (!letter) {
      return NextResponse.json(
        { error: "해당하는 편지를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // MoaBox의 소유주와 현재 로그인한 유저가 동일한지 검증
    if (!letter.moaBox || letter.moaBox.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "편지 소유주가 아닙니다." },
        { status: 403 }
      );
    }

    return NextResponse.json(letter, { status: 200 });
  } catch (error) {
    console.error("편지 불러오는 중 에러 발생 :", error);
    return NextResponse.json(
      { error: "편지 불러오는 중 에러 발생 :" },
      { status: 500 }
    );
  }
}
//편지 isOpend 상태 업데이트용
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ letterId: string }> }
) {
  const letterId = await params;
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }
  // 편지 아이디 확인
  const letterIdNumber = Number(letterId);
  if (!letterIdNumber) {
    return NextResponse.json(
      { error: "편지 아이디를 찾을 수 없습니다." },
      { status: 400 }
    );
  }

  try {
    //편지의 소유주가 맞는지 확인
    const existingLetter = await prisma.letter.findUnique({
      where: { id: letterIdNumber },
      select: {
        isOpened: true,
        moaBox: {
          select: { ownerId: true },
        },
      },
    });

    if (!existingLetter) {
      return NextResponse.json(
        { error: "해당하는 편지를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (
      !existingLetter.moaBox ||
      existingLetter.moaBox.ownerId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "편지 소유주가 아닙니다." },
        { status: 403 }
      );
    }

    // isOpened 상태를 true로 업데이트
    const updatedLetter = await prisma.letter.update({
      where: { id: letterIdNumber },
      data: { isOpened: true },
    });

    return NextResponse.json(updatedLetter, { status: 200 });
  } catch (error) {
    console.error("편지 업데이트 중 에러 발생 :", error);
    return NextResponse.json(
      { error: "편지 업데이트 중 에러 발생" },
      { status: 500 }
    );
  }
}
