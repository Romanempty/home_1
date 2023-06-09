import {Request, Response, Router} from 'express'
import { videos } from '../constants/constVideos'
import { availableResolutions } from '../constants/constVideos'
import HTTP_STATUSES from '../views/statusViews'
import { videoRepository } from '../repositories/videos-repositories'
export const videoRouter = Router ({})

videoRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})

videoRouter.get('/:id', (req: Request, res: Response) => {
    let video = videoRepository.findVideo(+req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

videoRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

videoRouter.post('/', (req: Request, res: Response) => {
    let newVideo = {
        id : +(new Date()),	
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded : false,
        minAgeRestriction : null,
        createdAt :	(new Date().toISOString()),
        publicationDate	: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
        availableResolutions : req.body.availableResolutions
    }
    let errorsArray = []
        if (typeof newVideo.title !== 'string' || newVideo.title.length > 40) {
            errorsArray.push({message:'error', field: 'title'})     
        }
        if (typeof newVideo.author !== 'string' || newVideo.author.length > 20) {
            errorsArray.push({message:'error', field: 'author'})     
        }
        if (Array.isArray(newVideo.availableResolutions)){
            const length = newVideo.availableResolutions.length
            let check = newVideo.availableResolutions.filter(value => {
                return availableResolutions.includes(value)
            })    
            if (check.length < length) {
                errorsArray.push({message:'error', field: 'availableResolutions'})
            }
        } else {
            errorsArray.push({message:'error', field: 'availableResolutions'}) 
        }
        if (typeof newVideo.canBeDownloaded !== 'boolean') {
            if (newVideo.canBeDownloaded === undefined) {
                newVideo.canBeDownloaded = false
            } else {
                errorsArray.push({message:'error', field: 'canBeDownloaded'})
            }
        }
        if (newVideo?.minAgeRestriction !== null && typeof newVideo?.minAgeRestriction  !== 'number') {
            errorsArray.push({message:'error', field: 'minAgeRestriction'})
        } else if (typeof newVideo?.minAgeRestriction === 'number') {
            if ( +newVideo?.minAgeRestriction < 1 || +newVideo?.minAgeRestriction >18) {
                errorsArray.push({message:'error', field: 'minAgeRestriction'})
            }
        }
        if (errorsArray.length > 0) {
            let eList = {errorsMessages: errorsArray}
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send(eList) 
            } else {
                videos.push(newVideo)
                res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
            }
})

videoRouter.put('/:id', (req: Request, res: Response) => {
    let newVideo1 = videos.find(p => p.id === +req.params.id)
    let index = videos.findIndex(p => p.id === +req.params.id)
    let errorsArray = []
    if (newVideo1) {
    const newVideo = {...newVideo1, ...req.body}
        if (typeof newVideo?.title !== 'string' || newVideo.title.length > 40) {
           errorsArray.push({message:'error', field: 'title'})     
        }
        if (typeof newVideo?.author !== 'string' || newVideo.author.length > 20) {
            errorsArray.push({message:'error', field: 'author'})     
        }
        if (Array.isArray(newVideo?.availableResolutions)){
            const length = newVideo?.availableResolutions.length
            let check = newVideo?.availableResolutions.filter((value: string) => {
                return availableResolutions.includes(value)
            })    
            if (check.length < length) {
                errorsArray.push({message:'error', field: 'availableResolutions'})
            }
        } else {
            errorsArray.push({message:'error', field: 'availableResolutions'}) 
        }
        if (typeof newVideo?.canBeDownloaded !== 'boolean') {
                errorsArray.push({message:'error', field: 'canBeDownloaded'})
              
        }
        if (newVideo?.minAgeRestriction !== null && typeof newVideo?.minAgeRestriction  !== 'number') {
                errorsArray.push({message:'error', field: 'minAgeRestriction'})
            } else if (typeof newVideo?.minAgeRestriction === 'number') {
                if ( +newVideo?.minAgeRestriction < 1 || +newVideo?.minAgeRestriction >18) {
                    errorsArray.push({message:'error', field: 'minAgeRestriction'})
                }
        }
        if (typeof newVideo.publicationDate === 'string') {
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(newVideo.publicationDate)) {
                errorsArray.push({message: 'error', field: 'publicationDate'})
            }
        } else {
            errorsArray.push({message: 'error', field: 'publicationDate'})
        }
        if (errorsArray.length > 0) {
            let eList = {errorsMessages: errorsArray}
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send(eList) 
            } else {
                videos[index] = newVideo
                res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
            }
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        }       
})