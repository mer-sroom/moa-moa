//내가 작성한 편지를 조회
import { prisma } from "@/lib/prisma";

export async function getSentLetters(userId: string) {
  return prisma.letter.findMany({
    where: { authorId: userId },
    select: {
      id: true,
      authorName: true,
      title: true,
      content: true,
      createdAt: true,
      letterPaperDesign: {
        select: {
          imageURL: true,
        },
      },
      moaBox: {
        select: {
          owner: { select: { nickname: true } },
        },
      },
    },
  });
}
