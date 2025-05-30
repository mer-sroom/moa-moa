//읽은 적 있는 편지를 캐싱 & 관리하는 context
"use client";
import { createContext, useContext, useRef, ReactNode } from "react";
import { Letter } from "@/types/moabox";

//provider에서 사용할 api 정의
interface CacheAPI {
  fetchFromCache: (letterId: number) => Letter;
  saveToCache: (letterId: number, letter: Letter) => void;
}

//context 생성
const LetterCacheContext = createContext<CacheAPI | null>(null);

//Provider 컴포넌트 (최상단에서 감싸서 하나의 편지 캐시를 공유하기 위함)
export function LetterCacheProvider({ children }: { children: ReactNode }) {
  //useRef로 편지 데이터를 담아둘 객체 생성
  //key: letterId(편지 id) , value: 편지(Letter 타입)
  const letterCache = useRef<{ [key: number]: Letter }>({});

  //letterContext에서 자체적으로 제공할 API 정의
  const api: CacheAPI = {
    //letterId로 캐시된 편지 가져오기
    fetchFromCache: letterId => letterCache.current[letterId],
    //letterId와 편지를 letterCache에 저장하기
    saveToCache: (letterId, letter) => {
      letterCache.current[letterId] = letter;
    },
  };
  return (
    //자식 컴포넌트에 편지를 캐싱해둔 letterCache를 value로 전달
    <LetterCacheContext.Provider value={api}>
      {children}
    </LetterCacheContext.Provider>
  );
}
//커스텀 훅(실제로 편지를 조회하고 캐싱하는 로직)
export function useLetterCache() {
  //context에서 lettercacheContext 가져오기
  const context = useContext(LetterCacheContext);
  if (!context) {
    throw new Error("LetterCacheContext로 감싸야 합니다");
  }

  //실제로 편지 상세 데이터를 가져오고 캐싱하는 함수
  return async function fetchLetterData(letterId: number) {
    //캐시에 있으면 바로 반환
    if (context.fetchFromCache(letterId)) {
      return context.fetchFromCache(letterId);
    }
    //캐싱된 적 없다면(처음 요청이라면)
    const response = await fetch(`/api/letter/${letterId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("편지 데이터 가져오는 중 오류 발생");
    }
    const data = await response.json();
    //데이터(편지) 캐싱하기
    context.saveToCache(letterId, data);
    //반환
    return data;
  };
}
