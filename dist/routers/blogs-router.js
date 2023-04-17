"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const blogs_repositories_1 = require("../repositories/blogs-repositories");
const blogs_repositories_2 = require("../repositories/blogs-repositories");
const valMiddlewire_1 = require("../midlewaress/valMiddlewire");
const valMiddlewire_2 = require("../midlewaress/valMiddlewire");
const valBlog_1 = require("../midlewaress/valBlog");
const valBlog_2 = require("../midlewaress/valBlog");
const valBlog_3 = require("../midlewaress/valBlog");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get('/', (req, res) => {
    const allBlogs = blogs_repositories_2.blogRepository.findBlogs();
    res.status(statusViews_1.default.OK_200).send(blogs_repositories_1.blogs);
});
exports.blogRouter.get('/:id', (req, res) => {
    let foundBlog = blogs_repositories_2.blogRepository.findBlog(req.params.id);
    if (!foundBlog) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.OK_200).send(foundBlog);
});
exports.blogRouter.delete('/:id', valMiddlewire_1.authorizationVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    let foundBlog = blogs_repositories_2.blogRepository.deleteBlog(req.params.id);
    if (!foundBlog) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.NO_CONTENT_204).send(foundBlog);
});
exports.blogRouter.post('/', valMiddlewire_1.authorizationVal, valBlog_1.blogNameVal, valBlog_2.blogDescriptionVal, valBlog_3.blogWebsiteUrlVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlogCreate = blogs_repositories_2.blogRepository.createBlog(name, description, websiteUrl);
    res.status(statusViews_1.default.CREATED_201).send(newBlogCreate);
});
exports.blogRouter.put('/:id', valMiddlewire_1.authorizationVal, valBlog_1.blogNameVal, valBlog_2.blogDescriptionVal, valBlog_3.blogWebsiteUrlVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const website = req.body.websiteUrl;
    const blogUpdate = blogs_repositories_2.blogRepository.updateBlog(id, name, description, website);
    if (blogUpdate) {
        return res.sendStatus(statusViews_1.default.NO_CONTENT_204);
    }
    else {
        return res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
});
