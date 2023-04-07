import express, {Request, Response} from 'express'
import HTTP_STATUSES from './types/requestTypes'
import bodyParser from 'body-parser'
import { videos } from './constVideos'
import { availableResolutions } from './constVideos'
import { title } from 'process'
import { type } from 'os'

const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    videos.splice(0, videos.length)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.send(video)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].id === +req.params.id) {
            videos.splice(i, 1)
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
})

app.post('/videos', (req: Request, res: Response) => {
    let newVideo = {
        id : +(new Date()),	
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded : req.body.canBeDownloaded,
        minAgeRestriction : req.body.minAgeRestriction,
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
        if (Array.isArray(newVideo?.availableResolutions)){
            const length = newVideo?.availableResolutions.length
            let check = newVideo?.availableResolutions.filter(value => {
                return availableResolutions.includes(value)
            })    
            if (check.length < length) {
                errorsArray.push({message:'error', field: 'availableResolutions'})
            }
        } else {
            errorsArray.push({message:'error', field: 'availableResolutions'}) 
        }
        if (typeof newVideo?.canBeDownloaded !== 'boolean') {
            if (newVideo?.canBeDownloaded === undefined) {
                newVideo.canBeDownloaded = false
            } else {
                errorsArray.push({message:'error', field: 'canBeDownloaded'})
            }
        }
        if (newVideo?.minAgeRestriction !== null && typeof newVideo?.minAgeRestriction  !== 'number') {
            if (newVideo?.minAgeRestriction === undefined) {
                newVideo.minAgeRestriction = null
            } else {
                errorsArray.push({message:'error', field: 'minAgeRestriction'})
                }
            } else if (typeof newVideo?.minAgeRestriction !== 'number') {
                if (+newVideo?.minAgeRestriction < 1 || +newVideo?.minAgeRestriction >18) {
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

app.put('/videos/:id', (req: Request, res: Response) => {
    let newVideo1 = videos.find(p => p.id === +req.params.id)
    let index = videos.findIndex(p => p.id === +req.params.id)
    let errorsArray = []
    if (newVideo1) {
    const newVideo = {...newVideo1, ...req.body}
        if (typeof newVideo.title !== 'string' || newVideo.title.length > 40) {
           errorsArray.push({message:'error', field: 'title'})     
        }
        if (typeof newVideo.author !== 'string' || newVideo.author.length > 20) {
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
            if (newVideo?.canBeDownloaded === undefined) {
                newVideo.canBeDownloaded = false
            } else {
                errorsArray.push({message:'error', field: 'canBeDownloaded'})
            }
        }
        if (newVideo?.minAgeRestriction !== null && typeof newVideo?.minAgeRestriction  !== 'number') {
                errorsArray.push({message:'error', field: 'minAgeRestriction'})
            } else if (typeof newVideo?.minAgeRestriction !== 'number') {
                if ( +newVideo?.minAgeRestriction < 1 || +newVideo?.minAgeRestriction >18) {
                    errorsArray.push({message:'error', field: 'minAgeRestriction'})
                }
        }
        if (typeof newVideo?.publicationDate === 'string') {
            let r = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|w([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
            if (!r.test(newVideo.publicationDate)) {
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})