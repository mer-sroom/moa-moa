import React, { useState } from "react";
import styles from "@/styles/toggleButton.module.css";
import type { ToggleLabelProps } from "@/types/createMoa";

const ToggleButton: React.FC<ToggleLabelProps> = ({ label }) => {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn(!isOn);

  console.log(label, isOn);
  return (
    <div className={styles.right}>
      <span hidden>{label}</span>
      <div
        className={`${styles.toggleContainer} ${isOn ? styles.on : ""}`}
        onClick={toggle}
      >
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default ToggleButton;
