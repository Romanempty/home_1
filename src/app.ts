import express from "express";
import { blogsRouter } from "./routes/blogs-router";
import { postsRouter } from "./routes/posts-router";
import { testRouter } from "./routes/testing-router";
import { userRouter } from "./routes/users-router";

export const app = express()

export const RouterPaths = {
    blogs: '/blogs',
    posts: '/posts',
    users: '/users',
    testing: '/testing/all-data'
}

const parseMiddleware = express.json()
app.use(parseMiddleware)
app.use(RouterPaths.blogs, blogsRouter)
app.use(RouterPaths.posts, postsRouter)
app.use(RouterPaths.users, userRouter)
app.use(RouterPaths.testing, testRouter)