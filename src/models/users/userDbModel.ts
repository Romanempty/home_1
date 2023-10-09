import { ObjectId } from "mongodb"

export type userDbModel = {
    _id: ObjectId,
    login: string,
    email: string,
    createdAt: string
}


export type userDbViewModel = {
    _id: ObjectId,
    login: string,
    password: string,
    email: string,
    createdAt: string
}




export type userCreatedDbModel = {
    _id: ObjectId,
    login: string,
    email: string,
    salt: string,
    hash: string,
    createdAt: string
}

export type userCreatedModel = {
    id: string,
    login: string,
    email: string,
    salt: string,
    hash: string,
    createdAt: string
}