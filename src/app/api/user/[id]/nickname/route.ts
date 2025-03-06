import { NextResponse } from "next/server";
import { getUserNickname } from "@/lib/api/user";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "조회할 아이디가 없습니다" },
      { status: 400 }
    );
  }

  try {
    const nickname = await getUserNickname(params.id);
    return NextResponse.json({ nickname });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
