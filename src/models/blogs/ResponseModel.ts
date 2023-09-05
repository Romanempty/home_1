import { ObjectId } from "mongodb"

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