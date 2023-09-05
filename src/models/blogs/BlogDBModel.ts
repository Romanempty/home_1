import { ObjectId } from "mongodb"

export type BlogDBModel = {
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}