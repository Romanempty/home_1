import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body, param } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { queryRepositoryBlogs } from "../domain/query-repository-blogs"
import { ObjectId } from "mongodb"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { blogModel } from "../types/blogsTypes"
import { InputValidationMiddleware } from "./valMiddlewire"



const urlPattern ='^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$';

export const BlogsValidationMiddleware = [
    body("name").isString().trim().isLength({min:1, max: 15}).withMessage("Name should be less then 15 letters"),

    body("description").isString().trim().isLength({min:1, max: 500}).withMessage("Description should be less then 500 letters"),
    
    body("websiteUrl").matches(urlPattern).isLength({min:1, max: 100}).withMessage("websiteUrl should be less then 500 letters"),

    InputValidationMiddleware
]

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

export const BlogsValidationMiddlewareCreatePost = [

    param("id").isString().trim().notEmpty().withMessage("blogId value is empty").custom(async blogId => {
        const isValidBlogIdObject = isValidObjectId(blogId);
        if(!isValidBlogIdObject){
            throw new Error("Blog id is not valid");
        }
    }), 

body("title").isString().trim().isLength({min: 1, max: 30}).withMessage("title is incorect or wrong format"),

body("shortDescription").isString().trim().isLength({min: 1, max: 100}).withMessage("shortDescription is incorect or wrong format"),

body("content").isString().trim().isLength({min: 1, max: 1000}).withMessage("content is incorect or wrong format"),

InputValidationMiddleware
]