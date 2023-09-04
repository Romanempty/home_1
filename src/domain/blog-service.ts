import { ObjectId } from "mongodb"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { blogsViewModel } from "../types/blogsTypes"

export const blogService = {
    
    async createBlog(name: string, description: string, websiteUrl: string): Promise<object> {
        const createBlog = {
            _id: new ObjectId(),
            name:name,
            description:description,
            websiteUrl:websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return  blogRepositoryDb.createBlog(createBlog)
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string) : Promise<boolean> {
        return  blogRepositoryDb.updateBlog(id, name, description, websiteUrl)
    },

    async deleteBlogId(id: string): Promise<boolean> {
        return  blogRepositoryDb.deleteBlog(id)
    },
    
    async deleteBlogs(): Promise<void> {
        return blogRepositoryDb.deleteBlogs()
    }
}