import { allBlogsType } from "../types/blogsTypes"
import { blogsType } from "../types/blogsTypes"


export let blogs: allBlogsType = []
export const blogRepository = {
    
    findBlogs(): allBlogsType {
        return blogs
    },

    findBlog(id: string): blogsType | undefined {
        let blog = blogs.find(p => p.id === id)
        return blog
    },

    createBlog(name: string, description: string, websiteUrl: string) {
        const newBlog: blogsType = {
            id: (blogs.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        blogs.push(newBlog)
        return newBlog
    },

    updateBlog(id:string, name: string, description: string, website: string) {
        let foundBlogById = blogs.find(p => p.id === id)
        if(foundBlogById) {
            foundBlogById.name = name
            foundBlogById.description = description
            foundBlogById.websiteUrl = website
            return true
        }
        return false
    },

    deleteBlog(id:string) {
        let foundBlogId = blogs.find(p => p.id === id)
        if(foundBlogId) {
            blogs = blogs.filter(p => p !== foundBlogId)
            return true
        }
        return false
    },

    deleteBlogs() {
        blogs.splice(0, blogs.length)
    }
}   