"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "../../(components)/common/Modal";
import FriendInfo from "./FriendInfo";
import friendListIcon from "@/../public/assets/icons/nav_sidebar/friend_list_icon.svg";
import NoFriendImg from "@/../public/assets/broke_cat.svg";
import styles from "@/styles/friendlist.module.css";

interface Friend {
  id: string;
  name: string;
  nickname: string;
  profileImage?: string;
  moaBoxOngoing: boolean;
}

export default function FriendListContent({ friends }: { friends: Friend[] }) {
  // Modal에 넘기는 함수
  const router = useRouter();
  const onClose = () => {
    router.back();
  };

  return (
    <>
      <Modal
        isOpen={true}
        title={
          <div className={styles.modalTitle}>
            <Image
              src={friendListIcon}
              alt="friend list icon"
              className={styles.icon}
            />
            친구 목록
          </div>
        }
        onClose={onClose}
        showActionButtons={false}
        content={
          <div className={styles.contentWrapper}>
            <ul className={styles.friendList}>
              {friends.length === 0 ? (
                <li className={styles.noFriendsMessage}>
                  {/* 임시 이미지 */}
                  <Image src={NoFriendImg} alt="no friends" width={180} />
                  <p>친구 목록이 비어있습니다</p>
                </li>
              ) : (
                friends.map(friend => (
                  <li key={friend.id}>
                    <FriendInfo
                      id={friend.id}
                      nickname={friend.nickname}
                      profileImage={friend.profileImage}
                      moaBoxOngoing={friend.moaBoxOngoing}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        }
      />
    </>
  );
}
