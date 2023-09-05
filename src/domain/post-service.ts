import { ObjectId } from "mongodb"
import { postViewModel } from "../types/postsTypes"
import { blogsCollection, postsCollection } from "../repositories/db"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { body } from "express-validator"
import { blogModel, blogsViewModel } from "../types/blogsTypes"
import { postRepositoryDb } from "../repositories/post-repositories-db"
import { queryRepositoryBlogs } from "./query-repository-blogs"
import { allowedNodeEnvironmentFlags } from "process"
import { inputPostModel } from "../types/postsTypes" 
import { postModel } from "../types/postsTypes"

export const postsService = {

    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<ObjectId> {
        const blog: blogsViewModel | null = await queryRepositoryBlogs.findBlogById(blogId)
        const createdPost: inputPostModel = {
            title,
            shortDescription,
            content,
            blogId: blog!.id,
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        const CreatePostId: ObjectId = await postRepositoryDb.createPost(createdPost)
        return CreatePostId
    },

    async updatePost(id: string, title: string, shortDescription:string, content: string, blogId: string): Promise<boolean>{
        return await postRepositoryDb.updatePost(id, title, shortDescription, content)
    },

    async deletePostId(id: string): Promise<boolean> {
        const postDelete = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!postDelete){
            return false
        }
        return await postRepositoryDb.deletePost(id)
    },

    async deletePosts(): Promise<void> {
        return await postRepositoryDb.deleteAllPosts()
    }

}