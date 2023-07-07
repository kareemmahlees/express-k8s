import express from "express";
import { signUp } from "./signup.controller";
import { type UserType } from "./validator";
import { login } from "./login.controller";

export const authRouter = express.Router();

authRouter.post<{}, { access_token: string }, UserType>("/signup", signUp);
authRouter.post<{}, { access_token: string }>("/login", login);
