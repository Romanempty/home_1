import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { userRepository } from "../repositories/user-repositories"

export const authorizationVal = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
    const [method, encoded] = authorization.split(' ')
    const decoded = Buffer.from(encoded, 'base64').toString('ascii')

    const [username, password]: Array<string> = decoded.split(':')
    if (method !== 'Basic' || username !== 'admin' || password !== 'qwerty') {
        return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    } else {
        next()
    }
}

export const inputValidationMidldewareErrors = (req:Request, res:Response, next: NextFunction) => {
    const errorFormat = ({msg, param}: ValidationError) => {
        return {message: msg, field: param}
    }
    const errors = validationResult(req).formatWith(errorFormat)
    if(!errors.isEmpty()) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({errorsMessages: errors.array()})
    } else {
        next()
    }
}