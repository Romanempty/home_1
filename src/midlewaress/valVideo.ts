import { Request, Response } from "express"
import { body } from "express-validator"

export const videoTitleVal = body('title')
    .trim().isString().withMessage('Title be a string')
    .bail()
    .isLength({max: 40}).withMessage('Title no more than 40')

export const videoAuthoreVal = body('author') 
.trim().isString().withMessage('Author be a string')
.bail()
.isLength({max: 20}).withMessage('Author no more than 20')

export const videoCAnBeDownloaded = body('canBeDownloaded')
    