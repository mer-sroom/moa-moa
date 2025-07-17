"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/create-letter/CreateLetterStep2.module.css";
import Button from "../../../(components)/common/Button";
import GuideModal from "@/app/[year]/(components)/common/GuideModal";
import img from "/public/assets/service-imgs/guide/create_letter.png";
import type { createdLetter } from "@/types/createLetter";
import { mockLetterIconData } from "@/mock/mockLetterIcondata"; 

// ───── 오브제 기본 이미지 경로 매핑 ─────
const objects = [
  { id: "cat", src: "/assets/icons/create_letter/letter-basic-cat.svg" },
  { id: "boing", src: "/assets/service-imgs/icons/boing.svg" },
  { id: "crotchet", src: "/assets/service-imgs/icons/crotchet.svg" },
  { id: "dot_spark", src: "/assets/service-imgs/icons/dot_spark.svg" },
  { id: "lp-record", src: "/assets/service-imgs/icons/lp-record.svg" },
  { id: "quavers", src: "/assets/service-imgs/icons/quavers.svg" },
];

// ───── 색상 정보 (none 포함) ─────
const colors = [
  { id: "none", src: "/assets/mock/color-icons/color-none.svg" },
  { id: "white", src: "/assets/mock/color-icons/color-white.svg" },
  { id: "yellow", src: "/assets/mock/color-icons/color-yellow.svg" },
  { id: "pink", src: "/assets/mock/color-icons/color-pink.svg" },
  { id: "blue", src: "/assets/mock/color-icons/color-blue.svg" },
];

type Tab = "object" | "color";

interface Props {
  letterContentRef: React.MutableRefObject<createdLetter>;
  nextStep: () => void;
}

export default function CreateLetterStep2({ letterContentRef, nextStep }: Props) {
  // 현재 탭 상태 (오브제 or 색상)
  const [tab, setTab] = useState<Tab>("object");

  // 선택된 오브제 및 색상
  const [selectedObject, setSelectedObject] = useState(objects[0]); // 기본은 고양이
  const [selectedColor, setSelectedColor] = useState(colors[0]); // 기본은 none

  // 가이드 모달 상태
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);

  // 썸네일 영역 드래그 상태 관리
  const rowRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 오브제 목업 데이터 
  const [mockLetterIcon, setMockLetterIcon] = useState(mockLetterIconData);

  const dragStart = (pageX: number) => {
    isDown.current = true;
    startX.current = pageX - (rowRef.current?.offsetLeft || 0);
    scrollLeft.current = rowRef.current?.scrollLeft || 0;
  };
  const dragMove = (pageX: number) => {
    if (!isDown.current) return;
    const x = pageX - (rowRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.2;
    if (rowRef.current) rowRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const dragEnd = () => (isDown.current = false);

  // 탭에 따라 썸네일 리스트 변경
  const currentList =
    tab === "object" ? objects.map((obj) => obj.src) : colors.map((c) => c.src);

  // 현재 선택된 썸네일 src
  const currentSelected =
    tab === "object" ? selectedObject.src : selectedColor.src;

  // 썸네일 클릭 시 처리
  const handleSelect = (value: string, idx: number) => {
    if (tab === "object") {
      setSelectedObject(objects[idx]);
    } else if (tab === "color") {
      setSelectedColor(colors[idx]);
    }
  };

  // 프리뷰 이미지 src 결정
  const previewSrc =
    selectedColor.id === "none"
      ? selectedObject.src // 색상 없음 → 기본 이미지 그대로 사용
      : `/assets/mock/objects/${selectedObject.id}-${selectedColor.id}.svg`; // 색상 있음 → 조합된 경로


  //오브제 id 매핑
  const imageURL = mockLetterIcon.find(mockLetterIcon => mockLetterIcon.imageURL === previewSrc);

  //다음 버튼 누를때 오브제 저장 
  const handleNext = () => {
    Object.assign(letterContentRef.current, {
      letterIconDesign: imageURL.id,
    });
    console.log("저장된 오브제 이미지 id: "+ imageURL.id)
    nextStep();
  };

  return (
    <div className={styles.step2_container}>
      {/* ───── 미리보기 영역 ───── */}
      <div className={styles.preview}>
        <Image
          src={previewSrc}
          alt="letter shape"
          width={250}
          height={250}
          className={styles.preview_box}
        />
      </div>

      {/* ───── 다음 단계 버튼 ───── */}
      <div className={styles.next_btn}>
        <Button
          label="완성하기"
          size="small"
          color="black"
          onClick={handleNext}
        />
      </div>

      {/* ───── 썸네일 & 탭 영역 ───── */}
      <footer className={styles.footer}>
        {/* 썸네일 리스트 (드래그 가능) */}
        <div
          ref={rowRef}
          className={styles.thumb_row}
          onMouseDown={(e) => dragStart(e.pageX)}
          onMouseMove={(e) => dragMove(e.pageX)}
          onMouseUp={dragEnd}
          onMouseLeave={dragEnd}
          onTouchStart={(e) => dragStart(e.touches[0].pageX)}
          onTouchMove={(e) => dragMove(e.touches[0].pageX)}
          onTouchEnd={dragEnd}
        >
          {currentList.map((src, i) => (
            <button
              key={`${src}-${i}`}
              className={`${styles.thumb_btn} ${
                currentSelected === src ? styles.thumb_selected : ""
              }`}
              onClick={() => handleSelect(src, i)}
            >
              <Image src={src} alt="thumb" width={64} height={64} />
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* 탭 버튼 */}
        <nav className={styles.tab_nav}>
          {[
            { label: "오브제", value: "object" },
            { label: "색상", value: "color" },
          ].map(({ label, value }) => (
            <div key={value} className={styles.tab_btn_wrap}>
              <button
                className={`${styles.tab_btn} ${
                  tab === value ? styles.active : ""
                }`}
                onClick={() => setTab(value as Tab)}
              >
                {label}
              </button>
            </div>
          ))}
        </nav>
      </footer>

      {/* 가이드 모달 */}
      <GuideModal isOpen={isOpen} img={img} onClose={onClose} />
    </div>
  );
}
