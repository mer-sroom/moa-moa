import { useState } from "react";
import Button from "../../../(components)/common/Button";
import styles from "@/styles/create-letter/CreateLetterStep4.module.css";
import Image from "next/image";
import Moarecord from "public/assets/icons/create_letter/moa_record.svg";
import lpImg from "public/assets/service-imgs/icons/lp-record.svg";
import Modal from "../../../(components)/common/Modal";
import MusicSelect from "../../../(create)/(components)/MusicSelect";

interface Props {
  nextStep: () => void;
}

export default function CreateLetterStep4(props: Props) {
  const { nextStep } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={styles.step4_container}>
        <Image
          src={Moarecord}
          alt="create music"
          className={styles.step4_music}
        />
        <Image src={lpImg} alt="create music" className={styles.step4_record} />

        <div className={styles.step4_container_text}>
          <div className={styles.step4_title}>음악 추가하기</div>
          <div className={styles.step4_description}>
            음악을 추가해서 특별한 순간을 만들어요!
          </div>
        </div>
        <Button
          label="노래 선택하기"
          size="medium"
          color="black"
          onClick={openModal}
        ></Button>
        <Button
          label="다음으로"
          size="medium"
          color="white"
          onClick={nextStep}
        ></Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        showActionButtons={true}
        content={<MusicSelect />}
      />
    </>
  );
}
