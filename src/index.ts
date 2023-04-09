import express, {Request, Response} from 'express'
import HTTP_STATUSES from './types/requestTypes'
import bodyParser from 'body-parser'
import { videos } from './constVideos'
import { availableResolutions } from './constVideos'
import { videoRouter } from './routers/videos-router'
import { testRouter } from './routers/testing-router'

const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.use('/videos', videoRouter)
app.use('/testing', testRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})