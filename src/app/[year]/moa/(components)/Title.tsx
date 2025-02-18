import styles from "@/styles/mymoa.module.css";

interface TitleProps {
  title: string;
  letterCountPublic: boolean;
  lettersLength: number;
}

export default function Title({
  title,
  letterCountPublic,
  lettersLength,
}: TitleProps) {
  return (
    <>
      <section className={styles.headerSection}>
        <h2 className={styles.title}>{title}</h2>
        {/* 받은 편지 수 */}
        <div>
          {letterCountPublic && (
            <p className={styles.letterCount}>받은 편지 수 : {lettersLength}</p>
          )}
        </div>
      </section>
    </>
  );
}
