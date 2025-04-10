"use client";
import { useState, useEffect } from "react";
import Skeleton from "@/app/[year]/(components)/common/Skeleton";

interface SpotifyWithDelayProps {
  trackId: string;
  delay?: number; // delay in ms, 기본값 500ms
}

export default function SpotifyWithDelay({
  trackId,
  delay = 500,
}: SpotifyWithDelayProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  // 최소 delay timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleLoad = () => {
    setIframeLoaded(true);
  };

  // iframe이 로드되었고, 최소 delay가 지난 경우에만 보여줌
  const showEmbed = iframeLoaded && minDelayPassed;

  return (
    <div style={{ position: "relative", width: "100%", height: "80px" }}>
      {!showEmbed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Skeleton width="100%" height="80px" />
        </div>
      )}
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        onLoad={handleLoad}
        style={{
          borderRadius: "16px",
          opacity: showEmbed ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      ></iframe>
    </div>
  );
}
