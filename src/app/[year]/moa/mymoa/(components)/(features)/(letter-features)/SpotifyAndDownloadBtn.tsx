"use client";
import { Suspense } from "react";
import { useState } from "react";
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
export default function SpotifyAndDownloadBtn(props: Props) {
  const { trackId, authorName } = props;
  const [capturing, setCapturing] = useState(false);
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null);

  const handleCaptureStart = async () => {
    if (!trackId) return setCapturing(true);
    setCapturing(true);
    const res = await fetch(`/api/spotify/tracks?id=${trackId}`, {
      method: "GET",
      cache: "no-store",
    });
    if (res.ok) {
      const trackData = await res.json();
      setTrackInfo({
        albumCover: trackData.album.images[0].url,
        title: trackData.name,
        artist: trackData.artists[0].name,
      });
    }
  };

  const handleCaptureReady = async () => {
    const node = document.getElementById("captureLetterArea");
    if (!node) return;
    await captureAndDownload(node, {
      fileName: `${authorName}_편지`,
      format: "png",
      excludeArea: [`.loadingOverlay`, `.${styles.letterDownloadBtnContainer}`],
      clip: {
        x: 0,
        y: 0,
        width: node.clientWidth * 1.2,
        height: node.clientHeight * 1.3,
      },
    });
    setCapturing(false);
  };

  return (
    <>
      {/* 스포티파이 */}
      {trackId && (
        <div className={styles.spotifyContainer} data-track-id={trackId}>
          {capturing && trackInfo ? (
            <SpotifyImgForCapture
              info={trackInfo}
              onReady={handleCaptureReady}
            />
          ) : (
            <Suspense fallback={<Skeleton width="100%" height="80px" />}>
              <SpotifyWithDelay trackId={trackId} delay={800} />
            </Suspense>
          )}
        </div>
      )}
      {/* 저장하기 버튼 */}
      <LetterDownloadImageBtn
        onClick={handleCaptureStart}
        isCapturing={capturing}
      />
    </>
  );
}
