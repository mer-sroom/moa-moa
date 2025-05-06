//친구 추가 로직용 컴포넌트입니다
"use client";
import { PropsWithChildren, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAlertContext } from "@/contexts/AlertContext";

interface Props extends PropsWithChildren {
  targetId: string;
  moaBoxId: number;
  isAuthenticated: boolean;
}
//친구 요청 에러 메세지
const errorMessages = {
  FRIEND_REQUEST_PENDING: `친구 요청이 진행 중입니다.상대방의 수락을 기다려주세요.`,
  ALREADY_FRIENDS: "이미 친구로 등록되어 있습니다.",
  DEFAULT: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export default function HandleAddFriend(props: Props) {
  const { children, targetId, moaBoxId, isAuthenticated } = props;
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showConfirmModal, showAlert } = useAlertContext();

  //닉네임불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await fetch(`/api/user/${targetId}/nickname`);
        if (!res.ok) {
          throw new Error("닉네임 조회 실패");
        }
        const data = await res.json();
        setNickname(data.nickname);
      } catch (error) {
        console.error("닉네임 조회 중 문제 발생!", error);
      }
    };
    fetchNickname();
  }, [targetId]);

  const clickHandler = useCallback(() => {
    // 친구 요청한 사람이 로그인 되어있지 않다면
    if (!isAuthenticated) {
      showConfirmModal({
        icon: "정보",
        confirmMessage: "로그인이 필요합니다",
        message: "로그인 페이지로 이동하시겠습니까?",
        skipFollowUpAlert: true,
        onConfirm: () => {
          router.push("/auth/login");
        },
      });
      return;
    }
    if (loading) return; // 중복 요청 방지
    if (!nickname) return; //닉네임이 없다면
    showConfirmModal({
      icon: "질문",
      confirmMessage: `${nickname}님께 친구 요청을 보내시겠습니까?`,
      skipFollowUpAlert: true,
      onConfirm: async () => {
        setLoading(true);
        try {
          //친구 요청 전송
          const response = await fetch(`/2025/moa/mymoa/${moaBoxId}/api`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              targetUserId: targetId,
            }),
          });
          const data = await response.json();
          if (data.success) {
            showAlert("친구 요청이 전송되었습니다!", "성공");
            router.refresh(); //페이지 새로고침
          } else {
            console.log(data.code);
            showAlert(
              errorMessages[data.code] || errorMessages.DEFAULT,
              "경고"
            );
          }
        } catch (error) {
          console.error("친구 요청 중 에러 발생!", error);
        } finally {
          setLoading(false);
        }
      },
    });

    //   try {
    //     //친구 요청 전송
    //     const response = await fetch(`/2025/moa/mymoa/${moaBoxId}/api`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         targetUserId: targetId,
    //       }),
    //     });

    //     const data = await response.json();
    //     if (data.success) {
    //       Swal.fire({
    //         icon: "success",
    //         text: "친구 요청이 전송되었습니다!",
    //       });
    //     } else {
    //       console.log(data.code);
    //       Swal.fire({
    //         icon: "warning",
    //         text: errorMessages[data.code], //errir nessages에서 에러문구 출력
    //       });
    //     }
    //   } catch (error) {
    //     console.error("친구 요청 중 에러 발생!", error);
    //     Swal.fire({
    //       icon: "warning",
    //       text: errorMessages.DEFAULT,
    //     });
    //   }
  }, [
    nickname,
    moaBoxId,
    targetId,
    loading,
    isAuthenticated,
    router,
    showAlert,
    showConfirmModal,
  ]);

  return <div onClick={clickHandler}>{children}</div>;
}
