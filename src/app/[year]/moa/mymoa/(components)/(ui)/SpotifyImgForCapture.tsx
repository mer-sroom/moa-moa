import { TrackInfo } from "@/types/spotify";
import Image from "next/image";

interface Props {
  info: TrackInfo; //albumCover, title, artist 정보
  onReady: () => void; //이미지 로딩 완료 후 호출
}

export default function SpotifyImgForCapture({ info, onReady }: Props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          height: 64,
          // padding: "8px",
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          padding: 8,
        }}
      >
        <img
          src={info.albumCover}
          alt="album cover"
          width={64}
          height={64}
          style={{ borderRadius: 8 }}
          onLoad={onReady}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 14,
          }}
        >
          <p style={{ fontWeight: 600, margin: 0 }}>{info.title}</p>
          <p style={{ color: "#555", marginTop: 8 }}>{info.artist}</p>
        </div>
      </div>
    </>
  );
}
