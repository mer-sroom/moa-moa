"use client";
import { useRouter } from "next/navigation";
import Modal from "../../(components)/common/Modal";

interface Friend {
  id: string;
  name: string;
  nickname: string;
  profileImage: string;
}

export default function FriendListContent({ friends }: { friends: Friend[] }) {
  //Modal에 넘기는 함수
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  console.log(friends);

  return (
    <>
      <h1>hi</h1>
      <Modal
        isOpen={true}
        title="친구 목록"
        onClose={onClose}
        showActionButtons={false}
        content={
          <div style={{ marginTop: "30px" }}>
            <ul>
              {/* {myFriends.map(friend => (
          <li>{friend.id}</li>
        ))} */}
            </ul>
          </div>
        }
      />
    </>
  );
}
