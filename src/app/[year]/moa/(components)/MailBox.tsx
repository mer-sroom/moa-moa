"use client";
import Image from "next/image";
import LetterItem from "./LetterItem";
import { Letter } from "../mockData";
import mockMailBox from "../../../../../public/assets/mailbox1.svg";
import styles from "../../../../styles/mymoa.module.css";
import { useState } from "react";

export default function MailBox({
  moaBoxId,
  designURL,
  letters,
}: {
  moaBoxId: number;
  designURL: string;
  letters: Letter[];
}) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지(slice 영역)
  const totalPages = Math.ceil(letters.length / itemsPerPage); //페이지 수
  //현재 페이지 아이템 추출
  const startIndex = (currentPage - 1) * itemsPerPage; //아이템 8개씩 넘어감
  const currentItems = letters.slice(startIndex, startIndex + itemsPerPage); //보여줄 영역 slice
  //첫 번째 줄(2칸) 아이템
  const firstRow = currentItems.slice(0, 2);
  const restRow = currentItems.slice(2); //2,3번째 칸 아이템

  return (
    <>
      <div>
        {/* 우편함 배경 */}
        <div
          style={{
            position: "relative",
            width: "420px",
            height: "490px",
            // backgroundColor: "rgb(0,0,330,0.15)",
            backgroundImage: `url(${designURL})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* 그리드 영역 */}
          <div
            className={styles.mailBoxGrid}
            style={{
              position: "absolute",
              top: "90px",
              left: "90px",
              padding: "10px",
              backgroundColor: "rgb(255,255,255,0.7)",
              width: "240px",
              height: "280px",
            }}
          >
            {/* 첫번째 행(2칸) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 64px)",
                gap: "4px",
                gridAutoRows: "80px",
                justifyContent: "center",
              }}
            >
              {firstRow.map(letter => (
                <LetterItem
                  key={letter.id}
                  id={letter.id}
                  name={letter.authorName}
                  isOpened={letter.isOpened}
                  paperDesignId={letter.letterPaperDesignId}
                  iconDesignId={letter.letterIconDesignId}
                />
              ))}
            </div>
            {/* 두번째 & 세번째 행을 합친 그리드: 3칸 x 2행 */}
            <div
              style={{
                marginTop: "6px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4px",
                // 남은 그리드 영역 높이: 전체 높이 280px에서 첫번째 행 80px을 제외
                // height: "200px",
                gridAutoRows: "80px", // 각 행의 높이
              }}
            >
              {restRow.map(letter => (
                <LetterItem
                  key={letter.id}
                  id={letter.id}
                  isOpened={letter.isOpened}
                  name={letter.authorName}
                  paperDesignId={letter.letterPaperDesignId}
                  iconDesignId={letter.letterIconDesignId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
