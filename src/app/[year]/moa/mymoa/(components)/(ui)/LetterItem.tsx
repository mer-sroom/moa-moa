import styles from "@/styles/mymoa.module.css";
import { LetterBase } from "@/types/moabox";

interface LetterItemProps {
  isOwner: boolean; // 편지 작성자 여부
  letter: LetterBase;
}

export default function LetterItem({ letter, isOwner }: LetterItemProps) {
  const { authorName, isOpened, letterIconDesign } = letter;
  //아이콘 정보 불러오기

  return (
    <div
      className={`${styles.letterItem} ${
        //모아박스 소유주한테만 편지 읽음 여부 css로 표시
        isOpened && isOwner ? styles.opened : ""
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
