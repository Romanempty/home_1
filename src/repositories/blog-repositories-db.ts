import { ObjectId, WithId } from "mongodb"
import { CreateResponseModel, InputblogModel, blogModel, blogsViewModel } from "../types/blogsTypes"
import { blogsCollection, client } from "./db"
import { body } from "express-validator"
import { queryRepositoryBlogs } from "../domain/query-repository-blogs"
import { DeleteResponseModel } from "../types/blogsTypes"

export const blogRepositoryDb = {
    
    async createBlog(createBlog: InputblogModel): Promise<ObjectId> {
        const result: CreateResponseModel = await client.db().collection<InputblogModel>('blogs').insertOne(createBlog)
        const createblogId = result.insertedId
        return createblogId
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const foundBlog = await queryRepositoryBlogs.findBlogById(id);
            if(foundBlog ){
            //@ts-ignore
            const updatedBlog: UpdateResponseModel = await blogsCollection.updateOne({_id: new ObjectId(id)},{$set : {name, description, websiteUrl}});
            const isBlogUpdated = !!updatedBlog.modifiedCount;
            return isBlogUpdated;
            } else {
                return false;
            }
    },

    async deleteBlog(id:string): Promise<boolean> {
        const isDeleted: DeleteResponseModel = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        const isBlogDeleted = !!isDeleted.deletedCount;
        return isBlogDeleted;
    },

    async deleteBlogs(): Promise<void> {
        const result = await blogsCollection.deleteMany({})
        await blogsCollection.deleteMany()
    }
}    