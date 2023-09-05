import { ObjectId } from "mongodb";
import { client } from "../db/db";
import { PostDBModel } from "../models/posts/PostDBModel";
import { PostViewModel } from "../models/posts/PostViewModel";
import { CreateResponseModel, DeleteResponseModel, UpdateResponseModel } from "../models/blogs/ResponseModel";
import { CreatedPostModel } from "../models/posts/CreatedPostModel";
import { postsQueryRepository } from "./postsQueryRepository";

const postsCollection = client.db().collection<PostDBModel>('posts');

const formatPost = (postDB: PostDBModel ): PostViewModel =>{
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

export const postsRepository = {

    //catch error if null
    async createPost(postBody: CreatedPostModel): Promise <ObjectId>{
        const response: CreateResponseModel = await client.db().collection<CreatedPostModel>('posts').insertOne(postBody);
        const ceatedPostObjectID = response.insertedId;
        return ceatedPostObjectID;
    },
    async updatePost(postId: string, title: string, shortDescription: string, content: string): Promise <boolean>{
        let foundPost = await postsQueryRepository.findPostById(postId);
        if(foundPost){
            //@ts-ignore
            const updatedPost: UpdateResponseModel = await postsCollection.updateOne({_id: new ObjectId(postId)},[ { $set: { title, shortDescription, content } } ])
            const isPostUpdated = !!updatedPost.modifiedCount;
            return isPostUpdated;
        }
        return false;
    },

    async deletePost(id: string): Promise <boolean>{
        const isDeleted: DeleteResponseModel = await postsCollection.deleteOne({_id: new ObjectId(id)});
        const isPostDeleted = !!isDeleted.deletedCount;
        return isPostDeleted;
    },

    async deleteAllPosts(): Promise <void>{
        await postsCollection.deleteMany({});
    },

}

