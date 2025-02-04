"use client";

import { SelectCarouselProps } from "../mockData";
import Image from "next/image";
import add_btn from "../../../../../../public/assets/icons/select_moa_add_btn.svg";
import Button from "@/app/[year]/(components)/common/Button";

export default function SelectCarousel({
  friendId,
  moaBoxes,
}: SelectCarouselProps) {
  return (
    <>
      <div style={{ paddingTop: "56px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", minWidth: "max-content" }}>
            {/* 본인 거냐, 친구 거냐에 따라 추가하기 카드 */}
            {!friendId && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "lightgreen",
                  width: "320px",
                  height: "450px",
                  marginRight: "10px",
                  borderRadius: "20px",
                  boxShadow: "0px 4.4px 4.4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <Image src={add_btn} alt="select_moa_add_btn" />
              </div>
            )}
            {/* moaBoxes나열 */}
            {moaBoxes.map(moaBox => (
              <div
                key={moaBox.id}
                style={{
                  backgroundColor: "skyblue",
                  width: "320px",
                  height: "450px",
                  marginRight: "10px",
                  borderRadius: "20px",
                  boxShadow: "0px 4.4px 4.4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {moaBox.ownerId}
                <br />
                {moaBox.id}
              </div>
            ))}
          </div>
        </div>
        {/* 버튼 감싸는 div */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "86px",
          }}
        >
          <Button label={"선택하기"} size={"medium"} color={"black"} />
        </div>
      </div>
    </>
  );
}
