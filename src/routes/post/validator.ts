import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type PostType = z.infer<typeof PostSchema>;
