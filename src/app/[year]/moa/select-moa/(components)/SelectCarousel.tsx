"use client";

//Swiper 라이브러리 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import addBtn from "../../../../../../public/assets/icons/select_moa_add_btn.svg";
import deleteBtn from "../../../../../../public/assets/icons/trash_can_icon.svg";
import Button from "@/app/[year]/(components)/common/Button";
import styles from "../../../../../styles/selectMoa.module.css";
import { MoaBox } from "@/types/moabox"; //props 타입

export interface SelectCarouselProps {
  friendId?: string;
  moaBoxes: MoaBox[];
}

export default function SelectCarousel({
  friendId,
  moaBoxes,
}: SelectCarouselProps) {
  const router = useRouter();
  const [nowSelected, setNowSelected] = useState<number | null>(null);
  const containerRef = useRef(null); // 컨테이너를 참조하기 위한 ref

  // 선택된 moaBox 페이지로 이동 함수
  const handleRoute = () => {
    if (nowSelected != null && friendId) {
      router.push(`/2025/moa/friendmoa/${nowSelected}`);
    } else if (nowSelected != null && !friendId) {
      router.push(`/2025/moa/mymoa/${nowSelected}`);
    }
  };

  //특정 moaBox 삭제하는 함수(id : moaBox id)
  const handleMoaBoxDelete = (id: number) => {
    console.log(id);
  };

  // 클릭 이벤트 리스너 추가 (컴포넌트 외부 클릭 시 선택 해제)
  useEffect(() => {
    const handleClickOutside = event => {
      if (!containerRef.current.contains(event.target)) {
        setNowSelected(null);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 언마운트될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className={styles.carouselContainer}>
        <Swiper
          spaceBetween={28} // 슬라이드 간 간격
          slidesPerView="auto" // 자동으로 슬라이드 너비 조정
          centeredSlides={true} // 슬라이드 중앙 정렬
          pagination={{
            clickable: true,
          }}
          style={{ width: "100%", padding: "10px 0" }}
          modules={[Pagination]}
        >
          {/* create-moa 이동 카드 (친구 select-moa에선선 표시되지 않음) */}
          {!friendId && (
            <SwiperSlide
              className={`${styles.card} ${styles.addCard}`}
              onClick={() => router.push("/2025/create-moa")} // 클릭 시 create-moa 페이지로 이동
            >
              <div className={styles.addBtnConatiner}>
                <Image src={addBtn} alt="Add new MOA" />
              </div>
            </SwiperSlide>
          )}

          {/* moaBoxes 리스트 슬라이드로 렌더링 */}
          {moaBoxes.map(moaBox => (
            <SwiperSlide
              key={moaBox.id}
              onClick={() => {
                setNowSelected(moaBox.id);
              }}
              className={`${styles.card} ${styles.moaCard} ${
                nowSelected === moaBox.id ? styles.selected : ""
              }`}
            >
              {/* 삭제 버튼 */}
              {!friendId && (
                <div className={styles.deleteBtnContainer}>
                  <Image
                    src={deleteBtn}
                    onClick={() => handleMoaBoxDelete(moaBox.id)}
                    alt="select_moa_delete_btn"
                  />
                </div>
              )}
              {/* 임시 데이터 표시: 나중에 모아박스 이미지로 교체 예정 */}
              <div className={styles.moaBoxContainer}>
                {moaBox.ownerId}
                <br />
                moaBox Id:{moaBox.id}
                <br />
                title: {moaBox.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 버튼 컴포넌트 컨테이너 */}
      <div className={styles.buttonContainer}>
        <Button
          label={"선택하기"}
          size={"medium"}
          color={"black"}
          onClick={handleRoute}
        />
      </div>
    </div>
  );
}
