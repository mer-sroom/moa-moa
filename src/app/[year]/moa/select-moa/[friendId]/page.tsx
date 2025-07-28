import SelectCarousel from "../(components)/SelectCarousel";
import prisma from "@/lib/prisma";
import NotFound from "@/app/not-found";
import Image from "next/image";
import NoMoaImage from "@/../public/assets/service-imgs/error_img.svg";
import styles from "@/styles/selectMoa.module.css";

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
      dueDate: { gte: new Date() },
    },
    include: {
      backgroundDesign: { select: { imageURL: true } },
      mailBoxDesign: { select: { imageURL: true } },
      decorationDesign: { select: { imageURL: true } },
    },
  });

  if (friendMoaBoxes.length === 0) {
    return (
      <div className={styles.noMoaBoxContainer}>
        <Image src={NoMoaImage} alt="no moa" width={320} priority={true} />
        <p>진행 중인 모아 박스가 없습니다 ...</p>
      </div>
    );
  }
  <SelectCarousel
    friendId={friendId}
    moaBoxes={friendMoaBoxes.map(box => ({
      ...box,
      backgroundDesign: box.backgroundDesign || null,
      mailBoxDesign: box.mailBoxDesign || null,
      decorationDesign: box.decorationDesign || null,
    }))}
  />;
  return (
    <>
      {/* 모아 박스 캐러셀 컴포넌트 */}
      <SelectCarousel friendId={friendId} moaBoxes={friendMoaBoxes} />
    </>
  );
}
