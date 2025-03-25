//친구 추가 로직용 컴포넌트입니다
"use client";
import { PropsWithChildren, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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

  const clickHandler = useCallback(async () => {
    // 친구 요청한 사람이 로그인 되어있지 않다면
    if (!isAuthenticated) {
      await Swal.fire({
        icon: "warning",
        text: "로그인이 필요합니다. 로그인 페이지로 이동합니다.",
      });
      router.push("/auth/login");
      return;
    }
    if (loading) return; // 중복 요청 방지
    if (!nickname) return; //닉네임이 없다면
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
          Swal.fire({
            icon: "success",
            text: "친구 요청이 전송되었습니다!",
          });
        } else {
          console.log(data.code);
          Swal.fire({
            icon: "warning",
            text: errorMessages[data.code], //errir nessages에서 에러문구 출력
          });
        }
      } catch (error) {
        console.error("친구 요청 중 에러 발생!", error);
        Swal.fire({
          icon: "warning",
          text: errorMessages.DEFAULT,
        });
      } finally {
        setLoading(false);
      }
    }
  }, [nickname, moaBoxId, targetId, loading, isAuthenticated, router]);

  return <div onClick={clickHandler}>{children}</div>;
}
