//읽은 적 있는 편지 캐싱 훅
"use client";
import { useRef } from "react";
import type { Letter } from "@/types/moabox";

export default function useLetterCache() {
  const letterCache = useRef<{ [key: number]: Letter }>({});

  const fetchLetterData = async (letterId: number) => {
    //캐싱된 적 있는지 확인, 있다면 반환
    if (letterCache.current[letterId]) {
      return letterCache.current[letterId];
    }
    //캐싱된 적 없다면(처음 요청이라면)
    const response = await fetch(`/api/letter/${letterId}`);
    if (!response.ok) {
      throw {
        message: "편지 데이터 가져오는 중 오류 발생",
        status: response.status,
      };
    }
    const data = await response.json();
    //캐싱하기
    letterCache.current[letterId] = data;
    return data;
  };

  return fetchLetterData;
}
