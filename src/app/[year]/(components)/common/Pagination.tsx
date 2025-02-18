"use client";
import Image from "next/image";
import React from "react";
import paginationBtn from "@/components/../../public/assets/icons/pagination_btn.svg";
import styles from "@/styles/pagination.module.css";

// Pagination 사용 시 부모 컴포넌트에서 아래의 값들을 넘기면 됩니다다
//   currentPage : 현재 페이지 설정
//   totalPages : 총 페이지 수
//   onPageChange : 버튼 눌렀을 때 실행할 함수

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;

  // 페이지가 1개이면 페이지네이션을 렌더링하지 않음.
  if (totalPages <= 1) return null;

  // 최대 5개의 점을 렌더링 (2개 이상, 5개 이하)
  const dotCount = Math.min(totalPages, 5);
  // 현재 활성화할 점의 인덱스 (0부터 시작, 나머지로 표현)
  const activeDotIndex = (currentPage - 1) % dotCount;

  return (
    <div className={styles.paginationContainer}>
      <button
        //currentPage 0 방지를 위해 max 사용
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={paginationBtn} alt="pagination button" />
      </button>
      <div className={styles.dotsContainer}>
        {/* 현재 생성된 페이지 수만큼의 span 생성, map의 두 번째 인자로로 key값 지정 */}
        {Array.from({ length: dotCount }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${
              i === activeDotIndex ? styles.active : ""
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src={paginationBtn} alt="pagination button" />
      </button>
    </div>
  );
}
