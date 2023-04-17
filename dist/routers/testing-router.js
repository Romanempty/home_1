"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = require("express");
exports.testRouter = (0, express_1.Router)({});
const statusViews_1 = __importDefault(require("../views/statusViews"));
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const posts_repositories_1 = require("../repositories/posts-repositories");
exports.testRouter.delete('/all-data', (req, res) => {
    // videos.splice(0, videos.length)
    blogs_repositories_1.blogRepository.deleteBlogs();
    posts_repositories_1.postRepository.deletePosts();
    res.sendStatus(statusViews_1.default.NO_CONTENT_204);
});
