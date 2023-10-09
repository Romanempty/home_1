import { client } from "../db/db";
import { findUserPaginateModel } from "../models/users/findUserPaginateModel";
import { Filter, ObjectId } from "mongodb";
import { UserViewPagimateModel } from "../models/users/userViewPaginateModel";
import { query } from "express";
import { UserViewModel } from "../models/users/userViewModel";
import { userDbViewModel } from "../models/users/userDbModel";

export const usersCollection = client.db().collection<userDbViewModel>('users')


export const formUser = (userDb: userDbViewModel): UserViewModel => {
    const user = {
        id: userDb._id.toString(),
        login: userDb.login,
        email: userDb.email,
        createdAt: userDb.createdAt
    }
    return user
}


export const formGetResponseUser = (userDb: userDbViewModel[], pagesCount: number, pageSize: number, page: number, totalCount: number): UserViewPagimateModel => {
    if (userDb.length === 0) {
        const users: UserViewPagimateModel = {
            pagesCount: 0,
            page: 0,
            pageSize: 0,
            totalCount: 0,
            items:[]
        }
        return users
    } else {
        const items = userDb.map(user => formUser(user))
        const user = {
            pagesCount,
            page,
            pageSize,
            totalCount,
            items
        }
        return user
    }
}


export const usersQueryRepository = {

    async findUsers(searchLoginTerm: string | null, searchEmailTerm: string | null, sortBy: string, sortDirection: "asc" | "desc", pageNumber: number, pageSize: number): Promise<UserViewPagimateModel> {
        
        let termLogin
        let termEmail
        if (searchLoginTerm === null) {
            termLogin = new RegExp('.*')
        } else {
            termLogin = new RegExp('.*' + searchLoginTerm + '.*', 'i')
        }
        if (searchEmailTerm === null) {
            termEmail = new RegExp('.*')
        } else {
            termEmail = new RegExp('.*' + searchEmailTerm + '.*', 'i')
        }
        const totalCount = await usersCollection.countDocuments({ $or: [{ 'login': termLogin}, {'email': termEmail}]})
        const pagesCount = Math.ceil(totalCount / pageSize)
        const skipRecords = (pageNumber - 1) * pageSize
        const sorting = sortDirection==='desc'? -1 : 1
        const model: userDbViewModel[] = await usersCollection
        .find({ $or: [{ 'login': termLogin}, {'email': termEmail}]})
        .sort({ [sortBy]: sorting })
        .skip(skipRecords)
        .limit(pageSize)
        .toArray()
        const users: UserViewPagimateModel = formGetResponseUser(model, pagesCount, pageNumber, pageSize, totalCount)
        return users
    },

    async findUserById(id: string): Promise<UserViewModel | null> {
        const foundUserDb: userDbViewModel | null = await usersCollection.findOne({_id: new ObjectId(id)})
        if (foundUserDb) {
            const user: UserViewModel = formUser(foundUserDb)
            return  user
        } else {
            return null
        }
    }
}


