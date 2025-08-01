"use client";
import Button from "../../../(components)/common/Button";
import LetterPaperCarousel from "../../(components)/LetterPaperCarousel";
import { useState, useRef } from "react";
import { useAlertContext } from "@/contexts/AlertContext";
import type { createdLetter } from "@/types/createLetter";
import styles from "@/styles/create-letter/CreateLetterStep3.module.css";
import { mockLetterIconData } from "@/mock/mockLetterIcondata";

interface Props {
  letterContentRef: React.MutableRefObject<createdLetter>; //편지 정보 ref로 받음
  nextStep: () => void;
}
// 목업 데이터
const papers = [
  {
    id: 1,
    name: "blue_paper",
    imageURL: "/assets/icons/create_letter/paper/bluepaper.jpg",
  },
  {
    id: 11,
    name: "green_star",
    imageURL: "/assets/icons/create_letter/paper/green_star.jpg",
  },
  {
    id: 2,
    name: "white_paper",
    imageURL: "/assets/icons/create_letter/paper/whitepaper.jpg",
  },
  {
    id: 3,
    name: "clover",
    imageURL: "/assets/icons/create_letter/paper/clover.jpg",
  },
  {
    id: 4,
    name: "dot",
    imageURL: "/assets/icons/create_letter/paper/dot.jpg",
  },
  {
    id: 7,
    name: "paper",
    imageURL: "/assets/icons/create_letter/paper/paper.jpg",
  },
  {
    id: 8,
    name: "paper2",
    imageURL: "/assets/icons/create_letter/paper/paper2.jpg",
  },
  {
    id: 10,
    name: "tomato",
    imageURL: "/assets/icons/create_letter/paper/tomato.jpg",
  },
  {
    id: 9,
    name: "sky",
    imageURL: "/assets/icons/create_letter/paper/sky.jpg",
  },
  {
    id: 12,
    name: "universe",
    imageURL: "/assets/icons/create_letter/paper/universe.jpg",
  },
];

export default function CreateLetterStep3({
  nextStep,
  letterContentRef,
}: Props) {
  const { showAlert } = useAlertContext();
  //현재 선택된 편지지 아이디(숫자)
  const [nowSelected, setNowSelected] = useState(1);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const senderNameRef = useRef<HTMLInputElement | null>(null);
  const letterIconDesignURL = mockLetterIconData.find(
    data => data.id === letterContentRef.current.letterIconDesign
  ).imageURL; // 편지 아이콘 url

  //다음 버튼 눌렀을 때 수행될 로직
  const setData = () => {
    // useRef에 담긴 정보(편지 제목, 본문, 수신자 이름) 상태에 저장
    const newTitle = titleRef.current?.value;
    const newContent = contentRef.current?.value;
    const newSenderName = senderNameRef.current?.value;
    //제목, 본문, 수신자 값이 있는지 확인
    if (!newTitle) {
      showAlert("편지 제목을 입력해주세요", "경고");
      titleRef.current.focus();
      return;
    }
    if (!newContent) {
      showAlert("본문을 작성해주세요", "경고");
      contentRef.current.focus();
      return;
    }
    if (!newSenderName) {
      showAlert("수신자 이름을 입력해주세요", "경고");
      senderNameRef.current.focus();
      return;
    }

    // props로 받은 letterContentRef값 부분 업데이트
    Object.assign(letterContentRef.current, {
      title: newTitle, //입력한 제목
      content: newContent, //입력한 본문
      authorName: newSenderName, ///수신자
      letterPaperDesign: nowSelected, //현재 선택한 편지지
    });
    // console.log(letterContentRef);

    // 다음 단계로
    nextStep();
  };

  return (
    <>
      <div className={styles.container}>
        {/* 편지 미리보기 영역 */}
        {/* 편지지 이미지 url */}
        <section
          className={styles.letterPaper}
          aria-label="편지 미리보기"
          style={{
            backgroundImage: `url(${
              papers.find(paper => paper.id === nowSelected)?.imageURL
            })`,
          }}
        >
          {/* 아이콘 */}
          <div
            className={styles.letterIcon}
            style={{
              backgroundImage: `url(${letterIconDesignURL})`,
            }}
            aria-hidden="true"
          />
          {/* 편지 텍스트 입력 영역 */}
          <form className={styles.letterContentWrapper}>
            <label htmlFor="letterTitle" className="sr-only">
              제목
            </label>
            <input
              id="letterTitle"
              placeholder="편지 제목"
              type="text"
              ref={titleRef}
              className={`${styles.inputField} ${styles.letterTitle}`}
              maxLength={30}
            />
            <label htmlFor="letterText" className="sr-only">
              편지 내용
            </label>
            <textarea
              ref={contentRef}
              id="letterText"
              autoFocus
              placeholder="편지 내용을 입력해주세요 ... "
              required //필수
              maxLength={2000} //글자 수 제한
              className={styles.letterText}
            />
            <div className={styles.senderWrapper}>
              <label htmlFor="senderName" className={styles.senderLabel}>
                From.
              </label>
              <input
                ref={senderNameRef}
                placeholder="보낸 이"
                id="senderName"
                type="text"
                name="senderName"
                required
                className={styles.inputField}
              />
            </div>
          </form>
        </section>
        {/* 이미지 캐러셀 영역 */}
        <div className={styles.carouselWrapper}>
          <LetterPaperCarousel
            papers={papers}
            nowSelected={nowSelected}
            setNowSelected={setNowSelected}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            label="작성 완료"
            size="medium"
            color="black"
            onClick={setData}
          />
        </div>
      </div>
    </>
  );
}
