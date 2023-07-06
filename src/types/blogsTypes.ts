import { ObjectId } from "mongodb"

export type blogsType = {
    'id': string
    'name': string
    'description': string 
    'websiteUrl': string
}
export type allBlogsType = Array<blogsType>

export type blogsTypeDb = {
    id: string
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
    name: string, 
    description: string, 
    websiteUrl: string
}

