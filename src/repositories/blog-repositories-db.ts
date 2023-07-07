import { ObjectId } from "mongodb"
import { blogsTypeDbType } from "../types/blogsTypes"
import { blogsCollection } from "./db"
import { blogsTypeDb } from "../types/blogsTypes"
import { upBlogeDb } from "../types/blogsTypes"
import { log } from "console"

export const blogRepositoryDb = {
    
    async findBlogs(): Promise<blogsTypeDb[]> {
        const blogsDb = await blogsCollection.find({}).toArray()
        return blogsDb.map((blog: blogsTypeDbType) => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description, 
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }))
    },

    async findBlog(id: string): Promise<blogsTypeDb | null> {
        if (!ObjectId.isValid(id)) {
        return null
    }

    console.log('id: ', id)
    const _id = new ObjectId(id)
    const foundedBlog: blogsTypeDbType | null = await blogsCollection.findOne({_id: _id})
   console.log('foundBlog: ',foundedBlog )
    if (!foundedBlog) {
        return null
    }
    return {
        id: foundedBlog._id.toString(),
        name: foundedBlog.name,
        description: foundedBlog.description, 
        websiteUrl: foundedBlog.websiteUrl,
        createdAt: foundedBlog.createdAt,
        isMembership: foundedBlog.isMembership  
    }
},

    async createBlog(data:upBlogeDb): Promise<blogsTypeDb> {
        const newBlogDb: blogsTypeDbType = {
            _id: new ObjectId(),
            ...data,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        await blogsCollection.insertOne(newBlogDb)
        return {
            id: newBlogDb._id.toString(),
            name: newBlogDb.name,
            description : newBlogDb.description,
            websiteUrl: newBlogDb.websiteUrl,   
            createdAt: newBlogDb.createdAt,
            isMembership: newBlogDb.isMembership
        }
    },

    async updateBlog(id:string, data:upBlogeDb): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
    return false
    }
    const _id = new ObjectId(id)
    const result = await  blogsCollection.updateOne({_id: _id}, {
        $set: {
            name :data.name,
            description : data.description, 
            websiteUrl : data.websiteUrl
        }
    })
    return result.matchedCount === 1      
    },

    async deleteBlog(id:string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        return false
    }
    const _id = new ObjectId(id)
    const result = await  blogsCollection.deleteOne({_id: _id})
    return result.deletedCount === 1  
    },

    async deleteBlogs(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return result.acknowledged === true
    }
}    