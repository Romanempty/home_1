import express, {Request, Response} from 'express'
import  bodyParser from 'body-parser'
import { blogRouterDb } from './routers/blogs-router'
import { postRouterDb } from './routers/posts-router-db'
import { runDb } from './repositories/db'
import { testRouterDb } from './routers/testing-router-db'
const app = express()

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

const port = process.env.PORT || 3000

//app.use('/videos', videoRouter)
app.use('/testing', testRouterDb)
app.use('/blogs', blogRouterDb)
app.use('/posts', postRouterDb)

const startApp = async () => {
    await runDb()
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
}

startApp()