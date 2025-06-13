import Button from "../../../(components)/common/Button";
import styles from "@/styles/create-letter/createLetter.module.css";
import Image from "next/image";
import lpImg from "public/assets/service-imgs/icons/lp-record.svg";
import quaver from "public/assets/service-imgs/icons/quaver.svg";
import quavers from "public/assets/service-imgs/icons/quavers.svg";
import catBody from "public/assets/icons/create_letter/create_letter_step1_cat_body.svg";
import catArm from "public/assets/icons/create_letter/create_letter_step1_cat_arm.svg";
import paperImg from "public/assets/icons/create_letter/create_letter_step1_paper.svg";
interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep1(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_img}>
          {/* 음표 아이콘 */}
          <Image
            src={quaver}
            alt="quaver"
            className={`${styles.img} ${styles.quaver}`}
          />
          <Image
            src={quaver}
            alt="quaver"
            className={`${styles.img} ${styles.quaver2}`}
          />
          <Image
            src={quavers}
            alt="crotchet"
            className={`${styles.img} ${styles.crotchet}`}
          />
          {/* 편지지, lp */}
          <Image
            src={paperImg}
            alt="paper"
            className={`${styles.img} ${styles.paper_img}`}
          />
          <div className={styles.lp_wrapper}>
            <Image
              src={lpImg}
              alt="lp"
              className={`${styles.img} ${styles.lp_img}`}
            />
          </div>
          {/* 고양이 */}
          <div className={styles.cat_wrapper}>
            <Image
              src={catArm}
              alt="cat arm"
              className={`${styles.img} ${styles.cat_arm}`}
            />
            <Image
              src={catBody}
              alt="cat body"
              className={`${styles.img} ${styles.cat_body}`}
            />
          </div>
        </div>
        {/* 텍스트 */}
        <div className={styles.container_text}>
          <div className={styles.title}>마음을 전달해요!</div>
          <div className={styles.description}>
            직접 꾸민 스티커와, 좋아하는 노래를 담아
            <br />
            친구에게 편지를 보내봐요!
          </div>
        </div>
      </div>
      <>
        <Button
          label="편지 작성하기"
          size="medium"
          color="black"
          onClick={nextStep}
        />
      </>
    </>
  );
}
