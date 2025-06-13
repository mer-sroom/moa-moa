import styles from "@/styles/create-moa/createMoa.module.css";
import Image from "next/image";
import pageImg from "public/assets/icons/create_moa/step1_img.svg";
import boingImg from "public/assets/service-imgs/icons/boing.svg";
import sparkImg from "public/assets/service-imgs/icons/dot_spark.svg";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

export default function CreateMoaStep1({ nextStep }: NextStepProps) {
  return (
    <div>
      <div className={styles.step1_container}>
        <div className={styles.step1_img_container}>
          <div className={styles.step1_img_house}>
            <Image src={boingImg} alt="boing" className={styles.step1_boing} />
            <Image src={sparkImg} alt="spark" className={styles.step1_spark} />
            <Image
              src={pageImg}
              alt="step1"
              className={styles.step1_pageImg}
              priority={true}
            />
          </div>
        </div>
        <div className={styles.step1_text_container}>
          <h2 className={styles.step1_title}>마음을 모아봐요!</h2>
          <div className={styles.step1_description}>
            <p>
              나만의 우편함을 만들고 기념일을
              <br />
              설정하면 편지를 받을 수 있어요!
            </p>
          </div>
        </div>

        <div className={styles.button}>
          <Button
            label="모아 생성하기"
            size="medium"
            color="black"
            onClick={nextStep}
          />
        </div>
      </div>
    </div>
  );
}
