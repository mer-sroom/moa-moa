import { z } from "zod";

export const DecorationEnum = z.enum(["NONE", "STAR", "HEART", "RIBBON"]);
export type DecorationType = z.infer<typeof DecorationEnum>;
export const createMoaBoxSchema = z.object({
  title: z.string().min(1).max(50),
  dueDate: z.string().datetime(),
  backgroundDesignId: z.number().int().positive(),
  mailBoxDesignId: z.number().int().positive(),
  isPublic: z.boolean(),
  allowAnonymous: z.boolean(),
  letterCountPublic: z.boolean(),
  participantIds: z.array(z.string()).max(30),

  decorationType: DecorationEnum.optional().default("NONE"),
});

export type CreateMoaBoxInput = z.infer<typeof createMoaBoxSchema>;
