import Link from "next/link";
export default function MyMoaPage() {
  return (
    <>
      <div
        style={{
          backgroundColor: "green",
          height: "100vh",
          margin: "0",
          padding: "0",
        }}
      >
        <h1 style={{ margin: "0" }}>My Moa Page</h1>

        <div>
          {/* select-moa 화면 테스트를 위한 임시 친구 목록 */}
          <p>친구 목록</p>
          <Link href={`/2025/moa/select-moa/user123`}>user123의 모아</Link>
          <br />
          <Link href={`/2025/moa/select-moa/user456`}>user456의 모아</Link>
          <br />
          <Link href={`/2025/moa/select-moa/user789`}>user789의 모아</Link>
        </div>
      </div>
    </>
  );
}
