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

export const blogRouterDb = Router({})

blogRouterDb.get('/', async (req: Request, res: Response) => {
    const blogs: blogsTypeDb[] = await blogRepositoryDb.findBlogs()
    res.status(HTTP_STATUSES.OK_200).send(blogs)
})

blogRouterDb.get('/:id', async (req: RequestWithParams<idParams>, res: Response<blogsTypeDb>) => {
    const foundBlog = await blogRepositoryDb.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundBlog)
})

blogRouterDb.delete('/:id', 
authorizationVal,
inputValidationMidldewareErrors,
async (req: RequestWithParams<idParams>, res: Response) => {
    const deletedBlog = await blogRepositoryDb.deleteBlog(req.params.id)
    if(!deletedBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.NO_CONTENT_204).send(deletedBlog)
})  

blogRouterDb.post('/', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: RequestWithBody<upBlogeDb>, res: Response<blogsTypeDb>) => {
const newBlog = await blogRepositoryDb.createBlog(req.body) 
        res.status(HTTP_STATUSES.CREATED_201).send(newBlog)
})  

blogRouterDb.put('/:id', 
authorizationVal,
blogNameVal,
blogDescriptionVal,
blogWebsiteUrlVal,
inputValidationMidldewareErrors,
async (req: RequestWithParamsAndBody<idParams, upBlogeDb>, res: Response<blogsTypeDb>) => {
    const blogUpdate = await blogRepositoryDb.updateBlog(req.params.id, req.body)
        if(blogUpdate) {
            return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)            
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }    
}) 