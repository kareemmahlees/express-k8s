import { validatePayload } from "@lib/validate";
import { Request, Response } from "express";
import { UserSchema, UserType } from "./validator";
import { prisma } from "@db/index";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
    const result = await validatePayload<UserType>(req.body, UserSchema);
    if (!result.success) return res.status(400).json({ error: result.error });
    if (result.data) {
        const userExists = await prisma.user.findFirst({
            where: {
                OR: {
                    name: result.data.email,
                    email: result.data.email,
                },
            },
        });
        if (userExists)
            return res.status(400).json({ error: "user already exists" });
        result.data.password = await bcrypt.hash(result.data.password, 10);
        const user = await prisma.user.create({
            data: result.data,
        });
        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET as string
        );
        return res.status(201).json({ access_token: token });
    }
};
