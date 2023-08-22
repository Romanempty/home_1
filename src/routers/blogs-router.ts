import { Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { blogRepositoryDb } from "../repositories/blog-repositories-db";
import { authorizationVal } from "../midlewaress/valMiddlewire";
import { inputValidationMidldewareErrors } from "../midlewaress/valMiddlewire";
import { blogNameVal } from "../midlewaress/valBlog";
import { blogDescriptionVal } from "../midlewaress/valBlog";
import { blogWebsiteUrlVal } from "../midlewaress/valBlog";
import { blogsTypeDb, upBlogeDb } from "../types/blogsTypes";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody } from "../views/requestViewss";
import { idParams } from "../views/requestViewss";
import { ObjectId } from "mongodb";
import { blogService } from "../domain/blog-service";
import { queryRepositoryBlogs } from "../domain/query-repository-blogs";


export const blogRouterDb = Router({})

blogRouterDb.get('/', async (req: Request, res: Response) => {
    const blogs = await queryRepositoryBlogs.findBlogs(req.params.pageSize, req.params.pageNamber, req.params.sortDirection)
    res.status(HTTP_STATUSES.OK_200).send(blogs)
})

blogRouterDb.get('/:id', async (req: Request, res: Response) => {
    const foundBlog = await blogService.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundBlog)
})

blogRouterDb.get('/:id/posts', async (req: Request, res: Response) => {
    const blogFindForPost = await blogRepositoryDb.findBlog(req.params.id)
    if (!blogFindForPost){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(blogFindForPost)
        return
    }

    const blogFindPost = await queryRepositoryBlogs.findPostBlog(req.query.pageNamber + "" || "1", req.query.pageSize + "" || "10", 
        req.query.sortDirection + "" || "desc", req.query.sortBy + "" || "createdAt")

        if (blogFindPost) {
            res.status(HTTP_STATUSES.OK_200).send(blogFindPost)
            return
        }
})

blogRouterDb.delete('/:id', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: Request, res: Response) => {
    const deletedBlog = await blogService.findBlog(req.params.id)
    if(!deletedBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    const blogDelete = await blogService.deleteBlogId(req.params.id)
    res.sendStatus(HTTP_STATUSES.CREATED_201)
})  

blogRouterDb.post('/', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: Request, res: Response) => {
const newBlog = await blogService.createBlog(req.body.name, req.body.description, req.body.websiteUrl) 
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
})  

blogRouterDb.post('/:id/posts', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: Request, res: Response) => {
    const blogFindPost = await blogRepositoryDb.findBlog(req.params.id)
    if (!blogFindPost){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(blogFindPost)
        return
    }
const newPostBlogId = await queryRepositoryBlogs.createPostBlog(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
    if(newPostBlogId) {
        res.status(HTTP_STATUSES.CREATED_201).send(newPostBlogId)
        return
    }        
})  

blogRouterDb.put('/:id', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: Request, res: Response) => {
    const blogUpdate = await blogService.findBlog(req.params.id)
        if(blogUpdate) {
            return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)            
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
    const blogUp = await blogService.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)    
}) 