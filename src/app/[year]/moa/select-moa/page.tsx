import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import SelectCarousel from "./(components)/SelectCarousel";
import { authOptions } from "@/app/api/auth/authoptions";

export default async function SelectMoaPage() {
  // 세션에서 사용자 정보를 가져옴
  const session = await getServerSession(authOptions);
  // 로그인 여부 확인
  if (!session?.user) {
    redirect("/auth/login");
  }
  //userId === ownerId고 dueDate를 넘기지 않은 모든 moaBox 필터해오기
  const userMoaBoxes = await prisma.moaBox.findMany({
    where: {
      ownerId: session.user.id,
      dueDate: { gte: new Date() },
    },
    include: {
      backgroundDesign: { select: { imageURL: true } },
      mailBoxDesign: { select: { imageURL: true } },
    },
  });

  return (
    <>
      <div>
        <SelectCarousel moaBoxes={userMoaBoxes} />
      </div>
    </>
  );
}
