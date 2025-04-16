"use client";
import Button from "@/app/[year]/(components)/common/Button";
import Image from "next/image";
import { useState } from "react";
import downloadIcon from "@/../../public/assets/icons/download_icon.svg";
// import loadingImg from "@/../../public/assets/loadingImg.gif";
import Loading from "@/app/[year]/(components)/loading";
import { captureAndDownload } from "@/utils/downloadImage";
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/mymoa.module.css";

export default function DownloadImageBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();
  //이미지 다운로드 로직
  const handleDownload = async () => {
    const nodeArea = document.getElementById("captureMoaBoxArea");
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
        excludeSelector: `.${styles.buttonSection}`,
        clip: {
          x: 0,
          y: 0,
          width: nodeArea.clientWidth,
          height: nodeArea.clientHeight - 200,
        },
      });
    } catch (error) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐 중 문제가 발생했습니다", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <Button
        icon={<Image src={downloadIcon} alt="share icon" />}
        size="circle"
        onClick={handleDownload}
      />
    </>
  );
}
