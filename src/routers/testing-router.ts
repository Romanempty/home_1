import {Request, Response, Router} from 'express'
export const testRouter = Router ({})
import { videos } from '../constants/constVideos'
import { availableResolutions } from '../constants/constVideos'
import HTTP_STATUSES from '../views/statusViews'
import { blogRepository } from '../repositories/blogs-repositories'
import { postRepository } from '../repositories/posts-repositories'


testRouter.delete('/all-data', (req: Request, res: Response) => {
   // videos.splice(0, videos.length)
    blogRepository.deleteBlogs()
    postRepository.deletePosts()
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})