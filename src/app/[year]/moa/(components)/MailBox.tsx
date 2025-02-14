"use client";
import { useState } from "react";
import LetterItem from "./LetterItem";
import { Letter } from "../mockData";
import styles from "../../../../styles/mymoa.module.css";

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
          className={styles.mailboxBackground}
          style={{
            backgroundImage: `url(${designURL})`,
          }}
        >
          {/* 그리드 영역 */}
          <div className={styles.mailBoxGrid}>
            {/* 첫번째 행(2칸) */}
            <div className={styles.firstRow}>
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
            <div className={styles.restRow}>
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
