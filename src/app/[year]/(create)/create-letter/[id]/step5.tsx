"use client";
import { useState } from "react";
import type { createdLetter } from "@/types/createLetter";
import Button from "../../../(components)/common/Button";

interface Props {
  letterContentRef: React.MutableRefObject<createdLetter>;
  nextStep: () => void;
}

export default function CreateLetterStep5({
  letterContentRef,
  nextStep,
}: Props) {
  const [loading, setLoading] = useState(false);

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
      alert("편지 전송에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>최종 편지지 확인하는 자리</div>
      <Button
        label={loading ? "전송 중…" : "편지 보내기"}
        size="medium"
        color="black"
        onClick={send}
        disabled={loading}
      />
    </>
  );
}
