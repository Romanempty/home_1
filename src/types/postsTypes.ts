import { ObjectId } from "mongodb"

export type postsType = {
    'id': string
    'title': string
    'shortDescription': string 
    'content': string
    'blogId': string 
    'blogName': string
}
export type allPostsType = Array<postsType>

export type postsTypeDb = {
    id: string
    title: string
    shortDescription: string 
    content: string
    blogId: string 
    blogName: string
    createdAt: string
}

export type postsTypeDbType = {
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
}