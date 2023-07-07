"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouterDb = void 0;
const express_1 = require("express");
exports.testRouterDb = (0, express_1.Router)({});
const statusViews_1 = __importDefault(require("../views/statusViews"));
const blog_repositories_db_1 = require("../repositories/blog-repositories-db");
const post_repositories_db_1 = require("../repositories/post-repositories-db");
exports.testRouterDb.delete('/all-data', (req, res) => {
    // videos.splice(0, videos.length)
    blog_repositories_db_1.blogRepositoryDb.deleteBlogs();
    post_repositories_db_1.postRepositoryDb.deletePosts();
    res.sendStatus(statusViews_1.default.NO_CONTENT_204);
});
