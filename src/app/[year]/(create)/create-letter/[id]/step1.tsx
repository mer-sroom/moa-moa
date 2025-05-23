import Button from "../../../(components)/common/Button";
import styles from "@/styles/createLetter.module.css";
import Image from "next/image";
import lpImg from "public/assets/service-imgs/icons/lp-record.svg";
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
        <div
          style={{
            position: "relative",
            height: "30vh",
            width: "100%",
            // transform: "scale(1.1) rotate(5deg)",
          }}
        >
          <div className={styles.lp_wrapper}>
            <Image src={lpImg} alt="lp" className={styles.lp_img} />
          </div>
          <Image src={paperImg} alt="paper" className={styles.paper_img} />
          <Image src={catArm} alt="cat arm" className={styles.cat_arm} />
          <Image src={catBody} alt="cat body" className={styles.cat_body} />
        </div>
        <div className={styles.container_text}>
          <div className={styles.title}>마음을 전달해요!</div>
          <div className={styles.description}>
            직접 꾸민 우표와, 좋아하는 노래를 담아
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
