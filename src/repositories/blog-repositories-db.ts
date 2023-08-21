import { ObjectId, WithId } from "mongodb"
import { blogsTypeDbType } from "../types/blogsTypes"
import { blogsCollection } from "./db"
import { blogsTypeDb } from "../types/blogsTypes"
import { upBlogeDb } from "../types/blogsTypes"
import { log } from "console"
import { blogsType } from "../types/blogsTypes"


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
        const blogId = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (blogId) {
    return {
        id: blogId._id.toString(),
        name: blogId.name,
        description: blogId.description, 
        websiteUrl: blogId.websiteUrl,
        createdAt: blogId.createdAt,
        isMembership: blogId.isMembership  
        }
    } else {
        return null
    }
    
},

    async createBlog(createBlog: WithId<blogsType>): Promise<blogsTypeDb> {
        const result = await blogsCollection.insertOne(createBlog)
        return {
            id: createBlog._id.toString(),
            name: createBlog.name,
            description : createBlog.description,
            websiteUrl: createBlog.websiteUrl,   
            createdAt: createBlog.createdAt,
            isMembership: createBlog.isMembership
        }
    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
    return false
    }
    const result = await  blogsCollection.updateOne({_id: new ObjectId(id)}, {
        $set: {
            name: name,
            description : description, 
            websiteUrl : websiteUrl
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