import { postsType } from "../types/postsTypes";
import { allPostsType } from "../types/postsTypes";
import { blogRepository } from "./blogs-repositories";

export let posts: allPostsType = []

export const postRepository = {
    findPosts(): allPostsType {
        return posts
    },

    findPost(id: string): postsType | undefined {
        let post = posts.find(p => p.id === id)
        return post
    },

    createPost(title: string, shortdescription: string, content: string, blogId: string) {
        const postId = blogRepository.findBlog(blogId)
        const newPost: postsType = {
            id: (posts.length + 1).toString(),
            title: title,
            shortdescription: shortdescription,
            content: content,
            blogId:postId!.id,
            blogName:postId!.name
        }
        posts.push(newPost)
        return newPost
    },

    updatePost(id: string, title: string, shortdescription: string, content: string, blogId: string) {
        let foundPostById = posts.find(p => p.id === id)
        if(foundPostById) {
            foundPostById.title = title
            foundPostById.shortdescription = shortdescription
            foundPostById.content = content
            foundPostById.blogId = blogId
            return true
        }
        return false
    },

    deletePost(id:string) {
        let foundPostId = posts.find(p => p.id === id)
        if(foundPostId) {
            posts = posts.filter(p => p !== foundPostId)
            return true
        }
        return false
    },

    deletePosts() {
        posts.splice(0, posts.length)
    }


}