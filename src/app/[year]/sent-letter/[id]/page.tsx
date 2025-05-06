import { authOptions } from "@/app/api/auth/authoptions";
import { getServerSession } from "next-auth/next";
import NotFound from "@/app/[year]/(components)/not-found";
import { getSentLetters } from "@/lib/sentLetter";
import Image from "next/image";
import styles from "@/styles/SentLetter.module.css";
import OpenSentLetter from "@/app/[year]/sent-letter/(components)/OpenSentLetter";

export default async function SentLetterPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NotFound();
  }
  const sentLetters = await getSentLetters(session.user.id);

  if (!sentLetters.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60vh",
          justifyContent: "center",
          opacity: "0.5",
        }}
      >
        <Image
          src="/assets/broke_cat.svg"
          alt="no moa"
          width={180}
          height={180}
        />
        <p style={{ textAlign: "center" }}>
          작성한 편지가 없습니다.
          <br />
          친구에게 첫 편지를 작성해보세요!
        </p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* 편지 하나씩 펼치기 */}
      {sentLetters.map(letter => (
        <OpenSentLetter letter={letter} key={letter.id}>
          {/* 편지 카드 */}
          <div
            className={styles.card}
            style={{
              backgroundImage: `url(${letter.letterPaperDesign.imageURL})`,
            }}
          >
            {/* 수신인 */}
            <p className={styles.cardRecipient}>
              To. {letter.moaBox.owner.nickname}
            </p>
            {/* 제목, 본문 */}
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>{letter.title}</h4>
              <p className={styles.cardText}>{letter.content}</p>
            </div>
            {/* 작성일 */}
            <p className={styles.cardFooter}>
              {letter.createdAt.getFullYear()}년 {letter.createdAt.getMonth()}월{" "}
              {letter.createdAt.getDay()}일
            </p>
          </div>
        </OpenSentLetter>
      ))}
    </div>
  );
}
