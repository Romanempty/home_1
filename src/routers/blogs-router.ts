import { Request, Response, Router } from "express";
import HTTP_STATUSES from "../views/statusViews";
import { blogRepositoryDb } from "../repositories/blog-repositories-db";
import { blogIdValid } from "../midlewaress/valBlog";
import { blogService } from "../domain/blog-service";
import { queryRepositoryBlogs } from "../domain/query-repository-blogs";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../views/requestViewss";
import { BlogType, blogsViewModel } from "../types/blogsTypes";
import { postQueryRepository } from "../domain/query-repository-post";
import { ObjectId } from "mongodb";
import { postsService } from "../domain/post-service";
import { postViewModel } from "../types/postsTypes";
import { isValidObjectId } from "../midlewaress/valBlog";
import { RequestWithParamsAnqQuery } from "../views/requestViewss";
import { basicAuthMiddleware } from "../midlewaress/valMiddlewire";
import { BlogsValidationMiddleware } from "../midlewaress/valBlog";
import { BlogsValidationMiddlewareCreatePost } from "../midlewaress/valBlog";

export const blogRouterDb = Router({})

blogRouterDb.get('/', async (req: RequestWithQuery<{searchName: string | null, sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number}>, res: Response) => {
    const searchName = req.query.searchName || null
    const sortBy = req.query.sortBy || 'createdAt'
    const sortDirection = req.query.sortDirection || 'desc'
    const pageNamber = +req.query.pageNamber || 1
    const pageSize = +req.query.pageSize || 10
    const blogs: BlogType = await queryRepositoryBlogs.findBlogs(searchName, sortBy, sortDirection, pageNamber, pageSize)
    res.status(HTTP_STATUSES.OK_200).send(blogs)
})

blogRouterDb.get('/:id',blogIdValid, async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id

    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const foundBlog: blogsViewModel | null = await queryRepositoryBlogs.findBlogById(id)
    if (!foundBlog) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    return
    } 
    res.status(HTTP_STATUSES.OK_200).send(foundBlog)
})


blogRouterDb.get("/:id/posts", async (req: RequestWithParamsAnqQuery <{id: string}, { sortBy: string, sortDirection:'asc'|'desc', pageNamber: number, pageSize: number}>, res: Response) => {
    const id = req.params.id;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortDirection = req.query.sortDirection || 'desc';
    const pageNamber = req.query.pageNamber || 1;
    const pageSize = req.query.pageSize || 10;

    const isObjectId = isValidObjectId(id);
    if (!isObjectId) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }

    const blogFindForPost: blogsViewModel | null = await queryRepositoryBlogs.findBlogById(id);
    if (blogFindForPost) {
        const blogFindPost = await postQueryRepository.findPostBlog(blogFindForPost.id, sortBy, sortDirection, pageNamber, pageSize);
        return res.status(HTTP_STATUSES.OK_200).send(blogFindPost);
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
})

blogRouterDb.delete('/:id', 
basicAuthMiddleware,
async (req: RequestWithParams<{id: string}>, res: Response) => {
    const blogId = req.params.id;

    const isObjectId = isValidObjectId(blogId);

    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const deletedBlog = await blogService.deleteBlogId(blogId)
    if(deletedBlog){
        return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }else{
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
}) 

blogRouterDb.post('/', 
basicAuthMiddleware, 
BlogsValidationMiddleware,
async (req: RequestWithBody<{ name: string, description: string, websiteUrl: string }>, res: Response) => {
    const {
        name,
        description,
        websiteUrl
    } = req.body;

const newBlogId: ObjectId = await blogService.createBlog(name, description, websiteUrl) 
const createNewBlog: blogsViewModel | null = await queryRepositoryBlogs.findBlogById(newBlogId.toString())
    return res.status(HTTP_STATUSES.CREATED_201).send(createNewBlog)
})  

blogRouterDb.post('/:id/posts', 
basicAuthMiddleware,
BlogsValidationMiddlewareCreatePost,
async (req: RequestWithParamsAndBody<{id: string}, { title: string, shortDescription:string, content: string }>, res: Response) => {
    const blogFindPost = await queryRepositoryBlogs.findBlogById(req.params.id)
    if (!blogFindPost){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(blogFindPost)
        return
    } else {
    const newPostBlogId = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
    const createPost: postViewModel | null = await postQueryRepository.findPostID(newPostBlogId.toString()) 
    return res.status(HTTP_STATUSES.CREATED_201).send(createPost)
}
}),

blogRouterDb.put('/:id', 
basicAuthMiddleware,
BlogsValidationMiddlewareCreatePost,
async (req: RequestWithParamsAndBody<{id: string}, {name: string, description: string, websiteUrl: string}>, res: Response) => {
    const blogId = req.params.id;

    const isObjectId = isValidObjectId(blogId); 
    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const blogUpdate: boolean = await blogService.updateBlog(blogId, req.body.name, req.body.description, req.body.websiteUrl)
        if(blogUpdate) {
            return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)            
        } else {
            return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }
}) 