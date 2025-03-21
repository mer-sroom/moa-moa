import React from "react";
import styles from "@/styles/Skeleton.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
}

export default function Skeleton({ width, height }: SkeletonProps) {
  return (
    <div className={styles.skeleton} style={{ width: width, height: height }} />
  );
}
