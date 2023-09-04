import { postForm } from "../repositories/post-repositories-db";
import { PostType, postModel, postViewModel } from "../types/postsTypes";
import { promises } from "dns";
import { postsCollection } from "../repositories/db";
import { ObjectId } from "mongodb";


export const postFormResponce = (posts: postModel[], pagesCount: number, page: number, pageSize: number, totalCount: number): PostType => {
    if (posts.length === 0){
        const post: PostType = {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items:[]
        }
        return post
    } else {
        const items = posts.map(post => postForm(post))
        const post: PostType ={
            pagesCount,
            page,
            pageSize,
            totalCount,
            items
        }
        return post
    }
}

export const postQueryRepository = {

    async findPosts(sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number): Promise<PostType> {
        const skipRecords = (pageNamber - 1) * pageSize
        const totalCount = await postsCollection.countDocuments({})
        const pageCount = Math.ceil(totalCount / pageSize)
        const sorting = sortDirection === 'desc' ? -1 : 1
        const model: postModel[] =await postsCollection
        .find({ })
        .sort({[sortBy]: sorting})   
        .skip(skipRecords)
        .limit(pageSize)
        .toArray()
        const blogs: PostType = postFormResponce(model, pageCount, pageNamber, pageSize, totalCount)
        return blogs
    },

    async findPostID(id: string): Promise<postViewModel | null> {
        const foundPost: postModel | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if (foundPost) {
            const post: postViewModel = postForm(foundPost)
            return post
        } else {
            return null
        }
    },

    async findPostBlog(id: string, sortBy: string, sortDirection: 'asc' | 'desc', pageNamber: number, pageSize: number): Promise<PostType> {
        const skipRecords = (pageNamber - 1) * pageSize
        const sorting = sortDirection == 'desc' ? -1 : 1
        const totalCount = await postsCollection.countDocuments({blogId: id})
        const pageCount = Math.ceil(totalCount / pageSize)
        const model: postModel[] = await postsCollection
        .find({blogId: id})
        .sort({[sortBy]: sorting})   
        .skip(skipRecords)
        .limit(pageSize)
        .toArray()
        const blogs: PostType = postFormResponce(model, pageCount, pageNamber, pageSize, totalCount)
        return blogs
    }
} 