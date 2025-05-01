"use client";
import { Suspense } from "react";
import { useState, useCallback } from "react";
import Skeleton from "@/app/[year]/(components)/common/Skeleton";
import SpotifyWithDelay from "../../(ui)/SpotifyWithDelay";
import LetterDownloadImageBtn from "./LetterDownloadImageBtn";
import styles from "@/styles/LetterModal.module.css";
import SpotifyImgForCapture from "../../(ui)/SpotifyImgForCapture";
import { TrackInfo } from "@/types/spotify";
import { captureAndDownload } from "@/utils/downloadImage"; //이미지 다운로드 함수 utils에서 가져오기

interface Props {
  trackId?: string;
  authorName: string;
}
export default function SpotifyAndDownloadBtn({ trackId, authorName }: Props) {
  const [capturing, setCapturing] = useState(false); //캡쳐 중인지 아닌지 확인용
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);

  //실제 이미지 캡쳐 및 다운로드 함수
  const handleCaptureStart = useCallback(async () => {
    const node = document.getElementById("captureLetterArea"); //캡쳐할 영역 Id로 지정
    if (!node) return;

    //이미지 캡쳐 로직(utils에서 가져옴)
    await captureAndDownload(node, {
      fileName: `${authorName}_편지`,
      format: "png",
      //제외할 영역(className으로 지정)
      excludeSelector: [`.loadingOverlay`, `.letterDownloadBtnContainer`],
    });
    setCapturing(false);
  }, [authorName]);

  //버튼 클릭 시 실행할 함수(트랙 정보 가져오기, handleCaptureStart)
  const handleImgDownload = useCallback(async () => {
    setCapturing(true); //캡쳐 시작

    //첨부된 트랙이 없을 시
    if (!trackId) {
      handleCaptureStart();
      return;
    }

    //첨부된 트랙이 있을 시(data fetch 로직 추가)
    try {
      const res = await fetch(`/api/spotify/tracks?id=${trackId}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`트랙 정보 가져오는 중 문제 발생 ${res.status}`);
      }
      const data = await res.json();
      setTrackInfo({
        albumCover: data.album.images[0].url,
        title: data.name,
        artist: data.artists[0].name,
      });
    } catch (error) {
      console.error("트랙 정보 가져오기 실패", error);
      setCapturing(false); //캡쳐 중지
      return;
    }
  }, [trackId, handleCaptureStart]);

  return (
    <>
      {/* 스포티파이, trackId가 있을 때만 표시 */}
      {trackId && (
        <div className={styles.spotifyContainer} data-track-id={trackId}>
          {/* 캡쳐 중이고 trackId가 있을 경우 iframe대신할 이미지 영역 */}
          {capturing && trackInfo ? (
            <SpotifyImgForCapture
              //key값이 바뀔 때마다 새로 랜더링
              key={trackInfo.albumCover}
              info={trackInfo}
              onReady={handleCaptureStart}
            />
          ) : (
            // 캡쳐중이 아닐 때 표시할 iframe(기본, 미리듣기 기능 O)
            <Suspense fallback={<Skeleton width="100%" height="80px" />}>
              <SpotifyWithDelay trackId={trackId} delay={800} />
            </Suspense>
          )}
        </div>
      )}
      {/* 저장하기 버튼 */}
      <LetterDownloadImageBtn
        onClick={handleImgDownload} //트랙 정보 가져오기
        isCapturing={capturing}
      />
    </>
  );
}
