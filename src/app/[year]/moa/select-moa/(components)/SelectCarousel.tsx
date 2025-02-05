"use client";

import { SelectCarouselProps } from "../mockData";
import { useRouter } from "next/navigation";
import Image from "next/image";
import add_btn from "../../../../../../public/assets/icons/select_moa_add_btn.svg";
import Button from "@/app/[year]/(components)/common/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export default function SelectCarousel({
  friendId,
  moaBoxes,
}: SelectCarouselProps) {
  const router = useRouter(); // Next.js 라우터 훅을 사용해 페이지 이동 처리

  return (
    <>
      <div style={{ paddingTop: "56px" }}>
        <Swiper
          spaceBetween={28} // 슬라이드 간 간격
          slidesPerView="auto" // 자동으로 슬라이드 너비 조정
          centeredSlides={true} // 슬라이드 중앙 정렬
          pagination={{
            clickable: true, // 페이지네이션 클릭 가능
          }}
          style={{ width: "100%", padding: "10px 0" }}
          modules={[Pagination]} // 페이지네이션 모듈 사용
        >
          {/* create-moa 이동 카드 (친구 select-moa에서 표시되지 않음) */}
          {!friendId && (
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                width: "320px",
                height: "450px",
                marginRight: "10px",
                borderRadius: "20px",
                cursor: "pointer", // 클릭 가능한 스타일 적용
                boxShadow: "0px 4.4px 4.4px 0px rgba(0, 0, 0, 0.25)", // 그림자 효과
              }}
              onClick={() => router.push("/2025/create-moa")} // 클릭 시 create-moa 페이지로 이동
            >
              <Image src={add_btn} alt="select_moa_add_btn" />
            </SwiperSlide>
          )}

          {/* moaBoxes 리스트를 슬라이드로 렌더링 */}
          {moaBoxes.map(moaBox => (
            <SwiperSlide
              key={moaBox.id} // 각 슬라이드의 고유 키
              onClick={() => router.push(`/2025/moa/friendmoa/${moaBox.id}`)} // 클릭 시 해당 moaBox 페이지로 이동
              style={{
                backgroundColor: "var(--color-gray-200)", // 배경색
                width: "320px", // 슬라이드 너비
                height: "450px", // 슬라이드 높이
                borderRadius: "20px", // 모서리 둥글게
                boxShadow: "0px 4.4px 4.4px 0px rgba(0, 0, 0, 0.25)", // 그림자 효과
                cursor: "pointer", // 클릭 가능한 스타일 적용
              }}
            >
              {/* 임시 데이터 표시: 나중에 모아박스 이미지로 교체 예정 */}
              {moaBox.ownerId}
              <br />
              {moaBox.id}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* "선택하기" 버튼 감싸는 div */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "86px", // 버튼 위쪽 여백
        }}
      >
        <Button label={"선택하기"} size={"medium"} color={"black"} />{" "}
        {/* 버튼 컴포넌트 */}
      </div>
    </>
  );
}
