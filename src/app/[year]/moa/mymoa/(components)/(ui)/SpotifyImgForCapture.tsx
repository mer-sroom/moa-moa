import { TrackInfo } from "@/types/spotify";

interface Props {
  info: TrackInfo; //albumCover, title, artist 정보
  onReady?: () => void; //이미지 로딩 완료 후 호출
}

export default function SpotifyImgForCapture({ info, onReady }: Props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: 80,
          // padding: "8px",
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
        }}
      >
        <img
          src={info.albumCover}
          alt="album cover"
          style={{ width: 64, height: 64, borderRadius: 8 }}
          onLoad={onReady}
        />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 14 }}>
          <span style={{ fontWeight: 600 }}>{info.title}</span>
          <span style={{ color: "#555" }}>{info.artist}</span>
        </div>
      </div>
    </>
  );
}
