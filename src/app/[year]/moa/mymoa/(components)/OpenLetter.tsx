//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
"use client";
import { LetterBase, Letter } from "@/types/moabox";
import { PropsWithChildren, useCallback } from "react";
import { useLetterModalContext } from "@/contexts/LetterModalContext";
import useLetterCache from "@/hooks/useLetterCache";

interface Props extends PropsWithChildren {
  letter: LetterBase;
}

export default function OpenLetter({ children, letter }: Props) {
  const { openLetterModal } = useLetterModalContext(); //편지 전용 모달
  const fetchLetterData = useLetterCache(); //GET 요청 및 캐싱

  const clickHandler = useCallback(async () => {
    try {
      let letterDetail;
      if (letter.isOpened) {
        //읽은 적 있을 때
        letterDetail = await fetchLetterData(letter.id);
      } else {
        //읽은 적 없는 편지일 때 PATCH 요청
        const patchResponse = await fetch(`/api/letter/${letter.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isOpened: true }),
        });
        if (!patchResponse.ok) {
          throw new Error("편지 읽음 여부 수정 실패");
        }
        letterDetail = await fetchLetterData(letter.id);
      }
      //편지 기본 정보와 상세 정보를 합침 (편지 모달에 전달하기 위함)
      const combinedLetter: Letter = { ...letter, ...letterDetail };
      openLetterModal(combinedLetter);
    } catch (error) {
      console.error("편지 여는 중 문제 발생", error);
    }
  }, [letter, fetchLetterData, openLetterModal]);

  return <div onClick={clickHandler}>{children}</div>;
}
