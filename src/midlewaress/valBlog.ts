import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body, param } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { queryRepositoryBlogs } from "../domain/query-repository-blogs"
import { ObjectId } from "mongodb"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { blogModel } from "../types/blogsTypes"
export const blogNameVal = body('name')

    .trim().isString().withMessage('Name be a string')
    .bail()
    .isLength({min: 1, max: 15}).withMessage('Name no more than 15')

export const blogDescriptionVal = body('description')
    .trim().isString().withMessage('Description be a string')
    .bail()
    .isLength({min: 1, max: 500}).withMessage('Description no more than 500')

export const blogWebsiteUrlVal = body('websiteUrl')
    .trim().isString().withMessage('WebsiteUrl be a string')
    .bail()
    .isLength({min: 1, max: 100}).withMessage('WebsiteUrl no more than 500')
    .bail()
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Not valid URL')

export const blogIdValid = body('blogId')
.custom( async (value) => {
const foundBlog = await queryRepositoryBlogs.findBlogById(value)
console.log('middleware: ', foundBlog)
    if(!foundBlog) {
        throw new Error('Blog is not found')
    }
    return true
})

export const isValidObjectId = (id: string): boolean => {
    return ObjectId.isValid(id)
}