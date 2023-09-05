import { body, param } from "express-validator";
import { InputValidationMiddleware } from "./input-validation-middleware";
import { isValidObjectId } from "../helper/isValidObjectId";

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