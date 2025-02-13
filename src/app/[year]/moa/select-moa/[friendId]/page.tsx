import { mockMoaBoxes } from "../../mockData"; //목업 데이터터
import SelectCarousel from "../(components)/SelectCarousel";
import { notFound } from "next/navigation";

//async 추가 -> 15부터 비동기적으로 작동
export default async function FriendSelectMoaPage({ params }) {
  //친구 id params로 받아와서 사용(필터할 때 필요)
  const { friendId } = await params;

  // friendId가 없거나 undefined면 404 처리
  if (!friendId) {
    return notFound();
  }
  //친구 모아박스 필터링
  const friendMoaBoxes = mockMoaBoxes.filter(box => box.ownerId === friendId);
  if (friendMoaBoxes.length === 0) {
    //친구가 진행 중인 모아가 없을 때 화면(일단 notFound로 처리, 나중에 교체체)
    return notFound();
  }

  return (
    <>
      {/* 모아 박스 캐러셀 컴포넌트 */}
      <SelectCarousel friendId={friendId} moaBoxes={friendMoaBoxes} />
    </>
  );
}
