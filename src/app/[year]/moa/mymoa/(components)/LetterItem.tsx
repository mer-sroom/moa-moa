import { mockLetterIconDesigns } from "../../mockData"; //목업 데이터터
import styles from "@/styles/mymoa.module.css";

interface LetterItemProps {
  id: number;
  name: string;
  isOpened: boolean;
  iconDesignId: number;
}

export default function LetterItem(props: LetterItemProps) {
  const { name, isOpened, iconDesignId } = props;
  //아이콘 정보 불러오기
  const IconDesign = mockLetterIconDesigns.find(
    design => design.id === iconDesignId
  );

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
          backgroundImage: `url(${IconDesign.imageURL})`,
        }}
      ></div>
      {/* 편지 작성한 사람 */}
      <p className={styles.authorName}>{name}</p>
    </div>
  );
}
