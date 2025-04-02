import prisma from "./prisma";
import type { Session } from "next-auth";
//모아 박스 삭제 로직
export async function deleteMoaBox(moaBoxId: number, session: Session) {
  if (!session || !session.user) {
    return { success: false, message: "인증되지 않은 사용자입니다." };
  }

  // 우편함 소유주 검증
  const moaBox = await prisma.moaBox.findUnique({
    where: { id: moaBoxId },
    select: { ownerId: true },
  });
  if (!moaBox) {
    return { success: false, message: "존재하지 않는 모아박스입니다." };
  }
  if (moaBox.ownerId !== session.user.id) {
    return { success: false, message: "모아박스 소유주가 아닙니다." };
  }

  await prisma.moaBox.delete({ where: { id: moaBoxId } });
  return { success: true };
}

//편지 삭제 로직
export async function deleteLetter(letterId: number, session: Session) {
  if (!session || !session.user) {
    return { success: false, message: "인증되지 않은 사용자입니다." };
  }
  await prisma.letter.delete({ where: { id: letterId } });
  return { success: true };
}
