import { ObjectId } from "mongodb"

export type postViewModel = {
    id: string
    title: string
    shortDescription: string 
    content: string
    blogId: string 
    blogName: string
    createdAt: string
}

export type postModel = {
    _id: ObjectId
    title: string
    shortDescription: string 
    content: string
    blogId: string 
    blogName: string
    createdAt: string
}

export type inputPostModel = {
    title: string
    shortDescription:string 
    content: string 
    blogId: string
    blogName: string,
    createdAt: string
}

export type PostType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: postViewModel[]
}