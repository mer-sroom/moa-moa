"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/create-letter/CreateLetterStep1and6.module.css";
// 이미지 에셋
import mainImg from "public/assets/icons/create_letter/step6_main_img.svg";
import speechBubbleImg from "public/assets/icons/create_letter/step6_speech_bubble.svg";
import boing from "public/assets/service-imgs/icons/boing.svg";
import spark from "public/assets/service-imgs/icons/dot_spark.svg";
import Button from "@/app/[year]/(components)/common/Button";
export default function CreateLetterStep6({ moaBoxId }: { moaBoxId: number }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/2025/moa/mymoa/${moaBoxId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, moaBoxId]);

  return (
    <div className={styles.container}>
      <div className={styles.step6_img_container}>
        <div className={styles.img_house}>
          <Image
            src={boing}
            alt="boing"
            className={`${styles.img} ${styles.boing}`}
          />
          <Image
            src={spark}
            alt="spark"
            className={`${styles.img} ${styles.spark}`}
          />
          <Image
            src={speechBubbleImg}
            alt="speech bubble"
            className={`${styles.img} ${styles.speech_bubble}`}
          />
          <div className={styles.step6_main_img_wrapper}>
            <Image src={mainImg} alt="main" priority />
          </div>
        </div>
      </div>

      <div className={styles.container_text}>
        <h2 className={styles.title}>편지 전달 완료!</h2>
        <p className={styles.description}>
          성공적으로 편지를 전달했어요.
          <br />
          잠시 후 친구의 모아 박스로 이동합니다!
        </p>
      </div>
      <Button label={`${countdown}초 후 이동`} size="medium" color="black" />
    </div>
  );
}
