import Navbar from "../(components)/common/Navbar";
export default function MoaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <h1>Moa Layout</h1>
      {children}
    </div>
  );
}
