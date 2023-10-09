
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
//const mongoURI = 'mongodb://0.0.0.0:27017'
if(!mongoURI){
    throw new Error("MongoURI not found")
}
console.log(process.env.MONGO_URL);

export const client = new MongoClient(mongoURI);

export async function runDB(){
    try {
        //connect the client tot the server
        await client.connect();
        //establish and verify collection
        await client.db('blogs').command({ ping: 1})
        await client.db('posts').command({ ping: 1})
        await client.db('users').command({ ping: 1})

        console.log('Connected successfully to mongo server');
    } catch {
        console.log('Cant connect to mongo');
        //ensure that the client will close when you finish/error
        await client.close();
    }
};