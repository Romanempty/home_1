import { ObjectId } from "mongodb"
import { usersCollection, usersQueryRepository } from "./usersQueryRepository"
import { CreateResponseModel } from "../models/blogs/ResponseModel"
import { client } from "../db/db"
import { DeleteResponseModel } from "../models/blogs/ResponseModel"
import { userDbViewModel } from "../models/users/userDbModel"


export const usersRepository = {
    async createUser(newUser: userDbViewModel) {
        const res = await usersCollection.insertOne(newUser)
        return usersQueryRepository.findUserById(res.insertedId.toString())
    },

    async deleteUser(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount === 1
    },

    async findUserByLoginOrEmail(loginOrEmail: string): Promise<userDbViewModel | null> {
        const foundUser = await usersCollection.findOne( { $or: [ { email: loginOrEmail}, { userName: loginOrEmail } ] } )
        return foundUser
    },

    async deleteAllUsers(): Promise<Boolean> {
    await usersCollection.deleteMany({})
    return true
    }
}