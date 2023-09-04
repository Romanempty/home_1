import { promises } from "dns"
import { inputPostModel, postModel, postViewModel } from "../types/postsTypes"
import { blogsCollection, client, postsCollection } from "./db"
import { ObjectId } from "mongodb"
import { format } from "path"
import { postQueryRepository } from "../domain/query-repository-post"
import { CreateResponseModel } from "../types/blogsTypes"
import { DeleteResponseModel } from "../types/blogsTypes"



export const postRepositoryDb = {

    async createPost(postBody: inputPostModel): Promise <ObjectId>{
        const response: CreateResponseModel = await client.db().collection<inputPostModel>('posts').insertOne(postBody);
        const ceatedPostObjectID = response.insertedId;
        return ceatedPostObjectID;
    },
    async updatePost(postId: string, title: string, shortDescription: string, content: string): Promise <boolean>{
        let foundPost = await postQueryRepository.findPostID(postId);
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

export const postForm = (posts: postModel): postViewModel => {
    const post = {
        id: posts._id.toString(),
        title: posts.title,
        shortDescription: posts.shortDescription, 
        content: posts.content,
        blogId: posts.blogId,
        blogName: posts.blogName,
        createdAt: posts.createdAt,
    }
    return post
}