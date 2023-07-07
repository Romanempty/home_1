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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogIdVal = exports.postContentVal = exports.postShortDescriptionVal = exports.postTitleVal = void 0;
const express_validator_1 = require("express-validator");
const blog_repositories_db_1 = require("../repositories/blog-repositories-db");
exports.postTitleVal = (0, express_validator_1.body)('title')
    .trim().isString().withMessage('Title be a string')
    .bail()
    .isLength({ min: 1, max: 30 }).withMessage('Title no more than 30');
exports.postShortDescriptionVal = (0, express_validator_1.body)('shortDescription')
    .trim().isString().withMessage('ShortDescription be a string')
    .bail()
    .isLength({ min: 1, max: 100 }).withMessage('ShortDescription no more than 100');
exports.postContentVal = (0, express_validator_1.body)('content')
    .trim().isString().withMessage('Content be a string')
    .bail()
    .isLength({ min: 1, max: 1000 }).withMessage('Content no more than 1000');
exports.postBlogIdVal = (0, express_validator_1.body)('blogId')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blog_repositories_db_1.blogRepositoryDb.findBlog(value);
    console.log('middleware: ', foundBlog);
    if (!foundBlog) {
        throw new Error('Blog is not found');
    }
    return true;
}));
