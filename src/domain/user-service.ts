import { UserViewModel } from "../models/users/userViewModel"
import { usersRepository } from "../repositories/user-repository"
import { userCreatedDbModel } from "../models/users/userDbModel"
import { userDbModel } from "../models/users/userDbModel"
import { ObjectId } from "mongodb"
import { log } from "console"

const bcrypt = require('bcrypt')

export const usersService = {
    async createUser(login: string, password: string, email: string): Promise<UserViewModel | null> {                
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = {
            _id: new ObjectId(),
            login, 
            password: passwordHash,
            email,
            createdAt: new Date().toISOString()
        }
        return await usersRepository.createUser(newUser)
    },

    async deleteUser(id: string): Promise<Boolean> {
        return await usersRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, pass: string) {
        const result = await usersRepository.findUserByLoginOrEmail(loginOrEmail)
        if(!result) {
            return false
        }
        return await bcrypt.compare(pass, result.password)
    },


    async _generateHash(password: string, salt: string)  {
        return await bcrypt.hash(password, salt)
    },

    async deleteAllUsers(): Promise<Boolean> {
        return usersRepository.deleteAllUsers()
    }
}

