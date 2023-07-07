import { validatePayload } from "@lib/validate";
import { Request, Response } from "express";
import { UserSchema, UserType } from "./validator";
import { prisma } from "@db/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req: Request, res: Response) => {
    const result = await validatePayload<Pick<UserType, "email" | "password">>(
        req.body,
        UserSchema.pick({
            email: true,
            password: true,
        })
    );
    if (!result.success) return res.status(400).json({ error: result.error });
    if (result.data) {
        const user = await prisma.user.findFirst({
            where: {
                email: result.data.email,
            },
        });
        if (!user)
            return res
                .status(404)
                .json({ error: "Incorrect email or password" });
        if (!bcrypt.compareSync(result.data.password, user.password)) {
            return res
                .status(404)
                .json({ error: "Incorrect email or password" });
        }
        const token = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET as string
        );
        return res.status(200).json({ access_token: token });
    }
};
