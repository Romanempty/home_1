import { Request } from "express"

export type RequestWithParams<T> = Request<T>
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{},T>
export type RequestWithParamsAndBody<T, B> = Request<T,{},B>
export type RequestWithParamsAnqQuery <P,Q> = Request <P, {}, {}, Q>;

export type idParams = {
    id: string
}