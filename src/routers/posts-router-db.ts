import {Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { postRepositoryDb } from "../repositories/post-repositories-db";
import { authorizationVal } from "../midlewaress/valMiddlewire";
import { postTitleVal } from "../midlewaress/valPost";
import { postShortDescriptionVal } from "../midlewaress/valPost";
import { postContentVal } from "../midlewaress/valPost";
import { postBlogIdVal } from "../midlewaress/valPost";
import { inputValidationMidldewareErrors } from "../midlewaress/valMiddlewire";
import { PostType, inputPostModel, postViewModel } from "../types/postsTypes";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAnqQuery, idParams } from "../views/requestViewss";
import { param } from "express-validator";
import { postQueryRepository } from "../domain/query-repository-post";
import { postsService } from "../domain/post-service";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../views/requestViewss";


export const postRouterDb = Router({})

postRouterDb.get('/', async (req: RequestWithQuery<{sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number}>, res: Response) => {
    const sortBy = req.query.sortBy || 'createdAt'
    const sortDirection = req.query.sortDirection || 'desc'
    const pageNamber = req.query.pageNamber || 1
    const pageSize = req.query.pageSize || 10
    const allPosts: PostType = await postQueryRepository.findPosts(sortBy, sortDirection, pageNamber, pageSize)
    return res.status(HTTP_STATUSES.OK_200).send(allPosts)
})

postRouterDb.get('/:id', postBlogIdVal, async (req: RequestWithParams<{id: string}>, res: Response) => {
    const foundPost: postViewModel | null = await postQueryRepository.findPostID(req.params.id)
    if (!foundPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundPost)
})

postRouterDb.delete('/:id', 
authorizationVal,
inputValidationMidldewareErrors,
async (req: RequestWithParams<{id: string}>, res: Response) => {
    const deletePost = await postsService.deletePostId(req.params.id)
    if (!deletePost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.NO_CONTENT_204).send(deletePost)
})  

postRouterDb.post('/', 
authorizationVal,
postTitleVal,
postShortDescriptionVal,
postContentVal,
postBlogIdVal,
inputValidationMidldewareErrors,
async (req: RequestWithBody<{ title: string, shortDescription:string, content: string, blogId: string }>, res: Response) => {
const newPostCreate = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
const createPost: postViewModel | null = await postQueryRepository.findPostID(newPostCreate.toString())
    return res.status(HTTP_STATUSES.CREATED_201).send(createPost)
})  

postRouterDb.put('/:id', 
authorizationVal,
postTitleVal,
postShortDescriptionVal,
postContentVal,
postBlogIdVal,
inputValidationMidldewareErrors,
async (req: RequestWithParamsAndBody<{id: string}, {title: string, shortDescription:string, content: string, blogId: string}>, res: Response) => {
    const postUpdate: boolean = await postsService.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if(!postUpdate) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}) 