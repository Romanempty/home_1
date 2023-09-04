import { ObjectId, WithId } from "mongodb"
import { blogsCollection, postsCollection } from "../repositories/db"
import { BlogType, blogModel, blogsViewModel } from "../types/blogsTypes"
import { postModel, postViewModel } from "../types/postsTypes"
import { promises } from "dns" 

export const queryRepositoryBlogs = {

async findBlogs(searchName: string | null, sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number): Promise<BlogType> {
    const skipRecords = (pageNamber - 1) * pageSize
    const sorting = sortDirection == 'desc' ? -1 : 1
    if (searchName) {
        const filerBlog = await blogsCollection.countDocuments({name: {$regex: searchName, $options: 'i'}})
        const pageCountFilter = Math.ceil(filerBlog / pageSize)
        const model: blogModel[] = await blogsCollection
            .find({name: {$regex: searchName, $options: 'i'}})
            .sort({[sortBy]: sorting})
            .skip(skipRecords)
            .limit(pageSize)
            .toArray()
        const blogs: BlogType = blogFormResponce(model, pageCountFilter, pageNamber, pageSize, filerBlog)
        return blogs
    } else {
        const totalCount = await blogsCollection.countDocuments()
        const totalPageCount = Math.ceil(totalCount / pageSize)
        const model: blogModel[] = await blogsCollection
            .find({ })
            .sort({[sortBy]: sorting})   
            .skip(skipRecords)
            .limit(pageSize)
            .toArray()
        const blogs: BlogType = blogFormResponce(model, totalCount, pageNamber, pageSize, totalPageCount)
            return blogs
    }
},

async findBlogById(id: string): Promise<blogsViewModel | null> {
    const foundBlog: blogModel | null = await blogsCollection.findOne({_id: new ObjectId(id)})
        if(foundBlog) {
            const blog: blogsViewModel = blogForm(foundBlog)
                return blog
        } else {
            return null
        }
}
}

export const blogForm = (blog: blogModel): blogsViewModel => {
    const blogs = {
        id:blog._id.toString(),
        name:blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
    return blogs
}

export const blogFormResponce = (blog: blogModel[], pagesCount: number, page: number, pageSize: number, totalCount: number): BlogType => {
    if (blog.length === 0){
        const blogs: BlogType = {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items:[]
        }
        return blogs
    } else {
        const items = blog.map(blogs => blogForm(blogs))
        const blogsdb: BlogType = {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items
        }
        return blogsdb
    }
}