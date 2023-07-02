import express from "express";
import { createPost } from "./create.controller";
import { type Post } from "@prisma/client";
import { getAllPosts, getPost } from "./get.controller";
import { updatePost } from "./update.controller";

export const postRouter = express.Router();

postRouter.post<{}, Post>("/", createPost);
postRouter.get<{ id: string }, Post>("/:id", getPost);
postRouter.get("/", getAllPosts);
postRouter.put<{ id: string }>("/:id", updatePost);
