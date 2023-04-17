import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videoRouter } from './routers/videos-router'
import { testRouter } from './routers/testing-router'
import { blogRouter } from './routers/blogs-router'
import { postRouter } from './routers/posts-router'


const app = express()

app.use(bodyParser())

const port = process.env.PORT || 3000

//app.use('/videos', videoRouter)
app.use('/testing', testRouter)
app.use('/blogs', blogRouter)
app.use('/posts', postRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})