import BackgroundLayout from "./(components)/common/BackgroundLayout";
import "../../styles/globals.css";
import Navbar from "./(components)/common/Navbar";
export default function YearSeasonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundLayout>
        <Navbar />
        {children}
      </BackgroundLayout>
    </>
  );
}
