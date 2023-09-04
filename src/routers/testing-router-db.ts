import {Request, Response, Router} from 'express'
export const testRouterDb = Router ({})
import HTTP_STATUSES from '../views/statusViews'
import { blogRepositoryDb } from '../repositories/blog-repositories-db'
import { postRepositoryDb } from '../repositories/post-repositories-db'


testRouterDb.delete('/all-data', (req: Request, res: Response) => {
   // videos.splice(0, videos.length)
    blogRepositoryDb.deleteBlogs()
    postRepositoryDb.deleteAllPosts()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})