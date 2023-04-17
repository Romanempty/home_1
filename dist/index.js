"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const testing_router_1 = require("./routers/testing-router");
const blogs_router_1 = require("./routers/blogs-router");
const posts_router_1 = require("./routers/posts-router");
const app = (0, express_1.default)();
app.use((0, body_parser_1.default)());
const port = process.env.PORT || 3000;
//app.use('/videos', videoRouter)
app.use('/testing', testing_router_1.testRouter);
app.use('/blogs', blogs_router_1.blogRouter);
app.use('/posts', posts_router_1.postRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
