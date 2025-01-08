import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to MoaMoa!</h1>
      <ul style={{ listStyle: "none" }}>
        <li>
          <Link href="/auth/login">로그인 페이지</Link>
        </li>
        <li>
          <Link href="/auth/error">에러 페이지</Link>
        </li>
        <li>
          <Link href="/auth/callback">콜백 페이지</Link>
        </li>

        <li>
          <Link href="/2025">/2025 (연도 페이지)</Link>
        </li>
        <li>
          <Link href="/2025/moa">/2025/moa (모아 페이지)</Link>
        </li>
        <li>
          <Link href="/2025/notification">
            /2025/notification (알림 페이지)
          </Link>
        </li>
        <li>
          <Link href="/2025/mypage">/2025/mypage (마이페이지)</Link>
        </li>

        <li>
          <Link href="/2025/sent-letter">/2025/sent-letter (보낸 편지)</Link>
        </li>

        <li>
          <Link href="/2025/create-letter">/2025/create-letter</Link>
        </li>
        <li>
          <Link href="/2025/create-moa">/2025/create/create-moa</Link>
        </li>

        <li>
          <Link href="/2025/moa/friendmoa">/2025/moa/friendmoa</Link>
        </li>
        <li>
          <Link href="/2025/moa/friendmoa/123">
            /2025/moa/friendmoa/[friendId] (예: 123)
          </Link>
        </li>
      </ul>
    </main>
  );
}
