"use client";

import { useState } from "react";
import Modal from "../(components)/common/Modal";
import Link from "next/link";
import Image from "next/image";
import moa_cat from "../../../../public/assets/icons/notification/notification_moa_cat.svg";
import accept_btn from "../../../../public/assets/icons/notification/notification_yes_btn.svg";
import reject_btn from "../../../../public/assets/icons/notification/notification_no_btn.svg";
//user profileImage 목업용 이미지입니다! 나중에 삭제해주시면 됩니당
import mock_profile_img from "../../../../public/assets/icons/notification/mock_user_profile.jpg";

//user 정보 받아오는 용도
const mockUsers = [
  {
    id: "user123",
    nickname: "서머",
    profileImage: { mock_profile_img },
  },
  {
    id: "user456",
    nickname: "현머",
    profileImage: { mock_profile_img },
  },
  {
    id: "user112",
    nickname: "미머",
    profileImage: { mock_profile_img },
  },
  {
    id: "user223",
    nickname: "멈멈머머머머머머머",
    profileImage: { mock_profile_img },
  },
];
//userId로 nickname, profileImage 받아오는 용도
const getUserInfo = userId => {
  const user = mockUsers.find(user => user.id === userId);
  //해당하는 유저가 있다면
  return user
    ? { profileImage: user.profileImage, nickname: user.nickname }
    : //해당하는 유저가 없다면
      { profileImage: "", nickname: "Unknown" };
};
//notification 목업 데이터
const mockNotifications = [
  //내 소식 알림
  {
    id: 1,
    userId: "user123",
    type: "INVITE_GROUP_MOA",
    message: "님이 새로운 그룹 모아에 초대했습니다.",
    payload: "",
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: "user456",
    type: "FRIEND_REQUEST",
    message: "님이 친구 요청을 보냈습니다.",
    payload: "",
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 21,
    userId: "user112",
    type: "FRIEND_REQUEST",
    message: "님이 친구 요청을 보냈습니다.",
    payload: "",
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 221,
    userId: "user223",
    type: "FRIEND_REQUEST",
    message: "님이 친구 요청을 보냈습니다.",
    payload: "",
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  //모아 소식 알림림
  {
    id: 3,
    userId: "서머",
    type: "LETTER_RECEIVED",
    message: "우와! 편지 한 통을 받으셨어요!",
    payload: "",
    read: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 11,
    userId: "",
    type: "FROM_MOA",
    message: "회원 가입을 축하드려요! 모아모아와 함께 추억을 모아봐요",
    payload: "",
    read: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
//FROM_MOA/LETTER_RECEIVED 알림 읽음 처리 로직
// useEffect(() => {}, []);

//Notification type에 따라 분류
//내 소식 저장
const myNotifications = mockNotifications.filter(
  notification =>
    notification.type === "INVITE_GROUP_MOA" ||
    notification.type === "FRIEND_REQUEST"
);
//모아 소식 저장
const moaNotifications = mockNotifications.filter(
  notification =>
    notification.type === "LETTER_RECEIVED" || notification.type === "FROM_MOA"
);

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="알림함"
        onClose={onClose}
        showActionButtons={false}
        content={
          <div style={{ marginTop: "32px" }}>
            {/* 내 소식 알림함  */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-gray-300)",
                  margin: "0",
                  paddingBottom: "16px",
                }}
              >
                내 소식
              </p>
              <div
                style={{
                  overflowY: "scroll",
                  maxHeight: "200px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent",
                }}
              >
                {/* 위에 분류한 값 펼침*/}
                {myNotifications.map(notification => {
                  // userId를 통해 user의 profileImg, nickname 받아오기
                  const userInfo = getUserInfo(notification.userId);
                  return (
                    <div
                      key={notification.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                        alignItems: "start",
                      }}
                    >
                      {/*유저 프로필 */}
                      <Link href={`/friendmoa/${notification.userId}`}>
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "60px",
                            backgroundColor: "#f0f0f0",
                            backgroundImage: `${userInfo.profileImage}`,
                            backgroundSize: "cover",
                            cursor: "pointer",
                            backgroundPosition: "center",
                          }}
                        />
                      </Link>
                      {/* 유저 닉네임, 알림 메시지 */}
                      <p
                        style={{
                          width: "200px",
                          margin: "0",
                        }}
                      >
                        <strong>{userInfo.nickname}</strong>{" "}
                        {notification.message}
                      </p>
                      {/* 수락/거절 버튼 */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "var(--color-black)",
                            border: "none",
                            borderRadius: "60px",
                            padding: "9px 8px 6px 8px",
                          }}
                        >
                          <img src={accept_btn.src} alt="accept" />
                        </button>
                        <button
                          style={{
                            backgroundColor: "var(--color-gray-500)",
                            border: "none",
                            borderRadius: "60px",
                            padding: "10px 9px 6px 9px",
                          }}
                        >
                          <img src={reject_btn.src} alt="reject" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* 모아 소식 알림함 */}
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--color-gray-300)",
                  margin: "0",
                  paddingBottom: "16px",
                }}
              >
                모아 소식
              </p>
              <div
                style={{
                  overflowY: "scroll",
                  maxHeight: "200px",
                  scrollbarWidth: "thin",

                  scrollbarColor: "transparent transparent",
                }}
              >
                {/* 위에 분류한 값 펼침 */}
                {moaNotifications.map(notification => (
                  <div
                    key={notification.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: " 16px",
                      // backgroundColor: "#f0f0f0",
                    }}
                  >
                    {/* 모아 소식 알림 이미지 */}
                    <Image src={moa_cat} alt="moa-cat" />
                    {/* 알림 메시지 */}
                    <p
                      key={notification.id}
                      style={{ margin: "0 0 0 24px", width: "90%" }}
                    >
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
      <div>
        모달창 테스트용 버튼
        <button onClick={() => setIsModalOpen(!isModalOpen)}>
          모달창 열기
        </button>
      </div>
    </>
  );
}
