import { Router, Response } from "express";
import { RequestWithBody, RequestWithParams, RequestWithQueryParams } from "../types/requestModelType";
import { findUserPaginateModel } from "../models/users/findUserPaginateModel";
import { usersQueryRepository } from "../repositories/usersQueryRepository";
import { HTTP_STATUSES } from "../utils";
import { authValidation } from "../middlewares/auth-middleware";
import { userInputValidation } from "../middlewares/auth-middleware";
import { UserViewPagimateModel } from "../models/users/userViewPaginateModel";
import { UserInputModel } from "../models/users/userInputModel";
import { usersService } from "../domain/user-service";
import { authMiddleware } from "../middlewares/auth-middleware";
import { allowedNodeEnvironmentFlags } from "process";
import { InputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { authModel } from "../models/Auth/authModel";

export const userRouter = Router({})

export const authRouter = Router({})


userRouter.get('/',
authMiddleware,
userInputValidation,
async (req: RequestWithQueryParams<{searchLoginTerm: string | null, searchEmailTerm: string | null, sortBy: string, sortDirection: "asc" | "desc", pageNumber: number, pageSize: number}> , res: Response) => {

    const searchLoginTerm = req.query.searchLoginTerm || null
    const searchEmailTerm = req.query.searchEmailTerm || null
    const sortBy = req.query.sortBy || "createdAt"
    const sortDirection = req.query.sortDirection || "desc"
    const pageNumber = req.query.pageNumber || 1
    const pageSize = req.query.pageSize || 10
    const result: UserViewPagimateModel = await usersQueryRepository.findUsers(searchEmailTerm, searchLoginTerm, sortBy, sortDirection, pageNumber, pageSize)
    return res.status(HTTP_STATUSES.OK_200).send(result)
})

userRouter.post('/',
authMiddleware,
userInputValidation,
InputValidationMiddleware,
async (req: RequestWithBody<UserInputModel>, res: Response) => {
    const newUser = await usersService.createUser(req.body.email, req.body.login, req.body.password)
    return res.status(HTTP_STATUSES.CREATED_201).send(newUser)
})

userRouter.delete('/:id',
InputValidationMiddleware,
authMiddleware,
userInputValidation,
async (req: RequestWithParams<{id: string}>, res: Response) => {
    const userDelete = await usersService.deleteUser(req.params.id)
    if (userDelete) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})

authRouter.post('/login',
InputValidationMiddleware,
authValidation,
async (req: RequestWithBody<authModel>,  res: Response) => {
    const result = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (result) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
    }
})