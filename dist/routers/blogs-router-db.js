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
exports.blogRouterDb = void 0;
const express_1 = require("express");
const statusViews_1 = __importDefault(require("../views/statusViews"));
const blog_repositories_db_1 = require("../repositories/blog-repositories-db");
const valMiddlewire_1 = require("../midlewaress/valMiddlewire");
const valMiddlewire_2 = require("../midlewaress/valMiddlewire");
const valBlog_1 = require("../midlewaress/valBlog");
const valBlog_2 = require("../midlewaress/valBlog");
const valBlog_3 = require("../midlewaress/valBlog");
exports.blogRouterDb = (0, express_1.Router)({});
exports.blogRouterDb.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repositories_db_1.blogRepositoryDb.findBlogs();
    res.status(statusViews_1.default.OK_200).send(blogs);
}));
exports.blogRouterDb.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blog_repositories_db_1.blogRepositoryDb.findBlog(req.params.id);
    if (!foundBlog) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.OK_200).send(foundBlog);
}));
exports.blogRouterDb.delete('/:id', valMiddlewire_1.authorizationVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blog_repositories_db_1.blogRepositoryDb.deleteBlog(req.params.id);
    if (!deletedBlog) {
        res.sendStatus(statusViews_1.default.NOT_FOUND_404);
        return;
    }
    res.status(statusViews_1.default.NO_CONTENT_204).send(deletedBlog);
}));
exports.blogRouterDb.post('/', valMiddlewire_1.authorizationVal, valBlog_1.blogNameVal, valBlog_2.blogDescriptionVal, valBlog_3.blogWebsiteUrlVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blog_repositories_db_1.blogRepositoryDb.createBlog(req.body);
    res.status(statusViews_1.default.CREATED_201).send(newBlog);
}));
exports.blogRouterDb.put('/:id', valMiddlewire_1.authorizationVal, valBlog_1.blogNameVal, valBlog_2.blogDescriptionVal, valBlog_3.blogWebsiteUrlVal, valMiddlewire_2.inputValidationMidldewareErrors, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogUpdate = yield blog_repositories_db_1.blogRepositoryDb.updateBlog(req.params.id, req.body);
    if (blogUpdate) {
        return res.sendStatus(statusViews_1.default.NO_CONTENT_204);
    }
    else {
        return res.sendStatus(statusViews_1.default.NOT_FOUND_404);
    }
}));
