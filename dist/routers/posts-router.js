"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const posts_repositories_1 = require("../repositories/posts-repositories");
const posts_repositories_2 = require("../repositories/posts-repositories");
const valMiddlewire_1 = require("../midlewaress/valMiddlewire");
const valPost_1 = require("../midlewaress/valPost");
const valPost_2 = require("../midlewaress/valPost");
const valPost_3 = require("../midlewaress/valPost");
const valPost_4 = require("../midlewaress/valPost");
const valMiddlewire_2 = require("../midlewaress/valMiddlewire");
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get('/', (req, res) => {
    const allPosts = posts_repositories_2.postRepository.findPosts();
    res.status(statusViews_1.default.OK_200).send(posts_repositories_1.posts);
});
exports.postRouter.get('/:id', (req, res) => {
    let foundPost = posts_repositories_2.postRepository.findPost(req.params.id);
    if (!foundPost) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.OK_200).send(foundPost);
});
exports.postRouter.delete('/:id', valMiddlewire_1.authorizationVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    let foundPost = posts_repositories_2.postRepository.deletePost(req.params.id);
    if (!foundPost) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.NO_CONTENT_204).send(foundPost);
});
exports.postRouter.post('/', valMiddlewire_1.authorizationVal, valPost_1.postTitleVal, valPost_2.postShortDescriptionVal, valPost_3.postContentVal, valPost_4.postBlogIdVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    const title = req.body.title;
    const shortdescription = req.body.shortdescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const newPostCreate = posts_repositories_2.postRepository.createPost(title, shortdescription, content, blogId);
    res.status(statusViews_1.default.CREATED_201).send(newPostCreate);
});
exports.postRouter.put('/:id', valMiddlewire_1.authorizationVal, valPost_1.postTitleVal, valPost_2.postShortDescriptionVal, valPost_3.postContentVal, valPost_4.postBlogIdVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const shortdescription = req.body.shortdescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const postUpdate = posts_repositories_2.postRepository.updatePost(id, title, shortdescription, content, blogId);
    if (!postUpdate) {
        return res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
    return res.sendStatus(statusViews_1.default.NO_CONTENT_204);
});
