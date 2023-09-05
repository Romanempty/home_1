import { ObjectId } from "mongodb";
import { client } from "../db/db";
import { PostDBModel } from "../models/posts/PostDBModel";
import { PostViewModel } from "../models/posts/PostViewModel";
import { formatPost } from "../helper/formatPost";
import { PostsViewModel } from "../models/posts/PostsViewModel";

const postsCollection = client.db().collection<PostDBModel>('posts');

export const formatGetResponsePosts = (postsDB: PostDBModel[], pagesCount: number, page: number, pageSize: number, totalCount: number ): PostsViewModel => {
    if(postsDB.length===0){
        const posts: PostsViewModel = {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items:[]
        };
        return posts
    } else {
    const items = postsDB.map(post => formatPost(post));
    const posts: PostsViewModel = {
        pagesCount,
        page,
        pageSize,
        totalCount,
        items
    };
    return posts; 
    }

}

export const postsQueryRepository = {
    async findPosts(sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number): Promise <PostsViewModel>{
        const skipRecords = (pageNumber - 1)*pageSize;
        const totalCount = await postsCollection.countDocuments({});
        const pagesCount = Math.ceil(totalCount/pageSize);
        const sorting = sortDirection==='desc'? -1 : 1 ;
        const model: PostDBModel[] = await postsCollection
        .find({ })
        .sort({ [sortBy]: sorting })
        .skip(skipRecords)
        .limit(pageSize)
        .toArray()
        const blogs: PostsViewModel = formatGetResponsePosts(model, pagesCount, pageNumber, pageSize, totalCount) 
        return blogs
    },

    async findPostById(id: string): Promise <PostViewModel| null>{
        const foundPostDB: PostDBModel | null = await postsCollection.findOne({_id: new ObjectId(id)})
        if(foundPostDB){
            const post: PostViewModel = formatPost(foundPostDB)
            return post;
        } else {
            return null;
        };
    },

    async findPostsByBlogId(id: string, sortBy: string, sortDirection:'asc'|'desc', pageNumber: number, pageSize: number): Promise <PostsViewModel>{
        const skipRecords = (pageNumber - 1)*pageSize;
        const sorting = sortDirection==='desc'? -1 : 1 ;
        const totalCount = await postsCollection.countDocuments({ blogId : id});
        const pagesCount = Math.ceil(totalCount/pageSize);
        const model: PostDBModel[] = await postsCollection
                    .find({ blogId : id})
                    .sort({ [sortBy]: sorting })
                    .skip(skipRecords)
                    .limit(pageSize)
                    .toArray();
        const posts: PostsViewModel = formatGetResponsePosts(model, pagesCount, pageNumber, pageSize, totalCount)
        return posts;
    }

}

