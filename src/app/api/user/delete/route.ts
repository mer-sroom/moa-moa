import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  /* ① 로그인 확인 */
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "인증된 사용자가 없습니다." },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    await prisma.$transaction([
      /* ② 소셜 계정·세션 삭제 */
      prisma.account.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),

      /* ③ 개인정보 익명화  */
      prisma.user.update({
        where: { id: userId },
        data: {
          email: null,
          name: "탈퇴한 사용자",
          nickname: "탈퇴한 사용자",
          image: null,
          role: "USER",
        },
      }),

      /* ④ 친구관계·알림 등 불필요한 데이터 정리 */
      prisma.friendship.deleteMany({
        where: { OR: [{ userAId: userId }, { userBId: userId }] },
      }),
      prisma.notification.deleteMany({ where: { userId } }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("회원탈퇴 실패:", e);
    return NextResponse.json(
      { error: "회원탈퇴 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
