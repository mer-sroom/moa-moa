import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma";
import { createMoaBoxSchema } from "@/types/moaBoxRequest";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  // 1) 인증
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2) 요청 검증
  let body;
  try {
    body = createMoaBoxSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json(
      { message: "Validation failed", issues: err.flatten?.() },
      { status: 400 }
    );
  }

  // 3) 트랜잭션
  try {
    const box = await prisma.$transaction(async tx => {
      const created = await tx.moaBox.create({
        data: {
          ownerId: session.user.id,
          title: body.title,
          isGroup: body.participantIds.length > 0,
          dueDate: new Date(body.dueDate),
          isPublic: body.isPublic,
          allowAnonymous: body.allowAnonymous,
          letterCountPublic: body.letterCountPublic,
          shareLink: nanoid(10),
          backgroundDesignId: body.backgroundDesignId,
          mailBoxDesignId: body.mailBoxDesignId,
          decorationDesignId: body.decorationDesignId ?? null,
        },
      });

      if (body.participantIds.length) {
        await tx.moaBoxParticipant.createMany({
          data: body.participantIds.map(uid => ({
            userId: uid,
            moaBoxId: created.id,
            status: "INVITED",
          })),
        });
      }

      return created;
    });

    return NextResponse.json(box, { status: 201 });
  } catch (e) {
    // ① 문자열 직렬화해서 무조건 찍기
    console.log("MoaBox create raw error →", JSON.stringify(e, null, 2));
    // ② e?.code, e?.message 별도 출력
    if (e && typeof e === "object") {
      console.log("err.code =", e.code);
      console.log("err.message =", e.message);
    }
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
