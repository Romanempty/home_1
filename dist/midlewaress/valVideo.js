"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoCAnBeDownloaded = exports.videoAuthoreVal = exports.videoTitleVal = void 0;
const express_validator_1 = require("express-validator");
exports.videoTitleVal = (0, express_validator_1.body)('title')
    .trim().isString().withMessage('Title be a string')
    .bail()
    .isLength({ max: 40 }).withMessage('Title no more than 40');
exports.videoAuthoreVal = (0, express_validator_1.body)('author')
    .trim().isString().withMessage('Author be a string')
    .bail()
    .isLength({ max: 20 }).withMessage('Author no more than 20');
exports.videoCAnBeDownloaded = (0, express_validator_1.body)('canBeDownloaded');
