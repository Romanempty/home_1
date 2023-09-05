import { ObjectId } from "mongodb";
import { BlogViewModel } from "../models/blogs/BlogViewModel";
import { CreatedPostModel } from "../models/posts/CreatedPostModel";
import { postsRepository } from "../repositories/postsRepository";
import { blogsQueryRepository } from "../repositories/blogsQueryRepository";

export const postsService = {

    //catch error if null
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise <ObjectId>{
        //clarify here
        //may be bettter to store in rep?
        const blog: BlogViewModel | null = await blogsQueryRepository.findBlogById(blogId);
        const body: CreatedPostModel = {
                title,
                shortDescription,
                content,
                blogId: blog!.id,
                blogName: blog!.name,
                createdAt: new Date().toISOString(),
        };
        const createdPostID: ObjectId = await postsRepository.createPost(body);
        return createdPostID;
    },
    async updatePost(postId: string, title: string, shortDescription: string, content: string): Promise <boolean>{
        return postsRepository.updatePost(postId, title, shortDescription,content);
    },

    async deletePost(id: string): Promise <boolean>{
        return postsRepository.deletePost(id);
    },

    async deleteAllPosts(): Promise <void>{
        return postsRepository.deleteAllPosts();
    },

}

