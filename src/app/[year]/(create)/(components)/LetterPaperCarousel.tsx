"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import addBtn from "@/../../public/assets/icons/select_moa_add_btn.svg";
import styles from "@/styles/create-letter/CreateLetterStep3.module.css";

type paperDesigns = { id: number; name: string; imageURL: string };
interface Props {
  nowSelected: number | null; //현재 선택된 편지지(기본 값 1)
  setNowSelected: (value: number) => void;
  papers: paperDesigns[];
}

export default function LetterPaperCarousel(props: Props) {
  const { nowSelected, setNowSelected, papers } = props;

  // 이미지 추가 로직, 추후 추가 예정
  const handleAddImage = () => {};

  return (
    <>
      <div className={styles.carouselContainer}>
        <Swiper
          spaceBetween={20} // 슬라이드 간 간격
          slidesPerView="auto" // 자동으로 슬라이드 너비 조정
          // centeredSlides={true} // 슬라이드 중앙 정렬
          slidesOffsetBefore={20} // 슬라이드 첫 시작 왼쪽 여백
          pagination={{
            clickable: true,
          }}
          // 기본 스타일 오버라이드
          style={{ width: "100%", padding: "10px 0" }}
          modules={[Pagination]}
        >
          {/* /이미지 추가 카드 */}
          <SwiperSlide
            className={`${styles.card} ${styles.addCard}`}
            //이미지 직접 추가 로직
            onClick={handleAddImage}
          >
            <div className={styles.addBtnConatiner}>
              <Image src={addBtn} alt="Add new MOA" />
            </div>
          </SwiperSlide>

          {/* 각 편지지 슬라이드로 렌더링 */}
          {papers.map(paper => (
            <SwiperSlide
              key={paper.id}
              // 클릭했을 때(선택 됐을 때)
              onClick={() => {
                setNowSelected(paper.id);
              }}
              style={{
                backgroundImage: `url(${paper.imageURL})`,
              }}
              // 선택됐을 때 .selected class값 부여
              className={`${styles.card} ${
                nowSelected === paper.id ? styles.selected : ""
              }`}
            ></SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
