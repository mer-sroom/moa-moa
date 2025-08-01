"use client";
import { useState } from "react";
import type { createdLetter } from "@/types/createLetter";
import Button from "../../../(components)/common/Button";
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/create-letter/CreateLetterStep3.module.css";
import MusicCard from "../../(components)/MusicCard";
import { mockLetterIconData } from "@/mock/mockLetterIcondata";

interface Props {
  letterContentRef: React.MutableRefObject<createdLetter>;
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

export default function CreateLetterStep5({
  letterContentRef,
  nextStep,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(
    letterContentRef.current.trackId ? true : false
  );
  const { showAlert } = useAlertContext();
  const letterIconDesignURL = mockLetterIconData.find(
    data => data.id === letterContentRef.current.letterIconDesign
  ).imageURL; // 편지 아이콘 url
  console.log("편지 입력 데이터: ", letterContentRef.current);
  const send = async () => {
    setLoading(true);

    // 필요한 필드만 추출
    const {
      moaBoxId,
      authorName,
      title,
      content,
      trackId,
      letterPaperDesign,
      letterIconDesign,
      theme,
    } = letterContentRef.current;

    const payload = {
      moaBoxId,
      authorName,
      title,
      content,
      trackId: trackId || null,
      letterPaperDesign,
      letterIconDesign,
      theme,
    };

    try {
      const res = await fetch("/api/letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw await res.json();

      nextStep(); // 성공 → Step6
    } catch (e) {
      console.error("편지 전송 실패:", e);
      // alert("편지 전송에 실패했습니다.");
      showAlert("편지 전송에 실패했습니다", "오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          height: "70%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 0 20px 0",
          position: "relative",
          margin: "15px 0 0 0",
        }}
      >
        <section
          className={styles.letterPaper}
          aria-label="편지 최종확인"
          style={{
            backgroundImage: `url(${
              papers.find(
                paper => paper.id === letterContentRef.current.letterPaperDesign
              )?.imageURL
            })`,
            aspectRatio: `${isOpen ? "350/428" : "400/550"}`,
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
          {/* 편지 텍스트 */}
          <div
            className={styles.letterContentWrapper}
            style={{ padding: "30px 10px 10px 10px" }}
          >
            <div
              id="letterTitle"
              className={`${styles.inputField} ${styles.letterTitle}`}
              style={{ fontWeight: "500", borderBottom: "none" }}
            >
              {letterContentRef.current.title}
            </div>
            <div
              id="letterText"
              className={styles.letterText}
              style={{ fontWeight: "300" }}
            >
              {letterContentRef.current.content}
            </div>
            <div className={styles.senderWrapper}>
              <label
                htmlFor="senderName"
                className={styles.senderLabel}
                style={{ fontWeight: "600", fontSize: "var(--font-size-base)" }}
              >
                from.
              </label>
              <div
                id="senderName"
                className={styles.inputField}
                style={{
                  fontWeight: "500",
                  borderBottom: "none",
                  width: "min-content",
                  textAlign: "end",
                  whiteSpace: "nowrap",
                }}
              >
                {letterContentRef.current.authorName}
              </div>
            </div>
          </div>
        </section>
        <MusicCard isOpen={isOpen} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "7%",
        }}
      >
        <Button
          label={loading ? "전송 중…" : "편지 보내기"}
          size="medium"
          color="black"
          onClick={send}
          disabled={loading}
        />
      </div>
    </>
  );
}
