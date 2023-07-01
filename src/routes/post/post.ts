import express from "express";
import { createPost } from "./create.controller";
import { type PostType } from "./validator";

export const postRouter = express.Router();

postRouter.post<{}, PostType>("/", createPost);
