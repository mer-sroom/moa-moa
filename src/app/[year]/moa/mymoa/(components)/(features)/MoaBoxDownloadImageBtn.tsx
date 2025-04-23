"use client";
import Button from "@/app/[year]/(components)/common/Button";
import Image from "next/image";
import { useState } from "react";
import downloadIcon from "@/../../public/assets/icons/download_icon.svg";
import Loading from "@/app/[year]/(components)/loading";
import { captureAndDownload } from "@/utils/downloadImage"; //이미지 다운로드 함수 utils에서 가져오기
import { useAlertContext } from "@/contexts/AlertContext";
import styles from "@/styles/mymoa.module.css";

export default function MoaBoxDownloadImageBtn({
  moaBoxTitle,
}: {
  moaBoxTitle: string;
}) {
  //로딩 제어 state
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();

  //이미지 다운로드 로직
  const handleDownload = async () => {
    //캡쳐할 영역 지정(page.tsx에서 id로 지정해둠)
    const nodeArea = document.getElementById("captureMoaBoxArea");
    if (!nodeArea) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐할 영역을 찾을 수 없습니다.");
      return;
    }
    setIsLoading(true);
    try {
      //캡쳐 시도
      await captureAndDownload(nodeArea, {
        fileName: `${moaBoxTitle}_캡쳐`,
        format: "png",
        //버튼 영역 캡쳐 대상에서 제외
        excludeArea: `.${styles.buttonSection}`,
        //영역 크롭
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
      {/* 로딩 중 보여줄 컴포넌트 */}
      {isLoading && <Loading />}
      <Button
        icon={<Image src={downloadIcon} alt="share icon" />}
        size="circle"
        color="white"
        onClick={handleDownload}
      />
    </>
  );
}
