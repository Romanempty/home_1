import { ObjectId, WithId } from "mongodb"
import { blogsCollection, postsCollection } from "../repositories/db"
import { PageType, blogsTypeDb } from "../types/blogsTypes"
import { postsTypeDb, postsTypeDbType } from "../types/postsTypes"

function skipp(pageNamber: string, pageSize: string): number {
    return (+pageNamber - 1) * (+pageSize)
}

export const queryRepositoryBlogs = {

async findBlogs(pageSize: string, pageNamber: string, sortDirection: string): Promise<PageType<blogsTypeDb>> {
    const result = await blogsCollection.find({})
        .sort({'createdAt':1})
        .skip(skipp(pageNamber, pageSize))
        .limit(+pageSize)
        .toArray()

    const itemBlog: blogsTypeDb[] = result.map(el => ({
            id: el._id.toString(),
            name: el.name,
            description: el.description,
            websiteUrl: el.websiteUrl,
            createdAt: el.createdAt,
            isMembership: el.isMembership
        }))

    const pageCounte = Math.ceil((+itemBlog.length) / (+pageSize))

    const response: PageType<blogsTypeDb> = {
        pageCount: pageCounte,
        page: +pageNamber,
        pageSize: +pageSize,
        totalCount: +itemBlog,
        items:itemBlog
    }
    return response
},

async createPostBlog(title: string, shortDescription: string, content: string, blogId: string): Promise<postsTypeDb | null> {
    const createPostForBlog = await blogsCollection.findOne({_id: new ObjectId(blogId)})

    if (!createPostForBlog) {
        return null
    }

    const createPostInBlog: WithId<postsTypeDbType> = {
        _id: new ObjectId,
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: createPostForBlog._id.toString() ,
        blogName: createPostForBlog.name,
        createdAt: new Date().toISOString(),
    }

    const result = await postsCollection.insertOne(createPostInBlog)
    return {
        id: result.insertedId.toString(),
        title: createPostInBlog.title,
        shortDescription: createPostInBlog.shortDescription,
        content: createPostInBlog.content,
        blogId:  blogId,
        blogName: createPostInBlog.blogName,
        createdAt: createPostInBlog.createdAt
    }
},


async findPostBlog(pageNamber: string, pageSize: string, sortDirection: string, sortBy: string): Promise<PageType<postsTypeDb>> {
    const result = await postsCollection.find({})
        .sort({[sortBy]: sortDirection === "desc" ? 1: -1})
        .skip(skipp(pageNamber, pageSize))
        .limit(+pageSize)
        .toArray()

    const postBlog: postsTypeDb[] = result.map(el => ({
        id: el._id.toString(),
        title: el.title,
        shortDescription: el.shortDescription,
        content: el.content,
        blogId: el.blogId,
        blogName: el.blogName,
        createdAt: el.createdAt
    }))

    const totalCount = await postsCollection.countDocuments()

    const pageCount = Math.ceil((totalCount) / (+pageSize))

    const response: PageType<postsTypeDb> = {
        pageCount: pageCount,
        page: +pageNamber,
        pageSize: +pageSize,
        totalCount: totalCount,
        items: postBlog
    }
    return response
}

}