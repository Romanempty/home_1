import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body, header } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { blogRepository } from "../repositories/blogs-repositories"
import { userRepository } from "../repositories/user-repositories"

export const postTitleVal = body('title')
    .trim().isString().withMessage('Title be a string')
    .bail()
    .isLength({min: 1, max: 30}).withMessage('Title no more than 30')

export const postShortDescriptionVal = body('shortDescription')
    .trim().isString().withMessage('ShortDescription be a string')
    .bail()
    .isLength({min: 1, max: 100}).withMessage('ShortDescription no more than 100')

export const postContentVal = body('content')
    .trim().isString().withMessage('Content be a string')
    .bail()
    .isLength({min: 1, max: 1000}).withMessage('Content no more than 1000')

export const postBlogIdVal = body('blogId')
    .custom(value => {
        if(!blogRepository.findBlog(value)) {
            throw new Error('Blog is not found')
        }
        return true
    })