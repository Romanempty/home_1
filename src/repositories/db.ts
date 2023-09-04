import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'
import { blogModel } from "../types/blogsTypes";
import { postModel } from "../types/postsTypes";

dotenv.config()


const mongoUri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'


console.log('mongoUri :', mongoUri)
    if (!mongoUri) {
        throw new  Error( 'Url not fond')
    }
export const client = new MongoClient(mongoUri)
export const db = client.db('api')



export const blogsCollection = db.collection<blogModel>('blogs')
export const postsCollection = db.collection<postModel>('posts')


export async function runDb() {
    try {
        await client.connect()
        console.log('Conected successfully to mongo server')
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}
