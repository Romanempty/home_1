"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouterDb = void 0;
const express_1 = require("express");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const posts_repositories_1 = require("../repositories/posts-repositories");
const post_repositories_db_1 = require("../repositories/post-repositories-db");
const valMiddlewire_1 = require("../midlewaress/valMiddlewire");
const valPost_1 = require("../midlewaress/valPost");
const valPost_2 = require("../midlewaress/valPost");
const valPost_3 = require("../midlewaress/valPost");
const valPost_4 = require("../midlewaress/valPost");
const valMiddlewire_2 = require("../midlewaress/valMiddlewire");
exports.postRouterDb = (0, express_1.Router)({});
exports.postRouterDb.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allPosts = yield post_repositories_db_1.postRepositoryDb.findPosts();
    res.status(statusViews_1.default.OK_200).send(posts_repositories_1.posts);
}));
exports.postRouterDb.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield post_repositories_db_1.postRepositoryDb.findPost(req.params.id);
    if (!foundPost) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.OK_200).send(foundPost);
}));
exports.postRouterDb.delete('/:id', valMiddlewire_1.authorizationVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deletePost = yield post_repositories_db_1.postRepositoryDb.deletePost(req.params.id);
    if (!deletePost) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.NO_CONTENT_204).send(deletePost);
}));
exports.postRouterDb.post('/', valMiddlewire_1.authorizationVal, valPost_1.postTitleVal, valPost_2.postShortDescriptionVal, valPost_3.postContentVal, valPost_4.postBlogIdVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPostCreate = yield post_repositories_db_1.postRepositoryDb.createPost(req.body);
    res.status(statusViews_1.default.CREATED_201).send(newPostCreate);
}));
exports.postRouterDb.put('/:id', valMiddlewire_1.authorizationVal, valPost_1.postTitleVal, valPost_2.postShortDescriptionVal, valPost_3.postContentVal, valPost_4.postBlogIdVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postUpdate = yield post_repositories_db_1.postRepositoryDb.updatePost(req.params.id, req.body);
    if (!postUpdate) {
        return res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
    return res.sendStatus(statusViews_1.default.NO_CONTENT_204);
}));
