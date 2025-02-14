"use client";
import { mockLetterPaperDesigns, mockLetterIconDesigns } from "../mockData";
import styles from "@/styles/mymoa.module.css";

export default function LetterItem({
  id,
  name,
  isOpened,
  paperDesignId,
  iconDesignId,
}: {
  id: number;
  name: string;
  isOpened: boolean;
  paperDesignId: number;
  iconDesignId: number;
}) {
  //편지 읽음
  //디자인 정보 불러오기
  const PaperDesign = mockLetterPaperDesigns.find(
    design => design.id === paperDesignId
  );
  const IconDesign = mockLetterIconDesigns.find(
    design => design.id === iconDesignId
  );
  //편지 오픈 핸들러
  const handleOpenLetter = id => {
    console.log(id);
    console.log(isOpened);
  };

  return (
    <div
      className={`${styles.letterItem} ${
        isOpened ? styles.opened : styles.glowing
      }`}
      onClick={() => {
        handleOpenLetter(id);
        // letter.isOpened true로 PATCH 요청 로직(route.ts에 작성하기)
      }}
    >
      {/* 편지 아이콘 */}
      <div
        className={styles.icon}
        style={{
          backgroundImage: `url(${IconDesign.imageURL})`,
        }}
      ></div>
      {/* 편지 작성한 사람 */}
      <p className={styles.authorName}>{name}</p>
    </div>
  );
}
