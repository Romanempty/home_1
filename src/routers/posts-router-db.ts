import {Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { posts } from "../repositories/posts-repositories";
import { postRepositoryDb } from "../repositories/post-repositories-db";
import { authorizationVal } from "../midlewaress/valMiddlewire";
import { postTitleVal } from "../midlewaress/valPost";
import { postShortDescriptionVal } from "../midlewaress/valPost";
import { postContentVal } from "../midlewaress/valPost";
import { postBlogIdVal } from "../midlewaress/valPost";
import { inputValidationMidldewareErrors } from "../midlewaress/valMiddlewire";
import { inputPostModel, postsTypeDb } from "../types/postsTypes";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, idParams } from "../views/requestViewss";
import { param } from "express-validator";

export const postRouterDb = Router({})

postRouterDb.get('/', async (req: Request, res: Response) => {
    const allPosts: postsTypeDb[] = await postRepositoryDb.findPosts()
    res.status(HTTP_STATUSES.OK_200).send(posts)
})

postRouterDb.get('/:id', async (req: RequestWithParams<idParams>, res: Response<postsTypeDb>) => {
    const foundPost = await postRepositoryDb.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundPost)
})

postRouterDb.delete('/:id', 
authorizationVal,
inputValidationMidldewareErrors,
async (req: RequestWithParams<idParams>, res: Response) => {
    let deletePost = await postRepositoryDb.deletePost(req.params.id)
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
async (req: RequestWithBody<inputPostModel>, res: Response<postsTypeDb>) => {
const newPostCreate = await postRepositoryDb.createPost(req.body)
        res.status(HTTP_STATUSES.CREATED_201).send(newPostCreate)
})  

postRouterDb.put('/:id', 
authorizationVal,
postTitleVal,
postShortDescriptionVal,
postContentVal,
postBlogIdVal,
inputValidationMidldewareErrors,
async (req: RequestWithParamsAndBody<idParams, inputPostModel>, res: Response<postsTypeDb>) => {
    const postUpdate = await postRepositoryDb.updatePost(req.params.id, req.body)
        if(!postUpdate) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}) 