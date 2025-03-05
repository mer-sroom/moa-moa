//친구 추가 로직용 컴포넌트입니다
"use client";
import { PropsWithChildren } from "react";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  targetId: string;
  currentUserId: string;
  moaBoxId: number;
}

export default function HandleAddFriend(props: Props) {
  const { children, targetId, moaBoxId, currentUserId } = props;
  const clickHandler = async () => {
    const result = await Swal.fire({
      text: `${targetId}님께 친구 요청을 보내시겠습니까?`,
      icon: "info",
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
            icon: "error",
            text: "친구 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요",
          });
        }
      } catch (error) {
        console.error("친구 요청 중 에러 발생!", error);
        Swal.fire({
          icon: "error",
          text: "친구 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
        });
      }
    }
  };

  return <div onClick={clickHandler}>{children}</div>;
}
