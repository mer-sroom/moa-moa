import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { headers } from "next/headers";
import NotFound from "../../not-found";
import NotificationPageClient from "./(components)/NotificationPageClient";

export default async function NotificationPageServer() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  // 현재 요청의 헤더에서 쿠키 추출
  const reqHeaders = await headers();
  const cookie = reqHeaders.get("cookie") ?? "";
  //세션 확인
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/auth/login");
  }
  const res = await fetch(`${baseURL}/api/notification`, {
    cache: "no-store",
    headers: { cookie },
  });
  //세션 없을 때
  if (res.status === 401) return redirect("/auth/login");
  //응답 값이 이상할 때
  if (!res.ok) return NotFound();

  const notifications = await res.json();

  return <NotificationPageClient notifications={notifications} />;
}
