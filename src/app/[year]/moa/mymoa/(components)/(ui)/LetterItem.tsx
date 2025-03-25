import styles from "@/styles/mymoa.module.css";
import { LetterBase } from "@/types/moabox";

interface LetterItemProps {
  letter: LetterBase;
}

export default function LetterItem({ letter }: LetterItemProps) {
  const { authorName, isOpened, letterIconDesign } = letter;
  //아이콘 정보 불러오기

  return (
    <div
      className={`${styles.letterItem} ${
        isOpened ? styles.opened : styles.glowing
      }`}
    >
      {/* 편지 아이콘 */}
      <div
        className={styles.icon}
        style={{
          backgroundImage: `url(${letterIconDesign.imageURL})`,
        }}
      ></div>
      {/* 편지 작성한 사람 */}
      <p className={styles.authorName}>{authorName}</p>
    </div>
  );
}
