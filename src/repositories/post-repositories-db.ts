import { promises } from "dns"
import { inputPostModel, postsTypeDb } from "../types/postsTypes"
import { postsTypeDbType } from "../types/postsTypes"
import { blogsCollection, postsCollection } from "./db"
import { ObjectId } from "mongodb"
import { PageType } from "../types/blogsTypes"

function skipp(pageNamber: string, pageSize: string): number {
    return (+pageNamber - 1) * (+pageSize)
}

export const postRepositoryDb = {

    async findPosts(pageNamber: string, pageSize: string, sortDirection: string, sortBy: string): Promise<PageType<postsTypeDb>> {
        const result = await postsCollection.find({})
        .sort({[sortBy]: sortDirection === "desc" ? 1: -1})
        .skip(skipp(pageNamber, pageSize))
        .limit(+pageSize)
        .toArray()

        const itemPost: postsTypeDb[] = result.map(el => ({
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription, 
            content: el.content,
            blogId: el.blogId, 
            blogName: el.blogName,
            createdAt: el.createdAt
        }))

        const pageCount = Math.ceil((+itemPost.length) / (+pageSize))
        const response: PageType<postsTypeDb> = {
            pageCount: pageCount,
            page: +pageNamber,
            pageSize: +pageSize,
            totalCount: itemPost.length,
            items: itemPost
        }
        return response
    },

    async findPost(id: string): Promise<postsTypeDb | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const _id = new ObjectId(id)
        const foundedPost: postsTypeDbType | null = await postsCollection.findOne({_id: _id})
    
        if (!foundedPost) {
            return null
        }
        return {
            id: foundedPost._id.toString(),
            title: foundedPost.title,
            shortDescription: foundedPost.shortDescription, 
            content: foundedPost.content,
            blogId: foundedPost.blogId, 
            blogName: foundedPost.blogName,
            createdAt: foundedPost.createdAt
        }
    },

    async createPost(data: inputPostModel): Promise<postsTypeDb | undefined> {
    const postByBlogId = await blogsCollection.findOne({_id: new ObjectId(data.blogId)})
        if (!postByBlogId) {
            return undefined
        }
        const newPostDb: postsTypeDbType = {
            _id: new ObjectId(),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: postByBlogId.name,
            createdAt: new Date().toISOString()
        }
        await postsCollection.insertOne(newPostDb)
        return {
            id: newPostDb._id.toString(),
            title: newPostDb.title,
            shortDescription: newPostDb.shortDescription,
            content: newPostDb.content,
            blogId: newPostDb.blogId ,
            blogName: newPostDb.blogName,
            createdAt: newPostDb.createdAt
        }
    },

    async updatePost(id: string, data: inputPostModel ): Promise<boolean> {
    const result = await postsCollection.updateOne({_id: new ObjectId(id)}, {
        $set: {
            title: data.title,
            shortDescription: data.shortDescription, 
            content: data.content, 
            blogId: data.blogId
        }
    })
    return result.matchedCount === 1
    },

    async deletePost(id:string): Promise<boolean> {
    const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
    return result.deletedCount === 1
    },

    async deletePosts(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.acknowledged === true
    }
}