import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma"; // ← default export 사용
import { createMoaBoxSchema } from "@/types/moaBoxRequest";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  /* 1) 인증 */
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  /* 2) 본문 검증 */
  let body;
  try {
    body = createMoaBoxSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json(
      { message: "Validation error", issues: err.flatten?.() },
      { status: 400 }
    );
  }

  const {
    title,
    dueDate,
    backgroundDesignId,
    mailBoxDesignId,
    isPublic,
    allowAnonymous,
    letterCountPublic,
    participantIds,
  } = body;

  /* 3) 트랜잭션 */
  try {
    const moaBox = await prisma.$transaction(async tx => {
      const box = await tx.moaBox.create({
        data: {
          ownerId: session.user.id,
          title,
          isGroup: participantIds.length > 0,
          dueDate: new Date(dueDate),
          isPublic,
          allowAnonymous,
          letterCountPublic,
          shareLink: nanoid(10),
          backgroundDesignId,
          mailBoxDesignId,
        },
      });

      if (participantIds.length) {
        await tx.moaBoxParticipant.createMany({
          data: participantIds.map(uid => ({
            userId: uid,
            moaBoxId: box.id,
            status: "INVITED",
          })),
        });
      }

      return box;
    });

    return NextResponse.json(moaBox, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
