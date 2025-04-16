"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "@/app/[year]/(components)/common/Button";
import downloadBtn from "@/../../public/assets/icons/download_icon.svg";
import styles from "@/styles/LetterModal.module.css";
import { useAlertContext } from "@/contexts/AlertContext";
import { captureAndDownload } from "@/utils/downloadImage";
import Loading from "@/app/[year]/(components)/loading";

export default function LetterDownloadImageBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();
  const handleDownload = async () => {
    const nodeArea = document.getElementById("captureLetterArea");
    if (!nodeArea) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐할 영역을 찾을 수 없습니다.");
      return;
    }
    setIsLoading(true);
    try {
      await captureAndDownload(nodeArea, {
        fileName: "capture",
        format: "png",
        excludeSelector: `.${styles.downloadIcon}`,
        clip: {
          x: -100,
          y: 0,
          width: nodeArea.clientWidth,
          height: nodeArea.clientHeight,
        },
      });
    } catch (error) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <Button
        label="저장하기"
        icon={
          <Image
            src={downloadBtn}
            alt="pen icon"
            className={styles.downloadIcon}
          />
        }
        size="long"
        color="black"
        onClick={handleDownload}
      />
    </>
  );
}
