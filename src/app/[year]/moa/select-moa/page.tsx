import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import SelectCarousel from "./(components)/SelectCarousel";
//모아 박스, 현재 유저 아이디 정보 목업 데이터로 받아오는 중!
import { mockUser, mockMoaBoxes } from "../mockData";

export default async function SelectMoaPage() {
  // 세션에서 사용자 정보를 가져옴
  const session = await getServerSession();
  // 로그인 여부 확인
  if (!session?.user) {
    redirect("/auth/login");
  }
  //userId === ownerId인 모든 moaBox 필터해오기기
  const userMoaBoxes = mockMoaBoxes.filter(box => box.ownerId === mockUser.id);

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
