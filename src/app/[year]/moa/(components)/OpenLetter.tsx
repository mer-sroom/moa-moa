//편지 관련 로직(모달 오픈,PATCH 요청)을 처리하는 클라이언트 컴포넌트 입니다
//LetterItem을 서버 컴포넌트로 유지하기 위해 사용됩니다
"use client";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  id: number;
  isOpened: boolean;
}

export default function OpenLetter(props: Props) {
  const { children, id, isOpened } = props;
  const clickHandler = () => {
    console.log(id);
    console.log(isOpened);
    //편지 모달 오픈
    //편지 ipOpened 값 true로 PATCH 요청청
  };

  return <div onClick={clickHandler}>{children}</div>;
}
