import { ObjectId } from "mongodb";
import { client } from "../db/db";
import { BlogDBModel } from "../models/blogs/BlogDBModel";
import { CreatedBlogViewModel } from "../models/blogs/CreatedBlogModel";
import { CreateResponseModel, DeleteResponseModel, UpdateResponseModel } from "../models/blogs/ResponseModel";
import { blogsQueryRepository } from "./blogsQueryRepository";

const blogsCollection = client.db().collection<BlogDBModel>('blogs');

export const blogsRepository = {

    //catch error if null
    async createBlog(body: CreatedBlogViewModel): Promise<ObjectId>{
        const response: CreateResponseModel = await client.db().collection<CreatedBlogViewModel>('blogs').insertOne(body);
        const createdBlogId = response.insertedId; 
        return createdBlogId; 
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean>{
        const foundBlog = await blogsQueryRepository.findBlogById(id);
        
        if(foundBlog ){
            //@ts-ignore
            const updatedBlog: UpdateResponseModel = await blogsCollection.updateOne({_id: new ObjectId(id)},{$set : {name, description, websiteUrl}});
            const isBlogUpdated = !!updatedBlog.modifiedCount;
            return isBlogUpdated;
        } else {
            return false;
        }
    },

    async deleteBlog(id: string): Promise <boolean>{
        const isDeleted: DeleteResponseModel = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        const isBlogDeleted = !!isDeleted.deletedCount;
        return isBlogDeleted;
    },

    async deleteAllBlogs(): Promise <void>{
        await blogsCollection.deleteMany({});
     }

};