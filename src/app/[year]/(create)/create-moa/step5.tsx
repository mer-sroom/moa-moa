import styles from "@/styles/create-moa/createMoa.module.css";
import Button from "../../(components)/common/Button";
import Image from "next/image";
import Link from "next/link";
import mainImg from "public/assets/icons/create_moa/step5_complete_img.svg";
import boing from "public/assets/service-imgs/icons/boing_pink.svg";
import twinkle from "public/assets/service-imgs/icons/twinkle.svg";

export default function CreateMoaStep5() {
  return (
    <div className={styles.create_moa_container}>
      <div className={styles.main_img_container}>
        <div className={`${styles.img_house} ${styles.step5_img_house}`}>
          <Image src={boing} alt="boing" className={styles.step5_boing} />
          <Image src={twinkle} alt="spark" className={styles.step5_twinkle1} />
          <Image src={twinkle} alt="spark" className={styles.step5_twinkle2} />
          <Image src={mainImg} alt="step5" className={styles.page_main_img} />
        </div>
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.title}>모아 박스가 생성되었어요!</h2>
        <p className={styles.description}>
          이제 편지를 받을 수 있어요.
          <br />
          친구에게 링크를 공유해 보세요!
        </p>
      </div>
      <div className={styles.create_moa_button}>
        <Button
          label={
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              href="/2025/moa/select-moa"
            >
              메인으로
            </Link>
          }
          size="medium"
          color="black"
        />
      </div>
    </div>
  );
}
