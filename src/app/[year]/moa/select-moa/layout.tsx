import icon from "../../../../../public/assets/icons/select_moa_icon.svg";
import Image from "next/image";
import styles from "../../../../styles/selectMoa.module.css";

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.layoutContainer}>
        <div className={styles.header}>
          <Image src={icon} alt="select_moa_icon" />
          <h3 className={styles.title}>모아 박스 선택 화면</h3>
        </div>

        <p className={styles.description}>
          현재 진행 중인 기념일을 모아서 볼 수 있어요
        </p>
        {children}
      </div>
    </>
  );
}
