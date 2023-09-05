import { Router, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { RequestWithBody, RequestWithBodyAndParams, RequestWithParams, RequestWithParamsAnqQuery, RequestWithQueryParams } from "../types/requestModelType";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { BlogsValidationMiddleware } from "../middlewares/blogs-validation-middleware";
import { BlogViewModel } from "../models/blogs/BlogViewModel";
import { isValidObjectId } from "../helper/isValidObjectId";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";
import { blogsQueryRepository } from "../repositories/blogsQueryRepository";
import { BlogsViewModel } from "../models/blogs/BlogsViewModel";
import { postsQueryRepository } from "../repositories/postsQueryRepository";
import { BlogsValidationMiddlewareCreatePost } from "../middlewares/blogs-validation-middleware-create-post";
import { PostViewModel } from "../models/posts/PostViewModel";
import { postsService } from "../domain/posts-service";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: RequestWithQueryParams<{searchNameTerm: string | null, sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number}>, res: Response) => {
    
    const searchNameTerm = req.query.searchNameTerm || null;
    const sortBy = req.query.sortBy || "createdAt";
    const sortDirection = req.query.sortDirection || "desc";
    const pageNumber = +req.query.pageNumber || 1;
    const pageSize = +req.query.pageSize || 10;
    const foundBlogs: BlogsViewModel = await blogsQueryRepository.findBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize);
    return res.status(HTTP_STATUSES.OK_200).send(foundBlogs);
});


blogsRouter.get("/:id", async (req: RequestWithParams<{id: string}>, res: Response) => {
    const id = req.params.id;

    const isObjectId = isValidObjectId(id);

    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };
    const foundBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(id);
    if(foundBlog){
    return res.status(HTTP_STATUSES.OK_200).send(foundBlog);
    } else {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});

blogsRouter.get("/:id/posts", async (req: RequestWithParamsAnqQuery <{id: string}, { sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number}>, res: Response) => {
    const id = req.params.id;

    const sortBy = req.query.sortBy || "createdAt";
    const sortDirection = req.query.sortDirection || "desc";
    const pageNumber = +req.query.pageNumber || 1;
    const pageSize = +req.query.pageSize || 10;

    const isObjectId = isValidObjectId(id);
    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const foundBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(id);

    if(foundBlog){
        const posts = await postsQueryRepository.findPostsByBlogId(foundBlog.id, sortBy, sortDirection, pageNumber, pageSize);
        return res.status(HTTP_STATUSES.OK_200).send(posts)
    } else {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    
}); 

blogsRouter.post("/", 
basicAuthMiddleware, 
BlogsValidationMiddleware, 
async (req: RequestWithBody<{name: string, description: string, websiteUrl: string}> , res: Response) => {
    const {
        name,
        description,
        websiteUrl
    } = req.body;

    const createdBlogObjectId: ObjectId = await blogsService.createBlog(name, description, websiteUrl);
    const createdBlog: BlogViewModel | null = await blogsQueryRepository.findBlogById(createdBlogObjectId.toString());
return res.status(HTTP_STATUSES.CREATED_201).send(createdBlog);
});

blogsRouter.post("/:id/posts",
basicAuthMiddleware,
BlogsValidationMiddlewareCreatePost,
async (req: RequestWithBodyAndParams<{id: string},{title: string, shortDescription: string, content: string}>, res: Response) => {

    const id = req.params.id;
    const {
        title,
        shortDescription,
        content
    } = req.body;

    const blog = await blogsQueryRepository.findBlogById(id);
    if(!blog){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    } else {
        const createdPostObjectId: ObjectId = await postsService.createPost(title, shortDescription, content, id);
        const createdPost: PostViewModel | null = await postsQueryRepository.findPostById(createdPostObjectId.toString());
        return res.status(HTTP_STATUSES.CREATED_201).send(createdPost);
    }
    
})

blogsRouter.put("/:id", 
basicAuthMiddleware, 
BlogsValidationMiddleware, 
async (req: RequestWithBodyAndParams<{id: string}, {name: string, description: string, websiteUrl: string}>, res: Response) => {
    const blogId = req.params.id;

    const isObjectId = isValidObjectId(blogId); 
    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const blogIsUpdated: boolean = await blogsService.updateBlog(blogId, req.body.name, req.body.description, req.body.websiteUrl);//we don't need to return

    if(blogIsUpdated){
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});

blogsRouter.delete("/:id", basicAuthMiddleware, async (req: RequestWithParams <{id: string}>, res: Response) => {
    const blogId = req.params.id;

    const isObjectId = isValidObjectId(blogId);

    if(!isObjectId){
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);     
    };

    const isBlogDeleted: boolean = await blogsService.deleteBlog(blogId);
    if(isBlogDeleted){
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }else{
    return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
})