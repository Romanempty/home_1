import { ObjectId } from "mongodb";
import { CreatedBlogViewModel } from "../models/blogs/CreatedBlogModel";
import { blogsRepository } from "../repositories/blogsRepository";

export const blogsService = {

    //catch error if null
    async createBlog(name: string, description: string, websiteUrl: string): Promise<ObjectId>{
        const body: CreatedBlogViewModel = {
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        return blogsRepository.createBlog(body);
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        return blogsRepository.updateBlog(id, name, description, websiteUrl);
    },

    async deleteBlog(id: string): Promise <boolean>{
        return blogsRepository.deleteBlog(id);
    },

    async deleteAllBlogs(): Promise <void>{
        return blogsRepository.deleteAllBlogs();
    }

};