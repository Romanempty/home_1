import { Router, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams, RequestWithQueryParams } from "../types/requestModelType";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { PostsValidationMiddleware } from "../middlewares/posts-validation-middleware";
import { PostViewModel } from "../models/posts/PostViewModel";
import { isValidObjectId } from "../helper/isValidObjectId";
import { postsService } from "../domain/posts-service";
import { ObjectId } from "mongodb";
import { postsQueryRepository } from "../repositories/postsQueryRepository";
import { PostsViewModel } from "../models/posts/PostsViewModel";

export const postsRouter = Router({});

postsRouter.get("/", async (req: RequestWithQueryParams<{sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number}>, res: Response) => {
    const sortBy = req.query.sortBy || "createdAt";
    const sortDirection = req.query.sortDirection || "desc";
    const pageNumber = +req.query.pageNumber || 1;
    const pageSize = +req.query.pageSize || 10;
    const foundPosts: PostsViewModel = await postsQueryRepository.findPosts(sortBy, sortDirection, pageNumber, pageSize);
    return res.status(HTTP_STATUSES.OK_200).send(foundPosts)
});

postsRouter.get("/:id", async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id;
    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    };
    const foundPost: PostViewModel | null = await postsQueryRepository.findPostById(req.params.id);
    if(foundPost){
        return res.status(HTTP_STATUSES.OK_200).send(foundPost);
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});

postsRouter.post("/", 
basicAuthMiddleware, 
PostsValidationMiddleware,
async (req: RequestWithBody<{title: string, shortDescription: string, content: string, blogId: string}> , res: Response) => {
    const createdPostObjectId: ObjectId = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    const createdPost: PostViewModel | null = await postsQueryRepository.findPostById(createdPostObjectId.toString());
    return res.status(HTTP_STATUSES.CREATED_201).send(createdPost) 
});

postsRouter.put("/:id",
basicAuthMiddleware,
PostsValidationMiddleware,
async (req: RequestWithBodyAndParams<{id: string}, {title: string, shortDescription: string, content: string, blogId: string}> , res: Response) => {
    const postId = req.params.id;
    const isObjectId = isValidObjectId(postId) && isValidObjectId(req.body.blogId);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    };
    const updatedPost: boolean = await postsService.updatePost(postId, req.body.title, req.body.shortDescription, req.body.content);
    if(updatedPost){
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});

postsRouter.delete("/:id", basicAuthMiddleware, async (req: RequestWithParams <{id: string}>, res: Response) => {
    const id = req.params.id;
    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    };
    const isPostDeleted: boolean = await postsService.deletePost(id);
    if(isPostDeleted){
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }else{
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
