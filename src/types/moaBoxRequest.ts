import { z } from "zod";

export const createMoaBoxSchema = z.object({
  title: z.string().min(1).max(50),
  dueDate: z.string().datetime(),
  backgroundDesignId: z.number().int().positive(),
  mailBoxDesignId: z.number().int().positive(),
  isPublic: z.boolean(),
  allowAnonymous: z.boolean(),
  letterCountPublic: z.boolean(),
  participantIds: z.array(z.string()).max(30),
});

export type CreateMoaBoxInput = z.infer<typeof createMoaBoxSchema>;
