"use client";
import Button from "@/app/[year]/(components)/common/Button";
import Image from "next/image";
import downloadIcon from "@/../../public/assets/icons/download_icon.svg";
import { captureAndDownload } from "@/utils/downloadImage";
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/mymoa.module.css";

export default function DownloadImageBtn() {
  const { showAlert } = useAlertContext();
  const handleDownload = async () => {
    const nodeArea = document.getElementById("captureArea");
    if (!nodeArea) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐할 영역을 찾을 수 없습니다.");
      return;
    }
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
  };
  return (
    <>
      <Button
        icon={<Image src={downloadIcon} alt="share icon" />}
        size="circle"
        onClick={handleDownload}
      ></Button>
    </>
  );
}
