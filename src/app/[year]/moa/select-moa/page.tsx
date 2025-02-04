import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import SelectCarousel from "./(components)/SelectCarousel";
//모아 박스 목업 데이터
import { mockMoaBoxes } from "./mockData";

// 현재 유저 (실제 프로젝트에서는 세션 기반으로 가져올 것)
const nowUserMock = { id: "user999", name: "멈머" };

export default async function SelectMoaPage() {
  // 세션에서 사용자 정보를 가져옴
  const session = await getServerSession();
  // 로그인 여부 확인
  if (!session?.user) {
    redirect("/auth/login");
  }
  //userId === ownerId인 모든 moaBox 필터해오기기
  const userMoaBoxes = mockMoaBoxes.filter(
    box => box.ownerId === nowUserMock.id
  );

  return (
    <>
      <div>
        <div>
          <SelectCarousel moaBoxes={userMoaBoxes} />
        </div>
      </div>
    </>
  );
}
