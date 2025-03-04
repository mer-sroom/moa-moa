//친구 추가 로직용 컴포넌트입니다
"use client";
import { PropsWithChildren } from "react";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  ownerId: string;
}

export default function HandleAddFriend(props: Props) {
  const { children, ownerId } = props;
  const clickHandler = () => {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
    });
    //친구 추가 요청 넣는 api 끌어오기
  };

  return <div onClick={clickHandler}>{children}</div>;
}
