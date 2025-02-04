import { mockMoaBoxes } from "../mockData";
import SelectCarousel from "../(components)/SelectCarousel";
import { notFound } from "next/navigation";

//async 제거 -> Next에서는 params가 동기적으로 전달됨
export default function FriendSelectMoaPage({ params }) {
  //친구 id를 params로 받아와서 사용(필터할 때 필요)
  const { friendId } = params;

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
      <SelectCarousel friendId={friendId} moaBoxes={friendMoaBoxes} />
    </>
  );
}
