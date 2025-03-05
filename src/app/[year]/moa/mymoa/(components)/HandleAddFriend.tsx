//친구 추가 로직용 컴포넌트입니다
"use client";
import { PropsWithChildren, useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  targetId: string;
  currentUserId: string;
  moaBoxId: number;
}
//친구 요청 에러 메세지
const errorMessages = {
  FRIEND_REQUEST_PENDING:
    "이미 친구 요청이 진행 중입니다. 상대방의 수락을 기다려주세요.",
  ALREADY_FRIENDS: "이미 친구로 등록되어 있습니다.",
  DEFAULT: "친구 요청 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export default function HandleAddFriend(props: Props) {
  const { children, targetId, moaBoxId, currentUserId } = props;
  const [nickname, setNickname] = useState("");
  //닉네임불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await fetch(`/api/user/${targetId}/nickname`);
        const data = await res.json();
        setNickname(data.nickname);
      } catch (error) {
        console.error("닉네임 조회 중 문제 발생!", error);
      }
    };
    fetchNickname();
  }, [targetId]);

  const clickHandler = async () => {
    if (!nickname) return;
    const result = await Swal.fire({
      text: `${nickname}님께 친구 요청을 보내시겠습니까?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff8473",
      cancelButtonColor: "#aeaeae",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        //친구 요청 전송
        const response = await fetch(`/2025/moa/mymoa/${moaBoxId}/api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentUserId,
            targetUserId: targetId,
          }),
        });
        const data = await response.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            text: "친구 요청이 전송되었습니다!",
          });
        } else {
          Swal.fire({
            icon: "warning",
            text: errorMessages[data.code],
          });
        }
      } catch (error) {
        console.error("친구 요청 중 에러 발생!", error);
        Swal.fire({
          icon: "error",
          text: errorMessages.DEFAULT,
        });
      }
    }
  };

  return <div onClick={clickHandler}>{children}</div>;
}
