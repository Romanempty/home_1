import { ObjectId } from "mongodb"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { blogsTypeDbType, upBlogeDb } from "../types/blogsTypes"
import { blogsTypeDb } from "../types/blogsTypes"
import { blogsCollection } from "../repositories/db"
import { queryRepositoryBlogs } from "./query-repository-blogs"


export const blogService = {
    
    async createBlog(name: string, description: string, websiteUrl: string): Promise<blogsTypeDb> {
        const createBlog = {
            _id: new ObjectId(),
            name:name,
            description:description,
            websiteUrl:websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await blogRepositoryDb.createBlog(createBlog)
    },

    async findBlog(id: string): Promise<blogsTypeDb | null> {
        return await blogRepositoryDb.findBlog(id)
    },


    async updateBlog(id: string, name: string, description: string, websiteUrl: string) : Promise<boolean> {
        return await blogRepositoryDb.updateBlog(id, name, description, websiteUrl)
    },

    async deleteBlogId(id: string): Promise<boolean | null> {
        return await blogRepositoryDb.deleteBlog(id)
    },

    async deleteBlogs(): Promise<boolean> {
        return await blogRepositoryDb.deleteBlogs()
    }
}