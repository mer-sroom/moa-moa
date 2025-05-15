import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/authoptions";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 유저 삭제
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
