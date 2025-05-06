import OpenLetter from "../(features)/(letter-features)/OpenLetter";
import LetterItem from "./LetterItem";
import { LetterBase } from "@/types/moabox";
import styles from "@/styles/mymoa.module.css";

interface LetterGridProps {
  letters: LetterBase[];
}

export default function LetterGrid({ letters }: LetterGridProps) {
  const firstRow = letters.slice(0, 2);
  const restRow = letters.slice(2);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.mailBoxGrid}>
        {/* 첫 번째 행 (2칸) */}
        <div className={styles.firstRow}>
          {firstRow.map(letter => (
            <OpenLetter key={letter.id} letter={letter}>
              <LetterItem letter={letter} />
            </OpenLetter>
          ))}
        </div>
        {/* 두 번째 & 세 번째 행 (최대 6칸) */}
        <div className={styles.restRow}>
          {restRow.map(letter => (
            <OpenLetter key={letter.id} letter={letter}>
              <LetterItem letter={letter} />
            </OpenLetter>
          ))}
        </div>
      </div>
    </div>
  );
}
