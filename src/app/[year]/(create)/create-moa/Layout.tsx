import BackgroundLayout from "../../(components)/common/BackgroundLayout"; // 경로는 폴더 깊이에 맞춰 조정

export default function CreateMoaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BackgroundLayout>{children}</BackgroundLayout>;
}
