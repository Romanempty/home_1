import { type } from "os"

export type postsType = {
    'id': string
    'title': string
    'shortdescription': string 
    'content': string
    'blogId': string 
    'blogName': string
}

export type allPostsType = Array<postsType>