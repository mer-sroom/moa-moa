import { NextResponse } from "next/server";
import { getUserNickname } from "@/lib/api/user";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 비동기적으로 params를 처리합니다.

    if (!id) {
      return NextResponse.json(
        { error: "조회할 아이디가 없습니다" },
        { status: 400 }
      );
    }

    const nickname = await getUserNickname(id);
    return NextResponse.json({ nickname });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
