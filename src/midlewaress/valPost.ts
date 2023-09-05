import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body, header } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { userRepository } from "../repositories/user-repositories"
import { blogRepositoryDb } from "../repositories/blog-repositories-db"
import { queryRepositoryBlogs } from "../domain/query-repository-blogs"
import { InputValidationMiddleware } from "./valMiddlewire"
import { isValidObjectId } from "./valBlog"

export const PostsValidationMiddleware = [

    body("title").isString().trim().isLength({min: 1, max: 30}).withMessage("title is incorect or wrong format"),

    body("shortDescription").isString().trim().isLength({min: 1, max: 100}).withMessage("shortDescription is incorect or wrong format"),

    body("content").isString().trim().isLength({min: 1, max: 1000}).withMessage("content is incorect or wrong format"),

    body("blogId").isString().trim().notEmpty().withMessage("blogId value is empty").custom(async blogId => {
    const isValidBlogIdObject = isValidObjectId(blogId);
    if(!isValidBlogIdObject){
        throw new Error("Blog id is not valid");
    }
    const blog = await queryRepositoryBlogs.findBlogById(blogId);
    if(!blog){
        throw new Error("Blog is not found in DB")
    } else {
        return true
    }
    }),

    InputValidationMiddleware
]