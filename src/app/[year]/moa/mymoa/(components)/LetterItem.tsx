import styles from "@/styles/mymoa.module.css";

interface LetterItemProps {
  id: number;
  name: string;
  isOpened: boolean;
  iconDesignURL: string;
}

export default function LetterItem(props: LetterItemProps) {
  const { name, isOpened, iconDesignURL } = props;
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
          backgroundImage: `url(${iconDesignURL})`,
        }}
      ></div>
      {/* 편지 작성한 사람 */}
      <p className={styles.authorName}>{name}</p>
    </div>
  );
}
