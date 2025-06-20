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
    await prisma.$transaction(async tx => {
      /* ② 내가 만든 MoaBox 가져오기 */
      const myBoxes = await tx.moaBox.findMany({
        where: { ownerId: userId },
        select: {
          id: true,
          isGroup: true,
          /* 그룹모아일 때만 필요한 필드 */
          participants: {
            where: { NOT: { userId } },
            select: { userId: true, status: true },
            orderBy: { createdAt: "asc" },
          },
        },
      });

      for (const box of myBoxes) {
        if (box.isGroup) {
          /* ── 그룹모아 → 소유권 양도 */
          const delegate =
            box.participants.find(p => p.status === "ACCEPTED") ??
            box.participants[0] ??
            null;

          await tx.moaBox.update({
            where: { id: box.id },
            data: { ownerId: delegate?.userId ?? null },
          });
        } else {
          /* ── 개인모아 → 모든 관련 데이터 삭제 */
          await tx.letter.deleteMany({ where: { moaBoxId: box.id } });
          await tx.moaBoxParticipant.deleteMany({
            where: { moaBoxId: box.id },
          });
          await tx.moaBox.delete({ where: { id: box.id } });
        }
      }

      /* ③ 친구관계·알림 등 FK 정리 */
      await tx.friendship.deleteMany({
        where: { OR: [{ userAId: userId }, { userBId: userId }] },
      });
      await tx.notification.deleteMany({ where: { userId } });

      /* ④ 소셜 Account·Session 삭제 → User 행 Hard-Delete */
      await tx.account.deleteMany({ where: { userId } });
      await tx.session.deleteMany({ where: { userId } });
      await tx.user.delete({ where: { id: userId } });
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("회원탈퇴 실패:", e);
    return NextResponse.json(
      { error: "회원탈퇴 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
