import Image from "next/image";
import icon from "@/../public/assets/icons/nav_sidebar/saved_moa_icon.svg";
import styles from "@/styles/selectMoa.module.css";
export default function SavedMoaLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.header}>
        <Image src={icon} alt="saved moa icon" />
        <h3 className={styles.title}>지난 모아 보관함</h3>
      </div>
      {children}
    </div>
  );
}
