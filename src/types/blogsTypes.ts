import { ObjectId } from "mongodb"

export type blogsViewModel = {
    id: string
    name: string
    description: string 
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type BlogType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: blogsViewModel[]
}

export type blogModel = {
    _id: ObjectId 
    name: string
    description: string 
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export type InputblogModel = {
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type CreateResponseModel ={
    acknowledged : boolean,
    insertedId : ObjectId,
};

export type DeleteResponseModel ={
    acknowledged : boolean,
    deletedCount : number,
};

export type UpdateResponseModel = {
    acknowledged : boolean,
    insertedId : any,
    matchedCount : number,
    modifiedCount : number,
    upsertedCount : number  
}