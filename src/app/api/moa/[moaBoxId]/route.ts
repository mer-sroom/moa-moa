import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { Session } from "next-auth"; // Session 타입 임포트
import { deleteMoaBox } from "@/lib/deletion";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ moaBoxId: string }> }
) {
  const { moaBoxId } = await params; // 비동기적으로 params 처리
  if (!moaBoxId) {
    return NextResponse.json(
      { error: "조회할 아이디가 없습니다" },
      { status: 400 }
    );
  }
  // Session 타입 단언
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return NextResponse.json({ connected: false }, { status: 401 });
  }

  //모아박스 아이디 받아오기
  const moaBoxIdNum = Number(moaBoxId);
  const result = await deleteMoaBox(moaBoxIdNum, session);
  if (!result) {
    console.error("모아 박스 삭제 중 문제 발생");
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
