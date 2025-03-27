import React, { PropsWithChildren, ReactElement } from "react";
import Swal from "sweetalert2";

interface Props extends PropsWithChildren {
  children: ReactElement;
  letterId: number;
}

export default function HandleDeleteLetter(props: Props) {
  const { children, letterId } = props;
  const clickHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await Swal.fire({
      text: "편지를 삭제하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ff8473",
      cancelButtonColor: "#aeaeae",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      customClass: {
        popup: "swal-popup",
      },
    });
    if (result.isDismissed) return;
    if (result.isConfirmed) {
      //편지 삭제 요청
      try {
        const res = await fetch(`/api/letter/${letterId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          await Swal.fire({
            icon: "success",
            text: "편지가 삭제되었습니다.",
          });
          location.reload();
        } else {
          await Swal.fire({
            icon: "error",
            text: "편지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.",
          });
        }
      } catch (error) {
        console.error("편지 삭제 중 문제 발생", error);
        Swal.fire({ icon: "error", text: "삭제 중 오류가 발생했습니다." });
      }
    }
  };
  //자식 컴포넌트에 onClick 핸들러 부착
  const childWithHandler = React.cloneElement(children, {
    onClick: clickHandler,
  });

  return childWithHandler;
}
