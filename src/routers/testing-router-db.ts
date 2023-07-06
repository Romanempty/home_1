import {Request, Response, Router} from 'express'
export const testRouterDb = Router ({})
import { videos } from '../constants/constVideos'
import { availableResolutions } from '../constants/constVideos'
import HTTP_STATUSES from '../views/statusViews'
import { blogRepository } from '../repositories/blogs-repositories'
import { postRepository } from '../repositories/posts-repositories'
import { blogRepositoryDb } from '../repositories/blog-repositories-db'
import { postRepositoryDb } from '../repositories/post-repositories-db'


testRouterDb.delete('/all-data', (req: Request, res: Response) => {
   // videos.splice(0, videos.length)
    blogRepositoryDb.deleteBlogs()
    postRepositoryDb.deletePosts()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})