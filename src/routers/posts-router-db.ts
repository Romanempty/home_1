import {Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { postRepositoryDb } from "../repositories/post-repositories-db";
import { PostType, inputPostModel, postViewModel } from "../types/postsTypes";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAnqQuery, idParams } from "../views/requestViewss";
import { param } from "express-validator";
import { postQueryRepository } from "../domain/query-repository-post";
import { postsService } from "../domain/post-service";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../views/requestViewss";
import { isValidObjectId } from "../midlewaress/valBlog";
import { basicAuthMiddleware } from "../midlewaress/valMiddlewire";
import { PostsValidationMiddleware } from "../midlewaress/valPost";

export const postRouterDb = Router({})

postRouterDb.get('/', async (req: RequestWithQuery<{sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number}>, res: Response) => {
    const sortBy = req.query.sortBy || 'createdAt'
    const sortDirection = req.query.sortDirection || 'desc'
    const pageNamber = req.query.pageNamber || 1
    const pageSize = req.query.pageSize || 10
    const allPosts: PostType = await postQueryRepository.findPosts(sortBy, sortDirection, pageNamber, pageSize)
    return res.status(HTTP_STATUSES.OK_200).send(allPosts)
})

postRouterDb.get('/:id',  async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id;
    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    const foundPost: postViewModel | null = await postQueryRepository.findPostID(req.params.id)
    if (!foundPost) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
    return res.status(HTTP_STATUSES.OK_200).send(foundPost)
    }
})

postRouterDb.delete('/:id', basicAuthMiddleware, async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id;
    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    };
    const deletePost: boolean = await postsService.deletePostId(id)
    if (!deletePost) {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        return res.status(HTTP_STATUSES.NO_CONTENT_204).send(deletePost)
    }
})  

postRouterDb.post('/', 
basicAuthMiddleware, 
PostsValidationMiddleware,
async (req: RequestWithBody<{ title: string, shortDescription:string, content: string, blogId: string }>, res: Response) => {
const newPostCreate: ObjectId = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
const createPost: postViewModel | null = await postQueryRepository.findPostID(newPostCreate.toString())
    return res.status(HTTP_STATUSES.CREATED_201).send(createPost)
})  

postRouterDb.put('/:id', 
basicAuthMiddleware,
PostsValidationMiddleware,
async (req: RequestWithParamsAndBody<{id: string}, {title: string, shortDescription:string, content: string, blogId: string}>, res: Response) => {
    const postId = req.params.id;
    const isObjectId = isValidObjectId(postId) && isValidObjectId(req.body.blogId);
    if(!isObjectId){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    };
    const postUpdate: boolean = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if(!postUpdate) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        } else {
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
}) 