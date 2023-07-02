import { Request, Response } from "express";
import { z } from "zod";
import { PostSchema, PostType } from "./validator";
import { validatePayload } from "@lib/validate";
import { prisma } from "@db/index";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const updatePost = async (
    req: Request<{ id: string }, {}, Partial<PostType>>,
    res: Response
) => {
    const payloadValidation = await validatePayload(
        req.body,
        PostSchema.partial()
    );
    const paramsValidation = await validatePayload(
        req.params,
        z.object({
            id: z.string().uuid(),
        })
    );
    if (!payloadValidation.success)
        return res
            .status(400)
            .json({ error: payloadValidation.error?.message });
    if (!paramsValidation.success)
        return res.status(400).json({ error: paramsValidation.error?.message });
    let post;
    try {
        post = await prisma.post.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2025") {
                return res.status(404).json({ error: e.meta?.cause });
            }
        }
    }
    return res.status(200).json(post);
};
