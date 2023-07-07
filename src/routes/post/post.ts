import express from "express";
import { createPost } from "./create.controller";
import { type Post } from "@prisma/client";
import { getAllPosts, getPost } from "./get.controller";
import { updatePost } from "./update.controller";
import { deletePost } from "./delete.controller";
import { authGuard } from "@auth/index";

export const postRouter = express.Router();

postRouter.post<{}, Post>("/", authGuard, createPost);
postRouter.get<{ id: string }, Post>("/:id", authGuard, getPost);
postRouter.get("/", authGuard, getAllPosts);
postRouter.put<{ id: string }>("/:id", authGuard, updatePost);
postRouter.delete<{ id: string }>("/:id", authGuard, deletePost);
