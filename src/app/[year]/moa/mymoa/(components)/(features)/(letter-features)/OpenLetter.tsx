//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
"use client";
import { LetterBase, Letter } from "@/types/moabox";
import { PropsWithChildren } from "react";
import { useLetterModalContext } from "@/contexts/LetterModalContext";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  letter: LetterBase;
}

export default function OpenLetter({ children, letter }: Props) {
  const { openLetterModal } = useLetterModalContext(); //편지 전용 모달
  //편지 열때 로직
  const clickHandler = async () => {
    try {
      //읽은 적 없는 편지일 때 PATCH 요청
      if (!letter.isOpened) {
        const patchRes = await fetch(`/api/letter/${letter.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOpened: true }),
        });

        //인증, 권한 에러
        if (patchRes.status === 403 || patchRes.status === 401) {
          Swal.fire({
            toast: true,
            text: "🧸 이 편지는 주인만 볼 수 있어요!",
            position: "bottom",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        //수정 중 문제가 생겼을 때
        if (!patchRes.ok) {
          console.error("편지 읽음 여부 수정 실패", patchRes.status);
          Swal.fire({
            toast: true,
            text: "편지를 여는 중 오류가 발생했습니다 😢",
            position: "bottom",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
      }
      const res = await fetch(`/api/letter/${letter.id}`, { method: "GET" });
      if (!res.ok) throw new Error("편지 로딩 실패");
      const letterDetail = await res.json();

      //편지 기본 정보와 상세 정보를 합침 (편지 모달에 전달하기 위함)
      const combinedLetter: Letter = { ...letter, ...letterDetail };
      openLetterModal(combinedLetter);
    } catch (error) {
      console.error("편지 여는 중 문제 발생", error);
    }
  };

  return <div onClick={clickHandler}>{children}</div>;
}
