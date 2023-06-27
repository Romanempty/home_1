"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlogIdVal = exports.postContentVal = exports.postShortDescriptionVal = exports.postTitleVal = void 0;
const express_validator_1 = require("express-validator");
const blogs_repositories_1 = require("../repositories/blogs-repositories");
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
    .custom(value => {
    if (!blogs_repositories_1.blogRepository.findBlog(value)) {
        throw new Error('Blog is not found');
    }
    return true;
});
