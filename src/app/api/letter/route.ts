// POST /api/letter
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import prisma from "@/lib/prisma";
import { z } from "zod";

/* 필요 값만 검증 — 나머지는 strip() */
const createLetterSchema = z
  .object({
    moaBoxId: z.number(),
    authorName: z.string().min(1),
    title: z.string().min(1),
    content: z.string().min(1),
    trackId: z.string().nullable(),
    letterPaperDesign: z.number(),
    letterIconDesign: z.number(),
    theme: z.string().optional(),
  })
  .strip(); // authorId·createdAt 등이 와도 무시

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = createLetterSchema.parse(await req.json());
  } catch (err: any) {
    return NextResponse.json(
      { message: "Validation failed", issues: err.flatten?.() },
      { status: 400 }
    );
  }

  try {
    const letter = await prisma.letter.create({
      data: {
        moaBoxId: body.moaBoxId,
        authorId: session.user.id,
        authorName: body.authorName,
        title: body.title,
        content: body.content,
        trackId: body.trackId,
        letterPaperDesignId: body.letterPaperDesign,
        letterIconDesignId: body.letterIconDesign,
      },
    });
    return NextResponse.json(letter, { status: 201 });
  } catch (e) {
    console.log("Moa Letter create error");
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
