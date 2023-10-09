import { ObjectId } from "mongodb"

export type userDbViewModel = {
    _id: ObjectId,
    login: string,
    password: string,
    email: string,
    createdAt: string
}




