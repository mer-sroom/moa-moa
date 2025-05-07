"use client";
import styles from "@/styles/dotnav.module.css";
import type { DotNavProps } from "@/types/createMoa";

function DotNav({ color1, color2, color3 }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles[color1]}`} />
      <div className={`${styles.circle} ${styles[color2]}`} />
      <div className={`${styles.circle} ${styles[color3]}`} />
    </div>
  );
}

export default DotNav;
