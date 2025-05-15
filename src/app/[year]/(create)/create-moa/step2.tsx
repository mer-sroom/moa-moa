"use client";
import styles from "@/styles/createMoa.module.css";
import Button from "../../(components)/common/Button";
import type { NextStepProps } from "@/types/createMoa";

export default function CreateMoaStep2<NextStepProps>({nextStep}) {
  return (
    <div>
      <Button label="아이콘 박스 넣어야함" size="small" color="black"></Button>
      <Button label="다음으로" size="medium" color="black" onClick={nextStep}></Button>
    </div>
  )
} 
