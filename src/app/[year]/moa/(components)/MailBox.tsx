"use client";
import Image from "next/image";
import { Letter } from "../mymoa/[id]/mockdata";
import mockMailBox from "../../../../../public/assets/mailbox1.svg";
import styles from "../../../../styles/mymoa.module.css";

export default function MailBox({
  moaBoxId,
  designURL,
  letters,
}: {
  moaBoxId: number;
  designURL: string;
  letters: Letter[];
}) {
  // console.log(letters);
  return (
    <>
      <div>
        {/* 우편함 배경 */}
        <div
          style={{
            position: "relative",
            width: "420px",
            height: "490px",
            backgroundColor: "red",
            backgroundImage: `url:(${mockMailBox})`,
            backgroundSize: "cover",
          }}
        >
          {/* 그리드 영역 */}
          <div
            className={styles.mailBoxGrid}
            style={{
              position: "absolute",
              top: "90px",
              left: "90px",
              backgroundColor: "skyblue",
              width: "240px",
              height: "280px",
            }}
          >
            {/* 첫번째 행(2칸) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 64px)",
                gap: "4px",
                gridAutoRows: "80px",
                justifyContent: "center",
              }}
            >
              <p>hiih</p>
              <p>hiih</p>
            </div>
            {/* 두번째 & 세번째 행을 합친 그리드: 3칸 x 2행 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "4px",
                // 남은 그리드 영역 높이: 전체 높이 280px에서 첫번째 행 80px을 제외
                // height: "200px",
                gridAutoRows: "80px", // 각 행의 높이
              }}
            >
              <p>hiih</p>
              <p>hiih</p>
              <p>hiih</p>
              <p>hiih</p>
              <p>hiih</p>
              <p>hiih</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
