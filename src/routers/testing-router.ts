import {Request, Response, Router} from 'express'
export const testRouter = Router ({})
import { videos } from '../constVideos'
import { availableResolutions } from '../constVideos'
import HTTP_STATUSES from '../types/requestTypes'


testRouter.delete('/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})