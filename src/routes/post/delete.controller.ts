import { prisma } from "@db/index";
import { validatePayload } from "@lib/validate";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import { z } from "zod";

export const deletePost = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    const result = await validatePayload(req.params.id, z.string().uuid());
    if (!result.success)
        return res.status(400).json({ error: result.error?.message });
    try {
        await prisma.post.delete({
            where: {
                id: req.params.id,
            },
        });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2025") {
                return res.status(404).json({ error: e.meta?.cause });
            }
        }
    }
    return res.status(200).end();
};
