import { NextFunction, Request, Response } from "express"
import {validationResult, ValidationError, body } from "express-validator"
import HTTP_STATUSES from "../views/statusViews"
import { userRepository } from "../repositories/user-repositories"

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction ) => {
    const auth = btoa("admin:qwerty");
    if(req.headers.authorization===`Basic ` + auth){
        next();
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
    }
};

const ErrorFormatter = ({msg, path}: any) => {
    return {
        message: msg,
        field: path
    }
};

export const InputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: true }).map(error => ErrorFormatter(error))  
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({ errorsMessages });
    } else {
        next();
    }
}