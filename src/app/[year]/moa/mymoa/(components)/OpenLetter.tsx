//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
"use client";
import { LetterBase } from "@/types/moabox";
import { PropsWithChildren, useState, useCallback } from "react";
import LetterModal from "./LetterModal";

// 읽은 적 있는 편지 캐싱
const letterCache: { [key: string]: any } = {};

interface Props extends PropsWithChildren {
  letter: LetterBase;
}

export default function OpenLetter({ children, letter }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [letterData, setLetterData] = useState(null);

  //GET 요청 및 캐싱
  const fetchLetterData = useCallback(async (letterId: number) => {
    if (letterCache[letterId]) {
      //해당 편지가 캐싱된 상태일 때
      return letterCache[letterId];
    }
    const response = await fetch(`/api/letter/${letterId}`);
    if (!response.ok) {
      throw new Error("편지 데이터 가져오는 중 오류 발생");
    }
    const data = await response.json();
    letterCache[letterId] = data;
    return data;
  }, []);

  const clickHandler = useCallback(async () => {
    try {
      let data; //임시
      if (letter.isOpened) {
        //읽은 적 있을 때
        data = await fetchLetterData(letter.id);
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
        data = await fetchLetterData(letter.id);
      }
      setLetterData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("편지 여는 중 문제 발생", error);
    }
  }, [letter, fetchLetterData]);

  return (
    <div onClick={clickHandler}>
      {children}
      {isModalOpen && letterData && <LetterModal />}
    </div>
  );
}
