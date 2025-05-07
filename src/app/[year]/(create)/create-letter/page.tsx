// app/create-letter/page.tsx
"use client";
import styles from "@/styles/createLetter.module.css";
import Image from "next/image";
import { useState } from "react";
import createLetter from "public/assets/icons/create_letter/create-letter.svg";
import createRecord from "public/assets/icons/create_letter/create-record.svg";
import Button from "@/app/[year]/(components)/common/Button";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import DotNav from "../(components)/DotNav";

export default function CreateLetterStep() {
  return (
    <>
      <>
        <DotNav color1={"black"} color2={"gray"} color3={"gray"} />
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

        <div className={styles.button}>
          <Button
            label="편지 작성하기"
            size="long"
            color="black"
            onClick={() => alert("ok")}
          />
        </div>
      </>
    </>
  );
}
