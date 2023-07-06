import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'
import { blogsTypeDbType } from "../types/blogsTypes";
import { postsTypeDbType } from "../types/postsTypes";

dotenv.config()


const mongoUri = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'


console.log('mongoUri :', mongoUri)
    if (!mongoUri) {
        throw new  Error( 'Url not fond')
    }
export const client = new MongoClient(mongoUri)
export const db = client.db('api')



export const blogsCollection = db.collection<blogsTypeDbType>('blogs')
export const postsCollection = db.collection<postsTypeDbType>('posts')


export async function runDb() {
    try {
        await client.connect()
        console.log('Conected successfully to mongo server')
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}
