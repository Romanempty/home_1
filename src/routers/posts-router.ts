import {Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { posts } from "../repositories/posts-repositories";
import { postRepository } from "../repositories/posts-repositories";
import { authorizationVal } from "../midlewaress/valMiddlewire";
import { postTitleVal } from "../midlewaress/valPost";
import { postShortDescriptionVal } from "../midlewaress/valPost";
import { postContentVal } from "../midlewaress/valPost";
import { postBlogIdVal } from "../midlewaress/valPost";
import { inputValidationMidldewareErrors } from "../midlewaress/valMiddlewire";
export const postRouter = Router({})

postRouter.get('/', (req: Request, res: Response) => {
    const allPosts = postRepository.findPosts()
    res.status(HTTP_STATUSES.OK_200).send(posts)
})

postRouter.get('/:id', (req: Request, res: Response) => {
    let foundPost = postRepository.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundPost)
})

postRouter.delete('/:id', 
authorizationVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    let foundPost = postRepository.deletePost(req.params.id)
    if (!foundPost) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.NO_CONTENT_204).send(foundPost)
})  

postRouter.post('/', 
authorizationVal,
postTitleVal,
postShortDescriptionVal,
postContentVal,
postBlogIdVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId
    const newPostCreate = postRepository.createPost(title, shortDescription, content, blogId)
        res.status(HTTP_STATUSES.CREATED_201).send(newPostCreate)
})  

postRouter.put('/:id', 
authorizationVal,
postTitleVal,
postShortDescriptionVal,
postContentVal,
postBlogIdVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    const id = req.params.id
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId
    const postUpdate = postRepository.updatePost(id, title, shortDescription, content, blogId)
        if(!postUpdate) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}) 