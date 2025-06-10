import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma";
import { createMoaBoxSchema } from "@/types/moaBoxRequest";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = createMoaBoxSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json(
      { message: "Validation failed", issues: err.flatten?.() },
      { status: 400 }
    );
  }

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
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
