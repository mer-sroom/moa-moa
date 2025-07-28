// MailBox.tsx
import { LetterBase } from "@/types/moabox";
import PaginatedLetterGrid from "../(features)/PaginatedLetterGrid";
import styles from "@/styles/mymoa.module.css";
import Image from "next/image";
interface MailBoxProps {
  isOwner: boolean;
  moaBoxId: number;
  designURL: string;
  letters: LetterBase[];
  decorationURL?: string;
}

export default function MailBox({
  isOwner,
  moaBoxId,
  designURL,
  letters,
  decorationURL,
}: MailBoxProps) {
  return (
    <section className={styles.mailBoxSection}>
      <div
        className={styles.mailboxBackground}
        style={{ backgroundImage: `url(${designURL})` }}
      >
        {decorationURL && (
          <Image
            src={decorationURL}
            alt="decoration"
            width={120}
            height={120}
            className={styles.decoration} // CSS 1-block만 추가
            priority
          />
        )}
        <PaginatedLetterGrid
          isOwner={isOwner}
          letters={letters}
          itemsPerPage={8}
        />
      </div>
    </section>
  );
}
