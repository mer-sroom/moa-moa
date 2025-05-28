export const dynamic = "force-dynamic";
import Image from "next/image";
import paperTexture from "public/assets/moamoa_paper_texture.jpg";
import moaCatImg from "public/assets/service-imgs/404img.svg";
import "@/styles/globals.css";
import styles from "@/styles/404.module.css";
import { style } from "@mui/system";
export default function NotFound() {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${paperTexture.src})`,
      }}
    >
      <Image
        src={moaCatImg}
        priority={true}
        alt="404"
        className={styles.moaCatImg}
      />

      <div className={styles.textContainer}>
        <h3>여기는 비어 있는 공간이에요!</h3>
        <p className={styles.description}>
          페이지가 삭제되었거나 주소가 변경된 것 같아요.
          <br />
          다시 한 번 확인해 주세요.
        </p>
      </div>
    </div>
  );
}
