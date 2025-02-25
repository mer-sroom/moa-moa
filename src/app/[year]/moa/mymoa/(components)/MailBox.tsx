// MailBox.tsx
import { Letter } from "@/types/moabox";
import PaginatedLetterGrid from "../(components)/PaginatedLetterGrid";
import styles from "@/styles/mymoa.module.css";

interface MailBoxProps {
  moaBoxId: number;
  designURL: string;
  letters: Letter[];
}

export default function MailBox({
  moaBoxId,
  designURL,
  letters,
}: MailBoxProps) {
  return (
    <section className={styles.mailBoxSection}>
      <div
        className={styles.mailboxBackground}
        style={{ backgroundImage: `url(${designURL})` }}
      >
        <PaginatedLetterGrid letters={letters} itemsPerPage={8} />
      </div>
    </section>
  );
}
