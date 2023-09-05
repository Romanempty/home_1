import { PostDBModel } from "../models/posts/PostDBModel";
import { PostViewModel } from "../models/posts/PostViewModel";

export const formatPost = (postDB: PostDBModel ): PostViewModel =>{
    const post = { 
        id: postDB._id.toString(), 
        title: postDB.title,
        shortDescription: postDB.shortDescription,
        content: postDB.content,
        blogId: postDB.blogId,
        blogName: postDB.blogName,
        createdAt: postDB.createdAt
    };
    return post;
}