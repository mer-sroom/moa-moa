import { prisma } from "@/lib/prisma";

export async function fetchData() {
  return { message: "API Response" };
}

// user테이블에서 닉네임 조회용
export async function getUserNickname(targetId: string) {
  const targetUser = await prisma.user.findUnique({
    where: { id: targetId },
    select: { nickname: true }, // 필요한 컬럼만 선택 가능
  });

  if (!targetUser) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }
  return targetUser.nickname;
}
