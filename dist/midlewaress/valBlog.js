"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogWebsiteUrlVal = exports.blogDescriptionVal = exports.blogNameVal = void 0;
const express_validator_1 = require("express-validator");
exports.blogNameVal = (0, express_validator_1.body)('name')
    .trim().isString().withMessage('Name be a string')
    .bail()
    .isLength({ min: 1, max: 15 }).withMessage('Name no more than 15');
exports.blogDescriptionVal = (0, express_validator_1.body)('description')
    .trim().isString().withMessage('Description be a string')
    .bail()
    .isLength({ min: 1, max: 500 }).withMessage('Description no more than 500');
exports.blogWebsiteUrlVal = (0, express_validator_1.body)('websiteUrl')
    .trim().isString().withMessage('WebsiteUrl be a string')
    .bail()
    .isLength({ min: 1, max: 100 }).withMessage('WebsiteUrl no more than 500')
    .bail()
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Not valid URL');
