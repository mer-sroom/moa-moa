import styles from "@/styles/create-moa/createMoa.module.css";
import Image from "next/image";
import pageImg from "public/assets/icons/create_moa/step1_img.svg";
import boingImg from "public/assets/service-imgs/icons/boing.svg";
import sparkImg from "public/assets/service-imgs/icons/dot_spark.svg";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

export default function CreateMoaStep1({ nextStep }: NextStepProps) {
  return (
    <>
      <div className={styles.create_moa_container}>
        <div className={styles.main_img_container}>
          <div className={`${styles.img_house} ${styles.step1_img_house}`}>
            <Image src={boingImg} alt="boing" className={styles.step1_boing} />
            <Image src={sparkImg} alt="spark" className={styles.step1_spark} />
            <Image
              src={pageImg}
              alt="step1"
              className={styles.page_main_img}
              priority={true}
            />
          </div>
        </div>
        <div className={styles.text_container}>
          <h2 className={styles.title}>특별한 날, 나만의 모아박스</h2>
          <p className={styles.description}>
            나만의 감성으로 우편함을 꾸며보세요.
            <br />
            기념일을 기록하고, 소중한 마음을 편지로 받아보세요.
          </p>
        </div>

        <div className={styles.create_moa_button}>
          <Button
            label="생성하기"
            size="medium"
            color="black"
            onClick={nextStep}
          />
        </div>
      </div>
    </>
  );
}
