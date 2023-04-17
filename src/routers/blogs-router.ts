import { Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { blogs } from "../repositories/blogs-repositories";
import { blogRepository } from "../repositories/blogs-repositories";
import { authorizationVal } from "../midlewaress/valMiddlewire";
import { inputValidationMidldewareErrors } from "../midlewaress/valMiddlewire";
import { blogNameVal } from "../midlewaress/valBlog";
import { blogDescriptionVal } from "../midlewaress/valBlog";
import { blogWebsiteUrlVal } from "../midlewaress/valBlog";
export const blogRouter = Router({})

blogRouter.get('/', (req: Request, res: Response) => {
    const allBlogs = blogRepository.findBlogs()
    res.status(HTTP_STATUSES.OK_200).send(blogs)
})

blogRouter.get('/:id', (req: Request, res: Response) => {
    let foundBlog = blogRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundBlog)
})

blogRouter.delete('/:id', 
authorizationVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    let foundBlog = blogRepository.deleteBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundBlog)
})  

blogRouter.post('/', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl
    const newBlogCreate = blogRepository.createBlog(name, description, websiteUrl)
        res.status(HTTP_STATUSES.CREATED_201).send(newBlogCreate)
})  

blogRouter.put('/:id', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
(req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const description = req.body.description
    const websiteUrl = req.body.websiteUrl
    const blogUpdate = blogRepository.updateBlog(id, name, description, websiteUrl)
        if(!blogUpdate) {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
}) 