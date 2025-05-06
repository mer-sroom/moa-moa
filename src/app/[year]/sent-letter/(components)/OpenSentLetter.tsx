//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
"use client";
import { SentLetter } from "@/types/sent-letter";
import { PropsWithChildren } from "react";
import { useLetterModalContext } from "@/contexts/LetterModalContext";

interface Props extends PropsWithChildren {
  letter: SentLetter;
}

export default function OpenSentLetter({ children, letter }: Props) {
  const { openLetterModal } = useLetterModalContext(); //편지 전용 모달

  const clickHandler = async () => {
    //편지 디테일 정보 가져오기
    const res = await fetch(`/api/letter/${letter.id}`);
    if (!res.ok) throw new Error("편지 로딩 실패");
    const letterDetail = await res.json();

    //추가적으로 받아온 정보와 기존 정보 합치기
    const combinedLetter = { ...letter, ...letterDetail };
    //모달로 합친 정보 넘기기
    openLetterModal(combinedLetter);
  };

  return <div onClick={clickHandler}>{children}</div>;
}
