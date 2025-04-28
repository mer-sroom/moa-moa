import styles from "@/styles/SavedMoa.module.css";
import Image from "next/image";
import icon from "@/../public/assets/icons/sentLetterIcon.svg";
export default function SentLetterLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.header}>
        <Image src={icon} alt="saved moa icon" width={28} />
        <h3 className={styles.title}>내가 작성한 편지</h3>
      </div>
      {children}
    </div>
  );
}
