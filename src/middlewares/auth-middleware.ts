import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { body } from "express-validator";

export const authMiddleware = (req: Request<any,any,any,any>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization 
    
    if (!authHeader) {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }

    if(!!authHeader) {
        const tokenResult = authHeader.split(' ')[0]
        const authResult = Buffer.from(authHeader?.split(' ')[1], 'base64').toString()

        if (authResult !== 'admin:qwerty' || tokenResult !== 'Basic') {
            return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        }
    }
    next()
}

export const loginOrEmailValidation = body('loginOrEmail').isString().trim().notEmpty()
export const passwordValidation = body('password').isString().trim().notEmpty()

export const authValidation = [loginOrEmailValidation,passwordValidation]


export const loginValidation = body('login').isString().notEmpty().isLength({min: 3, max: 10}).matches('^[a-zA-Z0-9_-]*$')
export const passwordVal = body('passowrd').isString().rtrim().notEmpty().isLength({min: 6, max: 20})
export const emailValidation = body('email').isString().trim().notEmpty().matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')

export const userInputValidation = [loginValidation, passwordVal, emailValidation]