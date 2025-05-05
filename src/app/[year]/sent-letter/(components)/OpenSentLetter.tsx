//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
"use client";
import { SentLetter } from "@/types/sent-letter";
import { PropsWithChildren, useCallback } from "react";
import { useLetterModalContext } from "@/contexts/LetterModalContext";
import { useLetterCache } from "@/contexts/LetterCacheContext";

interface Props extends PropsWithChildren {
  letter: SentLetter;
}

export default function OpenSentLetter({ children, letter }: Props) {
  const { openLetterModal } = useLetterModalContext(); //편지 전용 모달
  const fetchLetterData = useLetterCache(); //GET 요청 및 캐싱

  const clickHandler = useCallback(async () => {
    //편지 디테일 정보 가져오기
    const letterDetail = await fetchLetterData(letter.id);
    //추가적으로 받아온 정보와 기존 정보 합치기
    const combinedLetter = { ...letter, ...letterDetail };
    //모달로 합친 정보 넘기기
    openLetterModal(combinedLetter);
  }, [letter, fetchLetterData, openLetterModal]);

  return <div onClick={clickHandler}>{children}</div>;
}
