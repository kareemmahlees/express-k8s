import { prisma } from "@db/index";
import { z } from "zod";
import { validatePayload } from "@lib/validate";
import { Request, Response } from "express";

export const getPost = async (req: Request<{ id: string }>, res: Response) => {
  const result = await validatePayload<{ id: string }>(
    req.params,
    z.object({ id: z.string().uuid() })
  );
  if (!result.success) return res.status(400).json({ error: "Invalid Id" });
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!post) res.status(404).json({ error: "post doesn't exist" });
  return res.json(post);
};

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  return res.json(posts);
};
