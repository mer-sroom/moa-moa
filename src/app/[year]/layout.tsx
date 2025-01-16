import BackgroundLayout from "./(components)/common/BackgroundLayout";
import "../../styles/globals.css";
export default function YearSeasonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundLayout>{children}</BackgroundLayout>
    </>
  );
}
