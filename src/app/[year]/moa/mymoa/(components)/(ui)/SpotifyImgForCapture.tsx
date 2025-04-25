import { TrackInfo } from "@/types/spotify";
import Image from "next/image";
import MoaLogo from "@/../../public/assets/icons/nav_sidebar/nav_logo.svg";
import paper2 from "@/../../public/example2.jpg";
import styles from "@/styles/SpotifyImgForCapture.module.css";

interface Props {
  info: TrackInfo; // albumCover, title, artist 정보
  onReady: () => void; // 이미지 로딩 완료 후 호출
}

export default function SpotifyImgForCapture({ info, onReady }: Props) {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${paper2.src})` }}
    >
      <div className={styles.albumSection}>
        <img
          src={info.albumCover}
          alt="album cover"
          className={styles.albumCover}
          onLoad={onReady}
        />
        <div className={styles.textSection}>
          <p className={styles.title}>{info.title}</p>
          <p className={styles.artist}>{info.artist}</p>
        </div>
      </div>
      <div className={styles.logoSection}>
        <Image src={MoaLogo} alt="moa logo" width={32} />
      </div>
    </div>
  );
}
