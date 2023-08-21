import { ObjectId } from "mongodb"


export type allBlogsType = Array<blogsType>

export type blogsTypeDb = {
    id: string
    name: string
    description: string 
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type blogsType = {
    name: string
    description: string 
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}



export type blogsTypeDbType = {
    _id: ObjectId 
    name: string
    description: string 
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type upBlogeDb = {
    name: string
    description: string 
    websiteUrl: string
}



export type PageType<T> = {
    pageCount: number
    page: number
    pageSize: number
    totalCount: number
    items: T[]
}