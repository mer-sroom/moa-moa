"use client";
import styles from "@/styles/dotnav.module.css";
import type { DotNavProps } from "@/types/createMoa";

const DotNav: React.FC<DotNavProps> = ({ colors, onClick }) => {
  return (
    <div className={styles.container}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`${styles.circle} ${styles[color]}`}
          onClick={() => onClick(index)} // 클릭 시 해당 인덱스 전달
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default DotNav;
