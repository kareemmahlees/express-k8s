import { z } from "zod";

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
