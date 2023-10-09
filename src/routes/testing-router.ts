import { Router, Request, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { postsRepository } from "../repositories/postsRepository";
import { blogsRepository } from "../repositories/blogsRepository";
import { usersRepository } from "../repositories/user-repository";

export const testRouter = Router({});

testRouter.delete("/", async (req: Request, res: Response) => {
   await Promise.all([postsRepository.deleteAllPosts(), blogsRepository.deleteAllBlogs(), usersRepository.deleteAllUsers()]);
   res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
