import styles from "../../../../styles/backgroundLayout.module.css";
export default function BackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
}
