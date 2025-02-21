// friendlist/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FriendListContent from "./(components)/FriendListContent";
import NotFound from "../(components)/not-found";

export default async function FriendListPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // 현재 요청의 헤더에서 쿠키 추출
  const reqHeaders = await headers();
  const cookie = reqHeaders.get("cookie") ?? "";

  const res = await fetch(`${baseUrl}/api/friendlist`, {
    cache: "no-store",
    headers: { cookie },
  });

  if (res.status === 401) return redirect("/auth/login");
  if (!res.ok) return NotFound();

  const { friends } = await res.json();
  return <FriendListContent friends={friends} />;
}
