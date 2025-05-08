import Button from "../../(components)/common/Button";
import styles from "@/styles/createLetter.module.css";
import Image from "next/image";
import createLetter from "public/assets/icons/create_letter/create-letter.svg";
import createRecord from "public/assets/icons/create_letter/create-record.svg";
interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep1(props: Props) {
  const { nextStep } = props;
  return (
    <>
      <div className={styles.container}>
        <Image
          src={createLetter}
          alt="create letter"
          className={styles.letter}
        />
        <Image
          src={createRecord}
          alt="create record"
          className={styles.record}
        />
        <div className={styles.container_text}>
          <div className={styles.title}>마음을 전달해요!</div>
          <div className={styles.description}>
            커스터마이징한 --와 편지와 노래를 담아 친구에게 보낼 수 있어요
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
