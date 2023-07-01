import { Request, Response } from "express";
import { PostSchema, type PostType } from "./validator";
import { prisma } from "@db/index";
import { validatePayload } from "@lib/validate";
import { Post } from "@prisma/client";
import { ZodError } from "zod";

export const createPost = async (req: Request, res: Response<Post | any>) => {
  const result = await validatePayload<PostType>(req.body, PostSchema);
  if (!result.success)
    return res.status(400).json({ error: result.error as ZodError });
  if (result.data) {
    const post = await prisma.post.create({
      data: result.data,
    });
    return res.status(201).json(post);
  }
};
