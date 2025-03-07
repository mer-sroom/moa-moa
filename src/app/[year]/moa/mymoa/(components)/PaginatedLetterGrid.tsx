"use client";
import { useState, useMemo } from "react";
import LetterGrid from "./LetterGrid";
import Pagination from "@/app/[year]/(components)/common/Pagination";
import { LetterBase } from "@/types/moabox";

interface PaginatedLetterGridProps {
  letters: LetterBase[];
  itemsPerPage: number;
}

export default function PaginatedLetterGrid(props: PaginatedLetterGridProps) {
  const { letters, itemsPerPage } = props;
  //현재 페이지 설정
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(letters.length / itemsPerPage); //총 페이지 수

  // 현재 페이지에 보여줄 아이템 계산
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage; //시작 인덱스 설정
    //시작 인덱스 : 시작 인덱스 + 한 페이지 당 보여주는 아이템 수
    return letters.slice(startIndex, startIndex + itemsPerPage);
  }, [letters, currentPage, itemsPerPage]);

  return (
    <>
      {/* //편지가 펼쳐지는 컴포넌트 */}
      <LetterGrid letters={currentItems} />
      {totalPages > 1 && ( //페이지 넘기는 버튼, 아이템 수가 1페이지를 넘어갈 때만 표시
        <div style={{ position: "absolute", bottom: "72px", left: "40%" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
