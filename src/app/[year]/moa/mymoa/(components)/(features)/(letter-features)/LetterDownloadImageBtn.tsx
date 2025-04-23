"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "@/app/[year]/(components)/common/Button";
import Loading from "@/app/[year]/(components)/loading";
import downloadBtn from "@/../../public/assets/icons/download_icon.svg";
import styles from "@/styles/LetterModal.module.css";
import { useAlertContext } from "@/contexts/AlertContext";
import { captureAndDownload } from "@/utils/downloadImage"; //이미지 다운로드 함수 utils에서 가져오기
import { TrackInfo } from "../../(ui)/SpotifyImgForCapture";

interface Props {
  letterSender: string; //편지 작성자 이름
  trackId?: string; //스포티파이 트랙 ID (선택적)
  onStart?: () => void; // 캡쳐 시작 시 호출되는 함수 (선택적)
  onEnd?: () => void; // 캡쳐 종료 시 호출되는 함수 (선택적)
  setTrackInfo?: (info: TrackInfo) => void; //스포티파이 트랙 정보 설정 함수 (선택적)
}

export default function LetterDownloadImageBtn(props: Props) {
  const { letterSender, trackId, onStart, onEnd, setTrackInfo } = props;
  //로딩 상태 state
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlertContext();

  //이미지 다운로드 함수
  const handleDownload = async () => {
    //캡쳐할 영역 지정(LetterModal.tsx에서 지정한 id값)
    const nodeArea = document.getElementById("captureLetterArea");
    if (!nodeArea) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐할 영역을 찾을 수 없습니다.");
      return;
    }
    onStart();
    setIsLoading(true);
    try {
      // 1) track 메타데이터 조회 (있다면)
      if (trackId) {
        const res = await fetch(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_TOKEN}`,
            },
          }
        );
        if (res.ok) {
          const d = await res.json();
          setTrackInfo({
            albumCover: d.album.images[0].url,
            title: d.name,
            artist: d.artists[0].name,
          });
        }
      }

      // 2) 캡쳐 & 다운로드
      await captureAndDownload(nodeArea, {
        fileName: `${letterSender}_편지`,
        format: "png",
        excludeArea: [
          `.${styles.letterDownloadBtnContainer}`,
          ".loadingOverlay",
        ],
        clip: {
          x: 0,
          y: nodeArea.clientHeight * 0.3,
          width: nodeArea.clientWidth * 1.1,
          height: nodeArea.clientHeight * 1.5, //버튼 영역 제외
        },
      });
    } catch (error) {
      showAlert("캡쳐 중 문제가 발생했습니다", "오류");
      console.error("캡쳐 중 오류 발생:", error);
    } finally {
      //로딩 제거
      setIsLoading(false);
      onEnd();
    }
  };
  return (
    <div className={styles.letterDownloadBtnContainer}>
      {isLoading ? (
        <Loading />
      ) : (
        <Button
          label="저장하기"
          icon={<Image src={downloadBtn} alt="다운로드" />}
          size="long"
          color="black"
          onClick={handleDownload}
        />
      )}
    </div>
  );
}
