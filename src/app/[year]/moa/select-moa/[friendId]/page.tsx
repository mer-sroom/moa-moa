import SelectCarousel from "../(components)/SelectCarousel";
import prisma from "@/lib/prisma";
import NotFound from "@/app/[year]/(components)/not-found";
import Image from "next/image";
import NoMoaImage from "@/../public/assets/broke_cat.svg"; //임시 이미지

//async 추가 -> 15부터 비동기적으로 작동
export default async function FriendSelectMoaPage({ params }) {
  const { friendId } = await params;

  // friendId가 없거나 undefined면 Notfound
  if (!friendId) {
    return NotFound();
  }
  //친구의 MoaBox 데이터 가져오기
  const friendMoaBoxes = await prisma.moaBox.findMany({
    where: {
      ownerId: friendId,
    },
  });

  if (friendMoaBoxes.length === 0) {
    //친구가 진행 중인 모아가 없을 때 화면(일단 notFound로 처리, 나중에 교체)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "80%",
          justifyContent: "center",
          opacity: "0.5",
        }}
      >
        <Image src={NoMoaImage} alt="no moa" width={180} />
        <p>진행 중인 모아가 없습니다 ...</p>
      </div>
    );
  }

  return (
    <>
      {/* 모아 박스 캐러셀 컴포넌트 */}
      <SelectCarousel friendId={friendId} moaBoxes={friendMoaBoxes} />
    </>
  );
}
